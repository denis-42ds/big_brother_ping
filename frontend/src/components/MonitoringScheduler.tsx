import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Clock, 
  Settings, 
  Play, 
  Pause, 
  Calendar,
  Globe,
  AlertTriangle,
  CheckCircle,
  X,
  Plus,
  Edit,
  Trash2
} from '../assets/icons'
import { ScheduleConfig, MonitorType } from '../types/monitoring'

interface MonitoringSchedulerProps {
  onScheduleChange: (schedule: ScheduleConfig) => void
  currentSchedule?: ScheduleConfig
  monitorType: MonitorType
}

const MonitoringScheduler: React.FC<MonitoringSchedulerProps> = ({
  onScheduleChange,
  currentSchedule,
  monitorType
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [schedule, setSchedule] = useState<ScheduleConfig>(
    currentSchedule || {
      interval: 60,
      timezone: 'UTC',
      enabled: true
    }
  )

  const [customCron, setCustomCron] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)

  const predefinedIntervals = [
    { label: '30 секунд', value: 30, description: 'Для критических сервисов' },
    { label: '1 минута', value: 60, description: 'Стандартный интервал' },
    { label: '5 минут', value: 300, description: 'Для обычных сервисов' },
    { label: '15 минут', value: 900, description: 'Для менее критичных' },
    { label: '30 минут', value: 1800, description: 'Для тестовых сервисов' },
    { label: '1 час', value: 3600, description: 'Для стабильных сервисов' }
  ]

  const timezones = [
    'UTC',
    'Europe/Moscow',
    'Europe/London',
    'America/New_York',
    'America/Los_Angeles',
    'Asia/Tokyo',
    'Asia/Shanghai'
  ]

  const cronExamples = [
    { label: 'Каждые 5 минут', value: '*/5 * * * *' },
    { label: 'Каждый час', value: '0 * * * *' },
    { label: 'Каждые 2 часа', value: '0 */2 * * *' },
    { label: 'Рабочие дни 9-18', value: '*/15 9-18 * * 1-5' },
    { label: 'Только ночью', value: '0 */2 * * *' }
  ]

  const handleIntervalChange = (interval: number) => {
    const newSchedule = { ...schedule, interval }
    setSchedule(newSchedule)
    onScheduleChange(newSchedule)
  }

  const handleTimezoneChange = (timezone: string) => {
    const newSchedule = { ...schedule, timezone }
    setSchedule(newSchedule)
    onScheduleChange(newSchedule)
  }

  const handleCronChange = (cronExpression: string) => {
    const newSchedule = { ...schedule, cronExpression }
    setSchedule(newSchedule)
    onScheduleChange(newSchedule)
  }

  const toggleEnabled = () => {
    const newSchedule = { ...schedule, enabled: !schedule.enabled }
    setSchedule(newSchedule)
    onScheduleChange(newSchedule)
  }

  const formatInterval = (seconds: number) => {
    if (seconds < 60) return `${seconds} сек`
    if (seconds < 3600) return `${Math.floor(seconds / 60)} мин`
    return `${Math.floor(seconds / 3600)} ч`
  }

  const getRecommendedInterval = (type: MonitorType) => {
    switch (type) {
      case 'http':
      case 'https':
        return 60
      case 'ping':
        return 30
      case 'ssl':
        return 3600
      case 'dns':
        return 300
      default:
        return 60
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-apple-blue/20 rounded-xl flex items-center justify-center">
            <Clock className="w-5 h-5 text-apple-blue" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Планировщик проверок</h3>
            <p className="text-white/60 text-sm">Настройте частоту и расписание мониторинга</p>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-200"
        >
          <Settings className="w-4 h-4" />
          <span>Настроить</span>
        </motion.button>
      </div>

      {/* Current Schedule Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="apple-card p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {schedule.enabled ? (
              <Play className="w-5 h-5 text-apple-green" />
            ) : (
              <Pause className="w-5 h-5 text-apple-orange" />
            )}
            <div>
              <h4 className="text-white font-medium">
                {schedule.enabled ? 'Активно' : 'Приостановлено'}
              </h4>
              <p className="text-white/60 text-sm">
                {schedule.cronExpression 
                  ? `Cron: ${schedule.cronExpression}`
                  : `Интервал: ${formatInterval(schedule.interval)}`
                }
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-white/60 text-sm">Часовой пояс</div>
            <div className="text-white font-medium">{schedule.timezone}</div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
          <div className="text-center">
            <div className="text-apple-blue font-semibold">
              {schedule.enabled ? '24/7' : 'Отключено'}
            </div>
            <div className="text-white/60 text-sm">Режим</div>
          </div>
          <div className="text-center">
            <div className="text-apple-green font-semibold">
              {schedule.enabled ? Math.floor(86400 / schedule.interval) : 0}
            </div>
            <div className="text-white/60 text-sm">Проверок/день</div>
          </div>
          <div className="text-center">
            <div className="text-apple-purple font-semibold">
              {schedule.enabled ? Math.floor(86400 / schedule.interval * 30) : 0}
            </div>
            <div className="text-white/60 text-sm">Проверок/месяц</div>
          </div>
        </div>
      </motion.div>

      {/* Advanced Settings Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="apple-card p-6 space-y-6"
          >
            {/* Quick Interval Selection */}
            <div>
              <h4 className="text-white font-medium mb-4">Быстрый выбор интервала</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {predefinedIntervals.map((interval) => (
                  <motion.button
                    key={interval.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleIntervalChange(interval.value)}
                    className={`p-4 rounded-xl border transition-all duration-200 text-left ${
                      schedule.interval === interval.value
                        ? 'border-apple-blue bg-apple-blue/20 text-apple-blue'
                        : 'border-white/20 bg-white/5 text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="font-medium">{interval.label}</div>
                    <div className="text-sm opacity-70">{interval.description}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Custom Interval */}
            <div>
              <h4 className="text-white font-medium mb-4">Пользовательский интервал</h4>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  value={schedule.interval}
                  onChange={(e) => handleIntervalChange(parseInt(e.target.value) || 60)}
                  min="10"
                  max="86400"
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-apple-blue"
                  placeholder="Интервал в секундах"
                />
                <div className="text-white/60 text-sm">
                  = {formatInterval(schedule.interval)}
                </div>
              </div>
            </div>

            {/* Timezone Selection */}
            <div>
              <h4 className="text-white font-medium mb-4">Часовой пояс</h4>
              <select
                value={schedule.timezone}
                onChange={(e) => handleTimezoneChange(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-apple-blue"
              >
                {timezones.map((tz) => (
                  <option key={tz} value={tz} className="bg-black">
                    {tz}
                  </option>
                ))}
              </select>
            </div>

            {/* Advanced Cron Settings */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white font-medium">Расширенные настройки Cron</h4>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center space-x-2 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all duration-200"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{showAdvanced ? 'Скрыть' : 'Показать'}</span>
                </motion.button>
              </div>

              <AnimatePresence>
                {showAdvanced && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-white/80 text-sm mb-2">
                        Cron выражение
                      </label>
                      <input
                        type="text"
                        value={schedule.cronExpression || ''}
                        onChange={(e) => handleCronChange(e.target.value)}
                        placeholder="*/5 * * * *"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-apple-blue font-mono"
                      />
                      <p className="text-white/60 text-xs mt-2">
                        Формат: минута час день месяц день_недели
                      </p>
                    </div>

                    <div>
                      <h5 className="text-white/80 text-sm mb-3">Примеры Cron выражений</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {cronExamples.map((example) => (
                          <motion.button
                            key={example.value}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleCronChange(example.value)}
                            className="p-3 rounded-lg border border-white/20 bg-white/5 text-white hover:bg-white/10 transition-all duration-200 text-left"
                          >
                            <div className="font-medium text-sm">{example.label}</div>
                            <div className="text-xs opacity-70 font-mono">{example.value}</div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Enable/Disable Toggle */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div>
                <h4 className="text-white font-medium">Включить мониторинг</h4>
                <p className="text-white/60 text-sm">
                  {schedule.enabled 
                    ? 'Мониторинг активен и будет выполняться по расписанию'
                    : 'Мониторинг приостановлен'
                  }
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleEnabled}
                className={`relative w-16 h-8 rounded-full transition-all duration-200 ${
                  schedule.enabled ? 'bg-apple-green' : 'bg-white/20'
                }`}
              >
                <motion.div
                  animate={{ x: schedule.enabled ? 32 : 4 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                />
              </motion.button>
            </div>

            {/* Recommendations */}
            <div className="bg-apple-blue/10 border border-apple-blue/20 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-apple-blue mt-0.5" />
                <div>
                  <h5 className="text-apple-blue font-medium mb-2">Рекомендации</h5>
                  <ul className="text-white/80 text-sm space-y-1">
                    <li>• Для {monitorType} сервисов рекомендуется интервал {formatInterval(getRecommendedInterval(monitorType))}</li>
                    <li>• Более частые проверки увеличивают нагрузку на сервер</li>
                    <li>• Используйте Cron для сложных расписаний (рабочие часы, выходные)</li>
                    <li>• Учитывайте часовой пояс для корректного планирования</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MonitoringScheduler















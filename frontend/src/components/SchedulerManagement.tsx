import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Play, 
  Pause, 
  Settings, 
  Clock,
  RefreshCw,
  CheckCircle,
  XCircle
} from '../assets/icons'
import { schedulerApi, singleSchedulerApi } from '../services/api'
import { useAuth } from '../contexts/AuthContext'
import { useWebSocket } from '../services/websocket'

interface SchedulerManagementProps {
  isAdmin?: boolean
}

const SchedulerManagement: React.FC<SchedulerManagementProps> = () => {
  const { isAdmin } = useAuth()
  const [schedulerStatus, setSchedulerStatus] = useState<boolean>(false)
  const [singleSchedulerStatus, setSingleSchedulerStatus] = useState<boolean>(false)
  const [scheduledRate, setScheduledRate] = useState<number>(60)
  const [singleScheduledRate, setSingleScheduledRate] = useState<number>(60)
  const [timeout, setTimeout] = useState<number>(5000)
  const [singleTimeout, setSingleTimeout] = useState<number>(5000)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const { subscribe } = useWebSocket()

  // Загрузка настроек планировщика
  const loadSchedulerSettings = async () => {
    setLoading(true)
    setError('')
    try {
      const [statusRes, rateRes, timeoutRes] = await Promise.all([
        schedulerApi.getStatus(),
        schedulerApi.getScheduledRate(),
        schedulerApi.getTimeout()
      ])
      
      setSchedulerStatus(statusRes.message === 'true')
      setScheduledRate(parseInt(rateRes.message))
      setTimeout(parseInt(timeoutRes.message))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки настроек планировщика')
    } finally {
      setLoading(false)
    }
  }

  // Загрузка настроек одиночного планировщика
  const loadSingleSchedulerSettings = async () => {
    setLoading(true)
    setError('')
    try {
      const [statusRes, rateRes, timeoutRes] = await Promise.all([
        singleSchedulerApi.getStatus(),
        singleSchedulerApi.getScheduledRate(),
        singleSchedulerApi.getTimeout()
      ])
      
      setSingleSchedulerStatus(statusRes.message === 'true')
      setSingleScheduledRate(parseInt(rateRes.message))
      setSingleTimeout(parseInt(timeoutRes.message))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки настроек одиночного планировщика')
    } finally {
      setLoading(false)
    }
  }

  // Переключение основного планировщика
  const handleToggleScheduler = async () => {
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      if (schedulerStatus) {
        await schedulerApi.turnOff()
        setSchedulerStatus(false)
        setSuccess('Планировщик остановлен')
      } else {
        await schedulerApi.turnOn()
        setSchedulerStatus(true)
        setSuccess('Планировщик запущен')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка переключения планировщика')
    } finally {
      setLoading(false)
    }
  }

  // Переключение одиночного планировщика
  const handleToggleSingleScheduler = async () => {
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      if (singleSchedulerStatus) {
        await singleSchedulerApi.turnOff()
        setSingleSchedulerStatus(false)
        setSuccess('Одиночный планировщик остановлен')
      } else {
        await singleSchedulerApi.turnOn()
        setSingleSchedulerStatus(true)
        setSuccess('Одиночный планировщик запущен')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка переключения одиночного планировщика')
    } finally {
      setLoading(false)
    }
  }

  // Изменение интервала основного планировщика
  const handleChangeScheduledRate = async () => {
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      await schedulerApi.changeScheduledRate(scheduledRate)
      setSuccess(`Интервал планировщика изменен на ${scheduledRate} секунд`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка изменения интервала')
    } finally {
      setLoading(false)
    }
  }

  // Изменение интервала одиночного планировщика
  const handleChangeSingleScheduledRate = async () => {
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      await singleSchedulerApi.changeScheduledRate(singleScheduledRate)
      setSuccess(`Интервал одиночного планировщика изменен на ${singleScheduledRate} секунд`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка изменения интервала')
    } finally {
      setLoading(false)
    }
  }

  // Изменение таймаута основного планировщика
  const handleChangeTimeout = async () => {
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      await schedulerApi.changeTimeout(timeout)
      setSuccess(`Таймаут изменен на ${timeout} наносекунд`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка изменения таймаута')
    } finally {
      setLoading(false)
    }
  }

  // Изменение таймаута одиночного планировщика
  const handleChangeSingleTimeout = async () => {
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      await singleSchedulerApi.changeTimeout(singleTimeout)
      setSuccess(`Таймаут одиночного планировщика изменен на ${singleTimeout} наносекунд`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка изменения таймаута')
    } finally {
      setLoading(false)
    }
  }

  // Подписка на WebSocket обновления
  useEffect(() => {
    const unsubscribe = subscribe('scheduler-status-update', (data) => {
      if (data.type === 'main-scheduler') {
        setSchedulerStatus(data.status)
      } else if (data.type === 'single-scheduler') {
        setSingleSchedulerStatus(data.status)
      }
    })

    return unsubscribe
  }, [subscribe])

  // Загрузка настроек при монтировании
  useEffect(() => {
    loadSchedulerSettings()
    loadSingleSchedulerSettings()
  }, [])

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Управление планировщиком</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            loadSchedulerSettings()
            loadSingleSchedulerSettings()
          }}
          disabled={loading}
          className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          <span>Обновить</span>
        </motion.button>
      </div>

      {/* Сообщения */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400"
        >
          {error}
        </motion.div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400"
        >
          {success}
        </motion.div>
      )}

      {/* Основной планировщик */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-3xl"
        style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.15)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">Основной планировщик</h3>
          <div className="flex items-center space-x-3">
            {schedulerStatus ? (
              <CheckCircle className="w-6 h-6 text-green-400" />
            ) : (
              <XCircle className="w-6 h-6 text-red-400" />
            )}
            <span className="text-white/80">
              {schedulerStatus ? 'Активен' : 'Остановлен'}
            </span>
          </div>
        </div>

        {isAdmin && (
          <div className="space-y-6">
            {/* Переключатель */}
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleToggleScheduler}
                disabled={loading}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-colors disabled:opacity-50 ${
                  schedulerStatus 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {schedulerStatus ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                <span>{schedulerStatus ? 'Остановить' : 'Запустить'}</span>
              </motion.button>
            </div>

            {/* Настройки */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Интервал */}
              <div className="space-y-3">
                <label className="block text-white/80 text-sm font-medium">Интервал проверки (секунды)</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="number"
                    value={scheduledRate}
                    onChange={(e) => setScheduledRate(parseInt(e.target.value) || 60)}
                    min="1"
                    className="flex-1 px-4 py-2 text-white bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-apple-blue"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleChangeScheduledRate}
                    disabled={loading}
                    className="px-4 py-2 bg-apple-blue text-white rounded-lg hover:bg-apple-blue/80 transition-colors disabled:opacity-50"
                  >
                    <Settings className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Таймаут */}
              <div className="space-y-3">
                <label className="block text-white/80 text-sm font-medium">Таймаут (наносекунды)</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="number"
                    value={timeout}
                    onChange={(e) => setTimeout(parseInt(e.target.value) || 5000)}
                    min="1000"
                    className="flex-1 px-4 py-2 text-white bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-apple-blue"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleChangeTimeout}
                    disabled={loading}
                    className="px-4 py-2 bg-apple-blue text-white rounded-lg hover:bg-apple-blue/80 transition-colors disabled:opacity-50"
                  >
                    <Clock className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Одиночный планировщик */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-8 rounded-3xl"
        style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.15)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">Одиночный планировщик</h3>
          <div className="flex items-center space-x-3">
            {singleSchedulerStatus ? (
              <CheckCircle className="w-6 h-6 text-green-400" />
            ) : (
              <XCircle className="w-6 h-6 text-red-400" />
            )}
            <span className="text-white/80">
              {singleSchedulerStatus ? 'Активен' : 'Остановлен'}
            </span>
          </div>
        </div>

        {isAdmin && (
          <div className="space-y-6">
            {/* Переключатель */}
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleToggleSingleScheduler}
                disabled={loading}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-colors disabled:opacity-50 ${
                  singleSchedulerStatus 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {singleSchedulerStatus ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                <span>{singleSchedulerStatus ? 'Остановить' : 'Запустить'}</span>
              </motion.button>
            </div>

            {/* Настройки */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Интервал */}
              <div className="space-y-3">
                <label className="block text-white/80 text-sm font-medium">Интервал проверки (секунды)</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="number"
                    value={singleScheduledRate}
                    onChange={(e) => setSingleScheduledRate(parseInt(e.target.value) || 60)}
                    min="1"
                    className="flex-1 px-4 py-2 text-white bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-apple-blue"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleChangeSingleScheduledRate}
                    disabled={loading}
                    className="px-4 py-2 bg-apple-blue text-white rounded-lg hover:bg-apple-blue/80 transition-colors disabled:opacity-50"
                  >
                    <Settings className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Таймаут */}
              <div className="space-y-3">
                <label className="block text-white/80 text-sm font-medium">Таймаут (наносекунды)</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="number"
                    value={singleTimeout}
                    onChange={(e) => setSingleTimeout(parseInt(e.target.value) || 5000)}
                    min="1000"
                    className="flex-1 px-4 py-2 text-white bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-apple-blue"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleChangeSingleTimeout}
                    disabled={loading}
                    className="px-4 py-2 bg-apple-blue text-white rounded-lg hover:bg-apple-blue/80 transition-colors disabled:opacity-50"
                  >
                    <Clock className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default SchedulerManagement

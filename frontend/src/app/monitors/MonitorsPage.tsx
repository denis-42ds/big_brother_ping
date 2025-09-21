import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Monitor, 
  Settings, 
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Globe,
  Activity,
  ArrowRight,
  X,
  Plus,
  Edit,
  Trash2
} from '../../assets/icons'
import DynamicBackground from '../../components/DynamicBackground'
import MonitoringScheduler from '../../components/MonitoringScheduler'
import AdvancedMonitor from '../../components/AdvancedMonitor'
import NotificationSystem from '../../components/NotificationSystem'
import { Monitor as MonitorType, MonitorType as MonitorTypeEnum, ScheduleConfig, MonitorSettings, NotificationChannel } from '../../types/monitoring'

// Remove the old interface as we're using the one from types

const MonitorsPage: React.FC = () => {
  const [monitors, setMonitors] = useState<MonitorType[]>([
    {
      id: '1',
      name: 'T1',
      url: 'https://example.com',
      type: 'https',
      status: 'operational',
      schedule: {
        interval: 60,
        timezone: 'UTC',
        enabled: true
      },
      settings: {
        timeout: 30000,
        retries: 3,
        followRedirects: true,
        verifySSL: true,
        method: 'GET'
      },
      metrics: {
        uptime: 99.9,
        responseTime: 45,
        availability: 99.9,
        totalChecks: 1440,
        successfulChecks: 1438,
        failedChecks: 2,
        averageResponseTime: 45,
        maxResponseTime: 120,
        minResponseTime: 25
      },
      lastCheck: new Date(),
      region: 'Москва',
      tags: ['production', 'critical'],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])

  const [selectedMonitor, setSelectedMonitor] = useState<MonitorType | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [notificationChannels, setNotificationChannels] = useState<NotificationChannel[]>([])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'degraded':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />
      case 'outage':
        return <XCircle className="w-5 h-5 text-red-400" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'border-green-400/50 bg-green-400/10'
      case 'degraded':
        return 'border-yellow-400/50 bg-yellow-400/10'
      case 'outage':
        return 'border-red-400/50 bg-red-400/10'
      default:
        return 'border-gray-400/50 bg-gray-400/10'
    }
  }

  const handleScheduleChange = (monitorId: string, schedule: ScheduleConfig) => {
    setMonitors(monitors.map(monitor => 
      monitor.id === monitorId 
        ? { ...monitor, schedule, updatedAt: new Date() }
        : monitor
    ))
  }

  const handleSettingsChange = (monitorId: string, settings: MonitorSettings) => {
    setMonitors(monitors.map(monitor => 
      monitor.id === monitorId 
        ? { ...monitor, settings, updatedAt: new Date() }
        : monitor
    ))
  }

  const handleNotificationChannelsChange = (channels: NotificationChannel[]) => {
    setNotificationChannels(channels)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <DynamicBackground section="monitors" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Monitors</h1>
            <p className="text-white/70">Manage your monitoring endpoints</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-apple-blue text-white rounded-xl font-medium hover:bg-apple-blue/80 transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            <span>Добавить монитор</span>
          </motion.button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Всего мониторов', value: monitors.length, icon: Monitor, color: 'text-apple-blue' },
            { title: 'Работают', value: monitors.filter(m => m.status === 'operational').length, icon: CheckCircle, color: 'text-green-400' },
            { title: 'Проблемы', value: monitors.filter(m => m.status === 'degraded').length, icon: AlertTriangle, color: 'text-yellow-400' },
            { title: 'Недоступны', value: monitors.filter(m => m.status === 'outage').length, icon: XCircle, color: 'text-red-400' }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -2, scale: 1.02 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-white/80">{stat.title}</h3>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Monitors List */}
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-semibold text-white">Все мониторы</h2>
          </div>
          
          <div className="divide-y divide-white/10">
            {monitors.map((monitor, index) => (
              <motion.div
                key={monitor.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-6 hover:bg-white/5 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(monitor.status)}
                    <div>
                      <h3 className="text-lg font-semibold text-white">{monitor.name}</h3>
                      <p className="text-white/60 text-sm">{monitor.url}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-white/60 text-sm">Uptime</p>
                      <p className="text-white font-medium">{monitor.metrics.uptime}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white/60 text-sm">Время отклика</p>
                      <p className="text-white font-medium">{monitor.metrics.responseTime}мс</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white/60 text-sm">Последняя проверка</p>
                      <p className="text-white font-medium">
                        {new Date(monitor.lastCheck).toLocaleTimeString('ru-RU')}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-white/60 text-sm">Регион</p>
                      <p className="text-white font-medium">{monitor.region}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedMonitor(monitor)}
                      className="p-2 text-apple-blue/60 hover:text-apple-blue transition-colors duration-200"
                      title="Настроить"
                    >
                      <Settings className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedMonitor(monitor)}
                      className="p-2 text-apple-green/60 hover:text-apple-green transition-colors duration-200"
                      title="Редактировать"
                    >
                      <Edit className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        if (confirm('Вы уверены, что хотите удалить этот монитор?')) {
                          setMonitors(monitors.filter(m => m.id !== monitor.id))
                        }
                      }}
                      className="p-2 text-red-400/60 hover:text-red-400 transition-colors duration-200"
                      title="Удалить"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Advanced Components */}
        {selectedMonitor && (
          <div className="space-y-8 mt-12">
            {/* Monitoring Scheduler */}
            <MonitoringScheduler
              monitorType={selectedMonitor.type}
              onScheduleChange={(schedule) => handleScheduleChange(selectedMonitor.id, schedule)}
              currentSchedule={selectedMonitor.schedule}
            />

            {/* Advanced Monitor Settings */}
            <AdvancedMonitor
              monitorType={selectedMonitor.type}
              onSettingsChange={(settings) => handleSettingsChange(selectedMonitor.id, settings)}
              currentSettings={selectedMonitor.settings}
            />
          </div>
        )}

        {/* Notification System */}
        <div className="mt-12">
          <NotificationSystem
            onChannelsChange={handleNotificationChannelsChange}
            currentChannels={notificationChannels}
          />
        </div>
      </div>

      {/* Add Monitor Modal */}
      {showAddModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowAddModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="apple-card p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Добавить новый монитор</h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowAddModal(false)}
                className="p-2 text-white/60 hover:text-white transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm mb-2">Название</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-apple-blue"
                  placeholder="Мой веб-сайт"
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm mb-2">URL</label>
                <input
                  type="url"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-apple-blue"
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm mb-2">Тип мониторинга</label>
                <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-apple-blue">
                  <option value="https" className="bg-black">HTTPS</option>
                  <option value="http" className="bg-black">HTTP</option>
                  <option value="ping" className="bg-black">Ping</option>
                  <option value="ssl" className="bg-black">SSL</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 px-4 py-3 bg-apple-blue text-white rounded-xl font-medium hover:bg-apple-blue/80 transition-all duration-200"
              >
                Создать монитор
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddModal(false)}
                className="px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl font-medium hover:bg-white/20 transition-all duration-200"
              >
                Отмена
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default MonitorsPage

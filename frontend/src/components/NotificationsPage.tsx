import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Smartphone, 
  Plus,
  X
} from '../assets/icons'

interface NotificationChannel {
  id: string
  name: string
  type: string
  description: string
  icon: React.ComponentType<any>
  color: string
  configured: boolean
}

interface Monitor {
  id: string
  name: string
  url: string
  status: 'operational' | 'degraded' | 'outage'
}

const NotificationsPage: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null)
  const [selectedMonitors, setSelectedMonitors] = useState<string[]>([])

  // Mock monitors data
  const monitors: Monitor[] = [
    {
      id: '1',
      name: 'api.pingtower.com',
      url: 'https://api.pingtower.com',
      status: 'operational'
    },
    {
      id: '2',
      name: 'app.pingtower.com',
      url: 'https://app.pingtower.com',
      status: 'operational'
    },
    {
      id: '3',
      name: 'status.pingtower.com',
      url: 'https://status.pingtower.com',
      status: 'degraded'
    },
    {
      id: '4',
      name: 'cdn.pingtower.com',
      url: 'https://cdn.pingtower.com',
      status: 'operational'
    }
  ]

  const notificationChannels: NotificationChannel[] = [
    {
      id: 'email',
      name: 'Email',
      type: 'email',
      description: 'Мгновенные уведомления на почту с детальной информацией о проблемах',
      icon: Mail,
      color: 'text-green-400',
      configured: false
    },
    {
      id: 'sms',
      name: 'SMS',
      type: 'sms',
      description: 'Критические уведомления на мобильный телефон в любое время',
      icon: Smartphone,
      color: 'text-blue-400',
      configured: false
    },
    {
      id: 'telegram',
      name: 'Telegram',
      type: 'telegram',
      description: 'Быстрые уведомления в Telegram с возможностью групповых чатов',
      icon: MessageSquare,
      color: 'text-blue-500',
      configured: false
    },
    {
      id: 'discord',
      name: 'Discord',
      type: 'discord',
      description: 'Интеграция с Discord серверами для командной работы',
      icon: MessageSquare,
      color: 'text-indigo-400',
      configured: false
    }
  ]

  const handleChannelClick = (channelId: string) => {
    setSelectedChannel(channelId)
    setSelectedMonitors([]) // Reset selected monitors
    setShowAddModal(true)
  }

  const handleMonitorToggle = (monitorId: string) => {
    setSelectedMonitors(prev => 
      prev.includes(monitorId) 
        ? prev.filter(id => id !== monitorId)
        : [...prev, monitorId]
    )
  }

  const handleSelectAllMonitors = () => {
    setSelectedMonitors(monitors.map(m => m.id))
  }

  const handleDeselectAllMonitors = () => {
    setSelectedMonitors([])
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Уведомления</h1>
        <p className="text-white/70 text-lg">
          Настройте каналы уведомлений для получения алертов о состоянии ваших сервисов
        </p>
      </div>

      {/* No Notifiers Found */}
      <div className="apple-card p-8 text-center">
        <Bell className="w-16 h-16 mx-auto mb-4 text-white/40" />
        <h3 className="text-xl font-semibold text-white mb-2">Каналы уведомлений не настроены</h3>
        <p className="text-white/60">
          Создайте первый канал уведомлений для получения алертов о простоях и проблемах
        </p>
      </div>

      {/* Create New Notifier */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Создать новый канал уведомлений</h2>
        <p className="text-white/70 mb-8">
          Выберите канал для отправки уведомлений о состоянии ваших мониторов. 
          <span className="text-apple-blue cursor-pointer hover:underline ml-1">
            Подробнее
          </span>
        </p>

        {/* Notification Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notificationChannels.map((channel, index) => (
            <motion.div
              key={channel.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleChannelClick(channel.id)}
              className="apple-card p-6 cursor-pointer group hover:border-apple-blue/30 transition-all duration-200"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors duration-200`}>
                  <channel.icon className={`w-6 h-6 ${channel.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white group-hover:text-apple-blue transition-colors duration-200">
                    {channel.name}
                  </h3>
                  <p className="text-sm text-white/60">
                    {channel.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  channel.configured 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-white/10 text-white/60'
                }`}>
                  {channel.configured ? 'Настроено' : 'Не настроено'}
                </span>
                <Plus className="w-4 h-4 text-white/40 group-hover:text-apple-blue transition-colors duration-200" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Add Channel Modal */}
      {showAddModal && selectedChannel && (
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
            className="apple-card p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">
                Настроить {notificationChannels.find(c => c.id === selectedChannel)?.name}
              </h3>
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
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Название канала
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-apple-blue transition-colors duration-200"
                  placeholder="Введите название канала"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  {selectedChannel === 'email' ? 'Email адрес' : 
                   selectedChannel === 'telegram' ? 'Telegram Chat ID' :
                   selectedChannel === 'discord' ? 'Discord Webhook URL' :
                   selectedChannel === 'sms' ? 'Номер телефона' :
                   'Конфигурация'}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-apple-blue transition-colors duration-200"
                  placeholder={
                    selectedChannel === 'email' ? 'example@domain.com' :
                    selectedChannel === 'telegram' ? '@username или Chat ID' :
                    selectedChannel === 'discord' ? 'https://discord.com/api/webhooks/...' :
                    selectedChannel === 'sms' ? '+7 (999) 123-45-67' :
                    'Введите конфигурацию'
                  }
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="enabled"
                  className="w-4 h-4 text-apple-blue bg-white/5 border-white/10 rounded focus:ring-apple-blue focus:ring-2"
                />
                <label htmlFor="enabled" className="text-sm text-white/80">
                  Включить канал уведомлений
                </label>
              </div>

              {/* Monitors Selection */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-white/80">
                    Выберите мониторы для уведомлений
                  </label>
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSelectAllMonitors}
                      className="text-xs px-2 py-1 bg-white/10 text-white/80 rounded hover:bg-white/20 transition-colors duration-200"
                    >
                      Выбрать все
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleDeselectAllMonitors}
                      className="text-xs px-2 py-1 bg-white/10 text-white/80 rounded hover:bg-white/20 transition-colors duration-200"
                    >
                      Снять все
                    </motion.button>
                  </div>
                </div>
                
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {monitors.map((monitor) => (
                    <motion.div
                      key={monitor.id}
                      whileHover={{ scale: 1.01 }}
                      className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                        selectedMonitors.includes(monitor.id)
                          ? 'bg-apple-blue/20 border-apple-blue/30'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                      onClick={() => handleMonitorToggle(monitor.id)}
                    >
                      <input
                        type="checkbox"
                        checked={selectedMonitors.includes(monitor.id)}
                        onChange={() => handleMonitorToggle(monitor.id)}
                        className="w-4 h-4 text-apple-blue bg-white/5 border-white/10 rounded focus:ring-apple-blue focus:ring-2"
                      />
                      <div className={`w-2 h-2 rounded-full ${
                        monitor.status === 'operational' ? 'bg-green-400' :
                        monitor.status === 'degraded' ? 'bg-yellow-400' :
                        'bg-red-400'
                      }`}></div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium text-sm">{monitor.name}</h4>
                        <p className="text-white/60 text-xs">{monitor.url}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {selectedMonitors.length > 0 && (
                  <p className="text-xs text-white/60 mt-2">
                    Выбрано мониторов: {selectedMonitors.length} из {monitors.length}
                  </p>
                )}
              </div>
            </div>

            <div className="flex space-x-3 mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-3 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-all duration-200"
              >
                Отмена
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-3 bg-apple-blue text-white rounded-xl font-medium hover:bg-apple-blue/80 transition-all duration-200"
              >
                Создать
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default NotificationsPage

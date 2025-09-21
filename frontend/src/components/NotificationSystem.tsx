import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Globe, 
  Settings, 
  Plus, 
  Trash2, 
  Edit,
  TestTube,
  CheckCircle,
  AlertTriangle,
  Clock,
  Users,
  Shield,
  Zap,
  ArrowRight,
  X,
  Eye,
  EyeOff
} from '../assets/icons'
import { NotificationChannel, NotificationType, EscalationRule } from '../types/monitoring'

interface NotificationSystemProps {
  onChannelsChange: (channels: NotificationChannel[]) => void
  currentChannels?: NotificationChannel[]
}

const NotificationSystem: React.FC<NotificationSystemProps> = ({
  onChannelsChange,
  currentChannels = []
}) => {
  const [channels, setChannels] = useState<NotificationChannel[]>(currentChannels)
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('channels')
  const [showTestModal, setShowTestModal] = useState(false)
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({})

  const tabs = [
    { id: 'channels', label: 'Каналы', icon: Bell },
    { id: 'escalation', label: 'Эскалация', icon: Zap },
    { id: 'templates', label: 'Шаблоны', icon: MessageSquare },
    { id: 'settings', label: 'Настройки', icon: Settings }
  ]

  const notificationTypes: Array<{
    type: NotificationType
    label: string
    icon: React.ComponentType<any>
    color: string
    description: string
  }> = [
    {
      type: 'email',
      label: 'Email',
      icon: Mail,
      color: 'text-apple-blue',
      description: 'Отправка уведомлений на электронную почту'
    },
    {
      type: 'telegram',
      label: 'Telegram',
      icon: MessageSquare,
      color: 'text-apple-blue',
      description: 'Уведомления через Telegram бота'
    },
    {
      type: 'webhook',
      label: 'Webhook',
      icon: Globe,
      color: 'text-apple-green',
      description: 'HTTP запросы на внешние системы'
    },
    {
      type: 'slack',
      label: 'Slack',
      icon: MessageSquare,
      color: 'text-apple-purple',
      description: 'Интеграция с Slack каналами'
    },
    {
      type: 'discord',
      label: 'Discord',
      icon: MessageSquare,
      color: 'text-apple-blue',
      description: 'Уведомления в Discord серверы'
    },
    {
      type: 'sms',
      label: 'SMS',
      icon: MessageSquare,
      color: 'text-apple-orange',
      description: 'SMS уведомления на мобильные телефоны'
    }
  ]

  const addChannel = (type: NotificationType) => {
    const newChannel: NotificationChannel = {
      id: `channel_${Date.now()}`,
      name: `Новый ${type} канал`,
      type,
      enabled: true,
      settings: {},
      escalationRules: []
    }
    const newChannels = [...channels, newChannel]
    setChannels(newChannels)
    onChannelsChange(newChannels)
  }

  const updateChannel = (id: string, updates: Partial<NotificationChannel>) => {
    const newChannels = channels.map(channel =>
      channel.id === id ? { ...channel, ...updates } : channel
    )
    setChannels(newChannels)
    onChannelsChange(newChannels)
  }

  const deleteChannel = (id: string) => {
    const newChannels = channels.filter(channel => channel.id !== id)
    setChannels(newChannels)
    onChannelsChange(newChannels)
  }

  const testChannel = (channel: NotificationChannel) => {
    setSelectedChannel(channel.id)
    setShowTestModal(true)
  }

  const getChannelIcon = (type: NotificationType) => {
    const channelType = notificationTypes.find(nt => nt.type === type)
    return channelType?.icon || Bell
  }

  const getChannelColor = (type: NotificationType) => {
    const channelType = notificationTypes.find(nt => nt.type === type)
    return channelType?.color || 'text-apple-blue'
  }

  const renderChannelSettings = (channel: NotificationChannel) => {
    switch (channel.type) {
      case 'email':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-white/80 text-sm mb-2">Email адрес</label>
              <input
                type="email"
                value={channel.settings.email || ''}
                onChange={(e) => updateChannel(channel.id, {
                  settings: { ...channel.settings, email: e.target.value }
                })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-apple-blue"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label className="block text-white/80 text-sm mb-2">SMTP сервер (опционально)</label>
              <input
                type="text"
                value={channel.settings.smtpServer || ''}
                onChange={(e) => updateChannel(channel.id, {
                  settings: { ...channel.settings, smtpServer: e.target.value }
                })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-apple-blue"
                placeholder="smtp.example.com"
              />
            </div>
          </div>
        )

      case 'telegram':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-white/80 text-sm mb-2">Bot Token</label>
              <div className="relative">
                <input
                  type={showPassword[`telegram_token_${channel.id}`] ? 'text' : 'password'}
                  value={channel.settings.botToken || ''}
                  onChange={(e) => updateChannel(channel.id, {
                    settings: { ...channel.settings, botToken: e.target.value }
                  })}
                  className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-apple-blue"
                  placeholder="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword({
                    ...showPassword,
                    [`telegram_token_${channel.id}`]: !showPassword[`telegram_token_${channel.id}`]
                  })}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                >
                  {showPassword[`telegram_token_${channel.id}`] ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-white/80 text-sm mb-2">Chat ID</label>
              <input
                type="text"
                value={channel.settings.chatId || ''}
                onChange={(e) => updateChannel(channel.id, {
                  settings: { ...channel.settings, chatId: e.target.value }
                })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-apple-blue"
                placeholder="-1001234567890"
              />
            </div>
          </div>
        )

      case 'webhook':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-white/80 text-sm mb-2">Webhook URL</label>
              <input
                type="url"
                value={channel.settings.webhookUrl || ''}
                onChange={(e) => updateChannel(channel.id, {
                  settings: { ...channel.settings, webhookUrl: e.target.value }
                })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-apple-blue"
                placeholder="https://hooks.slack.com/services/..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white/80 text-sm mb-2">HTTP Метод</label>
                <select
                  value={channel.settings.webhookMethod || 'POST'}
                  onChange={(e) => updateChannel(channel.id, {
                    settings: { ...channel.settings, webhookMethod: e.target.value as 'POST' | 'PUT' }
                  })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-apple-blue"
                >
                  <option value="POST" className="bg-black">POST</option>
                  <option value="PUT" className="bg-black">PUT</option>
                </select>
              </div>
              <div>
                <label className="block text-white/80 text-sm mb-2">Content-Type</label>
                <input
                  type="text"
                  value="application/json"
                  readOnly
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/50"
                />
              </div>
            </div>
          </div>
        )

      case 'slack':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-white/80 text-sm mb-2">Slack Webhook URL</label>
              <input
                type="url"
                value={channel.settings.slackWebhookUrl || ''}
                onChange={(e) => updateChannel(channel.id, {
                  settings: { ...channel.settings, slackWebhookUrl: e.target.value }
                })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-apple-blue"
                placeholder="https://hooks.slack.com/services/..."
              />
            </div>
            <div>
              <label className="block text-white/80 text-sm mb-2">Канал (опционально)</label>
              <input
                type="text"
                value={channel.settings.slackChannel || ''}
                onChange={(e) => updateChannel(channel.id, {
                  settings: { ...channel.settings, slackChannel: e.target.value }
                })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-apple-blue"
                placeholder="#alerts"
              />
            </div>
          </div>
        )

      case 'discord':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-white/80 text-sm mb-2">Discord Webhook URL</label>
              <input
                type="url"
                value={channel.settings.discordWebhookUrl || ''}
                onChange={(e) => updateChannel(channel.id, {
                  settings: { ...channel.settings, discordWebhookUrl: e.target.value }
                })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-apple-blue"
                placeholder="https://discord.com/api/webhooks/..."
              />
            </div>
          </div>
        )

      case 'sms':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-white/80 text-sm mb-2">Номер телефона</label>
              <input
                type="tel"
                value={channel.settings.phoneNumber || ''}
                onChange={(e) => updateChannel(channel.id, {
                  settings: { ...channel.settings, phoneNumber: e.target.value }
                })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-apple-blue"
                placeholder="+7 (999) 123-45-67"
              />
            </div>
            <div>
              <label className="block text-white/80 text-sm mb-2">SMS провайдер</label>
              <select
                value={channel.settings.smsProvider || 'default'}
                onChange={(e) => updateChannel(channel.id, {
                  settings: { ...channel.settings, smsProvider: e.target.value }
                })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-apple-blue"
              >
                <option value="default" className="bg-black">По умолчанию</option>
                <option value="twilio" className="bg-black">Twilio</option>
                <option value="smsc" className="bg-black">SMSC</option>
              </select>
            </div>
          </div>
        )

      default:
        return <div className="text-white/60">Настройки для этого типа канала не поддерживаются</div>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-apple-orange/20 rounded-xl flex items-center justify-center">
            <Bell className="w-5 h-5 text-apple-orange" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Система уведомлений</h3>
            <p className="text-white/60 text-sm">
              Настройте каналы уведомлений и правила эскалации
            </p>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-200"
        >
          <Settings className="w-4 h-4" />
          <span>{isOpen ? 'Скрыть' : 'Настроить'}</span>
        </motion.button>
      </div>

      {/* Current Channels Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="apple-card p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-white font-medium">Активные каналы</h4>
          <div className="flex items-center space-x-2">
            <div className="text-apple-green font-semibold">
              {channels.filter(c => c.enabled).length}
            </div>
            <div className="text-white/60 text-sm">из {channels.length}</div>
          </div>
        </div>

        {channels.length === 0 ? (
          <div className="text-center py-8 text-white/60">
            <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Нет настроенных каналов уведомлений</p>
            <p className="text-sm">Добавьте каналы для получения уведомлений</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {channels.map((channel) => {
              const ChannelIcon = getChannelIcon(channel.type)
              return (
                <motion.div
                  key={channel.id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-xl border transition-all duration-200 ${
                    channel.enabled
                      ? 'border-apple-green/50 bg-apple-green/10'
                      : 'border-white/20 bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <ChannelIcon className={`w-5 h-5 ${getChannelColor(channel.type)}`} />
                      <div>
                        <h5 className="text-white font-medium">{channel.name}</h5>
                        <p className="text-white/60 text-sm capitalize">{channel.type}</p>
                      </div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      channel.enabled ? 'bg-apple-green' : 'bg-white/30'
                    }`} />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => testChannel(channel)}
                      className="p-2 text-apple-blue hover:text-apple-blue/80 transition-colors duration-200"
                    >
                      <TestTube className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateChannel(channel.id, { enabled: !channel.enabled })}
                      className={`p-2 transition-colors duration-200 ${
                        channel.enabled 
                          ? 'text-apple-green hover:text-apple-green/80' 
                          : 'text-white/60 hover:text-white/80'
                      }`}
                    >
                      {channel.enabled ? <CheckCircle className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    </motion.button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </motion.div>

      {/* Advanced Settings Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="apple-card p-6"
          >
            {/* Tab Navigation */}
            <div className="flex space-x-1 mb-6 bg-white/5 rounded-xl p-1">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-apple-orange text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'channels' && (
                <motion.div
                  key="channels"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Add New Channel */}
                  <div>
                    <h4 className="text-white font-medium mb-4">Добавить новый канал</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {notificationTypes.map((type) => (
                        <motion.button
                          key={type.type}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => addChannel(type.type)}
                          className="p-4 rounded-xl border border-white/20 bg-white/5 text-white hover:bg-white/10 transition-all duration-200 text-left"
                        >
                          <div className="flex items-center space-x-3 mb-2">
                            <type.icon className={`w-5 h-5 ${type.color}`} />
                            <span className="font-medium">{type.label}</span>
                          </div>
                          <p className="text-white/60 text-sm">{type.description}</p>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Channel Settings */}
                  {channels.map((channel) => (
                    <motion.div
                      key={channel.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/5 border border-white/10 rounded-xl p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          {React.createElement(getChannelIcon(channel.type), {
                            className: `w-5 h-5 ${getChannelColor(channel.type)}`
                          })}
                          <div>
                            <input
                              type="text"
                              value={channel.name}
                              onChange={(e) => updateChannel(channel.id, { name: e.target.value })}
                              className="text-white font-medium bg-transparent border-none outline-none"
                            />
                            <p className="text-white/60 text-sm capitalize">{channel.type}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => testChannel(channel)}
                            className="p-2 text-apple-blue hover:text-apple-blue/80 transition-colors duration-200"
                            title="Тестировать канал"
                          >
                            <TestTube className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => deleteChannel(channel.id)}
                            className="p-2 text-red-400 hover:text-red-300 transition-colors duration-200"
                            title="Удалить канал"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>

                      {renderChannelSettings(channel)}

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                        <div className="flex items-center space-x-2">
                          <span className="text-white/80 text-sm">Включен</span>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => updateChannel(channel.id, { enabled: !channel.enabled })}
                            className={`relative w-12 h-6 rounded-full transition-all duration-200 ${
                              channel.enabled ? 'bg-apple-green' : 'bg-white/20'
                            }`}
                          >
                            <motion.div
                              animate={{ x: channel.enabled ? 24 : 3 }}
                              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                              className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
                            />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'escalation' && (
                <motion.div
                  key="escalation"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-apple-orange/10 border border-apple-orange/20 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <Zap className="w-5 h-5 text-apple-orange mt-0.5" />
                      <div>
                        <h5 className="text-apple-orange font-medium mb-2">Правила эскалации</h5>
                        <p className="text-white/80 text-sm">
                          Настройте автоматическое повышение приоритета уведомлений при длительных инцидентах
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center py-8 text-white/60">
                    <Zap className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Функция эскалации в разработке</p>
                    <p className="text-sm">Скоро будет доступна настройка правил эскалации</p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'templates' && (
                <motion.div
                  key="templates"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-apple-purple/10 border border-apple-purple/20 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <MessageSquare className="w-5 h-5 text-apple-purple mt-0.5" />
                      <div>
                        <h5 className="text-apple-purple font-medium mb-2">Шаблоны уведомлений</h5>
                        <p className="text-white/80 text-sm">
                          Настройте шаблоны сообщений для разных типов уведомлений
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center py-8 text-white/60">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Шаблоны уведомлений в разработке</p>
                    <p className="text-sm">Скоро будет доступна настройка шаблонов</p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-apple-blue/10 border border-apple-blue/20 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <Settings className="w-5 h-5 text-apple-blue mt-0.5" />
                      <div>
                        <h5 className="text-apple-blue font-medium mb-2">Общие настройки</h5>
                        <p className="text-white/80 text-sm">
                          Настройте общие параметры системы уведомлений
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-medium">Группировка уведомлений</h4>
                        <p className="text-white/60 text-sm">
                          Объединять похожие уведомления в одно сообщение
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative w-16 h-8 rounded-full bg-apple-green transition-all duration-200"
                      >
                        <motion.div
                          animate={{ x: 32 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                        />
                      </motion.button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-medium">Уведомления о восстановлении</h4>
                        <p className="text-white/60 text-sm">
                          Отправлять уведомления когда сервис восстанавливается
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative w-16 h-8 rounded-full bg-apple-green transition-all duration-200"
                      >
                        <motion.div
                          animate={{ x: 32 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                        />
                      </motion.button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-medium">Тихие часы</h4>
                        <p className="text-white/60 text-sm">
                          Не отправлять уведомления в определенное время
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative w-16 h-8 rounded-full bg-white/20 transition-all duration-200"
                      >
                        <motion.div
                          animate={{ x: 4 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                        />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Test Modal */}
      <AnimatePresence>
        {showTestModal && selectedChannel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowTestModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="apple-card p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Тестирование канала</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowTestModal(false)}
                  className="p-2 text-white/60 hover:text-white transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="space-y-4">
                <div className="bg-apple-green/10 border border-apple-green/20 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-apple-green" />
                    <div>
                      <h4 className="text-apple-green font-medium">Тестовое уведомление</h4>
                      <p className="text-white/80 text-sm">
                        Это тестовое сообщение для проверки работы канала уведомлений
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-4 py-3 bg-apple-blue text-white rounded-xl font-medium hover:bg-apple-blue/80 transition-all duration-200"
                  >
                    Отправить тест
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowTestModal(false)}
                    className="px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl font-medium hover:bg-white/20 transition-all duration-200"
                  >
                    Отмена
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default NotificationSystem















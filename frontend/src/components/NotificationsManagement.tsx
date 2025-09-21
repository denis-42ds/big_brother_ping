import React, { useState } from 'react'
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Smartphone, 
  Plus,
  Settings,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  X
} from '../assets/icons'
import { reportsApi, CreateRequestLog } from '../services/api'
import { useAuth } from '../contexts/AuthContext'

interface NotificationChannel {
  id: string
  type: 'email' | 'telegram' | 'sms' | 'discord'
  name: string
  description: string
  isEnabled: boolean
  config: {
    email?: string
    telegramToken?: string
    telegramChatId?: string
    phoneNumber?: string
    discordWebhook?: string
  }
}

interface NotificationsManagementProps {
  isAdmin?: boolean
}

const NotificationsManagement: React.FC<NotificationsManagementProps> = () => {
  const { isAdmin } = useAuth()
  const [channels, setChannels] = useState<NotificationChannel[]>([
    {
      id: '1',
      type: 'email',
      name: 'Email уведомления',
      description: 'Мгновенные уведомления на почту с детальной информацией о проблемах',
      isEnabled: false,
      config: { email: '' }
    },
    {
      id: '2',
      type: 'telegram',
      name: 'Telegram уведомления',
      description: 'Быстрые уведомления в Telegram с возможностью групповых чатов',
      isEnabled: false,
      config: { telegramToken: '', telegramChatId: '' }
    },
    {
      id: '3',
      type: 'sms',
      name: 'SMS уведомления',
      description: 'Критические уведомления на мобильный телефон в любое время',
      isEnabled: false,
      config: { phoneNumber: '' }
    },
    {
      id: '4',
      type: 'discord',
      name: 'Discord уведомления',
      description: 'Интеграция с Discord серверами для командной работы',
      isEnabled: false,
      config: { discordWebhook: '' }
    }
  ])

  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingChannel, setEditingChannel] = useState<NotificationChannel | null>(null)
  const [newChannel, setNewChannel] = useState<Partial<NotificationChannel>>({
    type: 'email',
    name: '',
    description: '',
    config: {}
  })

  // Получение иконки для типа канала
  const getChannelIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="w-8 h-8" />
      case 'telegram':
        return <MessageSquare className="w-8 h-8" />
      case 'sms':
        return <Smartphone className="w-8 h-8" />
      case 'discord':
        return <MessageSquare className="w-8 h-8" />
      default:
        return <Bell className="w-8 h-8" />
    }
  }

  // Получение цвета для типа канала
  const getChannelColor = (type: string) => {
    switch (type) {
      case 'email':
        return 'text-blue-400'
      case 'telegram':
        return 'text-cyan-400'
      case 'sms':
        return 'text-green-400'
      case 'discord':
        return 'text-purple-400'
      default:
        return 'text-gray-400'
    }
  }

  // Переключение состояния канала
  const toggleChannel = (channelId: string) => {
    setChannels(prev => prev.map(channel => 
      channel.id === channelId 
        ? { ...channel, isEnabled: !channel.isEnabled }
        : channel
    ))
  }

  // Редактирование канала
  const handleEditChannel = (channel: NotificationChannel) => {
    setEditingChannel(channel)
    setNewChannel(channel)
    setShowEditModal(true)
  }

  // Сохранение изменений канала
  const handleSaveChannel = async () => {
    if (!editingChannel || !newChannel.name) return

    try {
      // Если это email канал, отправляем тестовый отчет
      if (editingChannel.type === 'email' && newChannel.config?.email) {
        const now = new Date()
        const request: CreateRequestLog = {
          email: newChannel.config.email,
          fromYear: now.getFullYear(),
          fromMonth: now.getMonth() + 1,
          fromDay: now.getDate(),
          fromHour: now.getHours(),
          fromMinute: now.getMinutes(),
          fromSecond: now.getSeconds(),
          toYear: now.getFullYear(),
          toMonth: now.getMonth() + 1,
          toDay: now.getDate(),
          toHour: now.getHours(),
          toMinute: now.getMinutes(),
          toSecond: now.getSeconds()
        }

        await reportsApi.sendAllServers(request, 0, 10)
        console.log('Test email sent successfully')
      }

      // Обновляем канал в списке
      setChannels(prev => prev.map(channel => 
        channel.id === editingChannel.id 
          ? { ...channel, ...newChannel }
          : channel
      ))
      setShowEditModal(false)
      setEditingChannel(null)
      setNewChannel({})
    } catch (error) {
      console.error('Error saving channel:', error)
      alert('Ошибка при сохранении канала. Проверьте настройки.')
    }
  }

  // Удаление канала
  const handleDeleteChannel = (channelId: string) => {
    if (confirm('Вы уверены, что хотите удалить этот канал уведомлений?')) {
      setChannels(prev => prev.filter(channel => channel.id !== channelId))
    }
  }

  // Получение статуса канала
  const getChannelStatus = (channel: NotificationChannel) => {
    if (!channel.isEnabled) return 'Не настроено'
    
    switch (channel.type) {
      case 'email':
        return channel.config.email ? 'Настроено' : 'Не настроено'
      case 'telegram':
        return channel.config.telegramToken && channel.config.telegramChatId ? 'Настроено' : 'Не настроено'
      case 'sms':
        return channel.config.phoneNumber ? 'Настроено' : 'Не настроено'
      case 'discord':
        return channel.config.discordWebhook ? 'Настроено' : 'Не настроено'
      default:
        return 'Не настроено'
    }
  }

  const enabledChannels = channels.filter(channel => channel.isEnabled).length

  return (
    <div className="space-y-8">
      {/* Заголовок */}
      <div>
        <h2 className="text-4xl font-bold text-white mb-2">Уведомления</h2>
        <p className="text-white/60 text-lg">
          Настройте каналы уведомлений для получения алертов о состоянии ваших сервисов
        </p>
      </div>

      {/* Состояние уведомлений */}
      <div className="text-center py-16">
        <Bell className="w-24 h-24 text-white/20 mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-white mb-4">Каналы уведомлений не настроены</h3>
        <p className="text-white/60 text-lg mb-8">
          Создайте первый канал уведомлений для получения алертов о простоях и проблемах
        </p>
      </div>

      {/* Создание нового канала */}
      <div className="p-8 rounded-3xl"
        style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.15)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
        }}
      >
        <h3 className="text-2xl font-bold text-white mb-4">Создать новый канал уведомлений</h3>
        <p className="text-white/60 text-lg mb-6">
          Выберите канал для отправки уведомлений о состоянии ваших мониторов.{' '}
          <a href="#" className="text-apple-blue hover:underline">Подробнее</a>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {channels.map((channel, index) => (
            <div
              key={channel.id}
              className="p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl bg-white/10 ${getChannelColor(channel.type)}`}>
                    {getChannelIcon(channel.type)}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1">{channel.name}</h4>
                    <p className="text-white/60 text-sm">{channel.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-white/60 text-sm">Не настроено</span>
                  <button
                    onClick={() => handleEditChannel(channel)}
                    className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Модальное окно редактирования */}
      {showEditModal && editingChannel && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999]"
          onClick={() => setShowEditModal(false)}
        >
          <div
            className="bg-gray-800 p-8 rounded-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Заголовок с кнопкой закрытия */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">
                Настроить {editingChannel.type === 'telegram' ? 'Telegram' : 
                          editingChannel.type === 'email' ? 'Email' :
                          editingChannel.type === 'sms' ? 'SMS' : 'Discord'}
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Название канала */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Название канала</label>
                <input
                  type="text"
                  value={newChannel.name || ''}
                  onChange={(e) => setNewChannel({ ...newChannel, name: e.target.value })}
                  placeholder="Введите название канала"
                  className="w-full px-4 py-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-apple-blue"
                />
              </div>

              {/* Специфичные поля для каждого типа */}
              {editingChannel.type === 'telegram' && (
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Telegram Chat ID</label>
                  <input
                    type="text"
                    value={newChannel.config?.telegramChatId || ''}
                    onChange={(e) => setNewChannel({
                      ...newChannel,
                      config: { ...newChannel.config, telegramChatId: e.target.value }
                    })}
                    placeholder="@username или Chat ID"
                    className="w-full px-4 py-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-apple-blue"
                  />
                </div>
              )}

              {editingChannel.type === 'email' && (
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Email адрес</label>
                  <input
                    type="email"
                    value={newChannel.config?.email || ''}
                    onChange={(e) => setNewChannel({
                      ...newChannel,
                      config: { ...newChannel.config, email: e.target.value }
                    })}
                    placeholder="example@domain.com"
                    className="w-full px-4 py-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-apple-blue"
                  />
                </div>
              )}

              {editingChannel.type === 'sms' && (
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Номер телефона</label>
                  <input
                    type="tel"
                    value={newChannel.config?.phoneNumber || ''}
                    onChange={(e) => setNewChannel({
                      ...newChannel,
                      config: { ...newChannel.config, phoneNumber: e.target.value }
                    })}
                    placeholder="+7 (999) 123-45-67"
                    className="w-full px-4 py-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-apple-blue"
                  />
                </div>
              )}

              {editingChannel.type === 'discord' && (
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Discord Webhook URL</label>
                  <input
                    type="url"
                    value={newChannel.config?.discordWebhook || ''}
                    onChange={(e) => setNewChannel({
                      ...newChannel,
                      config: { ...newChannel.config, discordWebhook: e.target.value }
                    })}
                    placeholder="https://discord.com/api/webhooks/..."
                    className="w-full px-4 py-3 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-apple-blue"
                  />
                </div>
              )}

              {/* Чекбокс включения канала */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="enableChannel"
                  checked={newChannel.isEnabled || false}
                  onChange={(e) => setNewChannel({ ...newChannel, isEnabled: e.target.checked })}
                  className="w-4 h-4 text-apple-blue bg-gray-600 border-gray-500 rounded focus:ring-apple-blue focus:ring-2"
                />
                <label htmlFor="enableChannel" className="text-white/80 text-sm">
                  Включить канал уведомлений
                </label>
              </div>

              {/* Выбор мониторов */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white/80 text-sm font-medium">Выберите мониторы для уведомлений</h4>
                  <div className="flex items-center space-x-2">
                    <button className="text-apple-blue text-sm hover:underline">Выбрать все</button>
                    <span className="text-white/40">|</span>
                    <button className="text-apple-blue text-sm hover:underline">Снять все</button>
                  </div>
                </div>
                
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {[
                    { name: 'api.pingtower.com', url: 'https://api.pingtower.com', status: 'up' },
                    { name: 'app.pingtower.com', url: 'https://app.pingtower.com', status: 'up' },
                    { name: 'status.pingtower.com', url: 'https://status.pingtower.com', status: 'degraded' }
                  ].map((monitor, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg border border-gray-600">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-apple-blue bg-gray-600 border-gray-500 rounded focus:ring-apple-blue focus:ring-2"
                      />
                      <div className={`w-2 h-2 rounded-full ${
                        monitor.status === 'up' ? 'bg-green-400' : 'bg-yellow-400'
                      }`} />
                      <div className="flex-1">
                        <div className="text-white text-sm font-medium">{monitor.name}</div>
                        <div className="text-white/60 text-xs">{monitor.url}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Кнопки действий */}
            <div className="flex items-center space-x-4 mt-8">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-400 transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={handleSaveChannel}
                className="flex-1 py-3 bg-apple-blue text-white rounded-lg hover:bg-apple-blue/80 transition-colors"
              >
                Создать
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationsManagement

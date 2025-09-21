import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Globe, 
  Shield, 
  Settings, 
  CheckCircle, 
  AlertTriangle,
  XCircle,
  Clock,
  ArrowRight,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  TestTube,
  Lock,
  Unlock,
  Server,
  Database
} from '../assets/icons'
import { MonitorSettings, MonitorType } from '../types/monitoring'

interface AdvancedMonitorProps {
  monitorType: MonitorType
  onSettingsChange: (settings: MonitorSettings) => void
  currentSettings?: MonitorSettings
}

const AdvancedMonitor: React.FC<AdvancedMonitorProps> = ({
  monitorType,
  onSettingsChange,
  currentSettings
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('basic')
  const [showPassword, setShowPassword] = useState(false)
  const [customHeaders, setCustomHeaders] = useState<Array<{key: string, value: string}>>([])

  const [settings, setSettings] = useState<MonitorSettings>(
    currentSettings || {
      timeout: 30000,
      retries: 3,
      followRedirects: true,
      verifySSL: true,
      method: 'GET'
    }
  )

  const tabs = [
    { id: 'basic', label: 'Основные', icon: Settings },
    { id: 'auth', label: 'Аутентификация', icon: Lock },
    { id: 'headers', label: 'Заголовки', icon: Server },
    { id: 'ssl', label: 'SSL/TLS', icon: Shield },
    { id: 'validation', label: 'Валидация', icon: CheckCircle },
    { id: 'advanced', label: 'Дополнительно', icon: Database }
  ]

  const httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS']
  const statusCodes = [200, 201, 202, 204, 301, 302, 304, 400, 401, 403, 404, 500, 502, 503, 504]

  const handleSettingChange = (key: keyof MonitorSettings, value: any) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onSettingsChange(newSettings)
  }

  const addCustomHeader = () => {
    setCustomHeaders([...customHeaders, { key: '', value: '' }])
  }

  const removeCustomHeader = (index: number) => {
    const newHeaders = customHeaders.filter((_, i) => i !== index)
    setCustomHeaders(newHeaders)
    handleSettingChange('headers', Object.fromEntries(
      newHeaders.filter(h => h.key && h.value).map(h => [h.key, h.value])
    ))
  }

  const updateCustomHeader = (index: number, key: string, value: string) => {
    const newHeaders = [...customHeaders]
    newHeaders[index] = { key, value }
    setCustomHeaders(newHeaders)
    handleSettingChange('headers', Object.fromEntries(
      newHeaders.filter(h => h.key && h.value).map(h => [h.key, h.value])
    ))
  }

  const getMonitorTypeIcon = (type: MonitorType) => {
    switch (type) {
      case 'http':
      case 'https':
        return Globe
      case 'ssl':
        return Shield
      case 'ping':
        return Server
      case 'dns':
        return Database
      default:
        return Globe
    }
  }

  const getMonitorTypeColor = (type: MonitorType) => {
    switch (type) {
      case 'https':
      case 'ssl':
        return 'text-apple-green'
      case 'http':
        return 'text-apple-blue'
      case 'ping':
        return 'text-apple-orange'
      case 'dns':
        return 'text-apple-purple'
      default:
        return 'text-apple-blue'
    }
  }

  const MonitorIcon = getMonitorTypeIcon(monitorType)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center`}>
            <MonitorIcon className={`w-5 h-5 ${getMonitorTypeColor(monitorType)}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">
              Расширенные настройки {monitorType.toUpperCase()}
            </h3>
            <p className="text-white/60 text-sm">
              Настройте детальные параметры мониторинга
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

      {/* Current Settings Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="apple-card p-6"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-apple-blue font-semibold">{settings.timeout / 1000}с</div>
            <div className="text-white/60 text-sm">Таймаут</div>
          </div>
          <div className="text-center">
            <div className="text-apple-green font-semibold">{settings.retries}</div>
            <div className="text-white/60 text-sm">Повторы</div>
          </div>
          <div className="text-center">
            <div className="text-apple-purple font-semibold">{settings.method}</div>
            <div className="text-white/60 text-sm">Метод</div>
          </div>
          <div className="text-center">
            <div className="text-apple-orange font-semibold">
              {settings.verifySSL ? 'Да' : 'Нет'}
            </div>
            <div className="text-white/60 text-sm">SSL проверка</div>
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
                      ? 'bg-apple-blue text-white'
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
              {activeTab === 'basic' && (
                <motion.div
                  key="basic"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* HTTP Method */}
                  <div>
                    <label className="block text-white/80 text-sm mb-2">HTTP Метод</label>
                    <select
                      value={settings.method}
                      onChange={(e) => handleSettingChange('method', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-apple-blue"
                    >
                      {httpMethods.map((method) => (
                        <option key={method} value={method} className="bg-black">
                          {method}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Timeout */}
                  <div>
                    <label className="block text-white/80 text-sm mb-2">
                      Таймаут запроса (мс)
                    </label>
                    <input
                      type="number"
                      value={settings.timeout}
                      onChange={(e) => handleSettingChange('timeout', parseInt(e.target.value))}
                      min="1000"
                      max="60000"
                      step="1000"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-apple-blue"
                    />
                    <p className="text-white/60 text-xs mt-2">
                      Рекомендуется: 5-30 секунд
                    </p>
                  </div>

                  {/* Retries */}
                  <div>
                    <label className="block text-white/80 text-sm mb-2">
                      Количество повторов
                    </label>
                    <input
                      type="number"
                      value={settings.retries}
                      onChange={(e) => handleSettingChange('retries', parseInt(e.target.value))}
                      min="0"
                      max="10"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-apple-blue"
                    />
                  </div>

                  {/* Follow Redirects */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Следовать редиректам</h4>
                      <p className="text-white/60 text-sm">
                        Автоматически переходить по редиректам (301, 302)
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSettingChange('followRedirects', !settings.followRedirects)}
                      className={`relative w-16 h-8 rounded-full transition-all duration-200 ${
                        settings.followRedirects ? 'bg-apple-green' : 'bg-white/20'
                      }`}
                    >
                      <motion.div
                        animate={{ x: settings.followRedirects ? 32 : 4 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                      />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'auth' && (
                <motion.div
                  key="auth"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-apple-blue/10 border border-apple-blue/20 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <Lock className="w-5 h-5 text-apple-blue mt-0.5" />
                      <div>
                        <h5 className="text-apple-blue font-medium mb-2">Базовая аутентификация</h5>
                        <p className="text-white/80 text-sm">
                          Настройте логин и пароль для доступа к защищенным ресурсам
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/80 text-sm mb-2">Имя пользователя</label>
                      <input
                        type="text"
                        value={settings.basicAuth?.username || ''}
                        onChange={(e) => handleSettingChange('basicAuth', {
                          ...settings.basicAuth,
                          username: e.target.value
                        })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-apple-blue"
                        placeholder="admin"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm mb-2">Пароль</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={settings.basicAuth?.password || ''}
                          onChange={(e) => handleSettingChange('basicAuth', {
                            ...settings.basicAuth,
                            password: e.target.value
                          })}
                          className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-apple-blue"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'headers' && (
                <motion.div
                  key="headers"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-medium">Пользовательские заголовки</h4>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={addCustomHeader}
                      className="flex items-center space-x-2 px-3 py-2 bg-apple-blue text-white rounded-lg hover:bg-apple-blue/80 transition-all duration-200"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Добавить</span>
                    </motion.button>
                  </div>

                  <div className="space-y-3">
                    {customHeaders.map((header, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <input
                          type="text"
                          value={header.key}
                          onChange={(e) => updateCustomHeader(index, e.target.value, header.value)}
                          placeholder="Заголовок"
                          className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-apple-blue"
                        />
                        <input
                          type="text"
                          value={header.value}
                          onChange={(e) => updateCustomHeader(index, header.key, e.target.value)}
                          placeholder="Значение"
                          className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-apple-blue"
                        />
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeCustomHeader(index)}
                          className="p-3 text-red-400 hover:text-red-300 transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    ))}
                  </div>

                  {customHeaders.length === 0 && (
                    <div className="text-center py-8 text-white/60">
                      <Server className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Нет пользовательских заголовков</p>
                      <p className="text-sm">Добавьте заголовки для настройки запросов</p>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'ssl' && (
                <motion.div
                  key="ssl"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-apple-green/10 border border-apple-green/20 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <Shield className="w-5 h-5 text-apple-green mt-0.5" />
                      <div>
                        <h5 className="text-apple-green font-medium mb-2">SSL/TLS Проверки</h5>
                        <p className="text-white/80 text-sm">
                          Настройте проверку SSL сертификатов и безопасность соединения
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Проверять SSL сертификат</h4>
                      <p className="text-white/60 text-sm">
                        Валидировать SSL сертификат и его срок действия
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSettingChange('verifySSL', !settings.verifySSL)}
                      className={`relative w-16 h-8 rounded-full transition-all duration-200 ${
                        settings.verifySSL ? 'bg-apple-green' : 'bg-white/20'
                      }`}
                    >
                      <motion.div
                        animate={{ x: settings.verifySSL ? 32 : 4 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                      />
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-xl p-4">
                      <h5 className="text-white font-medium mb-2">Проверки SSL</h5>
                      <ul className="text-white/80 text-sm space-y-1">
                        <li>• Валидность сертификата</li>
                        <li>• Срок действия</li>
                        <li>• Цепочка доверия</li>
                        <li>• Алгоритм шифрования</li>
                      </ul>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <h5 className="text-white font-medium mb-2">Мониторинг</h5>
                      <ul className="text-white/80 text-sm space-y-1">
                        <li>• Время до истечения</li>
                        <li>• Издатель сертификата</li>
                        <li>• Версия TLS</li>
                        <li>• Криптографические алгоритмы</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'validation' && (
                <motion.div
                  key="validation"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-apple-purple/10 border border-apple-purple/20 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-apple-purple mt-0.5" />
                      <div>
                        <h5 className="text-apple-purple font-medium mb-2">Валидация ответа</h5>
                        <p className="text-white/80 text-sm">
                          Настройте проверку содержимого и кода ответа
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm mb-2">
                      Ожидаемый код ответа
                    </label>
                    <select
                      value={settings.expectedStatusCode || 200}
                      onChange={(e) => handleSettingChange('expectedStatusCode', parseInt(e.target.value))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-apple-blue"
                    >
                      {statusCodes.map((code) => (
                        <option key={code} value={code} className="bg-black">
                          {code} - {getStatusCodeDescription(code)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm mb-2">
                      Ожидаемое содержимое
                    </label>
                    <textarea
                      value={settings.expectedContent || ''}
                      onChange={(e) => handleSettingChange('expectedContent', e.target.value)}
                      placeholder="Текст или регулярное выражение для проверки в ответе"
                      rows={3}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-apple-blue resize-none"
                    />
                    <p className="text-white/60 text-xs mt-2">
                      Поддерживаются регулярные выражения
                    </p>
                  </div>

                  {(settings.method === 'POST' || settings.method === 'PUT' || settings.method === 'PATCH') && (
                    <div>
                      <label className="block text-white/80 text-sm mb-2">
                        Тело запроса
                      </label>
                      <textarea
                        value={settings.body || ''}
                        onChange={(e) => handleSettingChange('body', e.target.value)}
                        placeholder='{"key": "value"}'
                        rows={4}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-apple-blue resize-none font-mono"
                      />
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'advanced' && (
                <motion.div
                  key="advanced"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-apple-orange/10 border border-apple-orange/20 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <Database className="w-5 h-5 text-apple-orange mt-0.5" />
                      <div>
                        <h5 className="text-apple-orange font-medium mb-2">Дополнительные настройки</h5>
                        <p className="text-white/80 text-sm">
                          Расширенные параметры для точной настройки мониторинга
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h5 className="text-white font-medium">Производительность</h5>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-white/80 text-sm mb-2">
                            Максимальное время DNS lookup (мс)
                          </label>
                          <input
                            type="number"
                            placeholder="5000"
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-apple-blue"
                          />
                        </div>
                        <div>
                          <label className="block text-white/80 text-sm mb-2">
                            Максимальное время подключения (мс)
                          </label>
                          <input
                            type="number"
                            placeholder="10000"
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-apple-blue"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h5 className="text-white font-medium">Мониторинг</h5>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-white/80 text-sm mb-2">
                            Размер буфера ответа (KB)
                          </label>
                          <input
                            type="number"
                            placeholder="1024"
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-apple-blue"
                          />
                        </div>
                        <div>
                          <label className="block text-white/80 text-sm mb-2">
                            Максимальное количество редиректов
                          </label>
                          <input
                            type="number"
                            placeholder="5"
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-apple-blue"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function getStatusCodeDescription(code: number): string {
  const descriptions: Record<number, string> = {
    200: 'OK',
    201: 'Created',
    202: 'Accepted',
    204: 'No Content',
    301: 'Moved Permanently',
    302: 'Found',
    304: 'Not Modified',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout'
  }
  return descriptions[code] || 'Unknown'
}

export default AdvancedMonitor















import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Trash2, 
  RefreshCw,
  Calendar,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock
} from '../assets/icons'
import { serverLogsApi, ServerLog, CreateRequestLog, ServerStatusForLogsDtoPage } from '../services/api'
import { useAuth } from '../contexts/AuthContext'

interface LogsManagementProps {
  isAdmin?: boolean
}

const LogsManagement: React.FC<LogsManagementProps> = () => {
  const { isAdmin } = useAuth()
  const [logs, setLogs] = useState<ServerLog[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'by-name' | 'by-url' | 'by-status'>('all')
  const [searchValue, setSearchValue] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [dateRange, setDateRange] = useState<CreateRequestLog>({
    email: '',
    startDate: '',
    endDate: ''
  })

  // Загрузка логов
  const loadLogs = async (page: number = 0) => {
    if (!dateRange.startDate || !dateRange.endDate) {
      setError('Укажите период для загрузки логов')
      return
    }

    setLoading(true)
    setError('')
    try {
      let response: ServerStatusForLogsDtoPage
      
      switch (filterType) {
        case 'all':
          response = await serverLogsApi.getAllLogs(dateRange, page, pageSize)
          break
        case 'by-name':
          if (!searchValue.trim()) {
            setError('Введите имя сервера')
            return
          }
          response = await serverLogsApi.getLogsByName(searchValue, dateRange, page, pageSize)
          break
        case 'by-url':
          if (!searchValue.trim()) {
            setError('Введите URL сервера')
            return
          }
          response = await serverLogsApi.getLogsByUrl(searchValue, dateRange, page, pageSize)
          break
        case 'by-status':
          if (!searchValue.trim()) {
            setError('Введите статус сервера')
            return
          }
          response = await serverLogsApi.getLogsByStatus(searchValue, dateRange, page, pageSize)
          break
      }

      setLogs(response.content)
      setTotalPages(response.totalPages)
      setCurrentPage(response.number)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки логов')
      setLogs([])
    } finally {
      setLoading(false)
    }
  }

  // Удаление логов
  const handleDeleteLogs = async () => {
    if (!confirm('Вы уверены, что хотите удалить логи за указанный период?')) return

    setLoading(true)
    setError('')
    setSuccess('')
    try {
      await serverLogsApi.deleteLogs(dateRange)
      setSuccess('Логи успешно удалены')
      await loadLogs(currentPage)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка удаления логов')
    } finally {
      setLoading(false)
    }
  }

  // Получение иконки статуса
  const getStatusIcon = (status: string) => {
    switch (status.toUpperCase()) {
      case 'ONLINE':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'OFFLINE':
        return <XCircle className="w-5 h-5 text-red-400" />
      case 'CONNECT_ERROR':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  // Получение цвета статуса
  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'ONLINE':
        return 'border-green-500/20 bg-green-500/5'
      case 'OFFLINE':
        return 'border-red-500/20 bg-red-500/5'
      case 'CONNECT_ERROR':
        return 'border-yellow-500/20 bg-yellow-500/5'
      default:
        return 'border-gray-500/20 bg-gray-500/5'
    }
  }

  // Форматирование даты
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ru-RU')
  }

  // Загрузка логов при изменении фильтра
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      loadLogs(0)
    }
  }, [filterType, dateRange.startDate, dateRange.endDate, pageSize])

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Управление логами</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => loadLogs(currentPage)}
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

      {/* Фильтры */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl"
        style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.15)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
        }}
      >
        <h3 className="text-xl font-bold text-white mb-4">Фильтры и настройки</h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Тип фильтра */}
          <div className="space-y-2">
            <label className="block text-white/80 text-sm font-medium">Тип фильтра</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="w-full px-3 py-2 text-white bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-apple-blue"
            >
              <option value="all">Все логи</option>
              <option value="by-name">По имени</option>
              <option value="by-url">По URL</option>
              <option value="by-status">По статусу</option>
            </select>
          </div>

          {/* Поле поиска */}
          {filterType !== 'all' && (
            <div className="space-y-2">
              <label className="block text-white/80 text-sm font-medium">
                {filterType === 'by-name' && 'Имя сервера'}
                {filterType === 'by-url' && 'URL сервера'}
                {filterType === 'by-status' && 'Статус'}
              </label>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={
                  filterType === 'by-name' ? 'Введите имя сервера' :
                  filterType === 'by-url' ? 'Введите URL' :
                  'ONLINE, OFFLINE, CONNECT_ERROR'
                }
                className="w-full px-3 py-2 text-white bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-apple-blue"
              />
            </div>
          )}

          {/* Размер страницы */}
          <div className="space-y-2">
            <label className="block text-white/80 text-sm font-medium">Размер страницы</label>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(parseInt(e.target.value))}
              className="w-full px-3 py-2 text-white bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-apple-blue"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          {/* Email (для API) */}
          <div className="space-y-2">
            <label className="block text-white/80 text-sm font-medium">Email (обязательно)</label>
            <input
              type="email"
              value={dateRange.email}
              onChange={(e) => setDateRange({ ...dateRange, email: e.target.value })}
              placeholder="example@domain.com"
              className="w-full px-3 py-2 text-white bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-apple-blue"
            />
          </div>
        </div>

        {/* Период */}
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <label className="block text-white/80 text-sm font-medium">Дата начала</label>
            <div className="relative">
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                className="w-full px-3 py-2 pl-10 text-white bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-apple-blue"
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-white/80 text-sm font-medium">Дата окончания</label>
            <div className="relative">
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                className="w-full px-3 py-2 pl-10 text-white bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-apple-blue"
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
            </div>
          </div>
        </div>

        {/* Кнопки */}
        <div className="flex items-center space-x-4 mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => loadLogs(0)}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-apple-blue text-white rounded-lg hover:bg-apple-blue/80 transition-colors disabled:opacity-50"
          >
            <Search className="w-4 h-4" />
            <span>Загрузить</span>
          </motion.button>

          {isAdmin && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDeleteLogs}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
              <span>Удалить логи</span>
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Список логов */}
      <div className="space-y-4">
        {loading && logs.length === 0 ? (
          <div className="text-center py-12">
            <RefreshCw className="w-8 h-8 text-white/40 animate-spin mx-auto mb-4" />
            <p className="text-white/60">Загрузка логов...</p>
          </div>
        ) : logs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/60">Логи не найдены</p>
          </div>
        ) : (
          logs.map((log, index) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-6 rounded-2xl border ${getStatusColor(log.serverStatus)}`}
              style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(20px) saturate(180%)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                {/* Сервер */}
                <div className="md:col-span-2">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(log.serverStatus)}
                    <div>
                      <h4 className="text-lg font-semibold text-white">{log.serverName}</h4>
                      <p className="text-white/60 text-sm">{log.serverUrl}</p>
                    </div>
                  </div>
                </div>

                {/* Статус */}
                <div>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-white text-sm">
                    {log.serverStatus}
                  </span>
                </div>

                {/* Код ответа */}
                <div>
                  <p className="text-white/80 font-medium">{log.responseCode}</p>
                  <p className="text-white/60 text-sm">Код ответа</p>
                </div>

                {/* Время отклика */}
                <div>
                  <p className="text-white/80 font-medium">{log.latency}</p>
                  <p className="text-white/60 text-sm">Время отклика</p>
                </div>

                {/* Время */}
                <div>
                  <p className="text-white/80 font-medium text-sm">{formatDate(log.timestamp)}</p>
                  <p className="text-white/60 text-xs">Время проверки</p>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Пагинация */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => loadLogs(currentPage - 1)}
            disabled={currentPage === 0 || loading}
            className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50"
          >
            Назад
          </motion.button>
          <span className="text-white/60">
            {currentPage + 1} из {totalPages}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => loadLogs(currentPage + 1)}
            disabled={currentPage >= totalPages - 1 || loading}
            className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50"
          >
            Вперед
          </motion.button>
        </div>
      )}
    </div>
  )
}

export default LogsManagement

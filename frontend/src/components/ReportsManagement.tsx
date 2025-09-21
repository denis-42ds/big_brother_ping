import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Send, 
  Mail, 
  Calendar,
  FileText,
  CheckCircle,
  AlertTriangle
} from '../assets/icons'
import { reportsApi, CreateRequestLog } from '../services/api'
import { useAuth } from '../contexts/AuthContext'

interface ReportsManagementProps {
  isAdmin?: boolean
}

const ReportsManagement: React.FC<ReportsManagementProps> = () => {
  const { isAdmin } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [reportType, setReportType] = useState<'all' | 'by-name' | 'by-url' | 'by-status'>('all')
  const [reportData, setReportData] = useState<CreateRequestLog>({
    email: '',
    startDate: '',
    endDate: ''
  })
  const [searchValue, setSearchValue] = useState('')
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)

  // Генерация отчета
  const handleGenerateReport = async () => {
    if (!reportData.email || !reportData.startDate || !reportData.endDate) {
      setError('Заполните все поля')
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      let response
      switch (reportType) {
        case 'all':
          response = await reportsApi.sendAllServers(reportData.email, reportData, page, size)
          break
        case 'by-name':
          if (!searchValue.trim()) {
            setError('Введите имя сервера')
            return
          }
          response = await reportsApi.sendByName(searchValue, reportData.email, reportData, page, size)
          break
        case 'by-url':
          if (!searchValue.trim()) {
            setError('Введите URL сервера')
            return
          }
          response = await reportsApi.sendByUrl(searchValue, reportData.email, reportData, page, size)
          break
        case 'by-status':
          if (!searchValue.trim()) {
            setError('Введите статус сервера')
            return
          }
          response = await reportsApi.sendByStatus(searchValue, reportData.email, reportData, page, size)
          break
      }

      setSuccess(response.message || 'Отчет успешно отправлен на email')
      setReportData({ email: '', startDate: '', endDate: '' })
      setSearchValue('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка генерации отчета')
    } finally {
      setLoading(false)
    }
  }

  // Получение заголовка для типа отчета
  const getReportTypeTitle = () => {
    switch (reportType) {
      case 'all':
        return 'Отчет по всем серверам'
      case 'by-name':
        return 'Отчет по имени сервера'
      case 'by-url':
        return 'Отчет по URL сервера'
      case 'by-status':
        return 'Отчет по статусу сервера'
      default:
        return 'Генерация отчета'
    }
  }

  // Получение placeholder для поля поиска
  const getSearchPlaceholder = () => {
    switch (reportType) {
      case 'by-name':
        return 'Введите имя сервера'
      case 'by-url':
        return 'Введите URL сервера'
      case 'by-status':
        return 'Введите статус (ONLINE, OFFLINE, CONNECT_ERROR)'
      default:
        return ''
    }
  }

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Генерация отчетов</h2>
        <div className="flex items-center space-x-2 text-white/60">
          <FileText className="w-6 h-6" />
          <span>Email отчеты</span>
        </div>
      </div>

      {/* Сообщения */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400"
        >
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        </motion.div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400"
        >
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>{success}</span>
          </div>
        </motion.div>
      )}

      {isAdmin && (
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
          <h3 className="text-2xl font-bold text-white mb-6">{getReportTypeTitle()}</h3>

          <div className="space-y-6">
            {/* Тип отчета */}
            <div className="space-y-3">
              <label className="block text-white/80 text-sm font-medium">Тип отчета</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: 'all', label: 'Все серверы', icon: FileText },
                  { value: 'by-name', label: 'По имени', icon: FileText },
                  { value: 'by-url', label: 'По URL', icon: FileText },
                  { value: 'by-status', label: 'По статусу', icon: FileText }
                ].map((type) => (
                  <motion.button
                    key={type.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setReportType(type.value as any)}
                    className={`p-4 rounded-xl transition-all duration-200 ${
                      reportType === type.value
                        ? 'bg-apple-blue text-white'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    <type.icon className="w-5 h-5 mx-auto mb-2" />
                    <span className="text-sm font-medium">{type.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Поле поиска (если нужно) */}
            {reportType !== 'all' && (
              <div className="space-y-3">
                <label className="block text-white/80 text-sm font-medium">
                  {reportType === 'by-name' && 'Имя сервера'}
                  {reportType === 'by-url' && 'URL сервера'}
                  {reportType === 'by-status' && 'Статус сервера'}
                </label>
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={getSearchPlaceholder()}
                  className="w-full px-4 py-3 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-200"
                />
              </div>
            )}

            {/* Email */}
            <div className="space-y-3">
              <label className="block text-white/80 text-sm font-medium">Email для отправки отчета</label>
              <div className="relative">
                <input
                  type="email"
                  value={reportData.email}
                  onChange={(e) => setReportData({ ...reportData, email: e.target.value })}
                  placeholder="example@domain.com"
                  className="w-full px-4 py-3 pl-12 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-200"
                />
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
              </div>
            </div>

            {/* Период */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="block text-white/80 text-sm font-medium">Дата начала</label>
                <div className="relative">
                  <input
                    type="date"
                    value={reportData.startDate}
                    onChange={(e) => setReportData({ ...reportData, startDate: e.target.value })}
                    className="w-full px-4 py-3 pl-12 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-200"
                  />
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-white/80 text-sm font-medium">Дата окончания</label>
                <div className="relative">
                  <input
                    type="date"
                    value={reportData.endDate}
                    onChange={(e) => setReportData({ ...reportData, endDate: e.target.value })}
                    className="w-full px-4 py-3 pl-12 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-200"
                  />
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                </div>
              </div>
            </div>

            {/* Пагинация */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="block text-white/80 text-sm font-medium">Страница</label>
                <input
                  type="number"
                  value={page}
                  onChange={(e) => setPage(parseInt(e.target.value) || 0)}
                  min="0"
                  className="w-full px-4 py-3 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-200"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-white/80 text-sm font-medium">Размер страницы</label>
                <input
                  type="number"
                  value={size}
                  onChange={(e) => setSize(parseInt(e.target.value) || 10)}
                  min="1"
                  max="100"
                  className="w-full px-4 py-3 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-200"
                />
              </div>
            </div>

            {/* Кнопка генерации */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGenerateReport}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-3 py-4 bg-apple-blue text-white rounded-xl hover:bg-apple-blue/80 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Генерация отчета...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Сгенерировать и отправить отчет</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Информация для не-админов */}
      {!isAdmin && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-3xl text-center"
          style={{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
          }}
        >
          <FileText className="w-16 h-16 text-white/40 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Генерация отчетов</h3>
          <p className="text-white/60">
            Функция генерации отчетов доступна только администраторам
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default ReportsManagement

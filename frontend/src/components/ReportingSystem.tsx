import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BarChart3, 
  FileText, 
  Download, 
  Calendar,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Globe,
  Users,
  Server,
  Database,
  Settings,
  Eye,
  Filter,
  Share,
  Mail,
  Plus,
  Edit,
  Trash2,
  Play,
  Pause
} from '../assets/icons'
import { Report, ReportType, ReportPeriod, Monitor } from '../types/monitoring'

interface ReportingSystemProps {
  monitors: Monitor[]
  onReportGenerate: (report: Omit<Report, 'id' | 'generatedAt' | 'data'>) => void
  existingReports?: Report[]
}

const ReportingSystem: React.FC<ReportingSystemProps> = ({
  monitors,
  onReportGenerate,
  existingReports = []
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('reports')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [newReport, setNewReport] = useState({
    name: '',
    type: 'uptime' as ReportType,
    period: 'monthly' as ReportPeriod,
    monitors: [] as string[],
    metrics: [] as string[]
  })

  const tabs = [
    { id: 'reports', label: 'Отчеты', icon: FileText },
    { id: 'templates', label: 'Шаблоны', icon: BarChart3 },
    { id: 'sla', label: 'SLA', icon: CheckCircle },
    { id: 'analytics', label: 'Аналитика', icon: TrendingUp }
  ]

  const reportTypes: Array<{
    type: ReportType
    label: string
    icon: React.ComponentType<any>
    color: string
    description: string
  }> = [
    {
      type: 'uptime',
      label: 'Доступность',
      icon: CheckCircle,
      color: 'text-apple-green',
      description: 'Отчет по доступности сервисов'
    },
    {
      type: 'performance',
      label: 'Производительность',
      icon: TrendingUp,
      color: 'text-apple-blue',
      description: 'Анализ времени отклика и производительности'
    },
    {
      type: 'incidents',
      label: 'Инциденты',
      icon: AlertTriangle,
      color: 'text-apple-orange',
      description: 'Отчет по инцидентам и простоям'
    },
    {
      type: 'sla',
      label: 'SLA',
      icon: CheckCircle,
      color: 'text-apple-purple',
      description: 'Соответствие SLA требованиям'
    },
    {
      type: 'custom',
      label: 'Пользовательский',
      icon: Settings,
      color: 'text-apple-gray',
      description: 'Настраиваемый отчет'
    }
  ]

  const reportPeriods: Array<{
    period: ReportPeriod
    label: string
    description: string
  }> = [
    { period: 'daily', label: 'Ежедневный', description: 'Отчет за день' },
    { period: 'weekly', label: 'Еженедельный', description: 'Отчет за неделю' },
    { period: 'monthly', label: 'Ежемесячный', description: 'Отчет за месяц' },
    { period: 'quarterly', label: 'Квартальный', description: 'Отчет за квартал' },
    { period: 'yearly', label: 'Годовой', description: 'Отчет за год' }
  ]

  const availableMetrics = [
    { id: 'uptime', label: 'Доступность (%)', icon: CheckCircle },
    { id: 'response_time', label: 'Время отклика (мс)', icon: Clock },
    { id: 'availability', label: 'Доступность (часы)', icon: Globe },
    { id: 'incidents', label: 'Количество инцидентов', icon: AlertTriangle },
    { id: 'downtime', label: 'Время простоя (мин)', icon: XCircle },
    { id: 'checks', label: 'Количество проверок', icon: Server }
  ]

  const generateMockReportData = (type: ReportType) => {
    switch (type) {
      case 'uptime':
        return {
          summary: {
            totalUptime: 99.8,
            averageResponseTime: 45,
            totalIncidents: 2,
            totalDowntime: 28.8,
            slaCompliance: 99.5
          },
          charts: [
            {
              type: 'line' as const,
              title: 'Доступность по дням',
              data: Array.from({ length: 30 }, (_, i) => ({
                date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
                uptime: 99 + Math.random() * 1
              })),
              xAxis: 'date',
              yAxis: 'uptime'
            }
          ],
          tables: [
            {
              title: 'Доступность по сервисам',
              headers: ['Сервис', 'Uptime', 'Инциденты', 'Простой'],
              rows: monitors.map(monitor => [
                monitor.name,
                `${monitor.metrics.uptime}%`,
                Math.floor(Math.random() * 3),
                `${Math.floor(Math.random() * 60)} мин`
              ])
            }
          ]
        }
      case 'performance':
        return {
          summary: {
            totalUptime: 99.8,
            averageResponseTime: 45,
            totalIncidents: 2,
            totalDowntime: 28.8,
            slaCompliance: 99.5
          },
          charts: [
            {
              type: 'bar' as const,
              title: 'Время отклика по сервисам',
              data: monitors.map(monitor => ({
                service: monitor.name,
                responseTime: monitor.metrics.responseTime
              })),
              xAxis: 'service',
              yAxis: 'responseTime'
            }
          ],
          tables: [
            {
              title: 'Производительность',
              headers: ['Сервис', 'Среднее время', 'Максимум', 'Минимум'],
              rows: monitors.map(monitor => [
                monitor.name,
                `${monitor.metrics.responseTime}мс`,
                `${monitor.metrics.maxResponseTime}мс`,
                `${monitor.metrics.minResponseTime}мс`
              ])
            }
          ]
        }
      default:
        return {
          summary: {
            totalUptime: 99.8,
            averageResponseTime: 45,
            totalIncidents: 2,
            totalDowntime: 28.8,
            slaCompliance: 99.5
          },
          charts: [],
          tables: []
        }
    }
  }

  const handleCreateReport = () => {
    const reportData = generateMockReportData(newReport.type)
    const report: Omit<Report, 'id' | 'generatedAt' | 'data'> = {
      name: newReport.name,
      type: newReport.type,
      period: newReport.period,
      monitors: newReport.monitors,
      metrics: newReport.metrics.map(id => ({
        name: availableMetrics.find(m => m.id === id)?.label || id,
        type: id as any,
        aggregation: 'average' as const
      }))
    }
    
    onReportGenerate(report)
    setShowCreateModal(false)
    setNewReport({
      name: '',
      type: 'uptime',
      period: 'monthly',
      monitors: [],
      metrics: []
    })
  }

  const getReportIcon = (type: ReportType) => {
    const reportType = reportTypes.find(rt => rt.type === type)
    return reportType?.icon || FileText
  }

  const getReportColor = (type: ReportType) => {
    const reportType = reportTypes.find(rt => rt.type === type)
    return reportType?.color || 'text-apple-blue'
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-apple-purple/20 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-apple-purple" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Система отчетности</h3>
            <p className="text-white/60 text-sm">
              Создавайте и управляйте отчетами по мониторингу
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-apple-purple text-white rounded-xl font-medium hover:bg-apple-purple/80 transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Создать отчет</span>
          </motion.button>
          
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
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Всего отчетов', value: existingReports.length, icon: FileText, color: 'text-apple-blue' },
          { title: 'SLA соответствие', value: '99.5%', icon: CheckCircle, color: 'text-apple-green' },
          { title: 'Средний uptime', value: '99.8%', icon: TrendingUp, color: 'text-apple-purple' },
          { title: 'Инцидентов за месяц', value: '2', icon: AlertTriangle, color: 'text-apple-orange' }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -2, scale: 1.02 }}
            className="apple-card p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-white/80">{stat.title}</h3>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Reports */}
      <div className="apple-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Последние отчеты</h3>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-white/60" />
            <Settings className="w-4 h-4 text-white/60" />
          </div>
        </div>

        {existingReports.length === 0 ? (
          <div className="text-center py-8 text-white/60">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Нет созданных отчетов</p>
            <p className="text-sm">Создайте первый отчет для анализа данных</p>
          </div>
        ) : (
          <div className="space-y-4">
            {existingReports.slice(0, 5).map((report) => {
              const ReportIcon = getReportIcon(report.type)
              return (
                <motion.div
                  key={report.id}
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <ReportIcon className={`w-6 h-6 ${getReportColor(report.type)}`} />
                    <div>
                      <h4 className="text-white font-medium">{report.name}</h4>
                      <p className="text-white/60 text-sm">
                        {report.type} • {report.period} • {formatDate(report.generatedAt)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedReport(report)}
                      className="p-2 text-apple-blue hover:text-apple-blue/80 transition-colors duration-200"
                      title="Просмотреть"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-apple-green hover:text-apple-green/80 transition-colors duration-200"
                      title="Скачать"
                    >
                      <Download className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-apple-purple hover:text-apple-purple/80 transition-colors duration-200"
                      title="Поделиться"
                    >
                      <Share className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>

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
                      ? 'bg-apple-purple text-white'
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
              {activeTab === 'reports' && (
                <motion.div
                  key="reports"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center py-8 text-white/60">
                    <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Расширенные настройки отчетов</p>
                    <p className="text-sm">Автоматическая генерация, расписание, экспорт</p>
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
                  <div className="text-center py-8 text-white/60">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Шаблоны отчетов в разработке</p>
                    <p className="text-sm">Скоро будут доступны готовые шаблоны</p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'sla' && (
                <motion.div
                  key="sla"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-apple-green/10 border border-apple-green/20 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-apple-green mt-0.5" />
                      <div>
                        <h5 className="text-apple-green font-medium mb-2">SLA Мониторинг</h5>
                        <p className="text-white/80 text-sm">
                          Настройте SLA требования и отслеживайте их соблюдение
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-white font-medium">Текущие SLA</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                          <span className="text-white/80">Доступность</span>
                          <span className="text-apple-green font-medium">99.9%</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                          <span className="text-white/80">Время отклика</span>
                          <span className="text-apple-blue font-medium">&lt; 100мс</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                          <span className="text-white/80">Время восстановления</span>
                          <span className="text-apple-purple font-medium">&lt; 15мин</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-white font-medium">Соответствие SLA</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                          <span className="text-white/80">За месяц</span>
                          <span className="text-apple-green font-medium">99.5%</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                          <span className="text-white/80">За квартал</span>
                          <span className="text-apple-green font-medium">99.7%</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                          <span className="text-white/80">За год</span>
                          <span className="text-apple-green font-medium">99.8%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'analytics' && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center py-8 text-white/60">
                    <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Расширенная аналитика в разработке</p>
                    <p className="text-sm">Скоро будут доступны детальные аналитические инструменты</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Report Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="apple-card p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Создать новый отчет</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 text-white/60 hover:text-white transition-colors duration-200"
                >
                  <XCircle className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="space-y-6">
                {/* Report Name */}
                <div>
                  <label className="block text-white/80 text-sm mb-2">Название отчета</label>
                  <input
                    type="text"
                    value={newReport.name}
                    onChange={(e) => setNewReport({ ...newReport, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-apple-purple"
                    placeholder="Отчет по доступности за месяц"
                  />
                </div>

                {/* Report Type */}
                <div>
                  <label className="block text-white/80 text-sm mb-2">Тип отчета</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {reportTypes.map((type) => (
                      <motion.button
                        key={type.type}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setNewReport({ ...newReport, type: type.type })}
                        className={`p-4 rounded-xl border transition-all duration-200 text-left ${
                          newReport.type === type.type
                            ? 'border-apple-purple bg-apple-purple/20 text-apple-purple'
                            : 'border-white/20 bg-white/5 text-white hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <type.icon className={`w-5 h-5 ${type.color}`} />
                          <span className="font-medium">{type.label}</span>
                        </div>
                        <p className="text-sm opacity-70">{type.description}</p>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Report Period */}
                <div>
                  <label className="block text-white/80 text-sm mb-2">Период</label>
                  <select
                    value={newReport.period}
                    onChange={(e) => setNewReport({ ...newReport, period: e.target.value as ReportPeriod })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-apple-purple"
                  >
                    {reportPeriods.map(period => (
                      <option key={period.period} value={period.period} className="bg-black">
                        {period.label} - {period.description}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Monitors Selection */}
                <div>
                  <label className="block text-white/80 text-sm mb-2">Мониторы</label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {monitors.map((monitor) => (
                      <label key={monitor.id} className="flex items-center space-x-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newReport.monitors.includes(monitor.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewReport({
                                ...newReport,
                                monitors: [...newReport.monitors, monitor.id]
                              })
                            } else {
                              setNewReport({
                                ...newReport,
                                monitors: newReport.monitors.filter(id => id !== monitor.id)
                              })
                            }
                          }}
                          className="w-4 h-4 text-apple-purple bg-white/10 border-white/20 rounded focus:ring-apple-purple"
                        />
                        <span className="text-white">{monitor.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Metrics Selection */}
                <div>
                  <label className="block text-white/80 text-sm mb-2">Метрики</label>
                  <div className="grid grid-cols-2 gap-2">
                    {availableMetrics.map((metric) => (
                      <label key={metric.id} className="flex items-center space-x-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newReport.metrics.includes(metric.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewReport({
                                ...newReport,
                                metrics: [...newReport.metrics, metric.id]
                              })
                            } else {
                              setNewReport({
                                ...newReport,
                                metrics: newReport.metrics.filter(id => id !== metric.id)
                              })
                            }
                          }}
                          className="w-4 h-4 text-apple-purple bg-white/10 border-white/20 rounded focus:ring-apple-purple"
                        />
                        <metric.icon className="w-4 h-4 text-white/60" />
                        <span className="text-white text-sm">{metric.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3 pt-4 border-t border-white/10">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCreateReport}
                    disabled={!newReport.name || newReport.monitors.length === 0}
                    className="flex-1 px-4 py-3 bg-apple-purple text-white rounded-xl font-medium hover:bg-apple-purple/80 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Создать отчет
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowCreateModal(false)}
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

export default ReportingSystem















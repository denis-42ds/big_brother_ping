import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  Activity,
  TrendingUp,
  Globe,
  Bell,
  BarChart3,
  PieChart,
  LineChart,
  RefreshCw,
  Settings,
  Filter,
  Download,
  Eye,
  EyeOff,
  Zap,
  Users,
  Server,
  Database,
  Monitor
} from '../assets/icons'
import { Monitor as MonitorType, CheckResult, Incident, SystemHealth } from '../types/monitoring'

interface EnhancedDashboardProps {
  monitors: MonitorType[]
  checkResults: CheckResult[]
  incidents: Incident[]
  systemHealth: SystemHealth
  onRefresh: () => void
}

const EnhancedDashboard: React.FC<EnhancedDashboardProps> = ({
  monitors,
  checkResults,
  incidents,
  systemHealth,
  onRefresh
}) => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h')
  const [selectedMonitors, setSelectedMonitors] = useState<string[]>([])
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [refreshInterval, setRefreshInterval] = useState(30)
  const [viewMode, setViewMode] = useState<'overview' | 'detailed' | 'analytics'>('overview')

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      if (autoRefresh) {
        onRefresh()
      }
    }, refreshInterval * 1000)
    return () => clearInterval(timer)
  }, [autoRefresh, refreshInterval, onRefresh])

  const timeRanges = [
    { value: '1h', label: '1 час' },
    { value: '24h', label: '24 часа' },
    { value: '7d', label: '7 дней' },
    { value: '30d', label: '30 дней' },
    { value: '90d', label: '90 дней' }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="w-5 h-5 text-apple-green" />
      case 'degraded':
        return <AlertTriangle className="w-5 h-5 text-apple-yellow" />
      case 'outage':
        return <XCircle className="w-5 h-5 text-apple-red" />
      default:
        return <Clock className="w-5 h-5 text-white/40" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'border-apple-green/50 bg-apple-green/10'
      case 'degraded':
        return 'border-apple-yellow/50 bg-apple-yellow/10'
      case 'outage':
        return 'border-apple-red/50 bg-apple-red/10'
      default:
        return 'border-white/20 bg-white/5'
    }
  }

  const getOverallStatus = () => {
    const operational = monitors.filter(m => m.status === 'operational').length
    const total = monitors.length
    
    if (operational === total) return 'operational'
    if (operational > total * 0.8) return 'degraded'
    return 'outage'
  }

  const getUptimeData = () => {
    // Генерируем данные для графика uptime
    const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
    return days.map(day => ({
      day,
      uptime: 95 + Math.random() * 5, // 95-100%
      responseTime: 50 + Math.random() * 100 // 50-150ms
    }))
  }

  const getResponseTimeData = () => {
    // Генерируем данные для графика времени отклика
    const hours = Array.from({ length: 24 }, (_, i) => i)
    return hours.map(hour => ({
      hour: `${hour}:00`,
      responseTime: 30 + Math.random() * 120 + Math.sin(hour / 4) * 20
    }))
  }

  const getIncidentData = () => {
    // Генерируем данные для графика инцидентов
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return {
        date: date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' }),
        incidents: Math.floor(Math.random() * 3)
      }
    }).reverse()
    return last7Days
  }

  const uptimeData = getUptimeData()
  const responseTimeData = getResponseTimeData()
  const incidentData = getIncidentData()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-apple-blue/20 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-apple-blue" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Дашборд мониторинга</h2>
            <p className="text-white/60 text-sm">
              Последнее обновление: {currentTime.toLocaleTimeString('ru-RU')}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Time Range Selector */}
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-apple-blue"
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value} className="bg-black">
                {range.label}
              </option>
            ))}
          </select>

          {/* Auto Refresh Toggle */}
          <div className="flex items-center space-x-2">
            <span className="text-white/80 text-sm">Авто-обновление</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`relative w-12 h-6 rounded-full transition-all duration-200 ${
                autoRefresh ? 'bg-apple-green' : 'bg-white/20'
              }`}
            >
              <motion.div
                animate={{ x: autoRefresh ? 24 : 3 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
              />
            </motion.button>
          </div>

          {/* Refresh Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRefresh}
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-200"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Обновить</span>
          </motion.button>
        </div>
      </div>

      {/* Overall Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`apple-card p-6 border-2 ${getStatusColor(getOverallStatus())}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {getStatusIcon(getOverallStatus())}
            <div>
              <h3 className="text-xl font-semibold text-white">
                {getOverallStatus() === 'operational' ? 'Все системы работают' :
                 getOverallStatus() === 'degraded' ? 'Некоторые проблемы' : 'Критические проблемы'}
              </h3>
              <p className="text-white/70">
                {monitors.filter(m => m.status === 'operational').length} из {monitors.length} сервисов работают
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold text-white">
              {((monitors.filter(m => m.status === 'operational').length / monitors.length) * 100).toFixed(1)}%
            </div>
            <div className="text-white/60 text-sm">Общая доступность</div>
          </div>
        </div>
      </motion.div>

      {/* View Mode Tabs */}
      <div className="flex space-x-1 bg-white/5 rounded-xl p-1">
        {[
          { id: 'overview', label: 'Обзор', icon: Eye },
          { id: 'detailed', label: 'Детально', icon: BarChart3 },
          { id: 'analytics', label: 'Аналитика', icon: TrendingUp }
        ].map((mode) => (
          <motion.button
            key={mode.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setViewMode(mode.id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
              viewMode === mode.id
                ? 'bg-apple-blue text-white'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <mode.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{mode.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Content based on view mode */}
      <AnimatePresence mode="wait">
        {viewMode === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Активных мониторов', value: monitors.length, icon: Activity, color: 'text-apple-blue' },
                { title: 'Средний uptime', value: '99.8%', icon: TrendingUp, color: 'text-apple-green' },
                { title: 'Время отклика', value: '45ms', icon: Clock, color: 'text-apple-purple' },
                { title: 'Активных инцидентов', value: incidents.filter(i => i.status !== 'resolved').length, icon: AlertTriangle, color: 'text-apple-orange' }
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

            {/* Monitors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {monitors.map((monitor, index) => (
                <motion.div
                  key={monitor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className={`apple-card p-6 border ${getStatusColor(monitor.status)}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(monitor.status)}
                      <div>
                        <h4 className="text-white font-semibold">{monitor.name}</h4>
                        <p className="text-white/60 text-sm">{monitor.url}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">{monitor.metrics.uptime}%</div>
                      <div className="text-white/60 text-sm">uptime</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-white/60 text-sm">Время отклика</div>
                      <div className="text-white font-medium">{monitor.metrics.responseTime}ms</div>
                    </div>
                    <div>
                      <div className="text-white/60 text-sm">Последняя проверка</div>
                      <div className="text-white font-medium">
                        {new Date(monitor.lastCheck).toLocaleTimeString('ru-RU')}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {viewMode === 'detailed' && (
          <motion.div
            key="detailed"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Detailed Monitors Table */}
            <div className="apple-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Детальная информация</h3>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-white/60" />
                  <Settings className="w-4 h-4 text-white/60" />
                  <Download className="w-4 h-4 text-white/60" />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-white/80 font-medium">Сервис</th>
                      <th className="text-left py-3 px-4 text-white/80 font-medium">Статус</th>
                      <th className="text-left py-3 px-4 text-white/80 font-medium">Uptime</th>
                      <th className="text-left py-3 px-4 text-white/80 font-medium">Время отклика</th>
                      <th className="text-left py-3 px-4 text-white/80 font-medium">Проверок</th>
                      <th className="text-left py-3 px-4 text-white/80 font-medium">Регион</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monitors.map((monitor) => (
                      <tr key={monitor.id} className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200">
                        <td className="py-4 px-4">
                          <div>
                            <div className="text-white font-medium">{monitor.name}</div>
                            <div className="text-white/60 text-sm">{monitor.url}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(monitor.status)}
                            <span className="text-white capitalize">{monitor.status}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-white font-medium">{monitor.metrics.uptime}%</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-white font-medium">{monitor.metrics.responseTime}ms</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-white font-medium">{monitor.metrics.totalChecks}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-white font-medium">{monitor.region}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {viewMode === 'analytics' && (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Uptime Chart */}
              <div className="apple-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-apple-green" />
                    <span>Доступность за неделю</span>
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {uptimeData.map((data, index) => (
                    <div key={data.day} className="flex items-center space-x-4">
                      <div className="w-12 text-white/80 text-sm">{data.day}</div>
                      <div className="flex-1 bg-white/10 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${data.uptime}%` }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="bg-gradient-to-r from-apple-green to-apple-blue h-2 rounded-full"
                        />
                      </div>
                      <div className="w-16 text-white font-medium text-sm">{data.uptime.toFixed(1)}%</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Response Time Chart */}
              <div className="apple-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-apple-blue" />
                    <span>Время отклика (24ч)</span>
                  </h3>
                </div>
                
                <div className="h-48 flex items-end space-x-1">
                  {responseTimeData.map((data, index) => (
                    <motion.div
                      key={data.hour}
                      initial={{ height: 0 }}
                      animate={{ height: `${(data.responseTime / 200) * 100}%` }}
                      transition={{ duration: 0.5, delay: index * 0.02 }}
                      className="flex-1 bg-gradient-to-t from-apple-blue to-apple-purple rounded-t"
                      title={`${data.hour}: ${data.responseTime.toFixed(0)}ms`}
                    />
                  ))}
                </div>
                
                <div className="flex justify-between text-white/60 text-xs mt-2">
                  <span>00:00</span>
                  <span>12:00</span>
                  <span>24:00</span>
                </div>
              </div>
            </div>

            {/* Incidents Timeline */}
            <div className="apple-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-apple-orange" />
                  <span>Инциденты за последние 7 дней</span>
                </h3>
              </div>
              
              <div className="space-y-3">
                {incidentData.map((data, index) => (
                  <div key={data.date} className="flex items-center space-x-4">
                    <div className="w-16 text-white/80 text-sm">{data.date}</div>
                    <div className="flex-1 flex space-x-1">
                      {Array.from({ length: 3 }, (_, i) => (
                        <div
                          key={i}
                          className={`flex-1 h-2 rounded ${
                            i < data.incidents ? 'bg-apple-red' : 'bg-white/10'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="w-8 text-white font-medium text-sm">{data.incidents}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default EnhancedDashboard

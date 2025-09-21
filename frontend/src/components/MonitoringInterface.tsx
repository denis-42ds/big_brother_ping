import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Clock,
  Globe,
  BarChart3,
  TrendingUp,
  Monitor,
  Bell,
  Settings,
  User,
  Menu,
  ArrowRight,
  LogOut
} from '../assets/icons'
import DynamicBackground from './DynamicBackground'
import ServerManagement from './ServerManagement'
import SchedulerManagement from './SchedulerManagement'
import ReportsManagement from './ReportsManagement'
import LogsManagement from './LogsManagement'
import NotificationsManagement from './NotificationsManagement'
import { useAuth } from '../contexts/AuthContext'

const MonitoringInterface: React.FC = () => {
  const { user, logout, isAdmin } = useAuth()
  const [activeSection, setActiveSection] = useState('overview')
  const [activeTab, setActiveTab] = useState('detailed')

  const monitors = [
    {
      name: 'pingtower.com',
      url: 'https://pingtower.com',
      status: 'operational',
      uptime: '99.9%',
      responseTime: '45ms',
      lastCheck: '09:26:43',
      checks: 1440,
      region: 'Москва'
    },
    {
      name: 'api.pingtower.com',
      url: 'https://api.pingtower.com',
      status: 'operational',
      uptime: '99.8%',
      responseTime: '23ms',
      lastCheck: '09:26:43',
      checks: 2880,
      region: 'Санкт-Петербург'
    },
    {
      name: 'status.pingtower.com',
      url: 'https://status.pingtower.com',
      status: 'degraded',
      uptime: '98.5%',
      responseTime: '120ms',
      lastCheck: '09:26:43',
      checks: 720,
      region: 'Екатеринбург'
    },
    {
      name: 'cdn.pingtower.com',
      url: 'https://cdn.pingtower.com',
      status: 'operational',
      uptime: '99.7%',
      responseTime: '67ms',
      lastCheck: '09:26:43',
      checks: 1440,
      region: 'Новосибирск'
    },
    {
      name: 'test-server-1.com',
      url: 'https://test-server-1.com',
      status: 'offline',
      uptime: '85.2%',
      responseTime: 'timeout',
      lastCheck: '09:25:12',
      checks: 4320,
      region: 'Казань'
    },
    {
      name: 'broken-api.example.com',
      url: 'https://broken-api.example.com',
      status: 'offline',
      uptime: '92.1%',
      responseTime: 'error',
      lastCheck: '09:24:58',
      checks: 2160,
      region: 'Ростов-на-Дону'
    },
    {
      name: 'slow-service.net',
      url: 'https://slow-service.net',
      status: 'degraded',
      uptime: '96.8%',
      responseTime: '2.5s',
      lastCheck: '09:26:15',
      checks: 1800,
      region: 'Владивосток'
    },
    {
      name: 'unstable-app.org',
      url: 'https://unstable-app.org',
      status: 'offline',
      uptime: '78.3%',
      responseTime: 'connection failed',
      lastCheck: '09:23:41',
      checks: 3600,
      region: 'Краснодар'
    }
  ]

  const menuItems = [
    { id: 'overview', label: 'Обзор', icon: BarChart3, adminOnly: false },
    { id: 'monitors', label: 'Мониторы', icon: Monitor, adminOnly: true },
    { id: 'reports', label: 'Отчеты', icon: BarChart3, adminOnly: true },
    { id: 'status-pages', label: 'Страницы статуса', icon: Globe, adminOnly: false },
    { id: 'notifications', label: 'Уведомления', icon: Bell, adminOnly: true },
    { id: 'settings', label: 'Настройки', icon: Settings, adminOnly: true }
  ]

  // Фильтруем меню в зависимости от роли пользователя
  const availableMenuItems = menuItems.filter(item => !item.adminOnly || isAdmin)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'degraded':
        return <AlertTriangle className="w-5 h-5 text-orange-400" />
      case 'offline':
      case 'outage':
        return <XCircle className="w-5 h-5 text-red-400" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'border-green-500/20 bg-green-500/5'
      case 'degraded':
        return 'border-orange-500/20 bg-orange-500/5'
      case 'offline':
      case 'outage':
        return 'border-red-500/20 bg-red-500/5'
      default:
        return 'border-gray-500/20 bg-gray-500/5'
    }
  }

  const stats = {
    total: monitors.length,
    working: monitors.filter(m => m.status === 'operational').length,
    problems: monitors.filter(m => m.status === 'degraded').length,
    unavailable: monitors.filter(m => m.status === 'offline').length
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Dynamic Background */}
      <DynamicBackground section="dashboard" />
      
      <div className="relative z-10 flex h-screen">
        {/* Sidebar */}
        <motion.div 
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-80 flex flex-col"
          style={{
            background: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(20px) saturate(180%)',
            borderRight: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(255, 255, 255, 0.05)'
          }}
        >
          {/* Logo */}
          <div className="p-8 border-b border-white/10">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-apple-blue rounded-xl flex items-center justify-center">
                <Menu className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">PingTower</h1>
                <p className="text-white/60 text-sm">Monitoring Platform</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6">
            <ul className="space-y-3">
              {availableMenuItems.map((item, index) => (
                <li key={item.id}>
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-200 ${
                      activeSection === item.id
                        ? 'bg-apple-blue/20 text-white border border-apple-blue/30'
                        : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                    style={{
                      background: activeSection === item.id 
                        ? 'rgba(0,122,255,0.2)' 
                        : 'rgba(255,255,255,0.05)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: activeSection === item.id 
                        ? '0 4px 16px rgba(0,122,255,0.3), inset 0 1px 0 rgba(255,255,255,0.1)' 
                        : '0 2px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.05)'
                    }}
                  >
                    <item.icon className="w-6 h-6" />
                    <span className="font-medium text-lg">{item.label}</span>
                    {activeSection === item.id && (
                      <ArrowRight className="w-4 h-4 ml-auto" />
                    )}
                  </motion.button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Help Section */}
          <div className="p-6 border-t border-white/10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center"
            >
              <p className="text-white/60 text-sm mb-4">Get Help</p>
            </motion.div>
          </div>

          {/* User Profile */}
          <div className="p-6 border-t border-white/10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="space-y-4"
            >
              {/* User Info */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-apple-blue rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium">{user?.name}</div>
                  <div className="text-white/60 text-sm">{user?.role === 'admin' ? 'Администратор' : 'Пользователь'}</div>
                </div>
              </div>
              
              {/* Logout Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={logout}
                className="w-full flex items-center space-x-3 p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Выйти</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <motion.header 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="p-8 border-b border-white/10"
            style={{
              background: 'rgba(0, 0, 0, 0.2)',
              backdropFilter: 'blur(20px) saturate(180%)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.15)'
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Overview</h1>
                <p className="text-white/60 text-lg">Дашборд мониторинга • Последнее обновление: {new Date().toLocaleTimeString('ru-RU')}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 text-white font-semibold rounded-2xl transition-all duration-200"
                style={{
                  background: 'rgba(0,122,255,0.9)',
                  boxShadow: '0 4px 16px rgba(0,122,255,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                  border: '1px solid rgba(255,255,255,0.15)'
                }}
              >
                Feedback
              </motion.button>
            </div>
            
            {/* Controls */}
            <div className="flex items-center space-x-6 mt-8">
              <select 
                className="px-6 py-3 text-white rounded-2xl transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)'
                }}
              >
                <option>24 часа</option>
              </select>
              <div className="flex items-center space-x-3">
                <span className="text-white/80 text-lg">Авто-обновление</span>
                <div className="w-16 h-8 bg-green-500 rounded-full relative cursor-pointer">
                  <div className="absolute top-1 right-1 w-6 h-6 bg-white rounded-full shadow-lg"></div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-3 px-6 py-3 text-white rounded-2xl transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)'
                }}
              >
                <Clock className="w-5 h-5" />
                <span>Обновить</span>
              </motion.button>
            </div>
          </motion.header>

          {/* Main Content */}
          <main className="flex-1 p-8 overflow-y-auto">
            {activeSection === 'overview' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                {/* Critical Problems Banner */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="p-8 rounded-3xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(239,68,68,0.9) 0%, rgba(220,38,38,0.9) 100%)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    boxShadow: '0 8px 32px rgba(239,68,68,0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <AlertTriangle className="w-8 h-8 text-white" />
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-2">Критические проблемы</h3>
                        <p className="text-red-100 text-lg">3 из 4 сервисов работают</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-5xl font-bold text-white mb-2">75.0%</div>
                      <div className="text-red-100 text-lg">Общая доступность</div>
                    </div>
                  </div>
                </motion.div>

                {/* Tabs */}
                <div className="flex space-x-2 p-2 rounded-2xl" style={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.15)'
                }}>
                  {[
                    { id: 'overview', label: 'Обзор' },
                    { id: 'detailed', label: 'Детально' },
                    { id: 'analytics', label: 'Аналитика' }
                  ].map((tab) => (
                    <motion.button
                      key={tab.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 px-6 py-4 rounded-xl text-lg font-medium transition-all duration-200 ${
                        tab.id === activeTab
                          ? 'text-white'
                          : 'text-white/70 hover:text-white'
                      }`}
                      style={{
                        background: tab.id === activeTab 
                          ? 'rgba(0,122,255,0.8)' 
                          : 'transparent',
                        boxShadow: tab.id === activeTab 
                          ? '0 4px 16px rgba(0,122,255,0.3), inset 0 1px 0 rgba(255,255,255,0.2)' 
                          : 'none'
                      }}
                    >
                      {tab.label}
                    </motion.button>
                  ))}
                </div>

                {/* Content based on active tab */}
                {activeTab === 'overview' && (
                  <>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-4 gap-6">
                      {[
                        { title: 'Активных мониторов', value: '4', icon: BarChart3, color: 'blue' },
                        { title: 'Средний uptime', value: '99.8%', icon: TrendingUp, color: 'green' },
                        { title: 'Время отклика', value: '45ms', icon: Clock, color: 'purple' },
                        { title: 'Активных инцидентов', value: '1', icon: AlertTriangle, color: 'yellow' }
                      ].map((stat, index) => (
                        <motion.div
                          key={stat.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          whileHover={{ scale: 1.05, y: -5 }}
                          className="p-8 rounded-3xl"
                          style={{
                            background: 'rgba(255,255,255,0.05)',
                            backdropFilter: 'blur(20px) saturate(180%)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
                          }}
                        >
                          <div className="flex items-center justify-between mb-6">
                            <h3 className="text-white/80 text-lg font-medium">{stat.title}</h3>
                            <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                          </div>
                          <p className="text-4xl font-bold text-white">{stat.value}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Active Monitors */}
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-8">Активные мониторы</h3>
                      <div className="grid grid-cols-1 gap-6">
                        {monitors.map((monitor, index) => (
                          <motion.div
                            key={monitor.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 + index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -2 }}
                            className="p-8 rounded-3xl"
                            style={{
                              background: 'rgba(255,255,255,0.05)',
                              backdropFilter: 'blur(20px) saturate(180%)',
                              border: `1px solid ${getStatusColor(monitor.status).includes('green') ? 'rgba(34,197,94,0.3)' : 'rgba(245,158,11,0.3)'}`,
                              boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-6">
                                {getStatusIcon(monitor.status)}
                                <div>
                                  <h4 className="text-2xl font-bold text-white mb-2">{monitor.name}</h4>
                                  <p className="text-white/60 text-lg">{monitor.url}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-white mb-2">{monitor.uptime}</div>
                                <div className="text-white/60 text-lg">Время отклика: {monitor.responseTime}</div>
                                <div className="text-white/60 text-lg">Последняя проверка: {monitor.lastCheck}</div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'detailed' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                  >
                    <h3 className="text-3xl font-bold text-white mb-8">Детальная информация</h3>
                    
                    {/* Table */}
                    <div className="rounded-3xl overflow-hidden" style={{
                      background: 'rgba(255,255,255,0.05)',
                      backdropFilter: 'blur(20px) saturate(180%)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
                    }}>
                      {/* Table Header */}
                      <div className="grid grid-cols-6 gap-4 p-6 border-b border-white/10" style={{
                        background: 'rgba(255,255,255,0.05)',
                        backdropFilter: 'blur(10px)'
                      }}>
                        <div className="text-white/80 font-semibold text-lg">Сервис</div>
                        <div className="text-white/80 font-semibold text-lg">Статус</div>
                        <div className="text-white/80 font-semibold text-lg">Uptime</div>
                        <div className="text-white/80 font-semibold text-lg">Время отклика</div>
                        <div className="text-white/80 font-semibold text-lg">Проверок</div>
                        <div className="text-white/80 font-semibold text-lg">Регион</div>
                      </div>

                      {/* Table Rows */}
                      {monitors.map((monitor, index) => (
                        <motion.div
                          key={monitor.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="grid grid-cols-6 gap-4 p-6 border-b border-white/5 hover:bg-white/5 transition-colors"
                        >
                          {/* Service */}
                          <div>
                            <div className="text-white font-semibold text-lg mb-1">{monitor.name}</div>
                            <div className="text-white/60 text-sm">{monitor.url}</div>
                          </div>

                          {/* Status */}
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(monitor.status)}
                            <span className="text-white font-medium">
                              {monitor.status === 'operational' ? 'Operational' : 
                               monitor.status === 'degraded' ? 'Degraded' : 'Offline'}
                            </span>
                          </div>

                          {/* Uptime */}
                          <div className="text-white font-semibold text-lg">{monitor.uptime}</div>

                          {/* Response Time */}
                          <div className="text-white font-semibold text-lg">{monitor.responseTime}</div>

                          {/* Checks */}
                          <div className="text-white font-semibold text-lg">{monitor.checks.toLocaleString()}</div>

                          {/* Region */}
                          <div className="text-white font-semibold text-lg">{monitor.region}</div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'analytics' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                  >
                    <h3 className="text-3xl font-bold text-white mb-8">Аналитика</h3>
                    
                    {/* Analytics Cards Grid */}
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      {/* Availability Chart */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-8 rounded-3xl"
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          backdropFilter: 'blur(20px) saturate(180%)',
                          border: '1px solid rgba(255,255,255,0.15)',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
                        }}
                      >
                        <div className="flex items-center justify-between mb-6">
                          <h4 className="text-xl font-bold text-white">Доступность за неделю</h4>
                          <TrendingUp className="w-5 h-5 text-green-400" />
                        </div>
                        
                        <div className="space-y-4">
                          {[
                            { day: 'Пн', value: 98.4 },
                            { day: 'Вт', value: 99.6 },
                            { day: 'Ср', value: 98.9 },
                            { day: 'Чт', value: 97.2 },
                            { day: 'Пт', value: 97.7 },
                            { day: 'Сб', value: 95.7 },
                            { day: 'Вс', value: 96.6 }
                          ].map((item, index) => (
                            <div key={item.day} className="flex items-center space-x-4">
                              <div className="w-8 text-white/80 font-medium">{item.day}</div>
                              <div className="flex-1">
                                <div className="w-full h-3 rounded-full overflow-hidden" style={{
                                  background: 'rgba(255,255,255,0.1)'
                                }}>
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${item.value}%` }}
                                    transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                                    className="h-full rounded-full"
                                    style={{
                                      background: `linear-gradient(90deg, #10b981 0%, #3b82f6 100%)`
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="w-12 text-white font-semibold text-right">{item.value}%</div>
                            </div>
                          ))}
                        </div>
                      </motion.div>

                      {/* Response Time Chart */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="p-8 rounded-3xl"
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          backdropFilter: 'blur(20px) saturate(180%)',
                          border: '1px solid rgba(255,255,255,0.15)',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
                        }}
                      >
                        <div className="flex items-center justify-between mb-6">
                          <h4 className="text-xl font-bold text-white">Время отклика (24ч)</h4>
                          <Clock className="w-5 h-5 text-purple-400" />
                        </div>
                        
                        <div className="h-48 flex items-end justify-between space-x-1">
                          {Array.from({ length: 24 }, (_, i) => {
                            const height = Math.random() * 80 + 20; // Random height between 20-100
                            return (
                              <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${height}%` }}
                                transition={{ delay: 0.6 + i * 0.02, duration: 0.5 }}
                                className="flex-1 rounded-t"
                                style={{
                                  background: `linear-gradient(to top, #8b5cf6 0%, #3b82f6 100%)`,
                                  minHeight: '4px'
                                }}
                              />
                            );
                          })}
                        </div>
                        
                        <div className="flex justify-between mt-4 text-white/60 text-sm">
                          <span>00:00</span>
                          <span>12:00</span>
                          <span>24:00</span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Incidents Chart */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="p-8 rounded-3xl"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        backdropFilter: 'blur(20px) saturate(180%)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
                      }}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-xl font-bold text-white">Инциденты за последние 7 дней</h4>
                        <AlertTriangle className="w-5 h-5 text-yellow-400" />
                      </div>
                      
                      <div className="space-y-4">
                        {[
                          { date: '14.09', incidents: 1 },
                          { date: '15.09', incidents: 1 },
                          { date: '16.09', incidents: 1 },
                          { date: '17.09', incidents: 2 },
                          { date: '18.09', incidents: 1 },
                          { date: '19.09', incidents: 2 },
                          { date: '20.09', incidents: 0 }
                        ].map((item, index) => (
                          <div key={item.date} className="flex items-center space-x-4">
                            <div className="w-16 text-white/80 font-medium">{item.date}</div>
                            <div className="flex-1 flex items-center space-x-2">
                              {item.incidents > 0 ? (
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(item.incidents / 2) * 100}%` }}
                                  transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                                  className="h-4 rounded-full bg-red-500"
                                />
                              ) : (
                                <div className="h-4 w-0 rounded-full bg-red-500" />
                              )}
                              <span className="text-white/60 text-sm">
                                {item.incidents > 0 ? `${item.incidents} инцидент${item.incidents > 1 ? 'а' : ''}` : 'Нет инцидентов'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeSection === 'monitors' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <ServerManagement isAdmin={true} />
              </motion.div>
            )}

            {activeSection === 'reports' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <ReportsManagement isAdmin={true} />
              </motion.div>
            )}

            {activeSection === 'status-pages' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <LogsManagement isAdmin={true} />
              </motion.div>
            )}

            {activeSection === 'notifications' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <NotificationsManagement isAdmin={true} />
              </motion.div>
            )}

            {activeSection === 'settings' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <SchedulerManagement isAdmin={true} />
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default MonitoringInterface

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  Activity,
  TrendingUp,
  Globe,
  Bell
} from '../assets/icons'
import DynamicBackground from './DynamicBackground'

const Dashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const monitors = [
    {
      name: 'pingtower.com',
      status: 'operational',
      uptime: '99.9%',
      responseTime: '45ms',
      lastCheck: '2 секунды назад',
      region: 'Москва'
    },
    {
      name: 'api.pingtower.com',
      status: 'operational',
      uptime: '99.8%',
      responseTime: '23ms',
      lastCheck: '1 секунда назад',
      region: 'Санкт-Петербург'
    },
    {
      name: 'status.pingtower.com',
      status: 'degraded',
      uptime: '98.5%',
      responseTime: '120ms',
      lastCheck: '3 секунды назад',
      region: 'Екатеринбург'
    },
    {
      name: 'cdn.pingtower.com',
      status: 'operational',
      uptime: '99.7%',
      responseTime: '67ms',
      lastCheck: '1 секунда назад',
      region: 'Новосибирск'
    }
  ]

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

  const uptimeData = [
    { day: 'Пн', uptime: 100 },
    { day: 'Вт', uptime: 99.9 },
    { day: 'Ср', uptime: 99.8 },
    { day: 'Чт', uptime: 99.9 },
    { day: 'Пт', uptime: 99.7 },
    { day: 'Сб', uptime: 100 },
    { day: 'Вс', uptime: 99.9 }
  ]

  return (
    <section className="py-20 relative">
      <DynamicBackground section="dashboard" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Аналитика</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Интерактивный дашборд с цветовой индикацией, графиками доступности, временем отклика и детальной аналитикой в режиме реального времени
          </p>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-card p-8 rounded-3xl mb-12"
        >
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Общий статус</h3>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-medium">Все системы работают</span>
              </div>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <div className="text-sm text-white/60">Последнее обновление</div>
              <div className="text-white font-medium">
                {currentTime.toLocaleTimeString('ru-RU')}
              </div>
            </div>
          </div>

          {/* Monitors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {monitors.map((monitor) => (
              <motion.div
                key={monitor.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className={`glass-card p-6 rounded-2xl border ${getStatusColor(monitor.status)}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(monitor.status)}
                    <div>
                      <h4 className="text-white font-semibold">{monitor.name}</h4>
                      <p className="text-white/60 text-sm">{monitor.region}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-medium">{monitor.uptime}</div>
                    <div className="text-white/60 text-sm">uptime</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-white/60 text-sm">Время отклика</div>
                    <div className="text-white font-medium">{monitor.responseTime}</div>
                  </div>
                  <div>
                    <div className="text-white/60 text-sm">Последняя проверка</div>
                    <div className="text-white font-medium">{monitor.lastCheck}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Uptime Chart */}
          <div className="apple-card p-8 rounded-3xl">
            <h4 className="text-white font-semibold mb-8 flex items-center space-x-3">
              <TrendingUp className="w-6 h-6 text-apple-blue" />
              <span className="text-xl">Доступность за неделю</span>
            </h4>
            
            {/* Modern Chart with Circular Progress */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
              {uptimeData.map((data) => (
                <motion.div
                  key={data.day}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex flex-col items-center space-y-3 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-100 cursor-pointer group"
                >
                  {/* Circular Progress */}
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-white/20"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <motion.path
                        className="text-apple-blue"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: data.uptime / 100 }}
                        transition={{ duration: 0.5, delay: 0 }}
                        viewport={{ once: true }}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{data.uptime}%</span>
                    </div>
                  </div>
                  
                  {/* Day Label */}
                  <div className="text-center">
                    <div className="text-white/80 font-medium text-sm">{data.day}</div>
                    <div className="text-white/50 text-xs mt-1">
                      {data.uptime >= 99.9 ? 'Отлично' : data.uptime >= 99.5 ? 'Хорошо' : 'Требует внимания'}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div className="text-center">
                <div className="text-2xl font-bold text-apple-green mb-1">99.8%</div>
                <div className="text-white/60 text-sm">Средняя доступность</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-apple-blue mb-1">7</div>
                <div className="text-white/60 text-sm">Дней мониторинга</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-apple-yellow mb-1">0</div>
                <div className="text-white/60 text-sm">Инцидентов</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Activity,
              title: 'Мониторинг 24/7',
              description: 'Непрерывное отслеживание с Cron-подобным планировщиком и гибкими интервалами проверок',
              color: 'text-apple-green'
            },
            {
              icon: Globe,
              title: 'Множественные каналы',
              description: 'Уведомления через email, Telegram, webhooks, Slack, Discord и SMS с правилами эскалации',
              color: 'text-apple-yellow'
            },
            {
              icon: Bell,
              title: 'SLA отчеты',
              description: 'Детальные отчеты по доступности, производительности и соответствию SLA требованиям',
              color: 'text-apple-purple'
            }
          ].map((feature) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -12, scale: 1.08, rotateY: 5 }}
              className="glass-card p-6 text-center group cursor-pointer"
            >
              <motion.div 
                className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                whileHover={{ scale: 1.3, rotate: 10 }}
                transition={{ duration: 0.05, ease: "easeOut" }}
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.05 }}
                >
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </motion.div>
              </motion.div>
              <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
              <p className="text-white/70 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Dashboard

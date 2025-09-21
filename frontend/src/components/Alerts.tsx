import React from 'react'
import { motion } from 'framer-motion'
import { 
  Bell, 
  Clock, 
  AlertTriangle,
  Smartphone,
  Mail,
  MessageSquare,
  Telegram
} from '../assets/icons'
import DynamicBackground from './DynamicBackground'

const Alerts: React.FC = () => {
  const alertingFeatures = [
    {
      icon: Bell,
      title: 'Получайте уведомления',
      description: 'Получайте уведомления по Email, SMS, Slack или Discord, чтобы всегда быть в курсе до того, как узнают ваши пользователи.',
      color: 'text-apple-orange'
    },
    {
      icon: Clock,
      title: 'Знайте активность',
      description: 'Получите полную видимость: все восстановления, инциденты и уведомления в одной временной шкале.',
      color: 'text-apple-green'
    },
    {
      icon: AlertTriangle,
      title: 'Эскалация',
      description: 'Уведомляйте и эскалируйте предупреждения нужному члену команды.',
      color: 'text-apple-red'
    }
  ]

  const notificationMethods = [
    { 
      icon: Mail, 
      name: 'Email', 
      color: 'text-green-400',
      description: 'Мгновенные уведомления на почту с детальной информацией о проблемах'
    },
    { 
      icon: Smartphone, 
      name: 'SMS', 
      color: 'text-blue-400',
      description: 'Критические уведомления на мобильный телефон в любое время'
    },
    { 
      icon: Telegram, 
      name: 'Telegram', 
      color: 'text-blue-500',
      description: 'Быстрые уведомления в Telegram с возможностью групповых чатов'
    },
    { 
      icon: MessageSquare, 
      name: 'Discord', 
      color: 'text-indigo-400',
      description: 'Интеграция с Discord серверами для командной работы'
    }
  ]

  return (
    <section className="py-20 relative">
      <DynamicBackground section="alerts" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Уведомления</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
            Узнайте, как ваши сервисы работают со временем, и уведомите ваших пользователей о любых проблемах.
          </p>
        </motion.div>

        {/* Alerting Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {alertingFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -12, scale: 1.08, rotateY: 5 }}
              className="apple-card p-8 group cursor-pointer"
            >
              <motion.div 
                className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center mb-6"
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

        {/* Notification Methods */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="apple-card p-8 rounded-3xl"
        >
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">Способы уведомлений</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {notificationMethods.map((method, index) => (
              <motion.div
                key={method.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -8 }}
                className="flex items-center space-x-4 p-6 rounded-xl hover:bg-white/5 transition-colors duration-100 cursor-pointer"
              >
                <motion.div
                  whileHover={{ scale: 1.3, rotate: 10 }}
                  transition={{ duration: 0.05, ease: "easeOut" }}
                  className="flex-shrink-0"
                >
                  <method.icon className={`w-10 h-10 ${method.color}`} />
                </motion.div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold text-lg mb-2">{method.name}</h4>
                  <p className="text-white/70 text-sm leading-relaxed">{method.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="apple-button text-lg px-8 py-4"
          >
            Начать бесплатно
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Alerts

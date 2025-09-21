import React from 'react'
import { motion } from 'framer-motion'
import { 
  Monitor, 
  BarChart3, 
  Globe
} from '../assets/icons'
import AnimatedSection from './AnimatedSection'
import DynamicBackground from './DynamicBackground'

const Features: React.FC = () => {
  const monitoringFeatures = [
    {
      icon: Globe,
      title: 'Cron-подобный планировщик',
      description: 'Гибкие расписания мониторинга с поддержкой Cron выражений для сложных сценариев проверок.',
      color: 'text-apple-blue'
    },
    {
      icon: Monitor,
      title: 'Расширенный мониторинг',
      description: 'HTTP/HTTPS запросы, SSL сертификаты, API endpoints, валидация JSON/XML ответов и многое другое.',
      color: 'text-apple-yellow'
    },
    {
      icon: BarChart3,
      title: 'PostgreSQL + ClickHouse',
      description: 'Высокопроизводительное хранение данных с PostgreSQL для структурированных данных и ClickHouse для аналитики.',
      color: 'text-apple-purple'
    }
  ]


  return (
    <section className="py-20 relative">
      <DynamicBackground section="features" />
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
            <span className="text-gradient">Мониторинг</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Мощная система мониторинга с планировщиком проверок, множественными каналами уведомлений и детальной аналитикой для обеспечения непрерывной работы ваших сервисов.
          </p>
        </motion.div>

        {/* Monitoring Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {monitoringFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -8, 
                scale: 1.03, 
                rotateY: 2,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              className="glass-card p-8 group cursor-pointer"
            >
              <motion.div 
                className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center mb-6"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </motion.div>
              </motion.div>
              <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
              <p className="text-white/70 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>


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

export default Features

import React from 'react'
import { motion } from 'framer-motion'
import { Activity, Globe, Clock, Users } from '../assets/icons'
import AnimatedSection from './AnimatedSection'
import DynamicBackground from './DynamicBackground'

const Stats: React.FC = () => {
  const stats = [
    {
      icon: Activity,
      value: '26M',
      label: 'Еженедельных проверок',
      color: 'text-apple-blue'
    },
    {
      icon: Clock,
      value: '155K',
      label: 'Проверок за последний час',
      color: 'text-apple-yellow'
    },
    {
      icon: Globe,
      value: '3400+',
      label: 'Активных мониторов',
      color: 'text-apple-purple'
    },
    {
      icon: Users,
      value: '99.9%',
      label: 'Время работы',
      color: 'text-apple-green'
    }
  ]

  return (
    <section className="py-20 relative">
      <DynamicBackground section="stats" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Надёжность в цифрах</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Тысячи компаний доверяют PingTower для мониторинга своих критически важных сервисов
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -5, 
                scale: 1.03,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              className="apple-card p-8 text-center group cursor-pointer"
            >
              <motion.div 
                className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </motion.div>
              </motion.div>
              <motion.div 
                className="text-3xl md:text-4xl font-bold text-white mb-2"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.05, ease: "easeOut" }}
              >
                {stat.value}
              </motion.div>
              <motion.div 
                className="text-white/70 text-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.05, ease: "easeOut" }}
              >
                {stat.label}
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Stats

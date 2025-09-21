import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Globe, CheckCircle, Activity, Clock } from '../assets/icons'
import AnimatedSection from './AnimatedSection'
import ParallaxSection from './ParallaxSection'
import DynamicBackground from './DynamicBackground'
import RegisterModal from './RegisterModal'

const Hero: React.FC = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  
  const features = [
    'Cron-подобный планировщик',
    'HTTP/HTTPS/SSL мониторинг',
    'Множественные уведомления',
    'SLA отчеты и аналитика'
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Dynamic Background */}
      <DynamicBackground section="hero" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Content */}
        <AnimatedSection delay={0.2} className="mb-12">
          <h1 className="apple-text-large mb-8">
            <span className="text-gradient">PingTower</span>
            <br />
            <span className="text-white">Мониторинг без границ</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
            Комплексная система мониторинга веб-сервисов с мощным планировщиком проверок, 
            детальной аналитикой и гибкой системой уведомлений для обеспечения непрерывной работы ваших сервисов.
          </p>
        </AnimatedSection>

        {/* Features List with Apple-style badges */}
        <AnimatedSection delay={0.6} className="mb-16">
          <div className="flex flex-wrap justify-center gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.1, 
                  delay: 0.8 + index * 0.1,
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -2, 
                  rotate: 1,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-2 apple-card px-6 py-3 rounded-full cursor-pointer"
              >
                <CheckCircle className="w-4 h-4 text-apple-green" />
                <span className="text-sm text-white/80 font-medium">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* CTA Buttons in Apple style */}
        <AnimatedSection delay={1} className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
          <motion.button
            onClick={() => setIsRegisterModalOpen(true)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="apple-button text-lg px-8 py-4 flex items-center space-x-2"
          >
            <span>Начать мониторинг</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>

        </AnimatedSection>

        {/* Stats Preview with Apple-style cards */}
        <AnimatedSection delay={1.2} className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Activity, value: '99.9%', label: 'Время работы', color: 'text-apple-green' },
              { icon: Globe, value: '24/7', label: 'Мониторинг', color: 'text-apple-blue' },
              { icon: Clock, value: '< 1мин', label: 'Время реакции', color: 'text-apple-purple' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.1, 
                  delay: 1.4 + index * 0.1,
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
                whileHover={{ 
                  y: -3, 
                  scale: 1.02,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.99 }}
                className="apple-card p-8 text-center cursor-pointer"
              >
                <stat.icon className={`w-12 h-12 ${stat.color} mx-auto mb-4`} />
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/60 text-sm font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>

      {/* Magical Floating Elements with fixed trajectories */}
      <ParallaxSection speed={0.3}>
        <motion.div
          animate={{ 
            x: [0, 30, -20, 0],
            y: [0, -15, 25, 0],
            rotate: [0, 180, 360, 0],
            scale: [1, 1.1, 0.9, 1],
            opacity: [0.6, 1, 0.8, 0.6]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{ scale: 1.5, rotate: 25, y: -10 }}
          className="absolute top-20 right-10 w-16 h-16 apple-card rounded-2xl flex items-center justify-center hover:opacity-100 transition-opacity duration-100 cursor-pointer"
          style={{
            boxShadow: '0 0 20px rgba(255,204,0,0.2), 0 0 40px rgba(255,204,0,0.1)',
          }}
        >
          <Activity className="w-8 h-8 text-apple-yellow" style={{ filter: 'drop-shadow(0 0 5px currentColor)' }} />
        </motion.div>
      </ParallaxSection>

      <ParallaxSection speed={0.4}>
        <motion.div
          animate={{ 
            x: [0, -25, 35, 0],
            y: [0, 20, -15, 0],
            rotate: [0, -180, -360, 0],
            scale: [1, 0.9, 1.1, 1],
            opacity: [0.6, 0.8, 1, 0.6]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          whileHover={{ scale: 1.5, rotate: -25, y: -10 }}
          className="absolute bottom-20 left-10 w-16 h-16 apple-card rounded-2xl flex items-center justify-center hover:opacity-100 transition-opacity duration-100 cursor-pointer"
          style={{
            boxShadow: '0 0 20px rgba(48,209,88,0.2), 0 0 40px rgba(48,209,88,0.1)',
          }}
        >
          <Clock className="w-8 h-8 text-apple-green" style={{ filter: 'drop-shadow(0 0 5px currentColor)' }} />
        </motion.div>
      </ParallaxSection>

      {/* Additional magical floating icons with fixed trajectories */}

      <ParallaxSection speed={0.5}>
        <motion.div
          animate={{ 
            x: [0, -35, 25, 0],
            y: [0, 30, -25, 0],
            rotate: [0, -360, -720, 0],
            scale: [0.6, 1.1, 0.7, 0.6],
            opacity: [0, 0.8, 1, 0]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 9
          }}
          whileHover={{ scale: 1.8, rotate: -360, y: -15 }}
          className="absolute bottom-1/3 right-20 w-10 h-10 apple-card rounded-full flex items-center justify-center cursor-pointer"
          style={{
            boxShadow: '0 0 15px rgba(255,45,146,0.2), 0 0 30px rgba(255,45,146,0.1)',
          }}
        >
          <span className="text-apple-pink text-lg" style={{ filter: 'drop-shadow(0 0 3px currentColor)' }}>💫</span>
        </motion.div>
      </ParallaxSection>

      {/* Register Modal */}
      <RegisterModal 
        isOpen={isRegisterModalOpen} 
        onClose={() => setIsRegisterModalOpen(false)} 
      />
    </section>
  )
}

export default Hero
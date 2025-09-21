import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Menu, X, Monitor, Bell, BarChart3 } from '../assets/icons'
import RegisterModal from './RegisterModal'

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Мониторинг', href: '#monitoring', icon: Monitor },
    { name: 'Уведомления', href: '#alerts', icon: Bell },
    { name: 'Аналитика', href: '#analytics', icon: BarChart3 },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <motion.div
        animate={{
          backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0)',
          backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'blur(0px) saturate(100%)',
          borderBottomWidth: isScrolled ? '1px' : '0px',
          borderBottomColor: isScrolled ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0)',
          boxShadow: isScrolled 
            ? '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(255, 255, 255, 0.05)' 
            : '0 0px 0px rgba(0, 0, 0, 0), inset 0 0px 0px rgba(255, 255, 255, 0)',
        }}
        transition={{
          duration: 0.4,
          ease: "easeInOut"
        }}
        className="w-full h-full"
        style={{
          background: isScrolled 
            ? 'rgba(0, 0, 0, 0.3)'
            : 'rgba(0, 0, 0, 0)',
        }}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-apple-blue rounded-lg flex items-center justify-center">
              <Monitor className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">PingTower</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                whileHover={{ y: -2 }}
                className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-100"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </motion.button>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-all duration-100 border border-white/20 hover:border-white/30 rounded-xl backdrop-blur-md hover:backdrop-blur-lg"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(255,255,255,0.05)',
                }}
              >
                Войти
              </motion.button>
            </Link>
            <motion.button
              onClick={() => setIsRegisterModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 text-sm font-medium text-white transition-all duration-100 rounded-xl backdrop-blur-md"
              style={{
                background: 'rgba(0,122,255,0.9)',
                boxShadow: '0 4px 16px rgba(0,122,255,0.4), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              Начать бесплатно
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white/90 hover:text-white transition-all duration-100 border border-white/20 hover:border-white/30 rounded-xl backdrop-blur-md hover:backdrop-blur-lg"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(255,255,255,0.05)',
            }}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>
      </motion.div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="md:hidden border-t border-white/15"
            style={{
              background: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(255, 255, 255, 0.05)',
            }}
          >
            <div className="px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => {
                    scrollToSection(item.href)
                    setIsMobileMenuOpen(false)
                  }}
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors duration-100"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </motion.button>
              ))}
              <div className="pt-4 space-y-3">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 text-sm font-medium text-white/90 hover:text-white transition-all duration-100 border border-white/20 hover:border-white/30 rounded-xl backdrop-blur-md hover:backdrop-blur-lg"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(255,255,255,0.05)',
                    }}
                  >
                    Войти
                  </motion.button>
                </Link>
                <motion.button
                  onClick={() => {
                    setIsRegisterModalOpen(true)
                    setIsMobileMenuOpen(false)
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 text-sm font-medium text-white transition-all duration-100 rounded-xl backdrop-blur-md"
                  style={{
                    background: 'rgba(0,122,255,0.9)',
                    boxShadow: '0 4px 16px rgba(0,122,255,0.4), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.15)',
                  }}
                >
                  Начать бесплатно
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Register Modal */}
      <RegisterModal 
        isOpen={isRegisterModalOpen} 
        onClose={() => setIsRegisterModalOpen(false)} 
      />
    </motion.header>
  )
}

export default Header

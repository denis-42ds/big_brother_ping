import React from 'react'
import { motion } from 'framer-motion'
import { Monitor, Github, Twitter, Mail, Heart } from '../assets/icons'
import AnimatedSection from './AnimatedSection'
import DynamicBackground from './DynamicBackground'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: [
      { name: 'Мониторинг', href: '#monitoring' },
      { name: 'Уведомления', href: '#alerts' },
      { name: 'Аналитика', href: '#analytics' },
      { name: 'API', href: '#api' }
    ],
    company: [
      { name: 'О нас', href: '#about' },
      { name: 'Блог', href: '#blog' },
      { name: 'Карьера', href: '#careers' },
      { name: 'Контакты', href: '#contact' }
    ],
    resources: [
      { name: 'Документация', href: '#docs' },
      { name: 'Поддержка', href: '#support' },
      { name: 'Статус', href: '#status' },
      { name: 'Changelog', href: '#changelog' }
    ]
  }

  const socialLinks = [
    { icon: Github, href: '#github', label: 'GitHub' },
    { icon: Twitter, href: '#twitter', label: 'Twitter' },
    { icon: Mail, href: '#email', label: 'Email' }
  ]

  return (
    <footer className="relative bg-gradient-to-t from-slate-900 to-transparent">
      <DynamicBackground section="footer" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-apple-blue rounded-lg flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gradient">PingTower</span>
              </div>
              <p className="text-white/70 leading-relaxed max-w-md">
                Мы на миссии предоставить надёжный, простой и быстрый способ мониторинга производительности ваших API и веб-сайтов.
              </p>
            </motion.div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-button p-3 rounded-xl"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-white/80" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-white font-semibold mb-4"
            >
              Продукт
            </motion.h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors duration-100"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-white font-semibold mb-4"
            >
              Компания
            </motion.h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors duration-100"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-white font-semibold mb-4"
            >
              Ресурсы
            </motion.h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors duration-100"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 text-white/60 mb-4 md:mb-0">
              <span>© {currentYear} PingTower. Сделано с</span>
              <Heart className="w-4 h-4 text-red-400 fill-current" />
              <span>в России</span>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#privacy" className="text-white/60 hover:text-white transition-colors duration-100">
                Политика конфиденциальности
              </a>
              <a href="#terms" className="text-white/60 hover:text-white transition-colors duration-100">
                Условия использования
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer

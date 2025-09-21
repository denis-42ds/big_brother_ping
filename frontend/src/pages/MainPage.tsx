import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Monitor, Bell, BarChart3, Users, Settings, LogOut } from '../assets/icons'
import DynamicBackground from '../components/DynamicBackground'

const MainPage: React.FC = () => {
  const handleLogout = () => {
    // Очищаем данные авторизации
    localStorage.removeItem('isAuthenticated')
    // Перезагружаем страницу для возврата на главную
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <DynamicBackground section="main" />
      
      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-apple-blue rounded-lg flex items-center justify-center">
              <Monitor className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">PingTower</span>
            <span className="text-sm text-white/60 ml-2">Панель управления</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-white/80 text-sm">Добро пожаловать, Admin</span>
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-all duration-100 border border-white/20 hover:border-white/30 rounded-xl backdrop-blur-md hover:backdrop-blur-lg"
              style={{
                background: 'rgba(255,255,255,0.08)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(255,255,255,0.05)',
              }}
            >
              <LogOut className="w-4 h-4" />
              <span>Выйти</span>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Панель управления
          </h1>
          <p className="text-xl text-white/70 max-w-3xl">
            Управляйте мониторингом ваших сервисов, настраивайте уведомления и анализируйте данные
          </p>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Мониторинг */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="apple-card p-8 cursor-pointer"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-apple-blue/20 rounded-xl flex items-center justify-center">
                <Monitor className="w-6 h-6 text-apple-blue" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Мониторинг</h3>
                <p className="text-white/60 text-sm">Управление сервисами</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/80">Активных сервисов</span>
                <span className="text-apple-green font-semibold">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Проверок сегодня</span>
                <span className="text-apple-blue font-semibold">1,247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Средний uptime</span>
                <span className="text-apple-yellow font-semibold">99.8%</span>
              </div>
            </div>
          </motion.div>

          {/* Уведомления */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="apple-card p-8 cursor-pointer"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-apple-orange/20 rounded-xl flex items-center justify-center">
                <Bell className="w-6 h-6 text-apple-orange" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Уведомления</h3>
                <p className="text-white/60 text-sm">Настройка алертов</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/80">Активных каналов</span>
                <span className="text-apple-green font-semibold">4</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Уведомлений сегодня</span>
                <span className="text-apple-orange font-semibold">23</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Время реакции</span>
                <span className="text-apple-blue font-semibold">&lt; 1мин</span>
              </div>
            </div>
          </motion.div>

          {/* Аналитика */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="apple-card p-8 cursor-pointer"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-apple-purple/20 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-apple-purple" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Аналитика</h3>
                <p className="text-white/60 text-sm">Отчеты и метрики</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/80">Отчетов за месяц</span>
                <span className="text-apple-green font-semibold">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Средняя доступность</span>
                <span className="text-apple-purple font-semibold">99.9%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Инцидентов</span>
                <span className="text-apple-red font-semibold">0</span>
              </div>
            </div>
          </motion.div>

          {/* Пользователи */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="apple-card p-8 cursor-pointer"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-apple-green/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-apple-green" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Пользователи</h3>
                <p className="text-white/60 text-sm">Управление доступом</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/80">Активных пользователей</span>
                <span className="text-apple-green font-semibold">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Администраторов</span>
                <span className="text-apple-blue font-semibold">2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Последний вход</span>
                <span className="text-apple-yellow font-semibold">2мин назад</span>
              </div>
            </div>
          </motion.div>

          {/* Настройки */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="apple-card p-8 cursor-pointer"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-apple-yellow/20 rounded-xl flex items-center justify-center">
                <Settings className="w-6 h-6 text-apple-yellow" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Настройки</h3>
                <p className="text-white/60 text-sm">Конфигурация системы</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/80">Интервал проверок</span>
                <span className="text-apple-blue font-semibold">1мин</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Таймаут запросов</span>
                <span className="text-apple-yellow font-semibold">30сек</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Версия системы</span>
                <span className="text-apple-green font-semibold">v1.0.0</span>
              </div>
            </div>
          </motion.div>

          {/* Быстрые действия */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="apple-card p-8"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Быстрые действия</h3>
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 text-white bg-apple-blue/20 border border-apple-blue/30 rounded-xl hover:bg-apple-blue/30 transition-all duration-100"
              >
                Добавить новый сервис
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 text-white bg-apple-green/20 border border-apple-green/30 rounded-xl hover:bg-apple-green/30 transition-all duration-100"
              >
                Создать отчет
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 text-white bg-apple-orange/20 border border-apple-orange/30 rounded-xl hover:bg-apple-orange/30 transition-all duration-100"
              >
                Настроить уведомления
              </motion.button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default MainPage

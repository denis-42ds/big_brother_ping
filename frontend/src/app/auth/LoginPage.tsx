import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { X, Mail, Lock, Eye, EyeOff, Monitor } from '../../assets/icons'
import DynamicBackground from '../../components/DynamicBackground'
import { useAuth } from '../../contexts/AuthContext'

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { login, loading } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (isLogin) {
      try {
        const success = await login(formData.email, formData.password)
        if (success) {
          navigate('/dashboard')
        } else {
          setError('Неверный логин или пароль')
        }
      } catch (err) {
        setError('Ошибка входа в систему')
      }
    } else {
      // Логика регистрации (пока не реализована)
      setError('Регистрация временно недоступна')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <DynamicBackground section="login" />
      
      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-apple-blue rounded-lg flex items-center justify-center">
              <Monitor className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">PingTower</span>
          </Link>
          
          <Link 
            to="/"
            className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors duration-100"
          >
            <X className="w-5 h-5" />
            <span>Закрыть</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
          style={{
            background: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '24px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(255, 255, 255, 0.05)'
          }}
        >
          {/* Header */}
          <div className="p-8 border-b border-white/10">
            <h1 className="text-3xl font-bold text-white text-center mb-2">
              {isLogin ? 'Добро пожаловать' : 'Создать аккаунт'}
            </h1>
            <p className="text-white/60 text-center">
              {isLogin ? 'Войдите в свой аккаунт PingTower' : 'Зарегистрируйтесь для начала мониторинга'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}
            {/* Name field for registration */}
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <label className="text-white/80 text-sm font-medium">Имя</label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pl-12 text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:outline-none focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-100"
                    placeholder="Введите ваше имя"
                    required={!isLogin}
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Mail className="w-5 h-5 text-white/40" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Email field */}
            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium">{isLogin ? "Логин" : "Email"}</label>
              <div className="relative">
                  <input
                    type={isLogin ? "text" : "email"}
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pl-12 text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:outline-none focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-100"
                    placeholder={isLogin ? "Введите логин (admin)" : "Введите ваш email"}
                    required
                  />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Mail className="w-5 h-5 text-white/40" />
                </div>
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium">Пароль</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pl-12 pr-12 text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:outline-none focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-100"
                    placeholder={isLogin ? "Введите пароль (admin)" : "Введите пароль"}
                  required
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Lock className="w-5 h-5 text-white/40" />
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors duration-100"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password field for registration */}
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <label className="text-white/80 text-sm font-medium">Подтвердите пароль</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pl-12 text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:outline-none focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-100"
                    placeholder="Подтвердите пароль"
                    required={!isLogin}
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Lock className="w-5 h-5 text-white/40" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -2 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full py-4 text-white font-semibold rounded-xl transition-all duration-100 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: 'rgba(0,122,255,0.9)',
                boxShadow: '0 4px 16px rgba(0,122,255,0.4), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.15)'
              }}
            >
              {loading ? 'Вход...' : (isLogin ? 'Войти' : 'Создать аккаунт')}
            </motion.button>

            {/* Toggle between login and register */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-white/60 hover:text-white transition-colors duration-100 text-sm"
              >
                {isLogin ? 'Нет аккаунта? Создать' : 'Уже есть аккаунт? Войти'}
              </button>
            </div>

            {/* Social Login */}
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-white/40">Или войти через</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center space-x-2 py-3 px-4 text-white/80 bg-white/5 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-100"
                >
                  <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold">G</span>
                  </div>
                  <span className="text-sm">Google</span>
                </motion.button>
                
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center space-x-2 py-3 px-4 text-white/80 bg-white/5 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-100"
                >
                  <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold">G</span>
                  </div>
                  <span className="text-sm">GitHub</span>
                </motion.button>
              </div>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  )
}

export default LoginPage

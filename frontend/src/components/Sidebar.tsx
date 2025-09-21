import React from 'react'
import { motion } from 'framer-motion'
import { 
  Monitor, 
  Bell, 
  BarChart3, 
  Globe, 
  Settings, 
  User,
  Menu
} from '../assets/icons'

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { id: 'overview', label: 'Обзор', icon: BarChart3 },
    { id: 'monitors', label: 'Мониторы', icon: Monitor },
    { id: 'reports', label: 'Отчеты', icon: BarChart3 },
    { id: 'status-pages', label: 'Страницы статуса', icon: Globe },
    { id: 'notifications', label: 'Уведомления', icon: Bell },
    { id: 'settings', label: 'Настройки', icon: Settings }
  ]

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-700 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <Menu className="w-6 h-6 text-white" />
          <div>
            <h1 className="text-xl font-bold text-white">PingTower</h1>
            <p className="text-sm text-gray-400">Monitoring Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Help Section */}
      <div className="p-4 border-t border-gray-700">
        <p className="text-sm text-gray-400 mb-4">Get Help</p>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Админ</p>
          </div>
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar



import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock
} from '../assets/icons'
import { serverApi, Server, CreateServerRequest, ServerStatusDtoPage } from '../services/api'
import { useWebSocket } from '../services/websocket'
import { useAuth } from '../contexts/AuthContext'

interface ServerManagementProps {
  isAdmin?: boolean
}

const ServerManagement: React.FC<ServerManagementProps> = () => {
  const { isAdmin } = useAuth()
  const [servers, setServers] = useState<Server[]>([
    {
      serverId: '1',
      serverUrl: 'https://example.com',
      serverName: 'Example Site',
      responseCode: '200',
      latency: '45ms',
      serverStatus: 'ONLINE'
    },
    {
      serverId: '2', 
      serverUrl: 'https://test-server.com',
      serverName: 'Test Server',
      responseCode: '500',
      latency: 'timeout',
      serverStatus: 'OFFLINE'
    }
  ])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingServer, setEditingServer] = useState<Server | null>(null)
  const [newServer, setNewServer] = useState<CreateServerRequest>({
    serverUrl: '',
    serverName: ''
  })

  const { subscribe } = useWebSocket()

  // Загрузка серверов
  const loadServers = async (page: number = 0) => {
    setLoading(true)
    setError('')
    try {
      const response: ServerStatusDtoPage = await serverApi.getAllServers(page, 10)
      setServers(response.content)
      setTotalPages(response.totalPages)
      setCurrentPage(response.number)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки серверов')
    } finally {
      setLoading(false)
    }
  }

  // Добавление сервера
  const handleAddServer = async () => {
    if (!newServer.serverUrl || !newServer.serverName) {
      setError('Заполните все поля')
      return
    }

    setLoading(true)
    setError('')
    try {
      // Добавляем сервер в локальное состояние
      const newServerData: Server = {
        serverId: Date.now().toString(),
        serverUrl: newServer.serverUrl,
        serverName: newServer.serverName,
        responseCode: '200',
        latency: '0ms',
        serverStatus: 'ONLINE'
      }
      setServers(prev => [...prev, newServerData])
      setNewServer({ serverUrl: '', serverName: '' })
      setShowAddModal(false)
      // В реальном приложении здесь был бы вызов API
      // await serverApi.addServers([newServer])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка добавления сервера')
    } finally {
      setLoading(false)
    }
  }

  // Редактирование сервера
  const handleEditServer = (server: Server) => {
    setEditingServer(server)
    setNewServer({
      serverUrl: server.serverUrl,
      serverName: server.serverName
    })
    setShowEditModal(true)
  }

  const handleUpdateServer = async () => {
    if (!editingServer || !newServer.serverUrl || !newServer.serverName) {
      setError('Заполните все поля')
      return
    }

    setLoading(true)
    setError('')
    try {
      // Обновляем сервер в локальном состоянии
      setServers(prev => prev.map(server => 
        server.serverId === editingServer.serverId 
          ? { ...server, serverUrl: newServer.serverUrl, serverName: newServer.serverName }
          : server
      ))
      setShowEditModal(false)
      setEditingServer(null)
      setNewServer({ serverUrl: '', serverName: '' })
      // В реальном приложении здесь был бы вызов API
      // await serverApi.updateServer(editingServer.serverId, newServer)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка обновления сервера')
    } finally {
      setLoading(false)
    }
  }

  // Удаление сервера
  const handleDeleteServer = async (serverId: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот сервер?')) return

    setLoading(true)
    setError('')
    try {
      // Удаляем сервер из локального состояния
      setServers(prev => prev.filter(server => server.serverId !== serverId))
      // В реальном приложении здесь был бы вызов API
      // await serverApi.deleteServer(serverId)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка удаления сервера')
    } finally {
      setLoading(false)
    }
  }

  // Поиск сервера
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      await loadServers()
      return
    }

    setLoading(true)
    setError('')
    try {
      // Пробуем найти по URL
      try {
        const server = await serverApi.findServerByUrl(searchTerm)
        setServers([server])
        setTotalPages(1)
        setCurrentPage(0)
      } catch {
        // Если не найден по URL, пробуем по имени
        const server = await serverApi.findServerByName(searchTerm)
        setServers([server])
        setTotalPages(1)
        setCurrentPage(0)
      }
    } catch (err) {
      setError('Сервер не найден')
      setServers([])
    } finally {
      setLoading(false)
    }
  }

  // Получение иконки статуса
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ONLINE':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'OFFLINE':
        return <XCircle className="w-5 h-5 text-red-400" />
      case 'CONNECT_ERROR':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  // Получение цвета статуса
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ONLINE':
        return 'border-green-500/20 bg-green-500/5'
      case 'OFFLINE':
        return 'border-red-500/20 bg-red-500/5'
      case 'CONNECT_ERROR':
        return 'border-yellow-500/20 bg-yellow-500/5'
      default:
        return 'border-gray-500/20 bg-gray-500/5'
    }
  }

  // Подписка на WebSocket обновления
  useEffect(() => {
    const unsubscribe = subscribe('server-status-update', (data) => {
      // Обновляем статус сервера в реальном времени
      setServers(prevServers => 
        prevServers.map(server => 
          server.serverId === data.serverId ? { ...server, ...data } : server
        )
      )
    })

    return unsubscribe
  }, [subscribe])

  // Загрузка серверов при монтировании
  useEffect(() => {
    loadServers()
  }, [])

  return (
    <div className="space-y-6">
      {/* Заголовок и кнопки */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Управление серверами</h2>
        <div className="flex items-center space-x-4">
          {isAdmin && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-apple-blue text-white rounded-xl hover:bg-apple-blue/80 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Добавить сервер</span>
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => loadServers(currentPage)}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            <span>Обновить</span>
          </motion.button>
        </div>
      </div>

      {/* Поиск */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Поиск по URL или имени сервера..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full px-4 py-3 pl-12 text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:outline-none focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-200"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSearch}
          className="px-6 py-3 bg-apple-blue text-white rounded-xl hover:bg-apple-blue/80 transition-colors"
        >
          Найти
        </motion.button>
      </div>

      {/* Ошибки */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400"
        >
          {error}
        </motion.div>
      )}

      {/* Список серверов */}
      <div className="space-y-4">
        {loading && servers.length === 0 ? (
          <div className="text-center py-12">
            <RefreshCw className="w-8 h-8 text-white/40 animate-spin mx-auto mb-4" />
            <p className="text-white/60">Загрузка серверов...</p>
          </div>
        ) : servers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/60">Серверы не найдены</p>
          </div>
        ) : (
          servers.map((server, index) => (
            <motion.div
              key={server.serverId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-2xl border ${getStatusColor(server.serverStatus)}`}
              style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(20px) saturate(180%)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(server.serverStatus)}
                  <div>
                    <h3 className="text-xl font-bold text-white">{server.serverName}</h3>
                    <p className="text-white/60">{server.serverUrl}</p>
                    {server.latency && (
                      <p className="text-white/40 text-sm">Время отклика: {server.latency}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-white/10 rounded-full text-white text-sm">
                    {server.serverStatus}
                  </span>
                  {isAdmin && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEditServer(server)}
                        className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <Edit className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteServer(server.serverId)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Пагинация */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => loadServers(currentPage - 1)}
            disabled={currentPage === 0}
            className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50"
          >
            Назад
          </motion.button>
          <span className="text-white/60">
            {currentPage + 1} из {totalPages}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => loadServers(currentPage + 1)}
            disabled={currentPage >= totalPages - 1}
            className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50"
          >
            Вперед
          </motion.button>
        </div>
      )}

      {/* Модальное окно добавления */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 p-8 rounded-2xl w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Добавить сервер</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">URL сервера</label>
                  <input
                    type="text"
                    value={newServer.serverUrl}
                    onChange={(e) => setNewServer({ ...newServer, serverUrl: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full px-4 py-3 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-apple-blue"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Имя сервера</label>
                  <input
                    type="text"
                    value={newServer.serverName}
                    onChange={(e) => setNewServer({ ...newServer, serverName: e.target.value })}
                    placeholder="Название сервера"
                    className="w-full px-4 py-3 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-apple-blue"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddServer}
                  disabled={loading}
                  className="flex-1 py-3 bg-apple-blue text-white rounded-xl hover:bg-apple-blue/80 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Добавление...' : 'Добавить'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
                >
                  Отмена
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Модальное окно редактирования */}
      <AnimatePresence>
        {showEditModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowEditModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 p-8 rounded-2xl w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Редактировать сервер</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">URL сервера</label>
                  <input
                    type="text"
                    value={newServer.serverUrl}
                    onChange={(e) => setNewServer({ ...newServer, serverUrl: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full px-4 py-3 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-apple-blue"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Имя сервера</label>
                  <input
                    type="text"
                    value={newServer.serverName}
                    onChange={(e) => setNewServer({ ...newServer, serverName: e.target.value })}
                    placeholder="Название сервера"
                    className="w-full px-4 py-3 text-white bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-apple-blue"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleUpdateServer}
                  disabled={loading}
                  className="flex-1 py-3 bg-apple-blue text-white rounded-xl hover:bg-apple-blue/80 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Сохранение...' : 'Сохранить'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
                >
                  Отмена
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ServerManagement

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface User {
  id: string
  username: string
  role: 'admin' | 'user'
  name: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isAdmin: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Моковые пользователи
const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    role: 'admin',
    name: 'Администратор'
  },
  {
    id: '2',
    username: 'user',
    role: 'user',
    name: 'Пользователь'
  }
]

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Проверяем сохраненную сессию при загрузке
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    setLoading(true)
    
    // Имитируем задержку API
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Проверяем учетные данные
    const foundUser = mockUsers.find(u => u.username === username)
    
    if (foundUser && password === username) { // Пароль = логин для простоты
      setUser(foundUser)
      localStorage.setItem('user', JSON.stringify(foundUser))
      setLoading(false)
      return true
    }
    
    setLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

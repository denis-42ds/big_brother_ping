// WebSocket сервис для получения обновлений в реальном времени
import { ServerStatusResponse } from './api';

export interface WebSocketMessage {
  type: 'server-status-update' | 'scheduler-status-update' | 'error';
  data: any;
  timestamp: string;
}

class WebSocketService {
  private socket: WebSocket | null = null;
  private stompClient: any = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectInterval = 5000;
  private listeners: Map<string, ((data: any) => void)[]> = new Map();

  constructor() {
    this.connect();
  }

  private connect() {
    try {
      // Создаем WebSocket соединение
      this.socket = new WebSocket('ws://localhost:8082/serv-stat');
      
      this.socket.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
        this.initializeStomp();
      };

      this.socket.onclose = () => {
        console.log('WebSocket disconnected');
        this.handleReconnect();
      };

      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      this.handleReconnect();
    }
  }

  private initializeStomp() {
    // Инициализируем STOMP клиент
    if (typeof window !== 'undefined' && (window as any).Stomp) {
      this.stompClient = (window as any).Stomp.over(this.socket);
      
      this.stompClient.connect({}, (frame: any) => {
        console.log('STOMP connected:', frame);
        
        // Подписываемся на обновления статуса серверов
        this.stompClient.subscribe('/status-of-servers/server-status-updates', (message: any) => {
          try {
            const data = JSON.parse(message.body);
            this.notifyListeners('server-status-update', data);
          } catch (error) {
            console.error('Failed to parse WebSocket message:', error);
          }
        });

        // Подписываемся на обновления статуса планировщика
        this.stompClient.subscribe('/status-of-servers/scheduler-updates', (message: any) => {
          try {
            const data = JSON.parse(message.body);
            this.notifyListeners('scheduler-status-update', data);
          } catch (error) {
            console.error('Failed to parse scheduler message:', error);
          }
        });

      }, (error: any) => {
        console.error('STOMP connection error:', error);
        this.handleReconnect();
      });
    } else {
      console.warn('STOMP library not available, falling back to raw WebSocket');
      this.setupRawWebSocket();
    }
  }

  private setupRawWebSocket() {
    if (this.socket) {
      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.notifyListeners('server-status-update', data);
        } catch (error) {
          console.error('Failed to parse raw WebSocket message:', error);
        }
      };
    }
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      
      setTimeout(() => {
        this.connect();
      }, this.reconnectInterval);
    } else {
      console.error('Max reconnection attempts reached');
      this.notifyListeners('error', { message: 'Connection lost' });
    }
  }

  private notifyListeners(type: string, data: any) {
    const listeners = this.listeners.get(type);
    if (listeners) {
      listeners.forEach(listener => {
        try {
          listener(data);
        } catch (error) {
          console.error('Error in WebSocket listener:', error);
        }
      });
    }
  }

  // Подписаться на обновления
  public subscribe(type: string, callback: (data: any) => void) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    this.listeners.get(type)!.push(callback);

    // Возвращаем функцию для отписки
    return () => {
      const listeners = this.listeners.get(type);
      if (listeners) {
        const index = listeners.indexOf(callback);
        if (index > -1) {
          listeners.splice(index, 1);
        }
      }
    };
  }

  // Отправить сообщение
  public send(destination: string, message: any) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send(destination, {}, JSON.stringify(message));
    } else {
      console.warn('WebSocket not connected, cannot send message');
    }
  }

  // Получить статус соединения
  public isConnected(): boolean {
    return this.socket?.readyState === WebSocket.OPEN && 
           (this.stompClient?.connected || !this.stompClient);
  }

  // Отключиться
  public disconnect() {
    if (this.stompClient) {
      this.stompClient.disconnect();
    }
    if (this.socket) {
      this.socket.close();
    }
    this.listeners.clear();
  }

  // Переподключиться
  public reconnect() {
    this.disconnect();
    this.reconnectAttempts = 0;
    this.connect();
  }
}

// Создаем единственный экземпляр сервиса
export const webSocketService = new WebSocketService();

// Хук для использования WebSocket в React компонентах
export const useWebSocket = () => {
  const subscribe = (type: string, callback: (data: any) => void) => {
    return webSocketService.subscribe(type, callback);
  };

  const send = (destination: string, message: any) => {
    webSocketService.send(destination, message);
  };

  const isConnected = () => {
    return webSocketService.isConnected();
  };

  const reconnect = () => {
    webSocketService.reconnect();
  };

  return {
    subscribe,
    send,
    isConnected,
    reconnect
  };
};

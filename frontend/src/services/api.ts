// API сервис для работы с бэкендом
const API_BASE_URL = 'http://localhost:8082/serv'; // API Gateway

export interface Server {
  serverId: string;
  serverUrl: string;
  serverName: string;
  responseCode?: string;
  latency?: string;
  serverStatus: 'ONLINE' | 'OFFLINE' | 'CONNECT_ERROR';
}

export interface CreateServerRequest {
  serverUrl: string;
  serverName: string;
}

export interface ServerStatusResponse {
  serverId: string;
  serverUrl: string;
  serverName: string;
  responseCode: string;
  latency: string;
  serverStatus: 'ONLINE' | 'OFFLINE' | 'CONNECT_ERROR';
}

export interface SimpleMessageResponse {
  message: string;
}

export interface ServerStatusDtoPage {
  content: ServerStatusResponse[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface CreateRequestLog {
  email: string;
  fromYear: number;
  fromMonth: number;
  fromDay: number;
  fromHour: number;
  fromMinute: number;
  fromSecond: number;
  toYear: number;
  toMonth: number;
  toDay: number;
  toHour: number;
  toMinute: number;
  toSecond: number;
}

export interface ServerLog {
  id: string;
  serverId: string;
  serverName: string;
  serverUrl: string;
  serverStatus: string;
  responseCode: string;
  latency: string;
  timestamp: string;
}

export interface ServerStatusForLogsDtoPage {
  content: ServerLog[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

// Server API
export const serverApi = {
  // Получить все серверы с пагинацией
  getAllServers: async (page: number = 0, size: number = 10): Promise<ServerStatusDtoPage> => {
    const response = await fetch(`${API_BASE_URL}/server-status/server/find-all?page=${page}&size=${size}`);
    if (!response.ok) throw new Error('Failed to fetch servers');
    return response.json();
  },

  // Добавить новые серверы
  addServers: async (servers: CreateServerRequest[]): Promise<SimpleMessageResponse> => {
    const response = await fetch(`${API_BASE_URL}/server-status/server/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ servers })
    });
    if (!response.ok) throw new Error('Failed to add servers');
    return response.json();
  },

  // Найти сервер по URL
  findServerByUrl: async (serverUrl: string, timeout: number = 5000): Promise<ServerStatusResponse> => {
    const response = await fetch(`${API_BASE_URL}/server-status/server/find-by-url/${encodeURIComponent(serverUrl)}?timeout=${timeout}`);
    if (!response.ok) throw new Error('Failed to find server by URL');
    return response.json();
  },

  // Найти сервер по имени
  findServerByName: async (serverName: string, timeout: number = 5000): Promise<ServerStatusResponse> => {
    const response = await fetch(`${API_BASE_URL}/server-status/server/find-by-name/${encodeURIComponent(serverName)}?timeout=${timeout}`);
    if (!response.ok) throw new Error('Failed to find server by name');
    return response.json();
  },

  // Обновить сервер
  updateServer: async (serverId: string, server: CreateServerRequest): Promise<ServerStatusResponse> => {
    const response = await fetch(`${API_BASE_URL}/server-status/server/update/${serverId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(server)
    });
    if (!response.ok) throw new Error('Failed to update server');
    return response.json();
  },

  // Удалить сервер
  deleteServer: async (serverId: string): Promise<SimpleMessageResponse> => {
    const response = await fetch(`${API_BASE_URL}/server-status/server/delete/${serverId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete server');
    return response.json();
  }
};

// Scheduler API
export const schedulerApi = {
  // Получить статус планировщика
  getStatus: async (): Promise<SimpleMessageResponse> => {
    const response = await fetch(`${API_BASE_URL}/server-status/scheduler/get-status`);
    if (!response.ok) throw new Error('Failed to get scheduler status');
    return response.json();
  },

  // Включить планировщик
  turnOn: async (): Promise<SimpleMessageResponse> => {
    const response = await fetch(`${API_BASE_URL}/server-status/scheduler/on`, {
      method: 'POST'
    });
    if (!response.ok) throw new Error('Failed to turn on scheduler');
    return response.json();
  },

  // Выключить планировщик
  turnOff: async (): Promise<SimpleMessageResponse> => {
    const response = await fetch(`${API_BASE_URL}/server-status/scheduler/off`, {
      method: 'POST'
    });
    if (!response.ok) throw new Error('Failed to turn off scheduler');
    return response.json();
  },

  // Получить интервал планировщика
  getScheduledRate: async (): Promise<SimpleMessageResponse> => {
    const response = await fetch(`${API_BASE_URL}/server-status/scheduler/get-scheduled-rate`);
    if (!response.ok) throw new Error('Failed to get scheduled rate');
    return response.json();
  },

  // Изменить интервал планировщика
  changeScheduledRate: async (rate: number): Promise<SimpleMessageResponse> => {
    const response = await fetch(`${API_BASE_URL}/server-status/scheduler/change-scheduled-rate/${rate}`, {
      method: 'POST'
    });
    if (!response.ok) throw new Error('Failed to change scheduled rate');
    return response.json();
  },

  // Получить таймаут
  getTimeout: async (): Promise<SimpleMessageResponse> => {
    const response = await fetch(`${API_BASE_URL}/server-status/scheduler/get-timeout`);
    if (!response.ok) throw new Error('Failed to get timeout');
    return response.json();
  },

  // Изменить таймаут
  changeTimeout: async (timeout: number): Promise<SimpleMessageResponse> => {
    const response = await fetch(`${API_BASE_URL}/server-status/scheduler/changeTimeout/${timeout}`, {
      method: 'POST'
    });
    if (!response.ok) throw new Error('Failed to change timeout');
    return response.json();
  }
};

// Single Scheduler API
export const singleSchedulerApi = {
  // Получить статус одиночного планировщика
  getStatus: async (): Promise<SimpleMessageResponse> => {
    const response = await fetch(`${API_BASE_URL}/server-status/singleScheduler/get-status`);
    if (!response.ok) throw new Error('Failed to get single scheduler status');
    return response.json();
  },

  // Установить ID сервера для одиночного планировщика
  setServerId: async (serverIds: string[]): Promise<SimpleMessageResponse> => {
    const response = await fetch(`${API_BASE_URL}/server-status/singleScheduler/single-server-id`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: serverIds })
    });
    if (!response.ok) throw new Error('Failed to set server ID');
    return response.json();
  },

  // Включить одиночный планировщик
  turnOn: async (): Promise<SimpleMessageResponse> => {
    const response = await fetch(`${API_BASE_URL}/server-status/singleScheduler/on`, {
      method: 'POST'
    });
    if (!response.ok) throw new Error('Failed to turn on single scheduler');
    return response.json();
  },

  // Выключить одиночный планировщик
  turnOff: async (): Promise<SimpleMessageResponse> => {
    const response = await fetch(`${API_BASE_URL}/server-status/singleScheduler/off`, {
      method: 'POST'
    });
    if (!response.ok) throw new Error('Failed to turn off single scheduler');
    return response.json();
  },

  // Получить интервал одиночного планировщика
  getScheduledRate: async (): Promise<SimpleMessageResponse> => {
    const response = await fetch(`${API_BASE_URL}/server-status/singleScheduler/get-scheduled-rate`);
    if (!response.ok) throw new Error('Failed to get single scheduled rate');
    return response.json();
  },

  // Изменить интервал одиночного планировщика
  changeScheduledRate: async (rate: number): Promise<SimpleMessageResponse> => {
    const response = await fetch(`${API_BASE_URL}/server-status/singleScheduler/change-scheduled-rate/${rate}`, {
      method: 'POST'
    });
    if (!response.ok) throw new Error('Failed to change single scheduled rate');
    return response.json();
  },

  // Получить таймаут одиночного планировщика
  getTimeout: async (): Promise<SimpleMessageResponse> => {
    const response = await fetch(`${API_BASE_URL}/server-status/singleScheduler/get-timeout`);
    if (!response.ok) throw new Error('Failed to get single timeout');
    return response.json();
  },

  // Изменить таймаут одиночного планировщика
  changeTimeout: async (timeout: number): Promise<SimpleMessageResponse> => {
    const response = await fetch(`${API_BASE_URL}/server-status/singleScheduler/changeTimeout/${timeout}`, {
      method: 'POST'
    });
    if (!response.ok) throw new Error('Failed to change single timeout');
    return response.json();
  }
};

// Reports API
export const reportsApi = {
  // Отправить отчет по всем серверам
  sendAllServers: async (request: CreateRequestLog, page: number = 0, size: number = 10): Promise<SimpleMessageResponse> => {
    const response = await fetch(`${API_BASE_URL}/server-status/server-log/reports/send-all?page=${page}&size=${size}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
    if (!response.ok) throw new Error('Failed to send all servers report');
    return response.json();
  },

  // Отправить отчет по имени сервера
  sendByName: async (serverName: string, request: CreateRequestLog, page: number = 0, size: number = 10): Promise<SimpleMessageResponse> => {
    const response = await fetch(`${API_BASE_URL}/server-status/server-log/reports/send-by-name/${encodeURIComponent(serverName)}?page=${page}&size=${size}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
    if (!response.ok) throw new Error('Failed to send report by name');
    return response.json();
  },

  // Отправить отчет по URL сервера
  sendByUrl: async (serverUrl: string, request: CreateRequestLog, page: number = 0, size: number = 10): Promise<SimpleMessageResponse> => {
    const response = await fetch(`${API_BASE_URL}/server-status/server-log/reports/send-by-url/${encodeURIComponent(serverUrl)}?page=${page}&size=${size}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
    if (!response.ok) throw new Error('Failed to send report by URL');
    return response.json();
  },

  // Отправить отчет по статусу сервера
  sendByStatus: async (serverStatus: string, request: CreateRequestLog, page: number = 0, size: number = 10): Promise<SimpleMessageResponse> => {
    const response = await fetch(`${API_BASE_URL}/server-status/server-log/reports/send-by-server-status/${encodeURIComponent(serverStatus)}?page=${page}&size=${size}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
    if (!response.ok) throw new Error('Failed to send report by status');
    return response.json();
  }
};

// Server Logs API
export const serverLogsApi = {
  // Получить все логи серверов
  getAllLogs: async (request: CreateRequestLog, page: number = 0, size: number = 10): Promise<ServerStatusForLogsDtoPage> => {
    const response = await fetch(`${API_BASE_URL}/server-status/server-log/all?page=${page}&size=${size}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
    if (!response.ok) throw new Error('Failed to get all logs');
    return response.json();
  },

  // Получить логи по имени сервера
  getLogsByName: async (serverName: string, request: CreateRequestLog, page: number = 0, size: number = 10): Promise<ServerStatusForLogsDtoPage> => {
    const response = await fetch(`${API_BASE_URL}/server-status/server-log/server-by-name?serverName=${encodeURIComponent(serverName)}&page=${page}&size=${size}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
    if (!response.ok) throw new Error('Failed to get logs by name');
    return response.json();
  },

  // Получить логи по URL сервера
  getLogsByUrl: async (serverUrl: string, request: CreateRequestLog, page: number = 0, size: number = 10): Promise<ServerStatusForLogsDtoPage> => {
    const response = await fetch(`${API_BASE_URL}/server-status/server-log/server-by-url?serverUrl=${encodeURIComponent(serverUrl)}&page=${page}&size=${size}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
    if (!response.ok) throw new Error('Failed to get logs by URL');
    return response.json();
  },

  // Получить логи по статусу сервера
  getLogsByStatus: async (serverStatus: string, request: CreateRequestLog, page: number = 0, size: number = 10): Promise<ServerStatusForLogsDtoPage> => {
    const response = await fetch(`${API_BASE_URL}/server-status/server-log/status?serverStatus=${encodeURIComponent(serverStatus)}&page=${page}&size=${size}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
    if (!response.ok) throw new Error('Failed to get logs by status');
    return response.json();
  },

  // Удалить логи
  deleteLogs: async (request: CreateRequestLog): Promise<SimpleMessageResponse> => {
    const response = await fetch(`${API_BASE_URL}/server-status/server-log/delete`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
    if (!response.ok) throw new Error('Failed to delete logs');
    return response.json();
  }
};

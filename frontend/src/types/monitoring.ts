// Типы данных для системы мониторинга веб-сервисов

export interface Monitor {
  id: string
  name: string
  url: string
  type: MonitorType
  status: MonitorStatus
  schedule: ScheduleConfig
  settings: MonitorSettings
  metrics: MonitorMetrics
  lastCheck: Date
  region: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

export type MonitorType = 
  | 'http' 
  | 'https' 
  | 'ping' 
  | 'dns' 
  | 'ssl' 
  | 'smtp' 
  | 'tcp' 
  | 'udp'
  | 'api'

export type MonitorStatus = 
  | 'operational' 
  | 'degraded' 
  | 'outage' 
  | 'maintenance' 
  | 'unknown'

export interface ScheduleConfig {
  interval: number // в секундах
  cronExpression?: string // для сложных расписаний
  timezone: string
  enabled: boolean
}

export interface MonitorSettings {
  timeout: number // в миллисекундах
  retries: number
  followRedirects: boolean
  verifySSL: boolean
  expectedStatusCode?: number
  expectedContent?: string
  headers?: Record<string, string>
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  body?: string
  basicAuth?: {
    username: string
    password: string
  }
}

export interface MonitorMetrics {
  uptime: number // процент
  responseTime: number // в миллисекундах
  availability: number // процент за период
  totalChecks: number
  successfulChecks: number
  failedChecks: number
  averageResponseTime: number
  maxResponseTime: number
  minResponseTime: number
}

export interface CheckResult {
  id: string
  monitorId: string
  timestamp: Date
  status: MonitorStatus
  responseTime: number
  statusCode?: number
  error?: string
  region: string
  details: CheckDetails
}

export interface CheckDetails {
  dnsLookupTime?: number
  tcpConnectTime?: number
  tlsHandshakeTime?: number
  firstByteTime?: number
  contentLength?: number
  sslExpiry?: Date
  sslIssuer?: string
  redirects?: number
}

export interface Incident {
  id: string
  monitorId: string
  title: string
  description: string
  status: IncidentStatus
  severity: IncidentSeverity
  startTime: Date
  endTime?: Date
  duration?: number // в миллисекундах
  affectedRegions: string[]
  notifications: NotificationLog[]
}

export type IncidentStatus = 'investigating' | 'identified' | 'monitoring' | 'resolved'
export type IncidentSeverity = 'low' | 'medium' | 'high' | 'critical'

export interface NotificationChannel {
  id: string
  name: string
  type: NotificationType
  enabled: boolean
  settings: NotificationSettings
  escalationRules: EscalationRule[]
}

export type NotificationType = 
  | 'email' 
  | 'telegram' 
  | 'webhook' 
  | 'slack' 
  | 'discord' 
  | 'sms'

export interface NotificationSettings {
  // Email
  email?: string
  smtpServer?: string
  
  // Telegram
  botToken?: string
  chatId?: string
  
  // Webhook
  webhookUrl?: string
  webhookMethod?: 'POST' | 'PUT'
  webhookHeaders?: Record<string, string>
  
  // Slack
  slackWebhookUrl?: string
  slackChannel?: string
  
  // Discord
  discordWebhookUrl?: string
  
  // SMS
  phoneNumber?: string
  smsProvider?: string
}

export interface EscalationRule {
  id: string
  delay: number // в минутах
  channels: string[] // ID каналов уведомлений
  conditions: EscalationCondition[]
}

export interface EscalationCondition {
  field: 'status' | 'duration' | 'severity'
  operator: 'equals' | 'greater_than' | 'less_than'
  value: string | number
}

export interface NotificationLog {
  id: string
  incidentId: string
  channelId: string
  timestamp: Date
  status: 'sent' | 'failed' | 'pending'
  error?: string
  response?: string
}

export interface StatusPage {
  id: string
  name: string
  domain: string
  description: string
  enabled: boolean
  monitors: string[] // ID мониторов
  customDomain?: string
  theme: StatusPageTheme
  settings: StatusPageSettings
}

export interface StatusPageTheme {
  primaryColor: string
  backgroundColor: string
  textColor: string
  logo?: string
  favicon?: string
}

export interface StatusPageSettings {
  showUptime: boolean
  showResponseTime: boolean
  showIncidents: boolean
  showMaintenance: boolean
  allowSubscriptions: boolean
  customCSS?: string
}

export interface MaintenanceWindow {
  id: string
  title: string
  description: string
  monitors: string[] // ID мониторов
  startTime: Date
  endTime: Date
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
  notifications: boolean
}

export interface Report {
  id: string
  name: string
  type: ReportType
  period: ReportPeriod
  monitors: string[] // ID мониторов
  metrics: ReportMetric[]
  generatedAt: Date
  data: ReportData
}

export type ReportType = 'uptime' | 'performance' | 'incidents' | 'sla' | 'custom'
export type ReportPeriod = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'custom'

export interface ReportMetric {
  name: string
  type: 'uptime' | 'response_time' | 'availability' | 'incidents' | 'custom'
  aggregation: 'average' | 'min' | 'max' | 'sum' | 'count'
}

export interface ReportData {
  summary: ReportSummary
  charts: ChartData[]
  tables: TableData[]
}

export interface ReportSummary {
  totalUptime: number
  averageResponseTime: number
  totalIncidents: number
  totalDowntime: number
  slaCompliance: number
}

export interface ChartData {
  type: 'line' | 'bar' | 'pie' | 'area'
  title: string
  data: any[]
  xAxis: string
  yAxis: string
}

export interface TableData {
  title: string
  headers: string[]
  rows: any[][]
}

// API Response типы
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
  pagination?: PaginationInfo
}

export interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
}

// Dashboard типы
export interface DashboardWidget {
  id: string
  type: WidgetType
  title: string
  position: { x: number; y: number; w: number; h: number }
  settings: WidgetSettings
  data?: any
}

export type WidgetType = 
  | 'monitor_list' 
  | 'uptime_chart' 
  | 'response_time_chart' 
  | 'incident_timeline' 
  | 'status_overview' 
  | 'metrics_summary'

export interface WidgetSettings {
  monitors?: string[]
  timeRange?: string
  refreshInterval?: number
  showLegend?: boolean
  showGrid?: boolean
  colors?: string[]
}

// User и Auth типы
export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  preferences: UserPreferences
  createdAt: Date
  lastLoginAt?: Date
}

export type UserRole = 'admin' | 'user' | 'viewer'

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto'
  timezone: string
  language: string
  notifications: NotificationPreferences
  dashboard: DashboardPreferences
}

export interface NotificationPreferences {
  email: boolean
  browser: boolean
  mobile: boolean
  frequency: 'immediate' | 'hourly' | 'daily'
}

export interface DashboardPreferences {
  defaultView: string
  autoRefresh: boolean
  refreshInterval: number
  compactMode: boolean
}

// System типы
export interface SystemHealth {
  status: 'healthy' | 'degraded' | 'unhealthy'
  components: ComponentHealth[]
  metrics: SystemMetrics
  lastCheck: Date
}

export interface ComponentHealth {
  name: string
  status: 'healthy' | 'degraded' | 'unhealthy'
  message?: string
  lastCheck: Date
}

export interface SystemMetrics {
  cpuUsage: number
  memoryUsage: number
  diskUsage: number
  networkLatency: number
  activeConnections: number
  queueSize: number
}















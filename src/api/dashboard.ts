import request from './index'

// 工作台统计数据接口
export interface DashboardStats {
  customers: number
  projects: number
  tasks: number
  revenue: number
}

export interface RecentActivity {
  id: number
  title: string
  user: string
  time: string
  color: string
  type: 'customer' | 'project' | 'task' | 'finance'
}

export interface TodoItem {
  key: string
  title: string
  priority: '高' | '中' | '低'
  deadline: string
  assignee: string
}

// 获取工作台统计数据
export const getDashboardStats = () => {
  return request<{
    code: number
    message: string
    data: DashboardStats
  }>({
    url: '/dashboard/stats',
    method: 'get'
  })
}

// 获取最新动态
export const getRecentActivities = (limit: number = 10) => {
  return request<{
    code: number
    message: string
    data: RecentActivity[]
  }>({
    url: '/dashboard/activities',
    method: 'get',
    params: { limit }
  })
}

// 获取待办事项
export const getTodoList = (params?: {
  status?: string
  priority?: string
  limit?: number
}) => {
  return request<{
    code: number
    message: string
    data: TodoItem[]
  }>({
    url: '/dashboard/todos',
    method: 'get',
    params
  })
}

// 获取快速统计数据
export const getQuickStats = () => {
  return request<{
    code: number
    message: string
    data: {
      todayTasks: number
      weekTasks: number
      pendingReviews: number
      unreadMessages: number
    }
  }>({
    url: '/dashboard/quick-stats',
    method: 'get'
  })
}

// 获取图表数据
export const getChartData = (type: 'revenue' | 'tasks' | 'customers', period: 'week' | 'month' | 'year') => {
  return request<{
    code: number
    message: string
    data: Array<{
      label: string
      value: number
    }>
  }>({
    url: '/dashboard/chart',
    method: 'get',
    params: { type, period }
  })
}

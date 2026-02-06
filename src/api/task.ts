import request from './index'

// 任务管理相关接口
export interface Task {
  id?: number
  title: string
  description?: string
  projectId?: number
  assigneeId?: number
  creatorId?: number
  status?: 'todo' | 'in_progress' | 'completed' | 'cancelled'
  priority?: 'low' | 'medium' | 'high'
  dueDate?: string
  estimatedHours?: number
  actualHours?: number
  tags?: string[]
  attachments?: string[]
  createdAt?: string
  updatedAt?: string
}

export interface TaskListResponse {
  code: number
  message: string
  data: {
    list: Task[]
    total: number
    page: number
    pageSize: number
  }
}

// 获取任务列表
export const getTaskList = (params: {
  page: number
  pageSize: number
  title?: string
  status?: string
  priority?: string
  projectId?: number
  assigneeId?: number
}) => {
  return request<TaskListResponse>({
    url: '/tasks',
    method: 'get',
    params
  })
}

// 获取任务详情
export const getTaskDetail = (id: number) => {
  return request<{
    code: number
    message: string
    data: Task
  }>({
    url: `/tasks/${id}`,
    method: 'get'
  })
}

// 创建任务
export const createTask = (data: Task) => {
  return request<{
    code: number
    message: string
    data: Task
  }>({
    url: '/tasks',
    method: 'post',
    data
  })
}

// 更新任务
export const updateTask = (id: number, data: Partial<Task>) => {
  return request<{
    code: number
    message: string
    data: Task
  }>({
    url: `/tasks/${id}`,
    method: 'put',
    data
  })
}

// 删除任务
export const deleteTask = (id: number) => {
  return request<{
    code: number
    message: string
  }>({
    url: `/tasks/${id}`,
    method: 'delete'
  })
}

// 更新任务状态
export const updateTaskStatus = (id: number, status: string) => {
  return request<{
    code: number
    message: string
  }>({
    url: `/tasks/${id}/status`,
    method: 'put',
    data: { status }
  })
}

// 分配任务
export const assignTask = (id: number, assigneeId: number) => {
  return request<{
    code: number
    message: string
  }>({
    url: `/tasks/${id}/assign`,
    method: 'put',
    data: { assigneeId }
  })
}

// 获取任务统计信息
export const getTaskStats = () => {
  return request<{
    code: number
    message: string
    data: {
      total: number
      todo: number
      inProgress: number
      completed: number
      overdue: number
      thisWeek: number
    }
  }>({
    url: '/tasks/stats',
    method: 'get'
  })
}

// 获取我的任务列表
export const getMyTasks = (params?: { status?: string }) => {
  return request<TaskListResponse>({
    url: '/tasks/my',
    method: 'get',
    params
  })
}

import request from './index'

// 项目管理相关接口
export interface Project {
  id?: number
  name: string
  code?: string
  description?: string
  customerId?: number
  managerId?: number
  status?: 'planning' | 'ongoing' | 'completed' | 'cancelled'
  priority?: 'low' | 'medium' | 'high'
  startDate?: string
  endDate?: string
  budget?: number
  progress?: number
  teamMembers?: number[]
  tags?: string[]
  createdAt?: string
  updatedAt?: string
}

export interface ProjectListResponse {
  code: number
  message: string
  data: {
    list: Project[]
    total: number
    page: number
    pageSize: number
  }
}

// 获取项目列表
export const getProjectList = (params: {
  page: number
  pageSize: number
  name?: string
  status?: string
  priority?: string
}) => {
  return request<ProjectListResponse>({
    url: '/projects',
    method: 'get',
    params
  })
}

// 获取项目详情
export const getProjectDetail = (id: number) => {
  return request<{
    code: number
    message: string
    data: Project
  }>({
    url: `/projects/${id}`,
    method: 'get'
  })
}

// 创建项目
export const createProject = (data: Project) => {
  return request<{
    code: number
    message: string
    data: Project
  }>({
    url: '/projects',
    method: 'post',
    data
  })
}

// 更新项目
export const updateProject = (id: number, data: Partial<Project>) => {
  return request<{
    code: number
    message: string
    data: Project
  }>({
    url: `/projects/${id}`,
    method: 'put',
    data
  })
}

// 删除项目
export const deleteProject = (id: number) => {
  return request<{
    code: number
    message: string
  }>({
    url: `/projects/${id}`,
    method: 'delete'
  })
}

// 更新项目进度
export const updateProjectProgress = (id: number, progress: number) => {
  return request<{
    code: number
    message: string
  }>({
    url: `/projects/${id}/progress`,
    method: 'put',
    data: { progress }
  })
}

// 获取项目统计信息
export const getProjectStats = () => {
  return request<{
    code: number
    message: string
    data: {
      total: number
      planning: number
      ongoing: number
      completed: number
      cancelled: number
      thisMonth: number
    }
  }>({
    url: '/projects/stats',
    method: 'get'
  })
}

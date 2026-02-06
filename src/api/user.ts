import request from './index'

// 用户管理相关接口
export interface User {
  id?: number
  username: string
  password?: string
  realName: string
  email?: string
  phone?: string
  department?: string
  position?: string
  status?: 'active' | 'inactive'
  roles?: string[]
  createdAt?: string
  updatedAt?: string
}

export interface UserListResponse {
  code: number
  message: string
  data: {
    list: User[]
    total: number
    page: number
    pageSize: number
  }
}

// 获取用户列表
export const getUserList = (params: {
  page: number
  pageSize: number
  username?: string
  status?: string
}) => {
  return request<UserListResponse>({
    url: '/users',
    method: 'get',
    params
  })
}

// 获取用户详情
export const getUserDetail = (id: number) => {
  return request<{
    code: number
    message: string
    data: User
  }>({
    url: `/users/${id}`,
    method: 'get'
  })
}

// 创建用户
export const createUser = (data: User) => {
  return request<{
    code: number
    message: string
    data: User
  }>({
    url: '/users',
    method: 'post',
    data
  })
}

// 更新用户
export const updateUser = (id: number, data: Partial<User>) => {
  return request<{
    code: number
    message: string
    data: User
  }>({
    url: `/users/${id}`,
    method: 'put',
    data
  })
}

// 删除用户
export const deleteUser = (id: number) => {
  return request<{
    code: number
    message: string
  }>({
    url: `/users/${id}`,
    method: 'delete'
  })
}

// 批量删除用户
export const batchDeleteUsers = (ids: number[]) => {
  return request<{
    code: number
    message: string
  }>({
    url: '/users/batch',
    method: 'delete',
    data: { ids }
  })
}

// 重置用户密码
export const resetUserPassword = (id: number, newPassword: string) => {
  return request<{
    code: number
    message: string
  }>({
    url: `/users/${id}/password`,
    method: 'put',
    data: { password: newPassword }
  })
}

// 获取当前用户信息
export const getCurrentUser = () => {
  return request<{
    code: number
    message: string
    data: User
  }>({
    url: '/users/profile',
    method: 'get'
  })
}

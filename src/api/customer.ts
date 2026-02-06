import request from './index'

// 客户管理相关接口
export interface Customer {
  id?: number
  name: string
  contactPerson?: string
  contactPhone?: string
  contactEmail?: string
  address?: string
  industry?: string
  companySize?: string
  status?: 'potential' | 'active' | 'inactive'
  source?: string
  notes?: string
  createdBy?: number
  createdAt?: string
  updatedAt?: string
}

export interface CustomerListResponse {
  code: number
  message: string
  data: {
    list: Customer[]
    total: number
    page: number
    pageSize: number
  }
}

// 获取客户列表
export const getCustomerList = (params: {
  page: number
  pageSize: number
  name?: string
  status?: string
  industry?: string
}) => {
  return request<CustomerListResponse>({
    url: '/customers',
    method: 'get',
    params
  })
}

// 获取客户详情
export const getCustomerDetail = (id: number) => {
  return request<{
    code: number
    message: string
    data: Customer
  }>({
    url: `/customers/${id}`,
    method: 'get'
  })
}

// 创建客户
export const createCustomer = (data: Customer) => {
  return request<{
    code: number
    message: string
    data: Customer
  }>({
    url: '/customers',
    method: 'post',
    data
  })
}

// 更新客户
export const updateCustomer = (id: number, data: Partial<Customer>) => {
  return request<{
    code: number
    message: string
    data: Customer
  }>({
    url: `/customers/${id}`,
    method: 'put',
    data
  })
}

// 删除客户
export const deleteCustomer = (id: number) => {
  return request<{
    code: number
    message: string
  }>({
    url: `/customers/${id}`,
    method: 'delete'
  })
}

// 批量删除客户
export const batchDeleteCustomers = (ids: number[]) => {
  return request<{
    code: number
    message: string
  }>({
    url: '/customers/batch',
    method: 'delete',
    data: { ids }
  })
}

// 获取客户统计信息
export const getCustomerStats = () => {
  return request<{
    code: number
    message: string
    data: {
      total: number
      potential: number
      active: number
      inactive: number
      thisMonth: number
    }
  }>({
    url: '/customers/stats',
    method: 'get'
  })
}

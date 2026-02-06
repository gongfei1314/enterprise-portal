import request from './index'

// 财务管理相关接口
export interface Transaction {
  id?: number
  type: 'income' | 'expense'
  category: string
  amount: number
  description?: string
  projectId?: number
  customerId?: number
  status?: 'pending' | 'approved' | 'rejected'
  transactionDate?: string
  createdBy?: number
  attachments?: string[]
  createdAt?: string
  updatedAt?: string
}

export interface Invoice {
  id?: number
  invoiceNo: string
  customerId?: number
  projectId?: number
  amount: number
  status?: 'draft' | 'sent' | 'paid' | 'overdue'
  issueDate?: string
  dueDate?: string
  items?: Array<{
    description: string
    quantity: number
    unitPrice: number
    amount: number
  }>
  notes?: string
  createdBy?: number
  createdAt?: string
  updatedAt?: string
}

export interface FinanceListResponse {
  code: number
  message: string
  data: {
    list: any[]
    total: number
    page: number
    pageSize: number
  }
}

// 获取交易记录列表
export const getTransactionList = (params: {
  page: number
  pageSize: number
  type?: string
  category?: string
  startDate?: string
  endDate?: string
}) => {
  return request<FinanceListResponse>({
    url: '/finance/transactions',
    method: 'get',
    params
  })
}

// 创建交易记录
export const createTransaction = (data: Transaction) => {
  return request<{
    code: number
    message: string
    data: Transaction
  }>({
    url: '/finance/transactions',
    method: 'post',
    data
  })
}

// 更新交易记录
export const updateTransaction = (id: number, data: Partial<Transaction>) => {
  return request<{
    code: number
    message: string
    data: Transaction
  }>({
    url: `/finance/transactions/${id}`,
    method: 'put',
    data
  })
}

// 删除交易记录
export const deleteTransaction = (id: number) => {
  return request<{
    code: number
    message: string
  }>({
    url: `/finance/transactions/${id}`,
    method: 'delete'
  })
}

// 获取发票列表
export const getInvoiceList = (params: {
  page: number
  pageSize: number
  status?: string
  customerId?: number
  startDate?: string
  endDate?: string
}) => {
  return request<FinanceListResponse>({
    url: '/finance/invoices',
    method: 'get',
    params
  })
}

// 创建发票
export const createInvoice = (data: Invoice) => {
  return request<{
    code: number
    message: string
    data: Invoice
  }>({
    url: '/finance/invoices',
    method: 'post',
    data
  })
}

// 更新发票
export const updateInvoice = (id: number, data: Partial<Invoice>) => {
  return request<{
    code: number
    message: string
    data: Invoice
  }>({
    url: `/finance/invoices/${id}`,
    method: 'put',
    data
  })
}

// 删除发票
export const deleteInvoice = (id: number) => {
  return request<{
    code: number
    message: string
  }>({
    url: `/finance/invoices/${id}`,
    method: 'delete'
  })
}

// 获取财务统计信息
export const getFinanceStats = (params?: { startDate?: string; endDate?: string }) => {
  return request<{
    code: number
    message: string
    data: {
      totalIncome: number
      totalExpense: number
      netProfit: number
      pendingAmount: number
      thisMonthIncome: number
      thisMonthExpense: number
    }
  }>({
    url: '/finance/stats',
    method: 'get',
    params
  })
}

// 获取财务报表数据
export const getFinanceReport = (params: {
  type: 'income' | 'expense' | 'profit'
  startDate: string
  endDate: string
  groupBy: 'day' | 'week' | 'month'
}) => {
  return request<{
    code: number
    message: string
    data: Array<{
      date: string
      amount: number
    }>
  }>({
    url: '/finance/report',
    method: 'get',
    params
  })
}

// API 配置
export const API_CONFIG = {
  // 开发环境：是否使用 Mock 数据
  useMock: import.meta.env.VITE_USE_MOCK === 'true' || false,

  // 开发环境：是否直接使用后端 API（需要后端服务运行）
  useRealApi: import.meta.env.VITE_USE_REAL_API === 'true' || false,

  // API 基础路径（通过网关访问）
  baseURL: '/api',

  // 认证服务路径
  authURL: '/oauth2'
}

// 响应码枚举
export enum ResponseCode {
  SUCCESS = 200,
  ERROR = 500,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  VALIDATION_ERROR = 400
}

// 响应消息枚举
export enum ResponseMessage {
  SUCCESS = '操作成功',
  ERROR = '操作失败',
  UNAUTHORIZED = '未授权，请先登录',
  FORBIDDEN = '无权限访问',
  NOT_FOUND = '资源不存在',
  VALIDATION_ERROR = '参数验证失败',
  SERVER_ERROR = '服务器错误'
}

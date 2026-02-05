import request from './index'

// 用户登录
export const login = (data: { username: string; password: string }) => {
  return request({
    url: '/auth/login',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 获取当前用户信息
export const getUserInfo = () => {
  return request({
    url: '/auth/user/info',
    method: 'get'
  })
}

// 用户登出
export const logout = () => {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}

// 刷新token
export const refreshToken = (refreshToken: string) => {
  return request({
    url: '/oauth2/token',
    method: 'post',
    data: {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

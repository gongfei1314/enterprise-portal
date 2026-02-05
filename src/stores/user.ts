import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login as loginApi, getUserInfo as getUserInfoApi, logout as logoutApi } from '@/api/auth'
import { message } from 'ant-design-vue'

interface UserInfo {
  id: number
  username: string
  realName: string
  email: string
  phone: string
  avatar?: string
}

export const useUserStore = defineStore('user', () => {
  const token = ref<string>(localStorage.getItem('access_token') || '')
  const userInfo = ref<UserInfo | null>(
    localStorage.getItem('user_info')
      ? JSON.parse(localStorage.getItem('user_info')!)
      : null
  )
  const isLoggedIn = ref<boolean>(!!token.value)

  // 登录
  const login = async (username: string, password: string) => {
    try {
      // 开发模式：模拟登录（用于测试前端界面）
      if (import.meta.env.DEV) {
        // 模拟测试账号验证
        const validAccounts = {
          admin: 'admin123',
          user: 'user123',
          test: 'test123'
        }

        if (validAccounts[username] && validAccounts[username] === password) {
          // 模拟成功登录
          const mockToken = 'mock-jwt-token-' + Date.now()
          const mockUserInfo: UserInfo = {
            id: username === 'admin' ? 1 : 2,
            username: username,
            realName: username === 'admin' ? '系统管理员' : (username === 'user' ? '普通用户' : '测试用户'),
            email: `${username}@example.com`,
            phone: '13800138000'
          }

          token.value = mockToken
          userInfo.value = mockUserInfo
          isLoggedIn.value = true

          localStorage.setItem('access_token', mockToken)
          localStorage.setItem('user_info', JSON.stringify(mockUserInfo))

          message.success('登录成功（开发模式）')
          return true
        } else {
          message.error('用户名或密码错误')
          return false
        }
      }

      // 生产模式：真实 API 调用
      const formData = new URLSearchParams()
      formData.append('username', username)
      formData.append('password', password)

      const response: any = await loginApi({ username, password })

      if (response?.access_token) {
        token.value = response.access_token
        isLoggedIn.value = true
        localStorage.setItem('access_token', response.access_token)

        if (response.refresh_token) {
          localStorage.setItem('refresh_token', response.refresh_token)
        }

        // 获取用户信息
        await fetchUserInfo()

        message.success('登录成功')
        return true
      }
      return false
    } catch (error) {
      console.error('Login failed:', error)
      message.error('登录失败，请稍后重试')
      return false
    }
  }

  // 获取用户信息
  const fetchUserInfo = async () => {
    try {
      const response: any = await getUserInfoApi()
      if (response) {
        userInfo.value = response
        localStorage.setItem('user_info', JSON.stringify(response))
      }
    } catch (error) {
      console.error('Failed to fetch user info:', error)
    }
  }

  // 登出
  const logout = async () => {
    try {
      await logoutApi()
    } catch (error) {
      console.error('Logout API failed:', error)
    } finally {
      token.value = ''
      userInfo.value = null
      isLoggedIn.value = false
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('user_info')
      message.success('已退出登录')
    }
  }

  // 检查认证状态
  const checkAuth = () => {
    const savedToken = localStorage.getItem('access_token')
    const savedUserInfo = localStorage.getItem('user_info')

    if (savedToken && savedUserInfo) {
      token.value = savedToken
      userInfo.value = JSON.parse(savedUserInfo)
      isLoggedIn.value = true
      return true
    }
    return false
  }

  return {
    token,
    userInfo,
    isLoggedIn,
    login,
    logout,
    fetchUserInfo,
    checkAuth
  }
})

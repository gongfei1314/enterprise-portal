import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/DashboardView.vue'),
        meta: { title: '工作台' }
      },
      {
        path: 'users',
        name: 'Users',
        component: () => import('@/views/UsersView.vue'),
        meta: { title: '用户管理' }
      },
      {
        path: 'customers',
        name: 'Customers',
        component: () => import('@/views/CustomersView.vue'),
        meta: { title: '客户管理' }
      },
      {
        path: 'projects',
        name: 'Projects',
        component: () => import('@/views/ProjectsView.vue'),
        meta: { title: '项目管理' }
      },
      {
        path: 'tasks',
        name: 'Tasks',
        component: () => import('@/views/TasksView.vue'),
        meta: { title: '任务管理' }
      },
      {
        path: 'finance',
        name: 'Finance',
        component: () => import('@/views/FinanceView.vue'),
        meta: { title: '财务管理' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 检查 localStorage 中是否有 token
  const token = localStorage.getItem('access_token')

  // 检查路由是否需要认证
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth !== false)

  if (requiresAuth && !token) {
    // 需要认证但未登录，跳转到登录页
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else if (to.name === 'Login' && token) {
    // 已登录但访问登录页，跳转到首页
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router


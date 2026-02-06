<template>
  <a-layout class="main-layout">
    <!-- 侧边栏 -->
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      theme="dark"
      class="sidebar"
    >
      <div class="logo">
        <h2 v-if="!collapsed">企业门户</h2>
        <h2 v-else>门户</h2>
      </div>

      <a-menu
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        mode="inline"
        theme="dark"
        :inline-collapsed="collapsed"
      >
        <a-menu-item key="dashboard" @click="$router.push('/')">
          <template #icon>
            <DashboardOutlined />
          </template>
          <span>工作台</span>
        </a-menu-item>

        <a-menu-item key="users" @click="$router.push('/users')">
          <template #icon>
            <UserOutlined />
          </template>
          <span>用户管理</span>
        </a-menu-item>

        <a-menu-item key="customers" @click="$router.push('/customers')">
          <template #icon>
            <TeamOutlined />
          </template>
          <span>客户管理</span>
        </a-menu-item>

        <a-menu-item key="projects" @click="$router.push('/projects')">
          <template #icon>
            <ProjectOutlined />
          </template>
          <span>项目管理</span>
        </a-menu-item>

        <a-menu-item key="tasks" @click="$router.push('/tasks')">
          <template #icon>
            <CheckSquareOutlined />
          </template>
          <span>任务管理</span>
        </a-menu-item>

        <a-menu-item key="finance" @click="$router.push('/finance')">
          <template #icon>
            <DollarOutlined />
          </template>
          <span>财务管理</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout
      class="main-content"
      :style="{
        width: collapsed ? 'calc(100vw - 80px)' : 'calc(100vw - 200px)',
        marginLeft: collapsed ? '80px' : '200px'
      }"
    >
      <!-- 顶部导航 -->
      <a-layout-header class="header">
        <div class="header-left">
          <MenuUnfoldOutlined
            v-if="collapsed"
            class="trigger"
            @click="collapsed = !collapsed"
          />
          <MenuFoldOutlined
            v-else
            class="trigger"
            @click="collapsed = !collapsed"
          />

          <a-breadcrumb class="breadcrumb">
            <a-breadcrumb-item v-for="item in breadcrumbs" :key="item.path">
              {{ item.title }}
            </a-breadcrumb-item>
          </a-breadcrumb>
        </div>

        <div class="header-right">
          <a-space :size="16">
            <a-badge :count="notifications" :offset="[-5, 5]">
              <BellOutlined style="font-size: 18px; cursor: pointer" />
            </a-badge>

            <a-dropdown>
              <div class="user-info">
                <a-avatar :size="32" style="margin-right: 8px">
                  <template #icon>
                    <UserOutlined />
                  </template>
                </a-avatar>
                <span class="username">{{ userStore.userInfo?.realName || userStore.userInfo?.username }}</span>
              </div>
              <template #overlay>
                <a-menu>
                  <a-menu-item key="profile">
                    <UserOutlined />
                    个人中心
                  </a-menu-item>
                  <a-menu-item key="settings">
                    <SettingOutlined />
                    设置
                  </a-menu-item>
                  <a-menu-divider />
                  <a-menu-item key="logout" @click="handleLogout">
                    <LogoutOutlined />
                    退出登录
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </a-space>
        </div>
      </a-layout-header>

      <!-- 主内容区 -->
      <a-layout-content class="content">
        <div class="content-wrapper">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  ProjectOutlined,
  CheckSquareOutlined,
  DollarOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const collapsed = ref(false)
const notifications = ref(5)
const selectedKeys = ref<string[]>(['dashboard'])
const openKeys = ref<string[]>([])

// 面包屑导航
const breadcrumbs = computed(() => {
  const matched = route.matched.filter(item => item.meta && item.meta.title)
  return matched.map(item => ({
    path: item.path,
    title: item.meta.title as string
  }))
})

// 监听路由变化更新选中的菜单
watch(
  () => route.path,
  (newPath) => {
    const path = newPath.split('/')[1] || 'dashboard'
    selectedKeys.value = [path]
  },
  { immediate: true }
)

// 退出登录
const handleLogout = () => {
  Modal.confirm({
    title: '确认退出',
    content: '您确定要退出登录吗？',
    okText: '确定',
    cancelText: '取消',
    onOk: async () => {
      await userStore.logout()
      router.push('/login')
    }
  })
}
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
  display: flex;
  width: 100%;
}

.sidebar {
  position: fixed !important;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 1000;
}

.logo {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  margin: 16px;
  border-radius: 8px;
}

.logo h2 {
  color: white;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}

.main-content {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  background: white;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  position: sticky;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 64px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.trigger {
  font-size: 18px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.breadcrumb {
  margin-left: 16px;
}

.header-right {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background 0.3s;
}

.user-info:hover {
  background: #f0f0f0;
}

.username {
  font-size: 14px;
  color: #333;
}

.content {
  margin: 24px;
  padding: 0;
  min-height: calc(100vh - 88px);
  flex: 1;
  width: 100%;
}

.content-wrapper {
  background: white;
  border-radius: 8px;
  padding: 24px;
  min-height: calc(100vh - 136px);
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
}

.content-wrapper > * {
  width: 100%;
  max-width: 100%;
}

.content-wrapper :deep(.ant-card) {
  width: 100%;
  max-width: 100%;
}

.content-wrapper :deep(.ant-row) {
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.content-wrapper :deep(.ant-col) {
  flex: 0 0 auto;
  max-width: 100%;
}

/* 路由切换动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

:deep(.ant-menu) {
  border-right: none;
}

:deep(.ant-layout-sider-children) {
  display: flex;
  flex-direction: column;
}

/* 确保卡片组件正常显示 */
:deep(.ant-card) {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}

:deep(.ant-card-head) {
  border-bottom: 1px solid #f0f0f0;
}

:deep(.ant-row) {
  display: flex;
  flex-flow: row wrap;
}

:deep(.ant-col) {
  max-width: 100%;
}
</style>

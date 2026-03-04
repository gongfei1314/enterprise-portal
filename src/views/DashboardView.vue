<template>
  <div class="dashboard">
    <div class="stats-row">
      <a-card class="stat-card">
        <a-statistic
          title="总客户数"
          :value="statistics.customers"
          :value-style="{ color: '#3f8600' }"
        >
          <template #prefix>
            <TeamOutlined style="font-size: 24px" />
          </template>
        </a-statistic>
      </a-card>

      <a-card class="stat-card">
        <a-statistic
          title="进行中项目"
          :value="statistics.projects"
          :value-style="{ color: '#1890ff' }"
        >
          <template #prefix>
            <ProjectOutlined style="font-size: 24px" />
          </template>
        </a-statistic>
      </a-card>

      <a-card class="stat-card">
        <a-statistic
          title="待处理任务"
          :value="statistics.tasks"
          :value-style="{ color: '#cf1322' }"
        >
          <template #prefix>
            <CheckSquareOutlined style="font-size: 24px" />
          </template>
        </a-statistic>
      </a-card>

      <a-card class="stat-card">
        <a-statistic
          title="本月收入（万元）"
          :value="statistics.revenue"
          :value-style="{ color: '#faad14' }"
          :precision="2"
        >
          <template #prefix>
            <DollarOutlined style="font-size: 24px" />
          </template>
        </a-statistic>
      </a-card>
    </div>

    <div class="content-row">
      <a-card title="最新动态" :bordered="false" class="content-card">
        <a-list :data-source="recentActivities" size="small">
          <template #renderItem="{ item }">
            <a-list-item>
              <a-list-item-meta :description="item.time">
                <template #title>
                  <span>{{ item.title }}</span>
                </template>
                <template #avatar>
                  <a-avatar :style="{ backgroundColor: item.color }">
                    {{ item.user.charAt(0) }}
                  </a-avatar>
                </template>
              </a-list-item-meta>
            </a-list-item>
          </template>
        </a-list>
      </a-card>

      <a-card title="快捷操作" :bordered="false" class="content-card">
        <div class="quick-actions-grid">
          <div class="quick-action" @click="$router.push('/customers')">
            <TeamOutlined style="font-size: 32px; color: #1890ff" />
            <div>客户管理</div>
          </div>
          <div class="quick-action" @click="$router.push('/projects')">
            <ProjectOutlined style="font-size: 32px; color: #52c41a" />
            <div>项目管理</div>
          </div>
          <div class="quick-action" @click="$router.push('/tasks')">
            <CheckSquareOutlined style="font-size: 32px; color: #faad14" />
            <div>任务管理</div>
          </div>
          <div class="quick-action" @click="$router.push('/finance')">
            <DollarOutlined style="font-size: 32px; color: #f5222d" />
            <div>财务管理</div>
          </div>
          <div class="quick-action" @click="$router.push('/users')">
            <UserOutlined style="font-size: 32px; color: #722ed1" />
            <div>用户管理</div>
          </div>
        </div>
      </a-card>
    </div>

    <a-row style="margin-top: 24px">
      <a-col :span="24">
        <a-card title="待办事项" :bordered="false">
          <a-table
            :columns="todoColumns"
            :data-source="todoList"
            :pagination="false"
            size="small"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'priority'">
                <a-tag :color="getPriorityColor(record.priority)">
                  {{ record.priority }}
                </a-tag>
              </template>
              <template v-else-if="column.key === 'action'">
                <a-space>
                  <a-button type="link" size="small">查看</a-button>
                  <a-button type="link" size="small">处理</a-button>
                </a-space>
              </template>
            </template>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  TeamOutlined,
  ProjectOutlined,
  CheckSquareOutlined,
  DollarOutlined,
  UserOutlined
} from '@ant-design/icons-vue'
import { getDashboardStats, getRecentActivities, getTodoList } from '@/api/dashboard'
import type { DashboardStats, RecentActivity, TodoItem } from '@/api/dashboard'
import { message } from 'ant-design-vue'

// 统计数据
const statistics = ref<DashboardStats>({
  customers: 0,
  projects: 0,
  tasks: 0,
  revenue: 0
})

// 最新动态
const recentActivities = ref<RecentActivity[]>([])

// 待办事项表格
const todoColumns = [
  {
    title: '任务名称',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: '优先级',
    dataIndex: 'priority',
    key: 'priority'
  },
  {
    title: '截止日期',
    dataIndex: 'deadline',
    key: 'deadline'
  },
  {
    title: '负责人',
    dataIndex: 'assignee',
    key: 'assignee'
  },
  {
    title: '操作',
    key: 'action',
    width: 150
  }
]

const todoList = ref<TodoItem[]>([])
const loading = ref(false)

const getPriorityColor = (priority: string) => {
  const colorMap: Record<string, string> = {
    高: 'red',
    中: 'orange',
    低: 'green'
  }
  return colorMap[priority] || 'default'
}

// 加载工作台数据
const loadDashboardData = async () => {
  loading.value = true
  try {
    // 开发模式：使用模拟数据
    if (import.meta.env.DEV) {
      // 模拟统计数据
      statistics.value = {
        customers: 128,
        projects: 24,
        tasks: 15,
        revenue: 45.8
      }

      // 模拟最新动态
      recentActivities.value = [
        { id: 1, type: 'customer', title: '新增客户：某某科技公司', time: '5分钟前' },
        { id: 2, type: 'project', title: '项目进度更新：ERP系统开发', time: '15分钟前' },
        { id: 3, type: 'task', title: '完成任务：代码审查', time: '1小时前' },
        { id: 4, type: 'finance', title: '收款确认：某某公司首付', time: '2小时前' }
      ]

      // 模拟待办事项
      todoList.value = [
        { id: 1, title: '完成客户需求文档', priority: 'high', deadline: '2026-02-26' },
        { id: 2, title: '项目进度会议', priority: 'medium', deadline: '2026-02-27' },
        { id: 3, title: '审核财务报表', priority: 'low', deadline: '2026-02-28' }
      ]

      loading.value = false
      return
    }

    // 生产模式：调用真实API
    // 并行加载所有数据
    const [statsRes, activitiesRes, todosRes] = await Promise.allSettled([
      getDashboardStats(),
      getRecentActivities(10),
      getTodoList({ limit: 10 })
    ])

    // 处理统计数据
    if (statsRes.status === 'fulfilled' && statsRes.value.code === 200) {
      statistics.value = statsRes.value.data
    }

    // 处理最新动态
    if (activitiesRes.status === 'fulfilled' && activitiesRes.value.code === 200) {
      recentActivities.value = activitiesRes.value.data
    }

    // 处理待办事项
    if (todosRes.status === 'fulfilled' && todosRes.value.code === 200) {
      todoList.value = todosRes.value.data
    }
  } catch (error) {
    console.error('Failed to load dashboard data:', error)
    message.error('加载数据失败')
  } finally {
    loading.value = false
  }
}

// 组件挂载时加载数据
onMounted(() => {
  loadDashboardData()
})
</script>

<style scoped>
.dashboard {
  padding: 0;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
}

.stats-row {
  display: flex;
  gap: 24px;
  width: 100%;
  margin-bottom: 0;
}

.stats-row .stat-card {
  flex: 1;
  min-width: 0;
  margin-bottom: 0 !important;
}

.content-row {
  display: flex;
  gap: 24px;
  width: 100%;
  margin-top: 24px;
}

.content-row .content-card {
  flex: 1;
  min-width: 0;
}

.quick-actions-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.quick-actions-grid .quick-action:nth-child(4),
.quick-actions-grid .quick-action:nth-child(5) {
  grid-column: span 1;
}

.quick-action {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: #fafafa;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  min-height: 100px;
}

.quick-action:hover {
  background: #e6f7ff;
  transform: translateY(-2px);
}

.quick-action div {
  margin-top: 12px;
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.stat-card {
  margin-bottom: 0 !important;
}

:deep(.ant-statistic) {
  padding: 8px 0;
}

:deep(.ant-statistic-title) {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 8px;
}

:deep(.ant-statistic-content) {
  font-size: 28px;
  font-weight: 600;
}

.quick-action {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: #fafafa;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  height: 100%;
  min-height: 100px;
}

.quick-action:hover {
  background: #e6f7ff;
  transform: translateY(-2px);
}

.quick-action div {
  margin-top: 12px;
  font-size: 14px;
  color: #333;
  font-weight: 500;
}
</style>

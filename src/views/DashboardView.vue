<template>
  <div class="dashboard">
    <a-row :gutter="24">
      <a-col :span="6">
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
      </a-col>

      <a-col :span="6">
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
      </a-col>

      <a-col :span="6">
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
      </a-col>

      <a-col :span="6">
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
      </a-col>
    </a-row>

    <a-row :gutter="24" style="margin-top: 24px">
      <a-col :span="12">
        <a-card title="最新动态" :bordered="false">
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
      </a-col>

      <a-col :span="12">
        <a-card title="快捷操作" :bordered="false">
          <a-row :gutter="16">
            <a-col :span="8">
              <div class="quick-action" @click="$router.push('/customers')">
                <TeamOutlined style="font-size: 32px; color: #1890ff" />
                <div>客户管理</div>
              </div>
            </a-col>
            <a-col :span="8">
              <div class="quick-action" @click="$router.push('/projects')">
                <ProjectOutlined style="font-size: 32px; color: #52c41a" />
                <div>项目管理</div>
              </div>
            </a-col>
            <a-col :span="8">
              <div class="quick-action" @click="$router.push('/tasks')">
                <CheckSquareOutlined style="font-size: 32px; color: #faad14" />
                <div>任务管理</div>
              </div>
            </a-col>
          </a-row>
          <a-row :gutter="16" style="margin-top: 16px">
            <a-col :span="8">
              <div class="quick-action" @click="$router.push('/finance')">
                <DollarOutlined style="font-size: 32px; color: #f5222d" />
                <div>财务管理</div>
              </div>
            </a-col>
            <a-col :span="8">
              <div class="quick-action" @click="$router.push('/users')">
                <UserOutlined style="font-size: 32px; color: #722ed1" />
                <div>用户管理</div>
              </div>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>

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
import { ref } from 'vue'
import {
  TeamOutlined,
  ProjectOutlined,
  CheckSquareOutlined,
  DollarOutlined,
  UserOutlined
} from '@ant-design/icons-vue'

// 统计数据
const statistics = ref({
  customers: 128,
  projects: 45,
  tasks: 23,
  revenue: 156.8
})

// 最新动态
const recentActivities = ref([
  {
    title: '新增客户：科技有限公司',
    user: '张三',
    time: '10分钟前',
    color: '#1890ff'
  },
  {
    title: '项目进度更新：ERP系统开发',
    user: '李四',
    time: '30分钟前',
    color: '#52c41a'
  },
  {
    title: '任务完成：需求文档评审',
    user: '王五',
    time: '1小时前',
    color: '#faad14'
  },
  {
    title: '财务审批：报销单 #2026001',
    user: '赵六',
    time: '2小时前',
    color: '#f5222d'
  }
])

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

const todoList = ref([
  {
    key: '1',
    title: '完成客户需求分析报告',
    priority: '高',
    deadline: '2026-02-06',
    assignee: '张三'
  },
  {
    key: '2',
    title: '项目进度汇报会议',
    priority: '中',
    deadline: '2026-02-07',
    assignee: '李四'
  },
  {
    key: '3',
    title: '审核财务报销单据',
    priority: '高',
    deadline: '2026-02-06',
    assignee: '王五'
  },
  {
    key: '4',
    title: '更新项目计划文档',
    priority: '低',
    deadline: '2026-02-10',
    assignee: '赵六'
  }
])

const getPriorityColor = (priority: string) => {
  const colorMap: Record<string, string> = {
    高: 'red',
    中: 'orange',
    低: 'green'
  }
  return colorMap[priority] || 'default'
}
</script>

<style scoped>
.dashboard {
  padding: 0;
}

.dashboard :deep(.ant-row) {
  display: flex;
  flex-wrap: wrap;
  margin-left: 0 !important;
  margin-right: 0 !important;
}

.dashboard :deep(.ant-col) {
  flex: 0 0 auto;
  max-width: 100%;
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

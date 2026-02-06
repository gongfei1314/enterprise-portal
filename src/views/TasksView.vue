<template>
  <div class="tasks-page">
    <a-card :bordered="false" class="full-height-card">
      <template #title>
        <a-space>
          <CheckSquareOutlined />
          <span>任务管理</span>
        </a-space>
      </template>

      <template #extra>
        <a-button type="primary">
          <template #icon>
            <PlusOutlined />
          </template>
          新建任务
        </a-button>
      </template>

      <a-alert
        message="任务管理功能开发中"
        description="该模块将提供任务分配、进度跟踪、时间记录、协同评论等功能"
        type="info"
        show-icon
        style="margin-bottom: 24px"
      />

      <a-empty description="暂无任务数据" />

      <div class="feature-preview">
        <a-row :gutter="[16, 16]">
          <a-col :span="6">
            <div class="feature-card">
              <UnorderedListOutlined style="font-size: 32px; color: #1890ff" />
              <h3>任务列表</h3>
              <p>看板视图、列表视图、任务优先级</p>
            </div>
          </a-col>
          <a-col :span="6">
            <div class="feature-card">
              <ClockCircleOutlined style="font-size: 32px; color: #52c41a" />
              <h3>时间记录</h3>
              <p>工时统计、时间跟踪、效率分析</p>
            </div>
          </a-col>
          <a-col :span="6">
            <div class="feature-card">
              <CommentOutlined style="font-size: 32px; color: #faad14" />
              <h3>协同评论</h3>
              <p>任务讨论、文件共享、即时通讯</p>
            </div>
          </a-col>
          <a-col :span="6">
            <div class="feature-card">
              <TrophyOutlined style="font-size: 32px; color: #f5222d" />
              <h3>绩效统计</h3>
              <p>任务完成率、工作效率、KPI统计</p>
            </div>
          </a-col>
        </a-row>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { CheckSquareOutlined, PlusOutlined, UnorderedListOutlined, ClockCircleOutlined, CommentOutlined, TrophyOutlined } from '@ant-design/icons-vue'
</script>

<style scoped>
.tasks-page {
  padding: 0;
  height: 100%;
}

.tasks-page :deep(.ant-row) {
  display: flex;
  flex-wrap: wrap;
}

.tasks-page :deep(.ant-col) {
  flex: 0 0 auto;
  max-width: 100%;
}

.full-height-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.full-height-card :deep(.ant-card-body) {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.feature-preview {
  margin-top: 24px;
}

.feature-card {
  text-align: center;
  padding: 24px;
  background: #fafafa;
  border-radius: 8px;
  transition: all 0.3s;
}

.feature-card:hover {
  background: #e6f7ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.feature-card h3 {
  margin: 12px 0 8px;
  font-size: 16px;
  color: #333;
}

.feature-card p {
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}
</style>

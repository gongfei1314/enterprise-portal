<template>
  <div class="projects-page">
    <a-card :bordered="false" class="full-height-card">
      <template #title>
        <a-space>
          <ProjectOutlined />
          <span>项目管理</span>
        </a-space>
      </template>

      <template #extra>
        <a-button type="primary">
          <template #icon>
            <PlusOutlined />
          </template>
          新建项目
        </a-button>
      </template>

      <a-alert
        message="项目管理功能开发中"
        description="该模块将提供项目创建、进度跟踪、团队协作、里程碑管理等功能"
        type="info"
        show-icon
        style="margin-bottom: 24px"
      />

      <a-empty description="暂无项目数据" />

      <div class="feature-preview">
        <a-row :gutter="[16, 16]">
          <a-col :span="6">
            <div class="feature-card">
              <FolderOpenOutlined style="font-size: 32px; color: #1890ff" />
              <h3>项目创建</h3>
              <p>创建项目、设置目标、定义里程碑</p>
            </div>
          </a-col>
          <a-col :span="6">
            <div class="feature-card">
              <CalendarOutlined style="font-size: 32px; color: #52c41a" />
              <h3>进度跟踪</h3>
              <p>甘特图、任务进度、时间线管理</p>
            </div>
          </a-col>
          <a-col :span="6">
            <div class="feature-card">
              <TeamOutlined style="font-size: 32px; color: #faad14" />
              <h3>团队协作</h3>
              <p>项目成员管理、任务分配、协作沟通</p>
            </div>
          </a-col>
          <a-col :span="6">
            <div class="feature-card">
              <PieChartOutlined style="font-size: 32px; color: #f5222d" />
              <h3>项目报表</h3>
              <p>项目统计、资源分析、成本控制</p>
            </div>
          </a-col>
        </a-row>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ProjectOutlined, PlusOutlined, FolderOpenOutlined, CalendarOutlined, TeamOutlined, PieChartOutlined } from '@ant-design/icons-vue'
</script>

<style scoped>
.projects-page {
  padding: 0;
  height: 100%;
}

.projects-page :deep(.ant-row) {
  display: flex;
  flex-wrap: wrap;
}

.projects-page :deep(.ant-col) {
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

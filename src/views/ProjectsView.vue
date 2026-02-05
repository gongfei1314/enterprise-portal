<template>
  <div class="projects-page">
    <a-card :bordered="false">
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
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ProjectOutlined, PlusOutlined } from '@ant-design/icons-vue'
</script>

<style scoped>
.projects-page {
  padding: 0;
}
</style>

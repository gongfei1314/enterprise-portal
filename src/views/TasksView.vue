<template>
  <div class="tasks-page">
    <a-card :bordered="false">
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
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { CheckSquareOutlined, PlusOutlined } from '@ant-design/icons-vue'
</script>

<style scoped>
.tasks-page {
  padding: 0;
}
</style>

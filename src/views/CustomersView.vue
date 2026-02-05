<template>
  <div class="customers-page">
    <a-card :bordered="false">
      <template #title>
        <a-space>
          <TeamOutlined />
          <span>客户管理</span>
        </a-space>
      </template>

      <template #extra>
        <a-button type="primary">
          <template #icon>
            <PlusOutlined />
          </template>
          新增客户
        </a-button>
      </template>

      <a-alert
        message="客户管理功能开发中"
        description="该模块将提供客户信息管理、跟进记录、商务洽谈等功能"
        type="info"
        show-icon
        style="margin-bottom: 24px"
      />

      <a-empty description="暂无客户数据" />
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { TeamOutlined, PlusOutlined } from '@ant-design/icons-vue'
</script>

<style scoped>
.customers-page {
  padding: 0;
}
</style>

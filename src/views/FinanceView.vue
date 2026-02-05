<template>
  <div class="finance-page">
    <a-card :bordered="false">
      <template #title>
        <a-space>
          <DollarOutlined />
          <span>财务管理</span>
        </a-space>
      </template>

      <template #extra>
        <a-button type="primary">
          <template #icon>
            <PlusOutlined />
          </template>
          新建账单
        </a-button>
      </template>

      <a-alert
        message="财务管理功能开发中"
        description="该模块将提供发票管理、收支记录、费用报销、财务报表等功能"
        type="info"
        show-icon
        style="margin-bottom: 24px"
      />

      <a-empty description="暂无财务数据" />
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { DollarOutlined, PlusOutlined } from '@ant-design/icons-vue'
</script>

<style scoped>
.finance-page {
  padding: 0;
}
</style>

<template>
  <div class="finance-page">
    <a-card :bordered="false" class="full-height-card">
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

      <div class="feature-preview">
        <a-row :gutter="[16, 16]">
          <a-col :span="6">
            <div class="feature-card">
              <FileTextOutlined style="font-size: 32px; color: #1890ff" />
              <h3>发票管理</h3>
              <p>发票开具、发票跟踪、税务管理</p>
            </div>
          </a-col>
          <a-col :span="6">
            <div class="feature-card">
              <TransactionOutlined style="font-size: 32px; color: #52c41a" />
              <h3>收支记录</h3>
              <p>收入统计、支出记录、利润分析</p>
            </div>
          </a-col>
          <a-col :span="6">
            <div class="feature-card">
              <AccountBookOutlined style="font-size: 32px; color: #faad14" />
              <h3>费用报销</h3>
              <p>报销申请、审批流程、费用控制</p>
            </div>
          </a-col>
          <a-col :span="6">
            <div class="feature-card">
              <AreaChartOutlined style="font-size: 32px; color: #f5222d" />
              <h3>财务报表</h3>
              <p>资产负债表、现金流量表、利润表</p>
            </div>
          </a-col>
        </a-row>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { DollarOutlined, PlusOutlined, FileTextOutlined, TransactionOutlined, AccountBookOutlined, AreaChartOutlined } from '@ant-design/icons-vue'
</script>

<style scoped>
.finance-page {
  padding: 0;
  height: 100%;
}

.finance-page :deep(.ant-row) {
  display: flex;
  flex-wrap: wrap;
}

.finance-page :deep(.ant-col) {
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

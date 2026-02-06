<template>
  <div class="customers-page">
    <a-card :bordered="false" class="full-height-card">
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

      <div class="feature-preview">
        <a-row :gutter="[16, 16]">
          <a-col :span="6">
            <div class="feature-card">
              <TeamOutlined style="font-size: 32px; color: #1890ff" />
              <h3>客户信息</h3>
              <p>管理客户基本信息、联系方式、公司资料</p>
            </div>
          </a-col>
          <a-col :span="6">
            <div class="feature-card">
              <FileTextOutlined style="font-size: 32px; color: #52c41a" />
              <h3>跟进记录</h3>
              <p>记录客户沟通历史、商务洽谈进展</p>
            </div>
          </a-col>
          <a-col :span="6">
            <div class="feature-card">
              <ScheduleOutlined style="font-size: 32px; color: #faad14" />
              <h3>回访提醒</h3>
              <p>设置定期回访计划，不错过重要客户</p>
            </div>
          </a-col>
          <a-col :span="6">
            <div class="feature-card">
              <BarChartOutlined style="font-size: 32px; color: #f5222d" />
              <h3>数据分析</h3>
              <p>客户数据分析、销售漏斗、转化率统计</p>
            </div>
          </a-col>
        </a-row>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { TeamOutlined, PlusOutlined, FileTextOutlined, ScheduleOutlined, BarChartOutlined } from '@ant-design/icons-vue'
</script>

<style scoped>
.customers-page {
  padding: 0;
  height: 100%;
}

.customers-page :deep(.ant-row) {
  display: flex;
  flex-wrap: wrap;
}

.customers-page :deep(.ant-col) {
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

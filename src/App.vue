<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <a-config-provider :theme="{ token: { colorPrimary: '#1890ff' } }">
    <RouterView />
  </a-config-provider>
</template>

<style>
/* 基础重置 */
* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.85);
  background-color: #f0f2f5;
  writing-mode: horizontal-tb;
}

#app {
  width: 100%;
  min-height: 100vh;
}

/* 确保 Ant Design 组件正常显示 */
.ant-layout,
.ant-layout * {
  box-sizing: border-box;
  writing-mode: horizontal-tb;
}

/* 确保 row 和 col 正常布局 */
.ant-row {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.ant-col {
  flex: 0 0 auto;
  max-width: 100%;
}
</style>


<template>
  <div class="users-page">
    <a-card :bordered="false">
      <template #title>
        <a-space>
          <UserOutlined />
          <span>用户管理</span>
        </a-space>
      </template>

      <template #extra>
        <a-button type="primary" @click="showAddModal">
          <template #icon>
            <PlusOutlined />
          </template>
          新增用户
        </a-button>
      </template>

      <!-- 搜索表单 -->
      <a-form layout="inline" style="margin-bottom: 16px">
        <a-form-item label="用户名">
          <a-input v-model:value="searchForm.username" placeholder="请输入用户名" />
        </a-form-item>
        <a-form-item label="真实姓名">
          <a-input v-model:value="searchForm.realName" placeholder="请输入真实姓名" />
        </a-form-item>
        <a-form-item label="状态">
          <a-select v-model:value="searchForm.status" placeholder="请选择状态" style="width: 120px">
            <a-select-option value="">全部</a-select-option>
            <a-select-option value="1">启用</a-select-option>
            <a-select-option value="0">禁用</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button type="primary" @click="handleSearch">
              <template #icon>
                <SearchOutlined />
              </template>
              搜索
            </a-button>
            <a-button @click="handleReset">重置</a-button>
          </a-space>
        </a-form-item>
      </a-form>

      <!-- 用户表格 -->
      <a-table
        :columns="columns"
        :data-source="dataSource"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
        row-key="id"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'avatar'">
            <a-avatar :size="32">
              <template #icon>
                <UserOutlined />
              </template>
            </a-avatar>
          </template>

          <template v-else-if="column.key === 'status'">
            <a-tag :color="record.enabled === 1 ? 'green' : 'red'">
              {{ record.enabled === 1 ? '启用' : '禁用' }}
            </a-tag>
          </template>

          <template v-else-if="column.key === 'action'">
            <a-space>
              <a-button type="link" size="small" @click="handleEdit(record)">
                编辑
              </a-button>
              <a-button type="link" size="small" @click="handleResetPassword(record)">
                重置密码
              </a-button>
              <a-popconfirm
                title="确定要删除该用户吗？"
                ok-text="确定"
                cancel-text="取消"
                @confirm="handleDelete(record.id)"
              >
                <a-button type="link" size="small" danger>删除</a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-card>

    <!-- 新增/编辑用户弹窗 -->
    <a-modal
      v-model:open="modalVisible"
      :title="modalTitle"
      @ok="handleModalOk"
      @cancel="handleModalCancel"
      width="600px"
    >
      <a-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-form-item label="用户名" name="username">
          <a-input
            v-model:value="formData.username"
            placeholder="请输入用户名"
            :disabled="isEdit"
          />
        </a-form-item>

        <a-form-item v-if="!isEdit" label="密码" name="password">
          <a-input-password v-model:value="formData.password" placeholder="请输入密码" />
        </a-form-item>

        <a-form-item label="真实姓名" name="realName">
          <a-input v-model:value="formData.realName" placeholder="请输入真实姓名" />
        </a-form-item>

        <a-form-item label="邮箱" name="email">
          <a-input v-model:value="formData.email" placeholder="请输入邮箱" />
        </a-form-item>

        <a-form-item label="手机号" name="phone">
          <a-input v-model:value="formData.phone" placeholder="请输入手机号" />
        </a-form-item>

        <a-form-item label="状态" name="enabled">
          <a-radio-group v-model:value="formData.enabled">
            <a-radio :value="1">启用</a-radio>
            <a-radio :value="0">禁用</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import {
  UserOutlined,
  PlusOutlined,
  SearchOutlined
} from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

// 搜索表单
const searchForm = reactive({
  username: '',
  realName: '',
  status: ''
})

// 表格数据
const loading = ref(false)
const dataSource = ref([
  {
    id: 1,
    username: 'admin',
    realName: '系统管理员',
    email: 'admin@example.com',
    phone: '13800138000',
    enabled: 1,
    createTime: '2026-01-01 10:00:00'
  },
  {
    id: 2,
    username: 'user',
    realName: '普通用户',
    email: 'user@example.com',
    phone: '13800138001',
    enabled: 1,
    createTime: '2026-01-02 14:30:00'
  },
  {
    id: 3,
    username: 'test',
    realName: '测试用户',
    email: 'test@example.com',
    phone: '13800138002',
    enabled: 0,
    createTime: '2026-01-03 09:15:00'
  }
])

// 表格列配置
const columns = [
  {
    title: '头像',
    key: 'avatar',
    width: 80,
    align: 'center'
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username'
  },
  {
    title: '真实姓名',
    dataIndex: 'realName',
    key: 'realName'
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone'
  },
  {
    title: '状态',
    key: 'status',
    width: 100
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime'
  },
  {
    title: '操作',
    key: 'action',
    width: 250,
    fixed: 'right'
  }
]

// 分页配置
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 3,
  showSizeChanger: true,
  showTotal: (total: number) => `共 ${total} 条`
})

// 弹窗相关
const modalVisible = ref(false)
const isEdit = ref(false)
const modalTitle = computed(() => (isEdit.value ? '编辑用户' : '新增用户'))
const formRef = ref()

const formData = reactive({
  id: undefined,
  username: '',
  password: '',
  realName: '',
  email: '',
  phone: '',
  enabled: 1
})

const formRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少6位', trigger: 'blur' }
  ],
  realName: [
    { required: true, message: '请输入真实姓名', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号格式', trigger: 'blur' }
  ]
}

// 搜索
const handleSearch = () => {
  console.log('搜索', searchForm)
  message.success('搜索功能开发中')
}

// 重置
const handleReset = () => {
  searchForm.username = ''
  searchForm.realName = ''
  searchForm.status = ''
  message.info('已重置搜索条件')
}

// 表格变化
const handleTableChange = (pag: any) => {
  pagination.current = pag.current
  pagination.pageSize = pag.pageSize
}

// 新增
const showAddModal = () => {
  isEdit.value = false
  modalVisible.value = true
  Object.assign(formData, {
    id: undefined,
    username: '',
    password: '',
    realName: '',
    email: '',
    phone: '',
    enabled: 1
  })
}

// 编辑
const handleEdit = (record: any) => {
  isEdit.value = true
  modalVisible.value = true
  Object.assign(formData, record)
}

// 重置密码
const handleResetPassword = (record: any) => {
  message.info(`重置密码功能开发中: ${record.username}`)
}

// 删除
const handleDelete = (id: number) => {
  message.success('删除成功')
}

// 弹窗确定
const handleModalOk = async () => {
  try {
    await formRef.value.validate()
    console.log('提交表单', formData)
    message.success(isEdit.value ? '更新成功' : '创建成功')
    modalVisible.value = false
  } catch (error) {
    console.error('表单验证失败', error)
  }
}

// 弹窗取消
const handleModalCancel = () => {
  modalVisible.value = false
  formRef.value?.resetFields()
}
</script>

<style scoped>
.users-page {
  padding: 0;
}

.users-page :deep(.ant-row) {
  display: flex;
  flex-wrap: wrap;
}

.users-page :deep(.ant-col) {
  flex: 0 0 auto;
  max-width: 100%;
}

:deep(.ant-table) {
  font-size: 14px;
}
</style>

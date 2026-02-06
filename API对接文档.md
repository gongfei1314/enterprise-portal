# 企业门户前端 API 对接文档

## 概述

本文档描述了前端如何通过 API 网关与后端微服务进行对接。

## 后端服务架构

```
┌─────────────┐      ┌──────────────┐      ┌─────────────────┐
│  前端 Portal │─────▶│ API Gateway  │─────▶│  微服务集群      │
│  (Port:3000) │      │  (Port:8080) │      │                 │
└─────────────┘      └──────────────┘      │ ┌─────────────┐ │
                                              │ │auth-service │ │
                                              │ │  (8081)     │ │
                                              │ ├─────────────┤ │
                                              │ │user-service │ │
                                              │ │  (8082)     │ │
                                              │ ├─────────────┤ │
                                              │ │customer...  │ │
                                              │ │  (8083)     │ │
                                              │ └─────────────┘ │
                                              └─────────────────┘
```

## API 路由规则

所有 API 请求通过网关（端口 8080）进行路由转发：

| 功能         | 路径                   | 目标服务      | 需要认证 |
|-------------|------------------------|--------------|---------|
| 用户认证     | `/oauth2/**`          | auth-service | ❌      |
| 用户管理     | `/api/users/**`       | user-service | ✅      |
| 客户管理     | `/api/customers/**`   | customer...  | ✅      |
| 项目管理     | `/api/projects/**`    | project...   | ✅      |
| 任务管理     | `/api/tasks/**`       | task-service | ✅      |
| 财务管理     | `/api/finance/**`     | finance...   | ✅      |
| 工作台       | `/api/dashboard/**`   | 各微服务     | ✅      |

## 认证机制

### OAuth2 认证流程

1. **前端登录请求**
   ```typescript
   POST /oauth2/token
   Content-Type: application/x-www-form-urlencoded

   grant_type=password&username={username}&password={password}
   ```

2. **后端返回 JWT Token**
   ```json
   {
     "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
     "refresh_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
     "token_type": "Bearer",
     "expires_in": 3600
   }
   ```

3. **前端存储 Token**
   ```typescript
   localStorage.setItem('access_token', access_token)
   localStorage.setItem('refresh_token', refresh_token)
   ```

4. **后续请求携带 Token**
   ```typescript
   axios.interceptors.request.use(config => {
     const token = localStorage.getItem('access_token')
     if (token) {
       config.headers.Authorization = `Bearer ${token}`
     }
     return config
   })
   ```

## API 接口定义

### 用户管理 (user.ts)

```typescript
// 获取用户列表
GET /api/users?page=1&pageSize=10

// 获取用户详情
GET /api/users/{id}

// 创建用户
POST /api/users
{
  "username": "zhangsan",
  "password": "123456",
  "realName": "张三",
  "email": "zhangsan@example.com",
  "phone": "13800138000"
}

// 更新用户
PUT /api/users/{id}

// 删除用户
DELETE /api/users/{id}
```

### 客户管理 (customer.ts)

```typescript
// 获取客户列表
GET /api/customers?page=1&pageSize=10

// 获取客户详情
GET /api/customers/{id}

// 创建客户
POST /api/customers
{
  "name": "某科技有限公司",
  "contactPerson": "李经理",
  "contactPhone": "13900139000",
  "industry": "互联网",
  "status": "active"
}

// 更新客户
PUT /api/customers/{id}

// 删除客户
DELETE /api/customers/{id}

// 获取客户统计
GET /api/customers/stats
```

### 项目管理 (project.ts)

```typescript
// 获取项目列表
GET /api/projects?page=1&pageSize=10

// 获取项目详情
GET /api/projects/{id}

// 创建项目
POST /api/projects
{
  "name": "ERP系统开发",
  "code": "PRJ001",
  "customerId": 1,
  "managerId": 1,
  "status": "ongoing",
  "priority": "high"
}

// 更新项目
PUT /api/projects/{id}

// 更新项目进度
PUT /api/projects/{id}/progress
{
  "progress": 75
}
```

### 任务管理 (task.ts)

```typescript
// 获取任务列表
GET /api/tasks?page=1&pageSize=10

// 获取我的任务
GET /api/tasks/my

// 创建任务
POST /api/tasks
{
  "title": "完成需求文档",
  "projectId": 1,
  "assigneeId": 1,
  "priority": "high",
  "dueDate": "2026-02-10"
}

// 更新任务状态
PUT /api/tasks/{id}/status
{
  "status": "completed"
}
```

### 财务管理 (finance.ts)

```typescript
// 获取交易记录
GET /api/finance/transactions?page=1&pageSize=10

// 创建交易记录
POST /api/finance/transactions
{
  "type": "income",
  "category": "项目款",
  "amount": 50000,
  "description": "ERP项目首付款"
}

// 获取发票列表
GET /api/finance/invoices?page=1&pageSize=10

// 创建发票
POST /api/finance/invoices
{
  "invoiceNo": "INV2026001",
  "customerId": 1,
  "amount": 50000
}

// 获取财务统计
GET /api/finance/stats
```

### 工作台 (dashboard.ts)

```typescript
// 获取统计数据
GET /api/dashboard/stats

Response:
{
  "code": 200,
  "data": {
    "customers": 128,
    "projects": 45,
    "tasks": 23,
    "revenue": 156.8
  }
}

// 获取最新动态
GET /api/dashboard/activities?limit=10

// 获取待办事项
GET /api/dashboard/todos?limit=10
```

## 环境配置

### 开发环境 (.env.development)

```env
# 是否使用 Mock 数据
VITE_USE_MOCK=false

# 是否使用真实后端 API
VITE_USE_REAL_API=true

# 网关地址
VITE_GATEWAY_URL=http://localhost:8080
```

### 生产环境 (.env.production)

```env
VITE_USE_MOCK=false
VITE_USE_REAL_API=true
VITE_GATEWAY_URL=https://api.yourcompany.com
```

## 开发模式

### 1. Mock 模式（仅前端开发）

```bash
# .env.development
VITE_USE_MOCK=true
```

- 使用硬编码的测试数据
- 无需启动后端服务
- 快速开发前端界面

### 2. 开发模式（前后端联调）

```bash
# .env.development
VITE_USE_MOCK=false
VITE_USE_REAL_API=true
```

- 需要启动后端微服务
- 通过网关访问后端 API
- 真实的认证和数据交互

### 3. 生产模式

```bash
# .env.production
VITE_USE_MOCK=false
VITE_USE_REAL_API=true
```

- 部署到生产环境
- 连接生产环境网关
- 真实数据交互

## 错误处理

### 统一响应格式

```typescript
// 成功响应
{
  "code": 200,
  "message": "操作成功",
  "data": { ... }
}

// 错误响应
{
  "code": 500,
  "message": "操作失败",
  "data": null
}
```

### 错误码定义

```typescript
enum ResponseCode {
  SUCCESS = 200,
  ERROR = 500,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  VALIDATION_ERROR = 400
}
```

## 前端调用示例

```typescript
import { getUserList } from '@/api/user'

// 调用 API
const loadUsers = async () => {
  try {
    const response = await getUserList({
      page: 1,
      pageSize: 10,
      status: 'active'
    })

    if (response.code === 200) {
      console.log('用户列表:', response.data.list)
    }
  } catch (error) {
    console.error('加载失败:', error)
  }
}
```

## 注意事项

1. **Token 过期处理**
   - 监听 401 错误
   - 自动使用 refresh_token 刷新
   - 刷新失败则跳转登录页

2. **CORS 配置**
   - 开发环境通过 Vite proxy 代理
   - 生产环境网关统一配置 CORS

3. **请求拦截**
   - 自动添加 Authorization 头
   - 处理请求参数序列化
   - 添加请求时间戳

4. **响应拦截**
   - 统一处理错误码
   - 自动刷新 Token
   - 错误提示统一处理

## 后续优化

1. **Token 刷新机制**：实现自动刷新过期 Token
2. **请求缓存**：对静态数据进行缓存
3. **离线支持**：使用 Service Worker 支持离线访问
4. **Mock 数据**：完善 Mock 数据覆盖更多场景
5. **API 文档**：集成 Swagger/OpenAPI 文档

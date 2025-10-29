# Services 服务层

本目录提供 HTTP 请求的基础封装。

## 目录结构

```plaintext
services/
├── index.ts       # 统一导出
├── http.ts        # HTTP 请求基础封装
└── README.md      # 文档（本文件）
```

## 架构说明

### HTTP 基础层 (`http.ts`)

> **注意**: 业务 API 请放在 `src/api` 目录下，此目录只提供 HTTP 基础方法。

HTTP 层提供了通用的请求方法：

提供底层的 HTTP 请求方法：

```typescript
import { get, post, put, del } from '@/services/http';

// GET 请求
const data = await get('/api/users');

// POST 请求
const result = await post('/api/users', { name: 'John' });

// PUT 请求
const updated = await put('/api/users/1', { name: 'Jane' });

// DELETE 请求
await del('/api/users/1');
```

## 与 API 目录的关系

- **`src/services`**: 提供 HTTP 基础方法（get, post, put, del）
- **`src/api`**: 封装业务 API（如 userApi, articleApi）
- **`src/store`**: 调用 API，管理状态

数据流向：

```plaintext
Store → API (业务层) → Services (HTTP层) → Backend
```

## 添加新的业务 API

> **重要**: 业务 API 应该放在 `src/api` 目录，而不是 `src/services`。

### 步骤 1: 在 src/api 目录创建 API 文件

例如创建 `src/api/articleApi.ts`:

```typescript
import { get, post, put, del } from './http';

export interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export const articleApi = {
  /**
   * 获取文章列表
   */
  getArticleList: async (params?: { page?: number; pageSize?: number }) => {
    return get<{ list: Article[]; total: number }>('/article/list', { params });
  },

  /**
   * 获取文章详情
   */
  getArticle: async (id: string) => {
    return get<Article>(`/article/${id}`);
  },

  /**
   * 创建文章
   */
  createArticle: async (data: Partial<Article>) => {
    return post<Article>('/article', data);
  },

  /**
   * 更新文章
   */
  updateArticle: async (id: string, data: Partial<Article>) => {
    return put<Article>(`/article/${id}`, data);
  },

  /**
   * 删除文章
   */
  deleteArticle: async (id: string) => {
    return del(`/article/${id}`);
  },
};
```

### 步骤 2: 在 index.ts 中导出

```typescript
export { articleApi } from './articleApi';
```

### 步骤 3: 在 Store 中使用

```typescript
import { articleApi } from '@/services';
import { type Article } from '@/services/articleApi';

class ArticleStore {
  articles: Article[] = [];

  fetchArticles = async () => {
    const { list } = await articleApi.getArticleList();
    this.articles = list;
  };
}
```

## 错误处理

### 在 API 服务层处理

```typescript
import { message } from 'antd';

export const articleApi = {
  getArticle: async (id: string) => {
    try {
      return await get<Article>(`/article/${id}`);
    } catch (error) {
      message.error('获取文章失败');
      throw error;
    }
  },
};
```

### 在 Store 层处理

```typescript
class ArticleStore {
  fetchArticle = async (id: string) => {
    this.loading = true;
    try {
      const data = await articleApi.getArticle(id);
      this.article = data;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };
}
```

## 请求拦截器

在 `http.ts` 中配置全局拦截器：

### 添加 Token

```typescript
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});
```

### 统一错误处理

```typescript
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 未授权，跳转登录
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

## 类型定义

### 定义通用响应类型

```typescript
// src/types/api.ts
export interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginationResponse<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}
```

### 在 API 中使用

```typescript
import type { ApiResponse, PaginationResponse } from '@/types/api';

export const articleApi = {
  getArticleList: async (params: PaginationParams) => {
    return get<ApiResponse<PaginationResponse<Article>>>('/article/list', { params });
  },
};
```

## 最佳实践

1. **API 与 Store 分离**: Store 只负责状态管理，API 层负责数据请求
2. **类型安全**: 为所有 API 返回值定义 TypeScript 接口
3. **统一错误处理**: 在拦截器中处理通用错误
4. **命名规范**: API 文件名使用 `xxxApi.ts` 格式
5. **文档注释**: 为每个 API 方法添加 JSDoc 注释

## 示例：完整的数据流

```plaintext
Component (页面组件)
    ↓
Store (状态管理)
    ↓
API Service (API 服务)
    ↓
HTTP Layer (HTTP 封装)
    ↓
Backend (后端接口)
```

### 代码示例

```typescript
// 1. Store 层
class ArticleStore {
  async fetchArticle(id: string) {
    const data = await articleApi.getArticle(id);
    this.article = data;
  }
}

// 2. 组件层
const ArticlePage = observer(() => {
  const { articleStore } = useStores();

  useEffect(() => {
    articleStore.fetchArticle('123');
  }, []);

  return <div>{articleStore.article?.title}</div>;
});
```

# API 目录

本目录存放所有业务 API 服务。

## 目录结构

```plaintext
api/
├── index.ts       # 统一导出
├── userApi.ts     # 用户相关 API
├── articleApi.ts  # 文章相关 API (示例)
└── README.md      # 文档（本文件）
```

## 与 Services 的区别

- **`src/services`**: HTTP 基础封装层，提供通用的 HTTP 请求方法
- **`src/api`**: 业务 API 层，封装具体业务接口

## 架构

```plaintext
Component (组件)
    ↓
Store (状态管理)
    ↓
API (业务 API) ← 你在这里
    ↓
Services (HTTP 封装)
    ↓
Backend (后端接口)
```

## 添加新的 API

### 步骤 1: 创建 API 文件

创建 `src/api/articleApi.ts`:

```typescript
import { get, post, put, del } from '@/services/http';

export interface Article {
  id: string;
  title: string;
  content: string;
}

export const articleApi = {
  // 获取文章列表
  getArticleList: async () => {
    return get<Article[]>('/article/list');
  },

  // 获取文章详情
  getArticle: async (id: string) => {
    return get<Article>(`/article/${id}`);
  },

  // 创建文章
  createArticle: async (data: Partial<Article>) => {
    return post<Article>('/article', data);
  },

  // 更新文章
  updateArticle: async (id: string, data: Partial<Article>) => {
    return put<Article>(`/article/${id}`, data);
  },

  // 删除文章
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
import { articleApi } from '@/api';
import type { Article } from '@/api/articleApi';

class ArticleStore {
  articles: Article[] = [];
  
  fetchArticles = async () => {
    const data = await articleApi.getArticleList();
    this.articles = data;
  };
}
```

## 现有 API

### userApi

用户相关 API：

- `getUserInfo()` - 获取当前用户信息
- `updateUserInfo()` - 更新用户信息
- `updateAvatar()` - 上传头像
- `changePassword()` - 修改密码
- `getUserList()` - 获取用户列表（管理员）
- `getUserDetail()` - 获取用户详情
- `deleteUser()` - 删除用户（管理员）

## 最佳实践

1. **一个业务一个文件**: 每个业务模块创建独立的 API 文件
2. **统一导出**: 在 `index.ts` 中统一导出所有 API
3. **类型定义**: 为所有接口定义 TypeScript 类型
4. **错误处理**: API 层只负责请求，错误处理在 Store 层
5. **命名规范**: 使用 `xxxApi` 作为文件名和导出名

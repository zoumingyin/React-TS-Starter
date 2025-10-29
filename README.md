# React-TS-Starter

一个现代化的 React + TypeScript + Vite 项目模板，开箱即用。

## ✨ 特性

- 🚀 **快速开发** - 基于 Vite 的极速构建体验
- 🎨 **现代UI** - 集成 Ant Design + UnoCSS 样式方案  
- 📱 **响应式设计** - 完美适配各种设备尺寸
- 🔧 **TypeScript** - 完整的类型安全保障
- 🌍 **国际化** - 内置多语言支持
- 📊 **状态管理** - 基于 MobX 的响应式状态管理
- 🧪 **测试友好** - 完整的测试配置和示例
- 📦 **开箱即用** - 预配置的开发环境和构建流程

## 🚀 技术栈

- **框架**: [React 18](https://react.dev/) - UI框架
- **语言**:  [TypeScript](https://www.typescriptlang.org/) - 类型安全
- **构建工具**: Vite
- **UI 库**: Ant Design
- **状态管理**: MobX
- **样式方案**: UnoCSS + SCSS
- **路由**: React Router v7
- **国际化**: i18next + react-i18next
- **包管理**: pnpm
- **代码规范**: ESLint + Prettier
- **Git 规范**: Husky + lint-staged

## 📁 项目结构

```
src/
├── components/          # 通用组件
│   ├── ui/             # 基础 UI 组件
│   └── business/       # 业务组件
├── pages/              # 页面组件
├── layouts/            # 布局组件
├── hooks/              # 自定义 Hooks
├── store/              # MobX 状态管理
├── services/           # API 服务
├── router/             # 路由配置
├── locales/            # 国际化资源
├── assets/             # 静态资源
├── styles/             # 全局样式
├── theme/              # 主题配置
├── types/              # 类型定义
└── utils/              # 工具函数
```

## 🛠️ 开发环境

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 快速开始

1. **克隆项目**
   ```bash
   git clone <repository-url>
   cd project-name
   ```

2. **安装依赖**
   ```bash
   pnpm install
   ```

3. **启动开发服务器**
   ```bash
   pnpm dev
   ```

4. **打开浏览器访问**
   ```
   http://localhost:5173
   ```

### 可用脚本

```bash
# 开发环境
pnpm dev

# 构建生产版本
pnpm build

# 预览生产构建
pnpm preview

# 代码检查
pnpm lint

# 代码格式化
pnpm format

# 类型检查
pnpm type-check

# 运行测试
pnpm test

# 测试覆盖率
pnpm test:coverage
```

## 📋 开发规范

### 代码风格

- 使用 **TypeScript** 进行严格类型检查
- 遵循 **ESLint** 和 **Prettier** 规则
- 组件使用 **函数式组件** + **Hooks**
- 优先使用 **箭头函数**

### 命名规范

- **组件**: PascalCase (`UserCard`)
- **函数/变量**: camelCase (`getUserData`)
- **常量**: UPPER_SNAKE_CASE (`MAX_SIZE`)
- **文件/文件夹**: kebab-case (`user-card`)

### 组件开发

```typescript
// ✅ 推荐的组件结构
interface UserCardProps {
  user: User;
  onEdit?: (id: string) => void;
}

const UserCard = ({ user, onEdit }: UserCardProps) => {
  const handleEdit = () => {
    onEdit?.(user.id);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold">{user.name}</h3>
      <p className="text-gray-600">{user.email}</p>
      {onEdit && (
        <Button onClick={handleEdit}>编辑</Button>
      )}
    </div>
  );
};

export default UserCard;
```

### 状态管理

使用 MobX 进行状态管理：

```typescript
// store/userStore.ts
import { makeAutoObservable } from 'mobx';

class UserStore {
  users: User[] = [];
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchUsers() {
    this.loading = true;
    try {
      this.users = await userService.getUsers();
    } finally {
      this.loading = false;
    }
  }
}

export default new UserStore();
```

### 样式规范

优先使用 UnoCSS 原子类：

```tsx
// ✅ 推荐
<div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
  <img className="w-10 h-10 rounded-full" src={avatar} alt="" />
  <div className="flex-1">
    <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
    <p className="text-sm text-gray-500">{role}</p>
  </div>
</div>
```

复杂样式使用 SCSS：

```scss
// components/UserCard/index.scss
.user-card {
  &__avatar {
    transition: transform 0.2s ease;
    
    &:hover {
      transform: scale(1.1);
    }
  }
  
  &__content {
    @apply flex-1;
  }
}
```

## 🔧 项目配置

### 路径别名

```typescript
// vite.config.ts
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/pages': path.resolve(__dirname, './src/pages'),
      '@/store': path.resolve(__dirname, './src/store'),
      '@/services': path.resolve(__dirname, './src/services'),
    },
  },
});
```

### 环境变量

```bash
# .env.development
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_TITLE=开发环境

# .env.production
VITE_API_BASE_URL=https://api.example.com
VITE_APP_TITLE=生产环境
```

### 代理配置

```typescript
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
```

## 🌐 国际化

支持多语言切换：

```typescript
// locales/en.json
{
  "common": {
    "save": "Save",
    "cancel": "Cancel",
    "confirm": "Confirm"
  }
}

// 组件中使用
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return <Button>{t('common.save')}</Button>;
};
```

## 📱 响应式设计

使用 UnoCSS 响应式断点：

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 内容 */}
</div>
```

## 🧪 测试

### 单元测试

```bash
# 运行测试
pnpm test

# 监听模式
pnpm test:watch

# 覆盖率报告
pnpm test:coverage
```

### 测试示例

```typescript
// __tests__/UserCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import UserCard from '../UserCard';

const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
};

test('renders user information', () => {
  render(<UserCard user={mockUser} />);
  
  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('john@example.com')).toBeInTheDocument();
});
```

## 📦 构建部署

### 构建生产版本

```bash
pnpm build
```

构建产物将输出到 `dist` 目录。

### Docker 部署

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 静态部署

构建后的文件可以直接部署到任何静态文件服务器：

- Vercel
- Netlify  
- GitHub Pages
- 阿里云 OSS
- 腾讯云 COS

## 🤝 贡献指南

### Git 提交规范

使用 [Conventional Commits](https://conventionalcommits.org/) 规范：

```
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式调整
refactor: 代码重构
perf: 性能优化
test: 测试相关
chore: 构建/工具链相关
```

### 开发流程

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: add some AmazingFeature'`)
4. 推送分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 代码审查

所有代码变更都需要通过 Pull Request 进行审查。

## 📄 许可证

本项目采用 [MIT](LICENSE) 许可证。

## 🔗 相关链接

- [React 官方文档](https://react.dev/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [Ant Design 官方文档](https://ant.design/)
- [UnoCSS 官方文档](https://unocss.dev/)
- [MobX 官方文档](https://mobx.js.org/)

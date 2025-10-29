# UserStore 使用指南

## 基本用法

### 在组件中获取用户信息

```typescript
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { userStore } from '@/store';
import { Spin, Alert } from 'antd';

const UserProfile = observer(() => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await userStore.getUser();
        setInitialized(true);
      } catch (error) {
        setInitialized(true);
      }
    };

    fetchUser();
  }, []);

  if (!initialized) {
    return <Spin />;
  }

  if (userStore.error) {
    return <Alert message={userStore.error} type="error" />;
  }

  if (!userStore.userInfo) {
    return <div>未登录</div>;
  }

  return (
    <div>
      <h2>{userStore.userInfo.username}</h2>
      <p>{userStore.userInfo.email}</p>
    </div>
  );
});

export default UserProfile;
```

### 加载状态展示

```typescript
import { observer } from 'mobx-react-lite';
import { userStore } from '@/store';
import { Spin } from 'antd';

const UserPage = observer(() => {
  return userStore.loading ? (
    <Spin />
  ) : (
    <div>
      {/* 用户信息展示 */}
    </div>
  );
});
```

### 强制刷新用户信息

```typescript
import { observer } from 'mobx-react-lite';
import { userStore } from '@/store';
import { Button } from 'antd';

const RefreshButton = observer(() => {
  const handleRefresh = async () => {
    try {
      await userStore.getUser(true); // 强制刷新
    } catch (error) {
      console.error('刷新失败', error);
    }
  };

  return (
    <Button onClick={handleRefresh} loading={userStore.loading}>
      刷新用户信息
    </Button>
  );
});

export default RefreshButton;
```

### 更新用户信息

```typescript
import { observer } from 'mobx-react-lite';
import { userStore } from '@/store';

const updateProfile = () => {
  userStore.updateUser({
    email: 'newemail@example.com',
  });
};
```

### 登出时清空用户信息

```typescript
import { observer } from 'mobx-react-lite';
import { userStore } from '@/store';

const handleLogout = () => {
  userStore.clearUser();
  localStorage.removeItem('token');
  // 跳转到登录页
};
```

## 配合 Form 使用

```typescript
import { Form, Button } from 'antd';
import { observer } from 'mobx-react-lite';
import { userStore } from '@/store';

const EditProfile = observer(() => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (userStore.userInfo) {
      form.setFieldsValue(userStore.userInfo);
    }
  }, [userStore.userInfo]);

  const onFinish = async (values: any) => {
    try {
      // 更新用户信息
      await updateUserInfo(values);
      // 刷新store中的用户信息
      await userStore.getUser(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form form={form} onFinish={onFinish}>
      {/* 表单字段 */}
    </Form>
  );
});
```

## 扩展接口

### 自定义 UserInfo 类型

```typescript
// 在 userStore.ts 中扩展
export interface UserInfo {
  id: string;
  username: string;
  email?: string;
  avatar?: string;
  role?: string;
  // 添加更多字段
  phone?: string;
  bio?: string;
  createdAt?: string;
}
```

### 添加其他方法

```typescript
// 在 UserStore 类中添加
export class UserStore {
  // ... 现有代码

  /**
   * 检查用户是否为管理员
   */
  get isAdmin(): boolean {
    return this.userInfo?.role === 'admin';
  }

  /**
   * 检查是否已登录
   */
  get isLoggedIn(): boolean {
    return !!this.userInfo;
  }

  /**
   * 验证用户权限
   */
  hasPermission = (permission: string): boolean => {
    // 实现权限验证逻辑
    return false;
  };
}
```


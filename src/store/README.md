# MobX Store 使用说明

本项目使用 MobX 和 mobx-persist-store 进行状态管理。

## 已创建的 Store

### 1. ThemeStore - 主题管理

位于 `src/store/themeStore.ts`

#### 功能特性
- 使用 MobX 进行响应式状态管理
- 使用 mobx-persist-store 进行状态持久化
- 支持亮色/暗色主题切换
- 自动同步到 localStorage
- 自动更新 DOM 的 data-theme 属性

#### 使用方式

##### 方式 1: 使用 useTheme Hook（推荐）
```tsx
import { useTheme } from "@/theme/ThemeContext";

function MyComponent() {
  const { theme, toggleTheme, setTheme, themeConfig } = useTheme();
  
  return (
    <div>
      <p>当前主题: {theme}</p>
      <button onClick={toggleTheme}>切换主题</button>
      <button onClick={() => setTheme('light')}>设置为亮色</button>
    </div>
  );
}
```

##### 方式 2: 直接使用 themeStore
```tsx
import { themeStore } from "@/store/themeStore";
import { observer } from "mobx-react-lite";

const MyComponent = observer(() => {
  return (
    <button onClick={() => themeStore.toggleTheme()}>
      当前主题: {themeStore.theme}
    </button>
  );
});
```

#### API

- `theme: Theme` - 当前主题 ('light' | 'dark')
- `themeConfig: ThemeConfig` - Ant Design 主题配置
- `toggleTheme()` - 切换主题
- `setTheme(theme: Theme)` - 设置指定主题

### 2. LocaleStore - 语言管理

位于 `src/store/localeStore.ts`

#### 功能特性
- 使用 MobX 进行响应式状态管理
- 使用 mobx-persist-store 进行状态持久化
- 支持中文/英文语言切换
- 自动同步到 localStorage
- 自动同步 Ant Design 组件语言

#### 使用方式

```tsx
import { localeStore } from "@/store/localeStore";
import { observer } from "mobx-react-lite";

const MyComponent = observer(() => {
  return (
    <button onClick={() => localeStore.toggleLocale()}>
      当前语言: {localeStore.locale}
    </button>
  );
});
```

#### API

- `locale: LocaleType` - 当前语言 ('zh' | 'en')
- `antdLocale: Locale` - Ant Design 语言配置
- `toggleLocale()` - 切换语言
- `setLocale(locale: LocaleType)` - 设置指定语言

### 3. CounterStore - 计数器示例

位于 `src/store/counterStore.ts`

示例 store，展示了 MobX 和 mobx-persist-store 的基本用法。

## 添加新的 Store

1. 创建新的 store 类
```typescript
import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";

export class MyStore {
  data = "";

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "MyStore",
      properties: ["data"],
      storage: window.localStorage,
    });
  }

  // 操作方法
  setData(data: string) {
    this.data = data;
  }
}

export const myStore = new MyStore();
```

2. 在 `src/store/index.ts` 中导出
```typescript
export { myStore };
```

3. 使用 observer 包装需要响应状态变化的组件
```typescript
import { observer } from "mobx-react-lite";

const MyComponent = observer(() => {
  return <div>{myStore.data}</div>;
});
```

## 注意事项

- 所有需要响应 MobX 状态变化的组件必须使用 `observer` 包装
- Store 会自动持久化到 localStorage
- Store 属性必须是可观察的，使用 `makeAutoObservable` 或手动设置
- 持久化的属性需要在 `makePersistable` 的 `properties` 数组中指定


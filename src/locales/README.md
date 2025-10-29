# 国际化使用说明

本项目使用 `react-i18next` 进行国际化管理。

## 配置说明

### 1. 翻译文件结构

翻译文件位于 `src/locales/` 目录下：

- `zh.json` - 中文翻译
- `en.json` - 英文翻译

### 2. 翻译文件结构

```json
{
  "translation": {
    "nav": {
      "home": "首页",
      "about": "关于"
    },
    "language": {
      "zh": "中文",
      "en": "英文"
    }
  }
}
```

## 使用方法

### 在组件中使用翻译

#### 1. 基本用法

```tsx
import { useTranslation } from "react-i18next";

function MyComponent() {
  const { t, i18n } = useTranslation();
  
  return (
    <div>
      <p>{t("nav.home")}</p>
      <p>当前语言: {i18n.language}</p>
    </div>
  );
}
```

#### 2. 带命名空间

```tsx
import { useTranslation } from "react-i18next";

function MyComponent() {
  const { t } = useTranslation("translation");
  
  return <p>{t("nav.home")}</p>;
}
```

#### 3. 带参数

```tsx
// 在翻译文件中
{
  "welcome": "欢迎, {{name}}"
}

// 在组件中
const { t } = useTranslation();
<p>{t("welcome", { name: "John" })}</p>
```

#### 4. 与 MobX 结合使用

```tsx
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { localeStore } from "@/store/localeStore";

const MyComponent = observer(() => {
  const { t, i18n } = useTranslation();
  
  // 切换语言
  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    localeStore.setLocale(lang as "zh" | "en");
  };
  
  return (
    <button onClick={() => handleLanguageChange(i18n.language === "zh" ? "en" : "zh")}>
      {t("nav.home")}
    </button>
  );
});
```

## 翻译键命名规范

使用嵌套结构，使用点号分隔：

```
t("nav.home") → "首页"
t("language.zh") → "中文"
t("home.desc") → "加载"
t("about.content") → "这是关于页面"
```

**注意：**
- 不需要加 "translation." 前缀
- 键名要和翻译文件中的完全一致
- 使用小写字母和点号连接

## 常见问题

### 1. 翻译不显示

确保：
- 翻译键在翻译文件中存在
- 使用了正确的命名空间
- 导入并使用了 `useTranslation` hook

### 2. 切换语言不生效

确保：
- 在 `localeStore` 中设置了正确的语言
- `useLocaleSync` hook 已在 App 组件中调用
- ConfigProvider 正确配置了 locale

## 添加新翻译

1. 在 `zh.json` 和 `en.json` 中添加翻译键
2. 在组件中使用 `useTranslation()` hook
3. 使用 `t("your.translation.key")` 获取翻译


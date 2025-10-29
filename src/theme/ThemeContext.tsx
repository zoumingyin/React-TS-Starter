/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext } from "react";
import { ConfigProvider, type ThemeConfig } from "antd";
import { observer } from "mobx-react-lite";
import { themeStore, type Theme } from "@/store/themeStore";
import { localeStore } from "@/store/localeStore";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  themeConfig: ThemeConfig;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProviderComponent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

  return (
    <ThemeContext.Provider
      value={{
        theme: themeStore.theme,
        toggleTheme: themeStore.toggleTheme,
        themeConfig: themeStore.themeConfig,
        setTheme: themeStore.setTheme,
      }}
    >
      <ConfigProvider 
        theme={themeStore.themeConfig}
        locale={localeStore.antdLocale}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

// 使用 observer 包装组件以响应 mobx 状态变化
export const ThemeProvider = observer(ThemeProviderComponent);

// 自定义 hook 用于获取主题上下文
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// 导出 themeStore 以便直接使用（可选）
export { themeStore };

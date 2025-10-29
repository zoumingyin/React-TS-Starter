import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import type { ThemeConfig } from "antd";
import { darkTheme, lightTheme } from "@/theme/themes";

export type Theme = "light" | "dark";

export class ThemeStore {
  theme: Theme = "dark";

  constructor() {
    makeAutoObservable(this);

    // 设置持久化
    makePersistable(this, {
      name: "ThemeStore",
      properties: ["theme"],
      storage: window.localStorage,
    }).then(() => {
      // 初始化时设置 HTML 属性
      this.updateDocumentTheme();
    });
  }

  get themeConfig(): ThemeConfig {
    return this.theme === "light" ? lightTheme : darkTheme;
  }

  toggleTheme = () => {
    this.theme = this.theme === "light" ? "dark" : "light";
    this.updateDocumentTheme();
  };

  setTheme = (theme: Theme) => {
    this.theme = theme;
    this.updateDocumentTheme();
  };

  private updateDocumentTheme = () => {
    document.documentElement.setAttribute("data-theme", this.theme);
  };
}

export const themeStore = new ThemeStore();

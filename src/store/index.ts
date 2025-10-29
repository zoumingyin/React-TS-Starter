import { counterStore } from "./counterStore";
import { themeStore } from "./themeStore";
import { localeStore } from "./localeStore";
import { userStore } from "./userStore";

export const stores = {
  counterStore,
  themeStore,
  localeStore,
  userStore,
};

export type RootStore = typeof stores;

// 导出单个 store 实例
export { counterStore, themeStore, localeStore, userStore };

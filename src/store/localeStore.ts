import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import zhCN from "antd/locale/zh_CN";
import enUS from "antd/locale/en_US";
import type { Locale } from "antd/es/locale";
import dayjs from "dayjs";

export type LocaleType = "zh" | "en";
const dayLan = {
  zh: "zh-cn",
  en: "en",
};
export class LocaleStore {
  locale: LocaleType = "zh";

  constructor() {
    makeAutoObservable(this);

    // 设置持久化
    makePersistable(this, {
      name: "LocaleStore",
      properties: ["locale"],
      storage: window.localStorage,
    });
  }

  // 获取 Ant Design 的 locale 对象
  get antdLocale(): Locale {
    const localeMap = {
      zh: zhCN,
      en: enUS,
    };
    return localeMap[this.locale];
  }

  // 切换语言
  toggleLocale = () => {
    this.locale = this.locale === "zh" ? "en" : "zh";
  };

  // 设置指定语言
  setLocale = (locale: LocaleType) => {
    // 设置中文
    if (dayLan[locale]) {
      dayjs.locale(dayLan[locale]);
    }
    this.locale = locale;
  };
}

export const localeStore = new LocaleStore();

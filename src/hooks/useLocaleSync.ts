import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { localeStore } from "@/store/localeStore";

/**
 * Hook 用于同步 MobX localeStore 和 i18n 的语言设置
 * 需要在 App 组件中使用
 */
export const useLocaleSync = () => {
  const { i18n } = useTranslation();

  // 监听 localeStore 变化，同步到 i18n
  useEffect(() => {
    if (i18n.language !== localeStore.locale) {
      i18n.changeLanguage(localeStore.locale);
    }
  }, [localeStore.locale, i18n]);
};


import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./en.json";
import zh from "./zh.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "zh", // 默认中文
    supportedLngs: ["zh", "en"],
    detection: {
      order: ["querystring", "localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false, // React 已处理 XSS
    },
    resources: {
      en: {
        translation: en,
      },
      zh: {
        translation: zh,
      },
    },
  });

export default i18n;

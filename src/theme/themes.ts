import type { ThemeConfig } from "antd";
import { theme } from "antd";

export const lightTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: "#1677ff",
    colorBgContainer: "#ffffff",
    colorText: "rgba(0, 0, 0, 0.88)",
  },
  components: {
    Button: {
      primaryColor: "#1677ff",
    },
  },
};

export const darkTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: "#1668dc",
    colorBgContainer: "#141414",
    colorText: "rgba(255, 255, 255, 0.85)",
  },
  components: {},
};

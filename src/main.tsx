import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@/locales/i18n"; // 初始化 i18n
import "@/theme/theme.css"; // 主题样式
import "antd/dist/reset.css";
import "./styles/global.scss";
import "uno.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

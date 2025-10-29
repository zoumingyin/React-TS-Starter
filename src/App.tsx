import { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Spin } from "antd";
import { observer } from "mobx-react-lite";
import { routes } from "@/router/routes";
import { ThemeProvider } from "@/theme/ThemeContext";
import { useLocaleSync } from "@/hooks/useLocaleSync";

// 创建路由器
const router = createBrowserRouter(routes);

const AppContent = observer(() => {
  // 同步语言设置
  useLocaleSync();

  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          <Spin size="large" />
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
});

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;

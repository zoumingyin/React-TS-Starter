import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import UnoCSS from "unocss/vite";
import { presetAttributify, presetIcons, presetWind3 } from "unocss";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import AutoImportAntd from "unplugin-auto-import-antd";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    UnoCSS({
      presets: [presetWind3(), presetAttributify(), presetIcons()],
    }),
    react(),
    AutoImport({
      // 文件匹配
      include: [/\.[tj]sx?$/],
      dirs: [
        "src/components", // 指向你的组件目录
        "src/hooks", // 比如你还有 hooks
      ],
      // 全局自动导入
      imports: [
        "react",
        {
          "react-router-dom": ["Link", "useNavigate"],
          // 你还可以加你自己常用的库
        },
      ],
      resolvers: [
        // 使用 Antd 导入解析器
        AutoImportAntd(), // 启用 antd 自动导入支持
      ],
      dts: "src/auto-imports.d.ts",
      eslintrc: {
        enabled: true,
        filepath: "./.eslintrc-auto-import.json",
        globalsPropValue: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: "0.0.0.0",
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});

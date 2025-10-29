import { Button, Space, theme } from "antd";
import { useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  ArrowLeftOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

const DarkNotFound = () => {
  const navigate = useNavigate();
  const { token } = theme.useToken();

  const isDark = token.colorBgContainer === "#141414";

  const colors = {
    bg: isDark ? "#0f0f0f" : "#1a1a1a",
    text: isDark ? "#ffffff" : "#f0f0f0",
    textSecondary: isDark ? "#a3a3a3" : "#d1d1d1",
    textTertiary: isDark ? "#666666" : "#888888",
    border: isDark ? "#333333" : "#404040",
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div
      className="h-screen w-screen flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: colors.bg }}
    >
      {/* 背景装饰 */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              backgroundColor: token.colorPrimary,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* 主内容 */}
      <div className="text-center max-w-2xl mx-auto px-4 relative z-10">
        {/* 404 数字 */}
        <div
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-4"
          style={{ color: colors.text }}
        >
          404
        </div>

        {/* 描述文字 */}
        <div className="mb-6">
          <h1
            className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2"
            style={{ color: colors.text }}
          >
            页面未找到
          </h1>
          <p
            className="text-sm sm:text-base"
            style={{ color: colors.textSecondary }}
          >
            抱歉，您访问的页面不存在或已被删除
          </p>
        </div>

        {/* 装饰图标 */}
        <div
          className="text-4xl sm:text-5xl opacity-30 mb-6"
          style={{ color: colors.textTertiary }}
        >
          🌙
        </div>

        {/* 按钮组 */}
        <Space
          size="middle"
          direction={window.innerWidth < 640 ? "vertical" : "horizontal"}
          wrap
          className="mb-6"
        >
          <Button
            type="primary"
            size="large"
            icon={<HomeOutlined />}
            onClick={handleGoHome}
            className="min-w-[120px]"
          >
            返回首页
          </Button>
          <Button
            size="large"
            icon={<ArrowLeftOutlined />}
            onClick={handleGoBack}
            className="min-w-[120px]"
            style={{
              backgroundColor: "#374151",
              borderColor: colors.border,
              color: colors.text,
            }}
          >
            返回上页
          </Button>
        </Space>

        {/* 额外操作 */}
        <div className="space-y-2">
          <Button
            type="link"
            icon={<ReloadOutlined />}
            onClick={handleReload}
            className="text-xs sm:text-sm"
            style={{ color: colors.textSecondary }}
          >
            刷新页面
          </Button>
          <div className="text-xs" style={{ color: colors.textTertiary }}>
            错误代码: 404
          </div>
        </div>
      </div>
    </div>
  );
};

export default DarkNotFound;

import { Button } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { useTheme } from "@/theme/ThemeContext";
import { observer } from "mobx-react-lite";

const ThemeSwitch = observer(() => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      type="text"
      icon={theme === "dark" ? <SunOutlined /> : <MoonOutlined />}
      onClick={toggleTheme}
      style={{
        color: theme === "dark" ? "#C7DCFF" : "#000",
      }}
    >
      {theme === "dark" ? "日间模式" : "夜间模式"}
    </Button>
  );
});

export default ThemeSwitch;


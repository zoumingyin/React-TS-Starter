import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import "./layout.scss";
import SubMenuCards from "./components/SubMenuCards";
import ThemeSwitch from "@/components/ThemeSwitch";
import LocaleSwitch from "@/components/LocaleSwitch";

const { Content } = Layout;

export default function BasicLayout() {
  return (
    <Layout className="h-100% bg-[#172035]">
      {/* 头部 */}
      {/* 顶部栏 */}
      <div className="flex flex-col justify-between bg-[#172545] relative">
        <div className="flex items-center justify-between  h-50px!  head-box">
          <div className="m-0px text-28px font-600 absolute left-1/2 -translate-x-1/2 text-[18px] text-[#C7DCFF]">
            xxxx
          </div>
          <div className="absolute right-16px flex items-center gap-8px">
            <LocaleSwitch />
            <ThemeSwitch />
          </div>
        </div>
        <SubMenuCards />
      </div>

      {/* 内容区 */}
      <Content className="p-8px">
        <div className=" dark:bg-#172545  rounded-5px h-full">
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
}

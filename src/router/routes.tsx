import BasicLayout from "@/layouts/BasicLayout";
import UserProfile from "@/pages/UserProfile";
import { Navigate } from "react-router-dom";

const NotFound = lazy(() => import("@/pages/404"));

export const routes = [
  {
    path: "/",
    element: <BasicLayout />, // 这里必须包含 <Outlet /> 才能渲染子路由
    meta: { title: "首页布局", requiresAuth: false },
    children: [
      {
        index: true, // 访问 "/" 时
        element: <Navigate to="user" replace />, // 重定向到 "/airCondition"
      },
      {
        path: "user",
        element: <UserProfile />,
        meta: { title: "用户中心", iconImg: "u172.png", requiresAuth: true },
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

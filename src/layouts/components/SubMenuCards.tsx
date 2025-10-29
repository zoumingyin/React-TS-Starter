import { routes } from "@/router/routes";
import { useNavigate, useLocation } from "react-router-dom";

export default function MenuBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menus = routes?.[0]?.children?.filter((r) => !r.index) || [];

  // 判断当前激活路由
  const activePath = location.pathname.split("/").slice(-1)[0];

  const getImgUrl = (file: string) => {
    return new URL(`../../assets/img/${file}`, import.meta.url).href;
  };

  return (
    <div className="p-4px overflow-auto flex gap-10px bg-#172545 text-white">
      {menus.map((menu) => (
        <div
          key={menu.path || "index"}
          className={`w-85px h-70px bg-#25355d shadow p-5px cursor-pointer hover:bg-#1d2c4d`}
          onClick={() => navigate(menu.index ? "/" : `/${menu.path}`)}
        >
          <div
            className={`h-full flex flex-col justify-center items-center ${
              activePath === menu.path ? "bg-#172545" : ""
            }`}
          >
            {menu.meta?.iconImg && (
              <img
                src={getImgUrl(menu.meta.iconImg)}
                alt={menu.meta.title}
                className="w-29px h-29px mb-5px"
              />
            )}
            <span
              className={`text-12px ${
                activePath === menu.path ? "text-#56AFFF" : "text-#DDE6FF"
              }`}
            >
              {menu.meta?.title}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

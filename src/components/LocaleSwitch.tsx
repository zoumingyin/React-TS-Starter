import { Dropdown, Button } from "antd";
import { TranslationOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { localeStore } from "@/store/localeStore";
import { themeStore } from "@/store/themeStore";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

const LocaleSwitch = observer(() => {
  const { t } = useTranslation();

  const items: MenuProps["items"] = [
    {
      key: "zh",
      label: t("language.zh"),
      onClick: () => localeStore.setLocale("zh"),
    },
    {
      key: "en",
      label: t("language.en"),
      onClick: () => localeStore.setLocale("en"),
    },
  ];

  return (
    <Dropdown menu={{ items, selectedKeys: [localeStore.locale] }}>
      <Button
        type="text"
        icon={<TranslationOutlined />}
        style={{
          color: themeStore.theme === "dark" ? "#C7DCFF" : "#000",
        }}
      >
        {t(`language.${localeStore.locale}`)}
      </Button>
    </Dropdown>
  );
});

export default LocaleSwitch;


import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWind3,
} from "unocss";

export default defineConfig({
  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
      collections: {
        carbon: () =>
          import("@iconify-json/carbon/icons.json").then((i) => i.default),
      },
    }),
  ],
  shortcuts: [
    // 可以在这里添加自定义快捷方式
  ],
  theme: {
    colors: {
      // 可以在这里添加自定义颜色
    },
  },
});

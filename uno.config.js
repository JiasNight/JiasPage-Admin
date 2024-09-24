// 安装unocss和三个预设，第一个是工具类预设，第二个是属性化模式支持，第三个是icon支持
import { defineConfig, presetUno, presetAttributify, presetIcons } from "unocss";

export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetIcons()],
  rules: [
    // 在这个可以增加预设规则, 也可以使用正则表达式
    ["flex", { display: "flex" }],
    ["c-p", { cursor: "pointer" }],
    ["p-r", { position: "relative" }],
    ["p-a", { position: "absolute" }],
    // 使用时只需要写 p-c 即可应用该组样式
    [
      "p-a-center",
      {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      },
    ],
    ["w-100", { width: "6.25rem" }],
    ["w-200", { width: "12.5rem" }],
    [/^m-(\d+)$/, ([, d]) => ({ margin: `${Number(d) * 10}px` })],
  ],
  // 组合样式 自定义
  shortcuts: {
    fuck: ["green", "font28"],
  },
});

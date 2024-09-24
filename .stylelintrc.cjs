module.exports = {
  root: true,
  defaultSeverity: "warning",
  // 继承推荐规范配置
  extends: [
    // 配置stylelint拓展插件
    "stylelint-config-standard",
    "stylelint-config-recommended-scss",
    // 配置 vue 中 scss 样式格式化
    "stylelint-config-recommended-vue/scss",
    // 配置 vue 中 template 样式格式化
    "stylelint-config-html/vue",
    // 配置stylelint scss插件
    "stylelint-config-standard-scss",
    // 配置stylelint css属性书写顺序插件
    "stylelint-config-recess-order",
  ],
  plugins: ["stylelint-order"],
  // 指定不同文件对应的解析器
  overrides: [
    {
      files: ["**/*.{vue,html}"],
      customSyntax: "postcss-html",
    },
    {
      files: ["**/*.{css,scss}"],
      customSyntax: "postcss-scss",
    },
  ],
  ignoreFiles: ["**/*.js", "**/*.jsx", "**/*.tsx", "**/*.ts", "**/*.json", "**/*.md", "**/*.yaml"],
  // null  关闭该规则
  // always 必须
  rules: {
    // 不允许未知函数
    "function-no-unknown": null,
    // 指定类选择器的命名规范
    "selector-class-pattern": [
      "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
      {
        message: "Expected class selector to be kebab-case",
      },
    ],
    // 禁止空源码
    "no-empty-source": null,
    // 指定字符串使用单引号
    "string-quotes": [
      "double",
      {
        ignore: ["url"],
        message: "请使用双引号引用其他字符串",
      },
    ],
    // 禁止未知的规则
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
          "function",
          "if",
          "each",
          "include",
          "mixin",
        ],
      },
    ],
    // 小数不带0
    "number-leading-zero": "never",
    // 指定规则名的大小写
    "at-rule-name-case": "lower",
    // 指定缩进
    indentation: [
      2,
      {
        severity: "warning",
      },
    ],
    // 允许 global 、export 、v-deep 等伪类
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global", "export", "v-deep", "deep"],
      },
    ],
    // 禁止未知的伪元素选择器
    "selector-pseudo-element-no-unknown": [
      true,
      {
        ignorePseudoElements: ["v-deep"],
      },
    ],
    "order/properties-order": [
      "position",
      "top",
      "right",
      "bottom",
      "left",
      "z-index",
      "display",
      "justify-content",
      "align-items",
      "float",
      "clear",
      "overflow",
      "overflow-x",
      "overflow-y",
      "margin",
      "margin-top",
      "margin-right",
      "margin-bottom",
      "margin-left",
      "padding",
      "padding-top",
      "padding-right",
      "padding-bottom",
      "padding-left",
      "width",
      "min-width",
      "max-width",
      "height",
      "min-height",
      "max-height",
      "font-size",
      "font-family",
      "font-weight",
      "border",
      "border-style",
      "border-width",
      "border-color",
      "border-top",
      "border-top-style",
      "border-top-width",
      "border-top-color",
      "border-right",
      "border-right-style",
      "border-right-width",
      "border-right-color",
      "border-bottom",
      "border-bottom-style",
      "border-bottom-width",
      "border-bottom-color",
      "border-left",
      "border-left-style",
      "border-left-width",
      "border-left-color",
      "border-radius",
      "text-align",
      "text-justify",
      "text-indent",
      "text-overflow",
      "text-decoration",
      "white-space",
      "color",
      "background",
      "background-position",
      "background-repeat",
      "background-size",
      "background-color",
      "background-clip",
      "opacity",
      "filter",
      "list-style",
      "outline",
      "visibility",
      "box-shadow",
      "text-shadow",
      "resize",
      "transition",
    ],
  },
};

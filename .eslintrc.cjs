module.exports = {
  // 表示ESLint规则，将被限制在根目录下
  root: true,
  env: {
    // 表示在node环境下，启用ESLint
    node: true,
    es2021: true,
    browser: true,
    commonjs: true,
    // 开启setup语法糖环境
    "vue/setup-compiler-macros": true,
  },
  // 定义ESLint的解析器
  parser: "vue-eslint-parser",
  parserOptions: {
    // 指定ESLint解析器
    parser: "@typescript-eslint/parser",
    ecmaVersion: "latest",
    ecmaFeatures: {
      jsx: true,
      // 允许使用模块，模块内默认严格模式
      modules: true,
    },
    // 允许使用导入
    sourceType: "module",
  },
  globals: {
    $ref: "readonly",
    $computed: "readonly",
    $shallowRef: "readonly",
    $customRef: "readonly",
    $toRef: "readonly",
  },
  // 表示 eslint-config-prettier
  plugins: ["vue", "@typescript-eslint", "prettier"],
  extends: [
    "./.eslintrc-auto-import.json",
    "@vue-macros/eslint-config",
    // 继承Eslint中推荐的（打钩的）规则项http://eslint.cn/docs/rules/
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    // 把prettier中设置的规则添加进来，让它覆盖上面设置的规则。这样就不会和上面的规则冲突了，表示 eslint-plugin-prettier，需要放到最后以覆盖别的规则
    "prettier",
  ],
  rules: {
    // 'off' 或 0 - 关闭规则
    // 'warn' 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
    // 'error' 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
    //
    // 禁止使用console
    "no-console": 0,
    // 禁止使用debugger
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
    // 语句强制分号结尾
    semi: [2, "always"],
    // 引号类型''
    quotes: [2, "double"],
    // 强制驼峰法命名
    camelcase: [1, { allow: ["drop_console", "drop_debugger", "zh_CN", "en_US"] }],
    // 必须使用全等
    eqeqeq: [2, "allow-null"],
    // indent: [2, 2], // 缩进风格
    indent: [2, 2, { MemberExpression: 1, SwitchCase: 1, ignoredNodes: ["TemplateLiteral"] }],
    "vue/multi-word-component-names": [
      0,
      {
        // 需要忽略的组件名
        ignores: ["index"],
      },
    ],
    // 解析vue模板错误规则
    "vue/no-parsing-error": [
      2,
      {
        "x-invalid-end-tag": false,
        "missing-semicolon-after-character-reference": false,
      },
    ],
    // 在<template>中强制一致缩进
    "vue/html-indent": [2, 2],
    // 执行自闭合的风格
    "vue/html-self-closing": 0,
    // 要求单行元素的内容前后有一个换行符
    "vue/singleline-html-element-content-newline": 0,
    // 强制一行的最大长度
    "max-len": [2, { code: 120 }],
    // 不能有无法执行的代码
    "no-unreachable": 2,
    // 禁止无用的表达式
    "no-unused-expressions": 0,
    // 不能有声明后未被使用的变量或参数
    "no-unused-vars": [0, { vars: "all", args: "after-used" }],
    // 禁用var，用let和const代替
    "no-var": 2,
    // 禁止使用alert
    "no-alert": 0,
    // 禁止修改const声明的变量
    "no-const-assign": 2,
    // switch中的case标签不能重复
    "no-duplicate-case": 2,
    // 禁止多余的冒号
    "no-extra-semi": 2,
    // 不能有未定义的变量
    "no-undef": 0,
    // 空行最多不能超过2行
    "no-multiple-empty-lines": [1, { max: 2 }],
    // if while function 后面的{必须与if在同一行，java风格
    "brace-style": [2, "1tbs", { allowSingleLine: true }],
    // 数组和对象键值对最后一个逗号,never：不能带末尾的逗号,always：必须带末尾的逗号，always-multiline：多行模式必须带逗号，单行模式不能带逗号
    "comma-dangle": [
      0,
      {
        arrays: "always",
        objects: "always",
        imports: "always",
        exports: "always",
        functions: "always",
      },
    ],
    // 控制逗号前后的空格
    "comma-spacing": [2, { before: false, after: true }],
    "@typescript-eslint/member-delimiter-style": [
      // 定义接口的分隔符
      0,
      {
        multiline: {
          // semi: 分号，comma：逗号，none: 无
          delimiter: "semi",
          // 最后一个成员是否需要分隔符
          requireLast: true,
        },
        singleline: {
          delimiter: "semi",
          requireLast: true,
        },
      },
    ],
    // 除import语句外，禁止使用require语句
    "@typescript-eslint/no-var-requires": 0,
    // 不允许空函数
    "@typescript-eslint/no-empty-function": 0,
    // 禁止使用 any 类型
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/ban-types": 0,
    "@typescript-eslint/no-unused-vars": 0,
    // 文件末尾强制换行
    "eol-last": 2,
    // 不能用多余的空格
    "no-multi-spaces": 1,
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".ts"],
        moduleDirectory: ["node_modules", "./src"],
      },
    },
  },
};

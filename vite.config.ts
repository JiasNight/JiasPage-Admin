import { defineConfig, loadEnv } from "vite";
import vuePlugin from "@vitejs/plugin-vue";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
// 组件样式按需加载
// import usePluginImport from 'vite-plugin-importer';
// 自动引入vue函数
import AutoImport from "unplugin-auto-import/vite";
// 自动引入组件
import UnpluginVueComponents from "unplugin-vue-components/vite";
// 自动导入图标组件
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
// 添加tsx和jsx语法
import vueJsx from "@vitejs/plugin-vue-jsx";
// 打包压缩
import viteCompression from "vite-plugin-compression";
// 在开发和构建中进行代码规范校验
import eslintPlugin from "vite-plugin-eslint";
// 引入unocss
import unoCss from "unocss/vite";
// 引入mock
import { viteMockServe } from "vite-plugin-mock";

import { Vuetify3Resolver, NaiveUiResolver, QuasarResolver } from "unplugin-vue-components/resolvers";
// 响应式语法糖独立
import ReactivityTransform from "@vue-macros/reactivity-transform/vite";

import * as path from "path";

// 动态处理请求api的代理前缀
function getProxy(nodeEnvs: object) {
  const resultProxy = {};
  for (const key in nodeEnvs) {
    if (key.includes("VITE_APP_") && key.includes("API")) {
      const item = nodeEnvs[key];
      const regex = new RegExp("[^/]+(?!.*/)");
      const proxySuffix = regex.exec(item)[0];
      const proxyApi = "/" + proxySuffix + "Api";
      resultProxy[proxyApi] = {
        target: item,
        ws: true, // websocket支持
        changeOrigin: true,
        rewrite: (path) => path.replace(new RegExp(`^${proxyApi}`), ""),
      };
    }
  }
  console.log(resultProxy);
  return resultProxy;
}

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd());
  // 是否生产环境
  const isProduction = mode === "production";
  console.log(command);
  console.log(mode);
  console.log(env);
  // 是否开启本地mock服务
  const isEnableMockServe = false;
  return defineConfig({
    define: {
      "process.env": env,
    },
    // 开发或生产环境服务的公共基础路径：默认'/'   1、绝对URL路径名： /foo/；  2、完整的URL： https://foo.com/； 3、空字符串或 ./（用于开发环境）
    base: "/",
    // 指定公共资源文件夹的路径，默认为 'public'。
    publicDir: "public",
    // 为服务器设置代理规则
    server: {
      host: "0.0.0.0", // 支持从IP启动访问
      port: 3000, // 设置服务启动端口号
      strictPort: true, // 若端口被占用,直接结束项目
      // https: false, // 启用 TLS + HTTP/2
      cors: true, // 默认启用并允许任何源
      open: false, // 在服务器启动时自动在浏览器中打开
      hmr: {
        overlay: false, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
      },
      // 反向代理配置，注意rewrite写法
      proxy: getProxy(env),
      // {
      //   '/api': {
      //     target: env.VITE_APP_ADMIN_API,
      //     ws: true, // websocket支持
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, '')
      //   },
      //   '/api2': {
      //     target: env.VITE_APP_AUTH_API,
      //     ws: true, // websocket支持
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, '')
      //   }
      // }
    },
    resolve: {
      // 取相对路径别名, @表示当前的src目录路径
      alias: [
        {
          find: "@", // 别名
          replacement: path.resolve(__dirname, "src"), // 别名对应地址
        },
        {
          find: "components",
          replacement: path.resolve(__dirname, "src/components"),
        },
      ],
      dedupe: ["vue"],
    },
    // 打包相关规则
    build: {
      // 指定es版本,浏览器的兼容性,es2015(编译成es5)
      target: "modules",
      // 指定打包输出路径  默认：dist
      outDir: "page",
      // 指定静态资源存放路径
      assetsDir: "static",
      // chunk 大小警告的限制（以 kbs 为单位）默认：500
      chunkSizeWarningLimit: 1000,
      // css代码拆分,false则所有样式保存在一个css里面
      cssCodeSplit: true,
      // 构建后是否生成 source map 文件，生产环境禁用
      sourcemap: !isProduction,
      //防止 vite 将 rgba() 颜色转化为 #RGBA 十六进制符号的形式
      cssTarget: "chrome61",
      // 项目压缩 :boolean | 'terser' | 'esbuild'
      minify: "terser",
      terserOptions: {
        // 生产环境移除console
        compress: {
          // 打包时删除console
          drop_console: true,
          // 打包时删除 debugger
          drop_debugger: true,
        },
        output: {
          // 去掉注释内容
          comments: true,
        },
      },
      // 分包
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: (chunkInfo) => {
            if ([".png", ".jpg", ".jpeg"].includes(path.extname(chunkInfo.name))) {
              return "static/[ext]/[name].[ext]";
            }
            return "static/[ext]/[name]-[hash].[ext]";
          },
          manualChunks: {
            // 拆分代码，这个就是分包，配置完后自动按需加载，现在还比不上webpack的splitchunk，不过也能用了。
            vue: ["vue", "vue-router"],
            echarts: ["echarts"],
          },
        },
      },
    },
    // 插件配置
    plugins: [
      vuePlugin({
        template: { transformAssetUrls },
      }),
      quasar({
        sassVariables: "src/style/quasar-variables.scss",
      }),
      // ref转换
      ReactivityTransform(),
      // 配置css原子化
      unoCss({
        configFile: "./uno.config.js",
      }),
      eslintPlugin({
        // 禁用 eslint 缓存
        cache: false,
      }),
      // 配置自动导入
      AutoImport({
        resolvers: [QuasarResolver(), NaiveUiResolver()],
        // 自定引入 Vue VueRouter API,如果还需要其他的可以自行引入
        imports: [
          "vue",
          "vue-router",
          "pinia",
          {
            "naive-ui": ["useDialog", "useMessage", "useNotification", "useLoadingBar"],
          },
        ],
        // 可以自定义文件生成的位置，默认是根目录下
        dts: "./auto-imports.d.ts",
        // 解决自动引入eslint报错问题 需要在eslintrc的extend选项中引入
        eslintrc: {
          // 1、true时生成eslint配置文件，2、生成后改为false，避免重复消耗
          enabled: true,
          // 配置文件的位置
          filepath: "./.eslintrc-auto-import.json",
          globalsPropValue: true,
        },
      }),
      // 配置自动导入的组件
      UnpluginVueComponents({
        dts: true,
        dirs: "/components.d.ts",
        resolvers: [QuasarResolver(), NaiveUiResolver(), IconsResolver({ componentPrefix: "icon" })],
      }),
      // 配置自动导入图标
      Icons({
        compiler: "vue3",
        // 自动安装图标
        autoInstall: true,
        // 自定义图标加载
        customCollections: {
          // 这里是存放svg图标的文件地址，custom是自定义图标库的名称，给svg文件设置fill="currentColor"属性，使图标的颜色具有适应性
          custom: FileSystemIconLoader("./src/assets/icons", (svg) =>
            svg.replace(/^<svg /, "<svg fill=\"currentColor\" ")
          ),
        },
        scale: 1,
        defaultClass: "inline-block",
      }),
      // 配置jsx
      vueJsx(),
      // gzip压缩
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: "gzip",
        ext: ".gz",
      }),
      viteMockServe({
        // 设置模拟.ts 文件的存储文件夹
        mockPath: "./src/mock/",
        // 是否监视mockPath对应的文件夹内文件中的更改
        watchFiles: true,
        // 是否启用 mock 功能
        enable: isEnableMockServe,
        // 是否在控制台显示请求日志
        logger: true,
      }),
    ],
    // 全局 css 注册
    css: {
      preprocessorOptions: {
        // 导入variables.scss, 这样就可以在vue全局中使用variables.scss中定义的变量了
        scss: {
          javascriptEnabled: true,
          additionalData: "@import \"./src/style/app-variables.scss\";",
        },
      },
    },
  });
};

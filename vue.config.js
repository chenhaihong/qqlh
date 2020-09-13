const path = require("path");
const chalk = require("chalk");
const setting = require("./src/setting");

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  chainWebpack: (config) => {
    useHtmlOptions(config);
    useSvgSprite(config);
    useAutoImportStyleVaribles(config);
  },
  configureWebpack: {
    name: setting.name,
    devtool: isDev ? "eval-source-map" : "none",
    externals: {
      jquery: "jQuery",
      vue: "Vue",
      "vue-router": "VueRouter",
      vuex: "Vuex",
    },
    resolve: {
      alias: { "@": path.resolve(__dirname, "src") },
    },
  },
  css: { sourceMap: isDev },
  ...getDevServerConfig(),
};

function useHtmlOptions(config) {
  config.plugin("html").tap((options) => {
    options[0].title = setting.name;
    options[0].isDev = isDev;
    return options;
  });
}

function useSvgSprite(config) {
  // 1. 配置svg规则排除icons⽬录中svg⽂件处理
  //    ⽬标给svg规则增加⼀个排除选项exclude: ['path/to/dir/icons']
  config.module
    .rule("svg")
    .exclude.add(path.resolve(__dirname, "src/plugins/icons"));
  // 2. 新增icons规则，设置svg-sprite-loader处理icons⽬录中的svg
  config.module
    .rule("icons")
    .test(/\.svg$/)
    .include.add(path.resolve(__dirname, "src/plugins/icons"))
    .end()
    .use("svg-sprite-loader")
    .loader("svg-sprite-loader")
    .options({ symbolId: "icon-[name]" });
}

function useAutoImportStyleVaribles(config) {
  const types = ["vue-modules", "vue", "normal-modules", "normal"];
  types.forEach((type) =>
    addStyleResource(config.module.rule("less").oneOf(type))
  );
  function addStyleResource(rule) {
    rule
      .use("style-resource")
      .loader("style-resources-loader")
      .options({
        patterns: [path.resolve(__dirname, "./src/assets/less/variables.less")],
      });
  }
}

function getDevServerConfig() {
  if (!isDev) {
    return {};
  }
  return {
    devServer: {
      // port,
      open: true,
      overlay: {
        warnings: false,
        errors: true,
      },
      // proxy: {},
      before(app) {
        app.use(function methodUrlLogger(req, res, next) {
          // 控制台展示请求
          const method = chalk.bgGreen(` ${chalk.black(req.method)} `);
          const url = chalk.green(req.url);
          console.log(`${method} ${url}`);
          next();
        });
      },
      after(app) {
        console.log("");
        const { createAttachMocker } = require("@erye/wds-mocker");
        const attachMocker = createAttachMocker({
          mockDir: path.resolve(__dirname, "mock"),
          onUrlencodedParser: true,
          onJsonBodyParser: true,
        });
        attachMocker(app);
      },
    },
  };
}

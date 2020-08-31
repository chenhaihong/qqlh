const path = require("path");
const fse = require("fs-extra");
const chalk = require("chalk");

module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((options) => {
      options[0].title = "阡阡路惠";
      return options;
    });
  },
  configureWebpack: {
    name: "阡阡路惠",
    devtool:
      process.env.NODE_ENV === "development" ? "eval-source-map" : "none",
    externals: {
      jquery: {
        root: "jQuery", // 指向全局变量
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  },
  css: {
    sourceMap: true,
  },
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
      attachMocks(app); // 添加mock支持

      // if (process.env.VUE_APP_ON_MOCK) {
      //  attachMocks(app); // 添加mock支持
      // }
    },
  },
};

/**
 * 添加mock支持。
 *
 * @param {Object} app express服务实例
 */
function attachMocks(app) {
  const bodyParser = require("body-parser");
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));
  // parse application/json
  app.use(bodyParser.json());
  app.use(async function(req, res, next) {
    const mockMap = getMockMap();
    if (!mockMap.has(req.path)) {
      return next();
    }

    const resultMap = mockMap.get(req.path);
    const upCasedMethod = req.method.toUpperCase();
    if (!resultMap.has(upCasedMethod)) {
      return next();
    }

    const _method = chalk.white.bgMagentaBright(` ${upCasedMethod} `);
    const _mockFlag = chalk.white.bgMagentaBright(" MOCK ");
    const _url = chalk.magentaBright(req.url);
    console.log(`${_method} ${_mockFlag} ${_url}`);

    const result = resultMap.get(upCasedMethod);
    typeof result === "function"
      ? res.json(await result(req, res, next))
      : res.json(result);
  });
}

/**
 * 获取mocks对象，构建mocksMap
 */
function getMockMap() {
  // （1）mock目录下所有的js文件，把他们全部合并到mocks对象
  const mockMap = new Map();

  // （2）确认mock目录
  const dir = path.resolve(__dirname, "mock");
  fse.ensureDirSync(dir);

  // （3）构建mocksMap
  const files = fse.readdirSync(dir);
  for (const file of files) {
    const filePath = `${dir}/${file}`;
    if (fse.statSync(filePath).isFile() && /\.js$/.test(file)) {
      delete require.cache[require.resolve(filePath)];
      const list = require(filePath);
      for (const [
        methodUrl, // 比如: ' get  /auth/login '
        result,
      ] of Object.entries(list)) {
        const arr = methodUrl.trim().split(" ");
        const [
          method, // GET
          url, // /auth/login
        ] = [arr[0], arr[arr.length - 1]];

        let resultMap;
        if (mockMap.has(url)) {
          resultMap = mockMap.get(url);
        } else {
          resultMap = new Map();
          mockMap.set(url, resultMap);
        }
        resultMap.set(method.toUpperCase(), result);
      }
    }
  }
  return mockMap;
}

const path = require("path");
const fse = require("fs-extra");
const chalk = require("chalk");

module.exports = {
  chainWebpack: config => {
    config.plugin("html").tap(options => {
      options[0].title = "阡阡路惠";
      return options;
    });
  },
  configureWebpack: {
    name: "阡阡路惠",
    externals: {
      jquery: {
        root: "jQuery" // 指向全局变量
      }
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src")
      }
    }
  },
  devServer: {
    // port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // proxy: {},
    after(app) {
      app.use((req, res, next) => {
        // 控制台展示请求
        const method = chalk.bgGreen(` ${chalk.black(req.method)} `);
        console.log(`${method} ${req.url}`);
        next();
      });

      // if (process.env.VUE_APP_ON_MOCK) {
      addMocks(app); // 添加mock支持
      // }
    }
  }
};

/**
 * 添加mock支持。
 *
 * @param {Object} app express服务实例
 */
function addMocks(app) {
  const bodyParser = require("body-parser");
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));
  // parse application/json
  app.use(bodyParser.json());
  app.use(async function(req, res, next) {
    const mocks = getMocks();
    const mock = mocks[req.path];
    if (!mock) {
      return next();
    }

    const { method, result } = mock;
    if (req.method.toLocaleLowerCase() !== method.toLocaleLowerCase()) {
      return next();
    }

    const _method = chalk.white.bgMagentaBright(` ${req.method} `);
    const _mockIndex = chalk.white.bgMagentaBright(" MOCK ");
    console.log(`${_method} ${_mockIndex} ${req.url}`);
    typeof result === "function"
      ? res.json(await result(req, res, next))
      : res.json(result);
  });
}

/**
 * 获取mocks对象
 */
function getMocks() {
  // （1）mock目录下所有的js文件，把他们全部合并到mocks对象
  let mocks = {};
  const dir = path.resolve(__dirname, "mock");
  fse.ensureDirSync(dir);
  const files = fse.readdirSync(dir);
  for (const file of files) {
    const filePath = `${dir}/${file}`;
    if (/\.js$/.test(file) && fse.statSync(filePath).isFile()) {
      delete require.cache[require.resolve(filePath)];
      mocks = { ...mocks, ...require(filePath) };
    }
  }
  return mocks;
}

const { resolve } = require("path");

const chalk = require("chalk");
const express = require("express");
const { createAttachMocker } = require("@erye/wds-mocker");

const app = express();

app.use(function methodUrlLogger(req, res, next) {
  // 控制台展示请求
  const method = chalk.bgGreen(` ${chalk.black(req.method)} `);
  const url = chalk.green(req.url);
  // eslint-disable-next-line
  console.log(`${method} ${url}`);
  next();
});

app.use(express.static(resolve(__dirname, "../dist"), { maxAge: "1y" }));

const dir = resolve(__dirname, "../mock");
const attachMocker = createAttachMocker(dir, {
  onUrlencodedParser: true,
  onJsonBodyParser: true,
  onLogger: true,
  onWatcher: true,
  onRouteParametersCapturer: false,
});
attachMocker(app);

app.use((req, res, next) => {
  res.sendFile(resolve(__dirname, "../dist/index.html"));
});

app.use(function(err, req, res, next) {
  res
    .status(500)
    .send({ success: false, message: err.message || "Something broke!" });
});

const port = 3006;
app.listen(port, () => {
  console.log(`QQLH: Listening on port ${port}.`);
});

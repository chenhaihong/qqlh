const { resolve } = require("path");

const express = require("express");
const { createAttachMocker } = require("@erye/wds-mocker");

const app = express();

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

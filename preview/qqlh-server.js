const { resolve } = require("path");

const express = require("express");
const favicon = require("serve-favicon");
const { createAttachMocker } = require("@erye/wds-mocker");

const app = express();

// eslint-disable-next-line
app.get("/", function(req, res, next) {
  res.setHeader("Cache-Control", "public, max-age=0");
  res.sendFile(resolve(__dirname, "../dist/index.html"));
});
app.use(favicon(resolve(__dirname, "../dist", "favicon.ico")));
app.use(
  express.static(resolve(__dirname, "../dist"), {
    // eslint-disable-next-line
    setHeaders: function(res, path, stat) {
      if (path.match(/.html/)) {
        res.setHeader("Cache-Control", "public, max-age=0");
      } else {
        res.setHeader("Cache-Control", "public, max-age=31536000");
      }
    }
  })
);

const dir = resolve(__dirname, "../mock");
const attachMocker = createAttachMocker(dir, {
  onUrlencodedParser: true,
  onJsonBodyParser: true,
  onLogger: false,
  onWatcher: false,
  onRouteParametersCapturer: false
});
attachMocker(app);

// eslint-disable-next-line
app.use((req, res, next) => {
  res.sendFile(resolve(__dirname, "../dist/index.html"));
});

// eslint-disable-next-line
app.use(function(err, req, res, next) {
  res
    .status(500)
    .send({ success: false, message: err.message || "Something broke!" });
});

const port = 3006;
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`QQLH: Listening on port http://0.0.0.0:${port}.`);
});

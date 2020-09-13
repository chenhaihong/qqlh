const { resolve } = require("path");

const express = require("express");
const { createAttachMocker } = require("@erye/wds-mocker");

const app = express();

app.use(express.static(resolve(__dirname, "../dist")));

const attachMocker = createAttachMocker({
  mockDir: resolve(__dirname, "../mock"),
  onUrlencodedParser: true,
  onJsonBodyParser: true,
  onLogger: false,
  onWatcher: false,
});
attachMocker(app);

app.use((req, res, next) => {
  res.sendFile(resolve(__dirname, "../dist/index.html"));
});

app.use(function(err, req, res, next) {
  res.status(500).send(err.message || "Something broke!");
});

app.listen(3006, () => {
  console.log("QQLH: Listening on port 3000.");
});

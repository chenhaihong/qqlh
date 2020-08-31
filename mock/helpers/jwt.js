const crypto = require("crypto");

class JWT {
  constructor({ cipher }) {
    this.cipher = cipher;
  }
  generate(data) {
    const [base64Header, base64Payload] = [
      base64_encode(JSON.stringify({ cpn: "tiiit" })),
      base64_encode(JSON.stringify(data)),
    ];
    const sig = hmac(base64Header + "." + base64Payload, this.cipher);
    return `${base64Header}.${base64Payload}.${sig}`;
  }
  verify(token) {
    const [base64Header, base64Payload, sig] = token.split(".");
    return sig === hmac(base64Header + "." + base64Payload, this.cipher);
  }
  data() {
    const [, base64Payload] = token.split(".");
    return JSON.parse(base64_decode(base64Payload));
  }
}

function hmac(string, cipher) {
  const hmac = crypto.createHmac("sha256", cipher);
  return hmac.update(string).digest("base64");
}
function base64_encode(string) {
  return Buffer.from(string, "utf8").toString("base64");
}
function base64_decode(base64String) {
  return Buffer.from(base64String, "base64").toString("utf8");
}

// demo
const jwt = new JWT({ cipher: "123456789" });
const token = jwt.generate({ uid: 666666 });
const isOk = jwt.verify(token);
const data = jwt.data(token);
console.log(token);
console.log(isOk);
console.log(data);

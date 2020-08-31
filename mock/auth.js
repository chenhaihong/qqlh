// 注登销
const jwt = require("jsonwebtoken");
const cipher = "12345678";

module.exports = {
  "POST /auth/login": (req, res) => {
    const { username, password } = req.body;
    let result = { success: false, message: "账号或密码错误" };
    if (username === "haihong" && password === "123123") {
      const token = jwt.sign({ data: { uid: 1 } }, cipher);
      result = { success: true, data: { token } };
    }
    return result;
  },
  "GET /auth/logout": () => {
    return { success: true, message: "已退出登录" };
  },
  "GET /auth/userinfo": (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
      return { success: false, message: "请登录" };
    }
    try {
      jwt.verify(token, cipher);
      return {
        success: true,
        message: "成功",
        data: {
          userinfo: {
            uid: 1,
            username: "haihong",
            nickname: "陈海宏",
            roleName: "系统管理员",
            avatar: "/assets/_bootstrap/home/image/headNav/profile.png",
          },
          roles: [1],
        },
      };
    } catch (error) {
      return { success: false, message: "登录已超时" }; // 登录超时或无效的token
    }
  },
};

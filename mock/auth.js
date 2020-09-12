// 注登销
const jwt = require("jsonwebtoken");
const cipher = "12345678";

module.exports = {
  "POST /auth/login": (req, res) => {
    const { username } = req.body;
    let result = { success: false, message: "账号或密码错误" };
    let user = getUserinfo(username);
    if (user) {
      const { uid } = user;
      const token = jwt.sign({ data: { uid } }, cipher);
      result = { success: true, data: { token } };
    }
    return result;
  },
  "GET /auth/logout": () => {
    return { success: true, message: "已退出登录" };
  },
  "GET /auth/userinfo": (req, res) => {
    const token = req.headers.authorization;
    if (!token) return { success: false, message: "请登录" };
    try {
      const decoded = jwt.verify(token, cipher);
      const { uid } = decoded.data;
      const { roles, ...userinfo } = getUserinfo(uid);
      return {
        success: true,
        message: "成功",
        data: { userinfo, roles },
      };
    } catch (error) {
      return { success: false, message: "登录已超时" }; // 登录超时或无效的token
    }
  },
};

function getUserinfo(index) {
  const users = {
    haihong: {
      uid: 1,
      roles: [1, 2],
      roleName: "海宏",
      nickname: "haihong",
      avatar: "/assets/images/profile.png",
    },
    admin: {
      uid: 2,
      roles: [1],
      roleName: "管理员",
      nickname: "admin",
      avatar: "/assets/images/profile.png",
    },
    doc: {
      uid: 3,
      roles: [2],
      roleName: "阅读文档者",
      nickname: "doc",
      avatar: "/assets/images/profile.png",
    },
  };
  // username
  if (typeof index === "string") {
    return users[index];
  }
  // uid
  if (typeof index === "number") {
    for (const key in users) {
      if (users.hasOwnProperty(key) && users[key]["uid"] === index) {
        return users[key];
      }
    }
  }
  return undefined;
}

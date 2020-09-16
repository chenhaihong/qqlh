<template>
  <TContainer>
    <section slot="head">鉴权逻辑</section>
    <section slot="default">
      <h2>1. 路由拦截逻辑，代码位于 /src/router/beforeEach.js 。</h2>
      <pre>
        <code class="javascript" v-hljs>{{logic}}</code>
      </pre>

      <h2>2. 接口 —— 模拟接口位于 /mock/auth.js 。</h2>
      <br />
      <p>总共有3个接口，</p>
      <br />
      <ul>
        <li>POST /auth/login</li>
        <li>GET /auth/logout</li>
        <li>GET /auth/userinfo</li>
      </ul>
      <pre>
        <code class="javascript" v-hljs>{{mock}}</code>
      </pre>
    </section>
  </TContainer>
</template>

<script>
export default {
  name: "DocAuth",
  data() {
    return {
      logic: `
1 未登录,
        1.1 通用页面     next()
        1.2 其他页面     next('/login'),  [在登录页执行获取token的操作]
2 已登录
        2.1 登录页面     next('/')
        2.2 通用页面     next()
        [如果未拉取用户信息, 执行此操作]
        2.3 任何登录角色可访问的页面  next()
        2.4 需角色验证页面
                2.4.1 当前用户角色roles与页面的roles有交集 next()
                2.4.2 没有权限                                                 next('/403')
      `,
      mock: `
// ......
// ......
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
      `
    };
  }
};
</script>

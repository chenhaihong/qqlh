<template>
  <TContainer>
    <section slot="head">鉴权逻辑</section>
    <section slot="default">
      <h2>路由拦截逻辑，代码位于 /src/router/beforeEach.js 。</h2>
      <pre class="pre">{{ pre }}</pre>

      <hr />
      <br />

      <h2>接口 —— 模拟接口位于 /mock/auth.js 。</h2>
      <br />
      <ul>
        <li>POST /auth/login</li>
        <li>GET /auth/logout</li>
        <li>GET /auth/userinfo</li>
      </ul>
    </section>
  </TContainer>
</template>

<script>
export default {
  name: "DocAuth",
  data() {
    return {
      pre: `
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
      `
    };
  }
};
</script>

<style lang="less" scoped>
.pre {
  font-size: 16px;
}
</style>

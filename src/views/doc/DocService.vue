<template>
  <TContainer>
    <section slot="head">
      <h1>数据请求</h1>
      <br />
      <p>
        这里面使用了 axios 请求库，并且对请求和响应都配置了拦截器。代码位于
        /src/helper/request.js 中。
        <br />如果有需要，你可以把它挂载 Vue 的原型上。
      </p>
    </section>
    <section slot="default">
      <h2>1. 在 api 目录写好请求</h2>
      <br />
      <br />
      <pre class="pre">
// 注登销
import request from "@/helpers/request";

export function login({ username, password }) {
  const data = { username, password };
  return request({ url: "/auth/login", method: "post", data });
}
export function logout() {
  return request({ url: "/auth/logout", method: "get" });
}
export function getUserinfo() {
  return request({ url: "/auth/userinfo", method: "get" });
}
      </pre>

      <br />
      <br />
      <br />
      <h2>2. 使用</h2>
      <br />
      <br />
      <pre class="pre">
import { login, logout, getUserinfo } from "@/api/auth";

// ...
// ...
    async login() {
      const [err, data] = await login({ username, password });
      if (err) {
        // TODO 错误处理
      } else {
        // TODO 成功处理
      }
    },
    async getUserinfo() {
      const [err, data] = await getUserinfo();
      if (err) {
        // TODO 错误处理
      } else {
        // TODO 成功处理
      }
    },
    async logout() {
      const [err, data] = await logout();
      if (err) {
        // TODO 错误处理
      } else {
        // TODO 成功处理
      }
    }
// ...
// ...
      </pre>
    </section>
  </TContainer>
</template>

<script>
export default {
  name: "DocSvg"
};
</script>

<style lang="less" scoped>
.pre {
  font-size: 16px;
}
</style>

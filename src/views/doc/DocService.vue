<template>
  <TContainer>
    <section slot="head">
      <h1>数据请求</h1>
      <br />
      <p>
        这里面使用了 axios 请求库，并且对请求和响应都配置了拦截器。代码位于
        /src/helper/request.js 中。
        <br />你可以按自己项目的需要修改它，或者把它挂载 Vue 的原型上。
      </p>
    </section>
    <section slot="default">
      <h2>1. 在 api 目录写好请求</h2>
      <pre>
        <code class="javascript" v-hljs>{{api}}</code>
      </pre>

      <h2>2. 使用</h2>
      <pre>
        <code class="javascript" v-hljs>{{usage}}</code>
      </pre>
    </section>
  </TContainer>
</template>

<script>
export default {
  name: "DocSvg",
  data() {
    return {
      api: `
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
      `,
      usage: `
// 通常情况下是在store的acitons里、或者视图的方法中使用到数据请求。
import { login, logout, getUserinfo } from "@/api/auth";

// ......
const options = {
  methods: {
    async login() {
      const [err, data] = await login({ username, password });
      if (err) {
        // TODO 错误处理

        // 因为在 @/helper/request 中做了错误提示的统一操作，
        // 所以在这里，通常不需要再去做错误提示。
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
  }
};
// ......
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

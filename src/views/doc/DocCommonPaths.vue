<template>
  <TContainer>
    <section slot="head">
      <h1>白名单页面 —— 无需登录就能访问的页面</h1>
      <br />
      <p>在 /src/router/beforeEach.js 23行处配置。</p>
    </section>
    <section slot="default">
      <pre class="pre">
const commonPaths = ["/login", "/404", "/403", "/500"]; // 无需鉴权</pre
      >
    </section>
  </TContainer>
</template>

<script>
export default {
  name: "DocCommonPaths"
};
</script>

<style lang="less" scoped>
.pre {
  font-size: 16px;
}
</style>

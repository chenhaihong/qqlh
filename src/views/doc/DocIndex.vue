<template>
  <TContainer>
    <section slot="head">
      <h1>项目使用指南</h1>
      <br />
      <p>
        项目使用了 vue-cli，详细的配置信息可以阅读
        <a class="link" href="https://cli.vuejs.org/zh/" target="_blank">vue-cli官网</a>。
      </p>
    </section>
    <section slot="default">
      <p>这里几个常用的命令，</p>
      <pre class="pre">
        <code class="bash" v-hljs>{{code}}</code>
      </pre>
    </section>
  </TContainer>
</template>

<script>
export default {
  name: "DocIndex",
  data() {
    return {
      code: `
# 1 安装依赖
yarn install


# 2 本地开发
yarn serve


# 3 构建
yarn build --report


# 4 Lints and fixes files
yarn lint


# 5 预览
yarn preview
    `
    };
  }
};
</script>

<style lang="less" scoped>
.link {
  text-decoration: underline;
}
</style>

<template>
  <TContainer>
    <section slot="head">
      <h1>数据模拟 —— 配置在 vue.config.js 里</h1>
    </section>
    <section slot="default">
      <h2>1. 如何使用？</h2>
      <br />
      <p>
        在 mock 目录下写下模拟文件就好了。使用了 @erye/wds-mocker 来做
        mock，可以阅读
        <a
          class="link"
          target="_blank"
          href="https://www.npmjs.com/package/@erye/wds-mocker"
          alt="@erye/wds-mocker"
        >@erye/wds-mocker 的文档</a>。
      </p>

      <br />
      <br />

      <h2>2. 修改数据模拟文件，需要重启吗？</h2>
      <br />
      <p>不需要重启，@erye/wds-mocker 做了监听 mock 目录里的文件变更操作，当有变动时，会自动移除对应文件的 require.cache。</p>
    </section>
  </TContainer>
</template>

<script>
export default {
  name: "DocMock"
};
</script>

<style lang="less" scoped>
.link {
  text-decoration: underline;
}
</style>

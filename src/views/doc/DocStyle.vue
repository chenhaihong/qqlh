<template>
  <TContainer>
    <section slot="head">
      <h1>样式</h1>
    </section>
    <section slot="default">
      <h2>1. 如何修改变量？</h2>
      <br />
      <p>在 /src/assets/less/variables.less 配置样式变量。</p>
    </section>
  </TContainer>
</template>

<script>
export default {
  name: "DocStyle"
};
</script>

<style lang="less" scoped>
.pre {
  font-size: 16px;
}
</style>

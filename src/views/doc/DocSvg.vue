<template>
  <TContainer>
    <section slot="head">
      <h1>自动载入Svg图标 —— 配置在 vue.config.js 里</h1>
    </section>
    <section slot="default">
      <h2>1. 如何使用？</h2>
      <br />
      <p>将svg图标拷贝到 /src/plugins/icons/svg 里就能使用。</p>
      <pre>
        <code class="html" v-hljs>{{code}}</code>
      </pre>

      <p>
        效果：
        <SvgIcon class="customed-class-red" iconClass="doc" />
        <SvgIcon class="customed-class-blue" iconClass="github" />
      </p>

      <br />
      <br />

      <h2>2. 如何清除 svg 的颜色？</h2>
      <br />
      <ul>
        <li>- 把 svg 里的 fill 字段移除就行。</li>
        <li>
          - 如果是从 iconfont.cn 拷贝的图标，可以执行批量清除颜色来移除 svg
          的颜色值。
        </li>
      </ul>
    </section>
  </TContainer>
</template>

<script>
export default {
  name: "DocSvg",
  data() {
    return {
      code: `<template>
  <SvgIcon class="customed-class-red" iconClass="doc" />
  <SvgIcon class="customed-class-blue" iconClass="github" />
</template>

<style lang="less">
.customed-class-red {
  color: red;
  font-size: 30px;
}
.customed-class-blue {
  margin-left: 20px;
  color: blue;
  font-size: 40px;
}
</style>`
    };
  }
};
</script>

<style lang="less">
.customed-class-red {
  color: red;
  font-size: 30px;
}
.customed-class-blue {
  margin-left: 20px;
  color: blue;
  font-size: 40px;
}
</style>

<template>
  <TContainer>
    <section slot="head">
      <h1>Lodash模板</h1>
      <br />
      <p>
        HtmlWebpackPlugin 默认使用 Lodash Tempalte 的模板语法，需要了解一下。
      </p>
    </section>
    <section slot="default">
      <h2>文档地址：</h2>
      <br />
      <p>
        英文文档 -
        <a target="_blank" href="https://lodash.com/docs/4.17.15#template"
          >https://lodash.com/docs/4.17.15#template</a
        >
      </p>
      <p>
        中文文档 -
        <a target="_blank" href="http://lodash.think2011.net/template"
          >http://lodash.think2011.net/template</a
        >
      </p>

      <br />
      <br />

      <h2>如何为模板页面添加变量？</h2>
      <br />
      <p>在 vue.config.js 里的 useHtmlOptions 中添加。</p>
    </section>
  </TContainer>
</template>

<script>
export default {
  name: "DocLodashTemplate"
};
</script>

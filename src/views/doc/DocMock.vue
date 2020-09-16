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
          >@erye/wds-mocker 的文档</a
        >。
      </p>

      <br />
      <br />

      <h2>2. 修改数据模拟文件，需要重启吗？</h2>
      <br />
      <p>
        不需要重启，@erye/wds-mocker 做了监听 mock
        目录里的文件变更操作，当有变动时，会自动移除对应文件的 require.cache。
      </p>

      <br />
      <br />
      <h2>3. 示例代码</h2>
      <pre>
        <code class="javascript" v-hljs>{{mock}}</code>
      </pre>
    </section>
  </TContainer>
</template>

<script>
export default {
  name: "DocMock",
  data() {
    return {
      mock: `
const sleep = function (delay) {
  return new Promise((res) => {
    setTimeout(res, delay);
  });
};
 
module.exports = {
  // json对象
  "GET /json": { success: true, data: { message: "hello wds-mocker" } },
 
  //  pure function
  "GET /pureFunction": () => {
    return { success: true, data: { message: "pureFunction" } };
  },
  // pure function + 捕获路由参数
  "GET /pureFunction/:id": (req) => {
    const { params, query } = req;
    return { success: true, data: { message: "pureFunction", params, query } };
  },
 
  // 异步
  "GET /async": async () => {
    await sleep(2000);
    return { success: true, data: { message: "async" } };
  },
};
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

import Vue from "vue";

Vue.use(installAsyncTEcharts);

function installAsyncTEcharts(app) {
  const asyncTEcharts = () => import("@/components/TEcharts");
  app.component("TEcharts", asyncTEcharts); // 注册全局TEcharts组件
}

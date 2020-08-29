import Vue from "vue";

Vue.use(installAsyncTEcharts);

function installAsyncTEcharts(__Vue) {
  const asyncTEcharts = () => import("@/components/TEcharts");
  __Vue.component("TEcharts", asyncTEcharts); // 注册全局TEcharts组件
}

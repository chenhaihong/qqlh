import "@/assets/less/index.less";

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/plugins/element-ui.js";
import "@/plugins/t-echarts.js";
import "@/plugins/t-ui.js";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

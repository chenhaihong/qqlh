import "@/assets/less/index.less";

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/directives/hljs";

// import "@/plugins/element-ui.js";
import "@/plugins/t-echarts.js";
import "@/plugins/t-ui.js";
import "@/plugins/icons";

Vue.config.productionTip = process.env.NODE_ENV === "development";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

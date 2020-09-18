import "@/assets/less/index.less";

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

{
  const directives = require.context("./directives", false, /\.js$/);
  directives.keys().map(directives);
}

{
  const mixins = require.context("./mixins", false, /\.js$/);
  mixins.keys().map(mixins);
}

{
  const plugins = require.context("./plugins", false, /\.js$/);
  plugins.keys().map(plugins);
}

Vue.config.productionTip = process.env.NODE_ENV === "development";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

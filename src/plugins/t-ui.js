import Vue from "vue";

Vue.use(installTui);

function installTui(app) {
  app.component("TContainer", () => import("@/components/TContainer.vue"));
}

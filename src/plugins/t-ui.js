import Vue from "vue";

Vue.use(installTUi);

function installTUi(__vue) {
  __vue.component("TDropList", () => import("@/components/TDropList.vue"));
  __vue.component("TSwitcher", () => import("@/components/TSwitcher.vue"));
  __vue.component("TTab", () => import("@/components/TTab.vue"));
}

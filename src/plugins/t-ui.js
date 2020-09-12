import Vue from "vue";

Vue.use(installTui);

function installTui(__vue) {
  __vue.component("TContainer", () => import("@/components/TContainer.vue"));

  // 移除
  __vue.component("TDropList", () => import("@/components/TDropList.vue"));
  __vue.component("TSwitcher", () => import("@/components/TSwitcher.vue"));
  __vue.component("TTab", () => import("@/components/TTab.vue"));
}

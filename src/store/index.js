import Vue from "vue";
import Vuex from "vuex";

import global from "./modules/global";
import leftMenu from "./modules/leftMenu";

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  state: {},
  mutations: {},
  actions: {},
  modules: {
    global,
    leftMenu,
  },
});

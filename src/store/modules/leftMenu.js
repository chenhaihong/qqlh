import { LEFT_MENU_SET_LEFT_MENU } from "../mutation-types.js";

export default {
  state: () => ({
    defaultOpeneds: [], // 当前打开的submenu的 key 数组
    defaultActive: "/home", // 当前激活菜单的 index
  }),
  getters: {},
  mutations: {
    [LEFT_MENU_SET_LEFT_MENU](state, payload) {
      state.defaultOpeneds = payload.defaultOpeneds;
      state.defaultActive = payload.defaultActive;
    },
  },
  actions: {
    [LEFT_MENU_SET_LEFT_MENU](context, payload) {
      context.commit(LEFT_MENU_SET_LEFT_MENU, payload);
    },
  },
};

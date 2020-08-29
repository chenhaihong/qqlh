import { GLOBAL_SET_USER, GLOBAL_CLEAR_USER } from "../mutation-types.js";

export default {
  state: () => ({
    user: {
      token: undefined,
      username: undefined,
      password: undefined,
      lastTime: undefined,
    },
  }),
  getters: {
    // safeUsername: (state) => {
    //     let a = state.user.username;
    //     let b = a.split('');
    //     return b.shift() + b.shift() + '***' + b.pop();
    // }
  },
  mutations: {
    [GLOBAL_SET_USER](state, payload) {
      state.user.token = payload.token;
      state.user.username = payload.username;
      state.user.password = payload.password;
      state.user.lastTime = new Date().getTime();

      localStorage.setItem("token", payload.token);
    },

    [GLOBAL_CLEAR_USER](state) {
      state.user.token = undefined;
      state.user.username = undefined;
      state.user.password = undefined;
      state.user.lastTime = undefined;

      localStorage.removeItem("token");
    },
  },
  actions: {
    [GLOBAL_SET_USER](context, payload) {
      context.commit(GLOBAL_SET_USER, payload);
    },

    [GLOBAL_CLEAR_USER](context) {
      context.commit(GLOBAL_CLEAR_USER);
    },
  },
};

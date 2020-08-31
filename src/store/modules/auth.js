import { login, logout, getUserinfo } from "@/api/auth";

export default {
  namespaced: true,
  state: () => ({
    // 数据来自 /auth/login
    token: localAuthToken.get(), // 鉴权token

    // 数据来自 /auth/userinfo
    roles: [], // 角色值，如果有值，标识已经拉取了userinfo数据
    userinfo: {}, // 用户信息
  }),
  getters: {},
  mutations: {
    setToken(state, { token }) {
      state.token = token;
      localAuthToken.set(token);
    },
    setRoles(state, { roles }) {
      state.roles = roles;
    },
    setUserinfo(state, { userinfo }) {
      state.userinfo = userinfo;
    },
    clear(state) {
      state.token = "";
      state.roles = [];
      state.userinfo = {};
      localAuthToken.clear();
    },
  },
  actions: {
    async login({ commit }, payload) {
      const { username, password } = payload;
      const [err, data] = await login({ username, password });
      if (!err) {
        commit("setToken", { token: data.token });
      }
      return [err, data];
    },
    async getUserinfo({ commit }) {
      const [err, data] = await getUserinfo();
      if (!err) {
        const { userinfo, roles } = data;
        commit("setRoles", { roles });
        commit("setUserinfo", { userinfo });
      }
      return [err, data];
    },
    async logout({ commit }) {
      const [err, data] = await logout();
      if (!err) commit("clear");
      return [err, data];
    },
  },
};

function localAuthToken() {}
localAuthToken.key = "tiiit_autn_token";
localAuthToken.get = () => {
  return localStorage.getItem(localAuthToken.key) || "";
};
localAuthToken.set = (token = "") => {
  localStorage.setItem(localAuthToken.key, token);
};
localAuthToken.clear = () => {
  localStorage.removeItem(localAuthToken.key);
};

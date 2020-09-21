import { resolve } from "path";

import hasIntersect from "@/helpers/hasIntersect";
import routes from "@/router/routes";

export default {
  namespaced: true,
  state: () => {
    const fixed = localDefaultFixed.get();
    const show = localDefaultShow.get();
    return {
      fixed,
      show,
      visibledAddressableRoutes: [] // 可见的、当前用户角色可以访问的routes数据
    };
  },
  mutations: {
    updateVisibledAddressableRoutes(state, { roles }) {
      const _routes = getVisibledAddressableRoutes(routes, roles);
      state.visibledAddressableRoutes = Object.freeze(_routes);
    },
    toggleShow(state) {
      state.show = !state.show;
      localDefaultShow.set(state.show);
    },
    toggleFixed(state) {
      state.fixed = !state.fixed;
      localDefaultFixed.set(state.fixed);
    }
  }
};

// 获取可见的、当前用户角色可以访问的routes数据
function getVisibledAddressableRoutes(
  tree = routes,
  userRoles = [],
  basePath = ""
) {
  const visibledAddressableRoutes = [];
  tree.forEach(node => {
    // 1 排除hidden的node
    if (node.hidden) return;
    const { roles: routeRoles = [] } = node.meta;

    if (
      !routeRoles.length || // 2.1 任意已经登录的角色可以访问
      hasIntersect(userRoles, routeRoles) // 2.2 用户角色与路由可访问的角色有交集
    ) {
      // eslint-disable-next-line
      const { children, component, ...reset } = node;
      reset.path = resolve(basePath, reset.path);
      if (children && children.length) {
        reset.children = getVisibledAddressableRoutes(
          children,
          userRoles,
          reset.path
        );
      }
      visibledAddressableRoutes.push({ ...reset });
    }
  });
  return visibledAddressableRoutes;
}

function localDefaultShow() {}
localDefaultShow.key = "tiiit_leftmenu_default_show";
localDefaultShow.get = () => {
  const local = localStorage.getItem(localDefaultShow.key);
  if (local) return local === "1";
  return window.innerWidth > 960;
};
localDefaultShow.set = (val = true) => {
  localStorage.setItem(localDefaultShow.key, val ? "1" : "0");
};

function localDefaultFixed() {}
localDefaultFixed.key = "tiiit_leftmenu_default_fixed";
localDefaultFixed.get = () => {
  const local = localStorage.getItem(localDefaultFixed.key);
  if (local) return local === "1";
  return window.innerWidth <= 768;
};
localDefaultFixed.set = (val = true) => {
  localStorage.setItem(localDefaultFixed.key, val ? "1" : "0");
};

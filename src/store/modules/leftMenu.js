import routes from "@/router/routes";
import hasIntersect from "@/helpers/hasIntersect";
import { resolve } from "path";

export default {
  namespaced: true,
  state: () => ({
    show: window.innerWidth > 960,
    visibledAddressableRoutes: [] // 可见的、当前用户角色可以访问的routes数据
  }),
  mutations: {
    updateVisibledAddressableRoutes(state, { roles }) {
      const routes = getVisibledAddressableRoutes(routes, roles);
      state.visibledAddressableRoutes = Object.freeze(routes);
    },
    toggleMenu(state) {
      state.show = !state.show;
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
        // if (!reset.children.length) delete reset.children;
      }
      visibledAddressableRoutes.push({ ...reset });
    }
  });
  return visibledAddressableRoutes;
}

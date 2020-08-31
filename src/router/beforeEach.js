import "nprogress/nprogress.css";
import "./override-nprogress.less";

import NProgress from "nprogress";
import store from "@/store";
import hasIntersect from "@/helpers/hasIntersect";

/**
 * 路由拦截逻辑
 * 1 未登录,
 *          1.1 通用页面     next()
 *          1.2 其他页面     next(`/login?redirect=${to.path}`), [在登录页执行获取token的操作]
 * 2 已登录
 *          2.1 登录页                next('/')
 *          2.2 通用页面               next()
 *          2.3 任何登录角色可访问的页面  next()
 *          2.4 需角色验证页面   [如果未拉取用户信息, 执行此操作]
 *                       2.4.1 当前用户角色roles与页面的roles有交集 next()
 *                       2.4.2 没有权限                          next('/403')
 */

const commonPaths = ["/login"];
const beforeEach = async (to, from, next) => {
  NProgress.start();
  const token = store.state.auth.token;
  const routeRoles = to.meta.roles || [];
  if (!token) {
    // 1.1 通用页面
    if (commonPaths.includes(to.path)) next();
    // 1.2
    else next(`/login?redirect=${encodeURIComponent(to.path)}`);
  } else {
    // 2.1 登录页
    if (to.path === "/login") next("/");
    // 2.2 通用页面
    // 2.3 任何登录角色可访问的页面
    else if (commonPaths.includes(to.path) || !routeRoles.length) next();
    // 2.4 需角色验证页面
    else {
      // [如果未拉取用户信息, 执行此操作]
      if (!store.state.auth.roles.length) {
        const [err, data] = await store.dispatch("auth/getUserinfo");
        if (err) {
          return; // 直接return，@/helpers/request会错误处理
        } else {
          store.commit("leftMenu/updateVisibledAddressableRoutes", {
            roles: data.roles,
          });
        }
      }

      // 2.4.1 当前用户角色roles与页面的roles有交集 next()
      const userRoles = store.state.auth.roles;
      if (hasIntersect(userRoles, routeRoles)) next();
      // 2.4.2 没有权限 next('/403')
      else next("/403");
    }
  }
  NProgress.done();
};
export default beforeEach;

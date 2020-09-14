const MainLayout = () => import("@/layouts/MainLayout.vue");

/************************
 * ! routes配置规则
 ************************
 * ! 配置示例
 * {
 *   path: "/admin",
 *   name: "Admin",
 *   meta: { title: "管理员管理" },
 *   component: MainLayout,
 *   icon: '',     // 一级菜单的inconfont
 *   hidden: true, // true  不再菜单上展示
 *                    false 在菜单上展示
 *   children: [
 *     {
 *       path: "list",
 *       name: "AdminList",   // 用于标识唯一性的key值
 *       hidden: true,        // true  不再菜单上展示
 *                               false 在菜单上展示
 *       meta: {
 *         keepAlive: true,   // true 启用 keep-alive
 *                               为空、undefined、null时，不启用
 *         title: "管理员列表", // 用于修改document.title的字符串
 *         roles: [1],        // 用于定义该页面可以访问的角色，
 *                               为空、undefined、null时，任何已经登录的任何角色可以访问
 *       },
 *       component: () => import("@/views/admin/AdminRole.vue"),
 *     },
 *   ],
 * },
 *************************
 */

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/home",
    hidden: true
  },
  {
    path: "/403",
    name: "Error403",
    hidden: true,
    meta: { title: "403" },
    component: () => import("@/views/403.vue")
  },
  {
    path: "/404",
    name: "Error404",
    hidden: true,
    meta: { title: "404" },
    component: () => import("@/views/404.vue")
  },
  {
    path: "/500",
    name: "Error500",
    hidden: true,
    meta: { title: "500" },
    component: () => import("@/views/500.vue")
  },
  {
    path: "/login",
    name: "Login",
    meta: { title: "登录" },
    hidden: true,
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/home",
    meta: { title: "首页" },
    icon: "home",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "Home",
        meta: { title: "首页", keepAlive: true, roles: [1, 2] },
        component: () => import("@/views/DataView/index.vue"),
        hidden: true
      }
    ]
  },
  {
    path: "/DataView",
    name: "DataView",
    icon: "data",
    meta: { title: "数据大屏", link: "/DataView", roles: [] },
    component: () => import("@/views/DataView/index.vue")
  },
  {
    path: "/GithubChenHaihong",
    name: "Github",
    icon: "github",
    meta: { title: "Github", link: "https://github.com/chenhaihong/qqlh" }
  },
  {
    // 演示角色
    path: "/user",
    name: "演示角色",
    meta: { title: "演示角色", roles: [1] },
    component: MainLayout,
    redirect: "/user/list",
    icon: "user",
    children: [
      {
        path: "/user/list",
        name: "UserList",
        meta: { title: "角色列表", roles: [1] },
        component: () => import("@/views/user/UserList.vue")
      },
      {
        path: "/user/permission",
        name: "UserPermission",
        meta: { title: "配置权限", roles: [1] },
        component: () => import("@/views/user/UserPermission.vue")
      }
    ]
  },
  {
    // 使用文档
    path: "/doc",
    name: "使用文档",
    meta: { title: "使用文档", roles: [2] },
    component: MainLayout,
    redirect: "/doc/route",
    icon: "doc",
    children: [
      {
        path: "/doc/route",
        name: "DocRoute",
        meta: { title: "路由配置", roles: [2] },
        component: () => import("@/views/doc/DocRoute.vue")
      },
      {
        path: "/doc/common-paths",
        name: "DocCommonPaths",
        meta: { title: "白名单页面", roles: [2] },
        component: () => import("@/views/doc/DocCommonPaths.vue")
      },
      {
        path: "/doc/permission",
        name: "DocPermission",
        meta: { title: "菜单权限", roles: [2] },
        component: () => import("@/views/doc/DocPermission.vue")
      },
      {
        path: "/doc/auth",
        name: "DocAuth",
        meta: { title: "鉴权逻辑", roles: [2] },
        component: () => import("@/views/doc/DocAuth.vue")
      },
      {
        path: "/doc/svg",
        name: "DocSvg",
        meta: { title: "Svg图标", roles: [2] },
        component: () => import("@/views/doc/DocSvg.vue")
      },
      {
        path: "/doc/style",
        name: "DocStyle",
        meta: { title: "样式", roles: [2] },
        component: () => import("@/views/doc/DocStyle.vue")
      },
      {
        path: "/doc/service",
        name: "DocService",
        meta: { title: "数据请求", roles: [2] },
        component: () => import("@/views/doc/DocService.vue")
      },
      {
        path: "/doc/mock",
        name: "DocMock",
        meta: { title: "数据模拟", roles: [2] },
        component: () => import("@/views/doc/DocMock.vue")
      },
      {
        path: "/doc/lodash-template",
        name: "DocLodashTemplate",
        meta: { title: "Lodash模板", roles: [2] },
        component: () => import("@/views/doc/DocLodashTemplate.vue")
      },
      {
        path: "/doc/element-ui",
        name: "DocElement",
        meta: { title: "饿了么UI", roles: [2] },
        component: () => import("@/views/doc/DocElement.vue")
      }
    ]
  },
  { path: "*", name: "NotFound", redirect: "/404", hidden: true }
];

export default routes;

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
    hidden: true,
  },
  {
    path: "/403",
    name: "Error403",
    hidden: true,
    meta: { title: "403" },
    component: () => import("@/views/403.vue"),
  },
  {
    path: "/404",
    name: "Error404",
    hidden: true,
    meta: { title: "404" },
    component: () => import("@/views/404.vue"),
  },
  {
    path: "/500",
    name: "Error500",
    hidden: true,
    meta: { title: "500" },
    component: () => import("@/views/500.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: { title: "登录" },
    hidden: true,
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/DataView",
    name: "DataView",
    meta: { title: "DataView", roles: [] },
    hidden: true,
    component: () => import("@/views/DataView.vue"),
  },
  {
    path: "/home",
    meta: { title: "首页" },
    icon: "icon-home",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "Home",
        meta: { title: "首页", roles: [1] },
        component: () => import("@/views/DataView.vue"),
        hidden: true,
      },
    ],
  },
  {
    // 行程审批
    path: "/path",
    name: "Path",
    meta: { title: "行程审批" },
    component: MainLayout,
    redirect: "/path/list",
    icon: "icon-path",
    children: [
      {
        path: "list",
        name: "PathList",
        meta: { title: "行程列表", roles: [1] },
        component: () => import("@/views/path/PathList.vue"),
      },
      {
        path: "complaint",
        name: "PathComplaint",
        meta: { title: "投诉订单", roles: [1] },
        component: () => import("@/views/path/PathComplaint.vue"),
      },
      {
        path: "list/:id",
        name: "PathDetail",
        meta: { title: "行程详情", roles: [1] },
        component: () => import("@/views/path/PathDetail.vue"),
        hidden: true,
      },
    ],
  },
  {
    // 返利管理
    path: "/rebate",
    name: "返利管理",
    meta: { title: "返利管理" },
    component: MainLayout,
    icon: "icon-rebate",
    redirect: "/rebate/list",
    children: [
      {
        path: "list",
        name: "规则列表",
        meta: { title: "规则列表", roles: [1] },
        component: () => import("@/views/rebate/RebateList.vue"),
      },
      {
        path: "list/:id",
        name: "规则详情",
        meta: { title: "规则详情", roles: [1] },
        component: () => import("@/views/rebate/RebateDetail.vue"),
        hidden: true,
      },
      {
        path: "add",
        name: "添加规则",
        meta: { title: "添加规则", roles: [1] },
        component: () => import("@/views/rebate/RebateAdd.vue"),
      },
    ],
  },
  {
    // 管理员管理
    path: "/admin",
    name: "管理员管理",
    meta: { title: "管理员管理", roles: [1] },
    component: MainLayout,
    redirect: "/admin/role",
    icon: "icon-admin",
    children: [
      {
        path: "role",
        name: "角色管理",
        meta: { title: "角色管理", roles: [1] },
        component: () => import("@/views/admin/AdminRole.vue"),
      },
      {
        path: "list",
        name: "管理员列表",
        meta: { title: "管理员列表", roles: [1] },
        component: () => import("@/views/admin/AdminList.vue"),
      },
    ],
  },
  {
    // 用户管理
    path: "/user",
    name: "用户管理",
    meta: { title: "用户管理" },
    component: MainLayout,
    redirect: "/user/list",
    icon: "icon-user",
    children: [
      {
        path: "list",
        name: "用户列表",
        meta: { title: "用户列表", roles: [1] },
        component: () => import("@/views/user/UserList.vue"),
      },
      {
        path: "tag",
        name: "标签管理",
        meta: { title: "标签管理", roles: [1] },
        component: () => import("@/views/user/UserTag.vue"),
      },
      {
        path: "list/:id",
        name: "用户详情",
        meta: { title: "用户详情", roles: [1] },
        component: () => import("@/views/user/UserDetail.vue"),
        hidden: true,
      },
    ],
  },
  {
    // 数据分析
    path: "/data",
    name: "数据分析",
    meta: { title: "数据分析" },
    component: MainLayout,
    redirect: "/data/earning",
    icon: "icon-data",
    children: [
      {
        path: "earning",
        name: "营收数据",
        meta: { title: "营收数据", roles: [1] },
        component: () => import("@/views/data/DataEarning.vue"),
      },
    ],
  },
  { path: "*", name: "NotFound", redirect: "/404", hidden: true },
];

export default routes;

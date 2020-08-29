import Vue from "vue";
import VueRouter from "vue-router";

const MainLayout = () => import("@/layouts/MainLayout.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/login",
    hidden: true,
  },
  {
    path: "/404",
    name: "Error404",
    meta: { title: "404" },
    component: () => import("@/views/404.vue"),
  },
  {
    path: "/500",
    name: "Error500",
    meta: { title: "500" },
    component: () => import("@/views/500.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: { title: "登录" },
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/DataView",
    name: "DataView",
    meta: { title: "DataView" },
    component: () => import("@/views/DataView.vue"),
  },
  {
    path: "/home",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "Home",
        meta: { title: "首页" },
        component: () => import("@/views/DataView.vue"),
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
    hidden: true,
    children: [
      {
        path: "list",
        name: "PathList",
        meta: { title: "行程列表" },
        component: () => import("@/views/path/PathList.vue"),
      },
      {
        path: "complaint",
        name: "PathComplaint",
        meta: { title: "投诉订单" },
        component: () => import("@/views/path/PathComplaint.vue"),
      },
      {
        path: "list/:id",
        name: "PathDetail",
        meta: { title: "行程详情" },
        component: () => import("@/views/path/PathDetail.vue"),
      },
    ],
  },
  {
    // 返利管理
    path: "/rebate",
    name: "返利管理",
    meta: { title: "返利管理" },
    component: MainLayout,
    redirect: "/rebate/list",
    hidden: true,
    children: [
      {
        path: "list",
        name: "规则列表",
        meta: { title: "规则列表" },
        component: () => import("@/views/rebate/RebateList.vue"),
      },
      {
        path: "list/:id",
        name: "规则详情",
        meta: { title: "规则详情" },
        component: () => import("@/views/rebate/RebateDetail.vue"),
      },
      {
        path: "add",
        name: "添加规则",
        meta: { title: "添加规则" },
        component: () => import("@/views/rebate/RebateAdd.vue"),
      },
    ],
  },
  {
    // 管理员管理
    path: "/admin",
    name: "管理员管理",
    meta: { title: "管理员管理" },
    component: MainLayout,
    redirect: "/admin/role",
    hidden: true,
    children: [
      {
        path: "role",
        name: "角色管理",
        meta: { title: "角色管理" },
        component: () => import("@/views/admin/AdminRole.vue"),
      },
      {
        path: "list",
        name: "管理员列表",
        meta: { title: "管理员列表" },
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
    hidden: true,
    children: [
      {
        path: "list",
        name: "用户列表",
        meta: { title: "用户列表" },
        component: () => import("@/views/user/UserList.vue"),
      },
      {
        path: "tag",
        name: "标签管理",
        meta: { title: "标签管理" },
        component: () => import("@/views/user/UserTag.vue"),
      },
      {
        path: "list/:id",
        name: "用户详情",
        meta: { title: "用户详情" },
        component: () => import("@/views/user/UserDetail.vue"),
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
    hidden: true,
    children: [
      {
        path: "earning",
        name: "营收数据",
        meta: { title: "营收数据" },
        component: () => import("@/views/data/DataEarning.vue"),
      },
    ],
  },
  { path: "*", name: "NotFound", redirect: "/404", hidden: true },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((to, from, next) => {
//   // BeforeEach({ to, from, next, NProgress, store });
// });

// router.afterEach((route) => {
//   // AfterEach({ route, NProgress, store });
// });

export default router;

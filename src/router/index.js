import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import beforeEach from "./beforeEach";
import afterEach from "./afterEach";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
  // scrollBehavior: () => ({ x: 0, y: 0 }),
});

router.__fullPathStack__ = [];
router.__routerType__ = "forward";
router.beforeEach((to, from, next) => {
  if (router.__fullPathStack__.includes(to.fullPath)) {
    router.__routerType__ = to.meta.keepAlive ? "backward" : "forward";
  } else {
    router.__fullPathStack__.push(to.fullPath);
    router.__routerType__ = "forward";
  }
  beforeEach(to, from, next);
});

router.afterEach(afterEach);

export default router;

import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import beforeEach from "./beforeEach";
import afterEach from "./afterEach";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach(beforeEach);
router.afterEach(afterEach);

export default router;

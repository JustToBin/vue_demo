import Vue from 'vue';
import Router from 'vue-router';
import RouterLinks from "./links";

Vue.use(Router);

const RouterConfig = {
  // mode: 'history',
  routes: RouterLinks
};

const router = new Router(RouterConfig);

router.beforeEach((to, from, next) => {
  window.vue.$emit("page-change-before", { to, from, next });
  next();
});

router.afterEach((to, from, next) => {
  window.vue.$emit("page-change-after", { to, from, next });
  window.scrollTo(0, 0);
});

export default router;

import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home")
  },
  {
    path: "/list",
    name: "List",
    component: () => import("@/views/List")
  },
  {
    path: "/detail/:id",
    name: "Detail",
    component: () => import("@/views/Detail")
  }
];

const router = new VueRouter({
  routes,
  scrollBehavior: (to, from, savedPosition) => ({ y: 0 } as any)
});

export default router;

import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { visit } from "@/api/visit";

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

router.afterEach((to) => {
  Promise.allSettled([
      visit({
      path: to.fullPath
    })
  ])
  .then(() => {})
  .catch(() => {})
})

export default router;

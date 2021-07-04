import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/Home";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  }
];

const router = new VueRouter({
  routes,
  scrollBehavior: (to, from, savedPosition) => ({ y: 0 } as any)
});

export default router;

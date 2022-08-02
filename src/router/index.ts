import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    children: [
      {
        path: "order",
        name: "order",
        meta: {
          isShow: true,
          title: "商品列表",
        },
        component: () =>
          import(/* webpackChunkName: "order" */ "../views/orderView.vue"),
      },
      {
        path: "user",
        name: "user",
        meta: {
          isShow: true,
          title: "用户列表",
        },
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/userView.vue"),
      },
      {
        path: "Role",
        name: "Role",
        meta: {
          isShow: true,
          title: "角色列表",
        },
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/RoleView.vue"),
      },
      {
        path: "Authority",
        name: "Authority",
        meta: {
          isShow: false,
          title: "权限列表",
        },
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/AuthorityView.vue"),
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/pagin",
    name: "pagin",

    component: () =>
      import(/* webpackChunkName: "pagin" */ "../views/paginView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

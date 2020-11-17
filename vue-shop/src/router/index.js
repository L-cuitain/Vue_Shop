import { createRouter, createWebHashHistory } from "vue-router";

//导入登录组件
import Login from "../views/Login.vue";

const routes = [
  //路由重定向到login路由
  {
    path: "/",
    redirect: "/login"
  },
  //创建login路由
  {
    name: "Login",
    path: "/login",
    component: Login
  },
  {
    name: "Home",
    path: "/home",
    component: () => import("@/views/Home")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

//定义路由导航守卫
//to: 代表跳转路由
//from : 代表来自路由
//next : 如果next() 代表放行  如果next('/路由名称')代表必须跳转到的路由
router.beforeEach((to, from, next) => {
  //获取token
  const isAuthenticated = window.sessionStorage.getItem("token");

  //判断token
  if (!isAuthenticated && to.name !== "Login") next({ name: "Login" });
  else next();
});

export default router;

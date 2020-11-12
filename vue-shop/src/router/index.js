import { createRouter, createWebHashHistory } from "vue-router";

//导入登录组件
import Login from "../views/Login.vue";


const routes = [
    //路由重定向到login路由
    {
      path : "/",
      redirect : "/login"
    },
    //创建login路由
    {
      path : "/login",
      component : Login
    }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;

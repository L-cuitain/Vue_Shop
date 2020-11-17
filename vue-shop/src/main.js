import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

const app = createApp(App);

//导入axios
import axios from "axios";
//配置基本路径
axios.defaults.baseURL = "http://wanlum.com:8888/api/private/v1/";
//全局挂载axios
app.config.globalProperties.$axios = axios;

app
  .use(store)
  .use(Antd)
  .use(router)
  .mount("#app");

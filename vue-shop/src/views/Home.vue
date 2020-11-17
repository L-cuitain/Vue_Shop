<template>
  <!-- Home页面侧边栏 -->
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <!-- 左上logo -->
      <div class="logo">
        <img src="../assets/logo.png" alt="" class="logo_img" />
        <span class="logo_span">后台管理系统</span>
      </div>
      <!-- 左上logo end -->

      <!-- 菜单 -->
      <a-menu theme="dark" mode="inline">
        <a-sub-menu key="sub1">
          <template #title>
            <span><user-outlined /><span>用户管理</span></span>
          </template>
          <a-menu-item key="3"
            ><LoadingOutlined />用户列表<router-link to="/userList"></router-link> </a-menu-item
          >
        </a-sub-menu>
      </a-menu>
      <!-- 菜单 end -->
    </a-layout-sider>
    <!-- Home页面侧边栏 end -->

    <!-- 内容区域 -->
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <a-button type="danger" class="backoff" @click="handleBackOff"> 退出 </a-button>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        tAn geinDs ©2810 deaeCrt yb tAn DUE
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import {
  UserOutlined,
  LoadingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons-vue";

export default {
  components: {
    UserOutlined,
    LoadingOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  },
  data() {
    return {
      collapsed: false,
    };
  },
  methods:{
    handleBackOff(){
      //删除token
      window.sessionStorage.removeItem('token');

      //路由跳转
      this.$router.push('/login');
    }
  }
};
</script>

<style>
#components-layout-demo-side .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-side .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-side .logo {
  height: 32px;
  /* background: rgba(255, 255, 255, 0.2); */
  margin: 16px;
  overflow: hidden;
}

.logo_img {
  float: left;
  width: 32px;
  height: 32px;
}

.logo_span {
  display: block;
}

.logo_span {
  margin-left: 10px;
  font-size: 19px;
  color: #fff;
}

.backoff{
  float:right;
  margin: 16px 20px;
}
</style>

<template>
  <!-- Home页面侧边栏 -->
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <!-- 左上logo -->
      <div class="logo">
        <router-link to="/welcome">
          <img src="../assets/logo.png" alt="" class="logo_img" />
          <span class="logo_span">后台管理系统</span>
        </router-link>
      </div>
      <!-- 左上logo end -->

      <!-- 菜单 -->
      <a-menu
        theme="dark"
        mode="inline"
        :openKeys="openKeys"
        @openChange="onOpenChange"
      >
        <a-sub-menu
          :key="item.id"
          :index="index"
          v-for="(item, index) in menusList"
        >
          <template #title v-if="item.path == 'users'">
            <span
              ><user-outlined /><span>{{ item.authName }}</span></span
            >
          </template>
          <template #title v-else-if="item.path == 'rights'">
            <span
              ><CodeSandboxOutlined /><span>{{ item.authName }}</span></span
            >
          </template>
          <template #title v-else-if="item.path == 'goods'">
            <span
              ><ShoppingOutlined /><span>{{ item.authName }}</span></span
            >
          </template>
          <template #title v-else-if="item.path == 'orders'">
            <span
              ><ContainerOutlined /><span>{{ item.authName }}</span></span
            >
          </template>
          <template #title v-else-if="item.path == 'reports'">
            <span
              ><AreaChartOutlined /><span>{{ item.authName }}</span></span
            >
          </template>

          <a-menu-item
            :key="childitem.id"
            :childIndex="childIndex"
            v-for="(childitem, childIndex) in item.children"
          >
            <LoadingOutlined />
            <span
              ><router-link :to="childitem.path" style="color: #fff">{{
                childitem.authName
              }}</router-link></span
            >
          </a-menu-item>
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
        <a-button type="danger" class="backoff" @click="handleBackOff">
          退出
        </a-button>
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
  CodeSandboxOutlined,
  MenuFoldOutlined,
  ShoppingOutlined,
  ContainerOutlined,
  AreaChartOutlined
} from "@ant-design/icons-vue";

import { rights } from "@/api";

import { httpGet } from "@/utils/http";

export default {
  components: {
    UserOutlined,
    LoadingOutlined,
    MenuUnfoldOutlined,
    CodeSandboxOutlined,
    MenuFoldOutlined,
    ShoppingOutlined,
    ContainerOutlined,
    AreaChartOutlined
  },
  data() {
    return {
      //侧边栏显示和隐藏切换
      collapsed: false,
      //菜单列表
      menusList: [],
      //默认打开的菜单项
      openKeys: [],
      //所有菜单项
      rootSubmenuKeys: []
    };
  },
  created() {
    this.getMenusList();
  },
  methods: {
    //退出功能
    handleBackOff() {
      //删除token
      window.sessionStorage.removeItem("token");

      //路由跳转
      this.$router.push("/login");
    },

    //渲染左侧侧边栏
    async getMenusList() {
      //获取地址
      let url = rights.RightsMenus;
      //发起请求
      let results = await httpGet(url);
      //判断状态码  如果获取成功 则将获取的数据给列表
      if (results.meta.status == 200) {
        this.menusList = results.data;

        //给菜单项的id存入到 rootSubmenuKey  保证切换菜单栏
        this.menusList.forEach(element => {
          this.rootSubmenuKeys.push(element.id);
        });
      }
      // console.log(this.menusList);
    },

    // 点击当前 关闭其他菜单
    onOpenChange(openKeys) {
      //  获取最后一次选中的openKey
      const latestOpenKey = openKeys.find(
        key => this.openKeys.indexOf(key) === -1
      );
      // 如果最后一次openkye在rootSubmenuKey中找不到
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        // 就把点击的哪个openkey放到默认打开的那个数组
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
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
  margin-right: 10px;
}

.logo_span {
  display: block;
  font-size: 19px;
  color: #fff;
}

.backoff {
  float: right;
  margin: 16px 20px;
}
</style>

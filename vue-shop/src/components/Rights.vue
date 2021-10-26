<template>
  <div>
    <a-breadcrumb separator=">" style="margin: 16px 0">
      <a-breadcrumb-item style="color: #000; font-weight: bold"
        >首页</a-breadcrumb-item
      >
      <a-breadcrumb-item href="">权限管理</a-breadcrumb-item>
      <a-breadcrumb-item href="">权限列表</a-breadcrumb-item>
    </a-breadcrumb>
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
      <!-- 权限列表 -->
      <a-table
        :rowKey="(record) => record.id"
        :columns="RightsColumns"
        :data-source="RightsData"
        :pagination="false"
        bordered
      >
        <!-- 列表数 -->
        <template #index="{ index }">
          {{ index + 1 }}
        </template>

        <template #level="{ record }">
          <a-tag v-if="record.level == 0" color="blue" style="padding: 3px 12px"> 一级 </a-tag>
          <a-tag v-else-if="record.level == 1" color="green" style="padding: 3px 12px"> 二级 </a-tag>
          <a-tag v-else-if="record.level == 2" color="orange" style="padding: 3px 12px"> 三级 </a-tag>

        </template>
      </a-table>
      <!-- 权限列表 end -->
    </div>
  </div>
</template>

<script>
import { rights } from "../api/index";

import { httpGet } from "../utils/http";

export default {
  name: "Rights",
  data() {
    return {
      //列表标题
      RightsColumns: [
        {
          title: "#",
          key: "index",
          slots: { customRender: "index" },
        },
        {
          title: "权限名称",
          dataIndex: "authName",
        },
        {
          title: "路径",
          dataIndex: "path",
        },
        {
          title: "权限等级",
          key: "level",
          slots: { customRender: "level" },
        },
      ],

      //列表数据
      RightsData: [],
    };
  },

  //创建生命周期函数 当页面进行渲染时添加数据
  created() {
    this.showRightsData();
  },

  methods: {
    //创建方法 获取权限列表数据
    async showRightsData() {
      //获取url地址
      let url = rights.RightsList;
      //发起请求  获取列表参数
      let results = await httpGet(`${url}/list`);
      //判断相应状态码
      if (results.meta.status == 200) {
        this.RightsData = results.data;
      }
    },
  },
};
</script>

<style>
</style>
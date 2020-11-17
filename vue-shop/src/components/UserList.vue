<template>
  <div>
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item style="color: #000; font-weight: bold"
        >首页</a-breadcrumb-item
      >
      <a-breadcrumb-item>用户管理</a-breadcrumb-item>
      <a-breadcrumb-item>用户列表</a-breadcrumb-item>
    </a-breadcrumb>
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
      <div class="ipt_search">
        <a-input-search
          v-model:value="content"
          placeholder="请输入内容"
          style="width: 300px;margin-right:20px;"
          @search="onSearch"
        />
        <a-button type="primary"> 添加用户 </a-button>
      </div>
      <div class="content_list">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "",
    };
  },
  methods: {
    onSearch(value) {
      console.log("输入的值为: ", value);
    },
  },
};
</script>

<style>
.ipt_search {
  float: left;
  width: 100%;
  height: auto;
}
</style>
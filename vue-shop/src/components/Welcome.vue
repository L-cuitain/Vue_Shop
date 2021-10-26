<template>
  <div>
    <a-breadcrumb separator=">" style="margin: 16px 0">
      <a-breadcrumb-item style="color: #000;font-weight:bold;"
        >首页</a-breadcrumb-item
      >
      <a-breadcrumb-item>欢迎</a-breadcrumb-item>
    </a-breadcrumb>
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
      Welcome
    </div>
  </div>
</template>

<script>
export default {
  name: "Welcome"
};
</script>

<style></style>

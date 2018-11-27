<template>
  <div class="user-container">
    <el-breadcrumb class="user-nav" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "users"
}
</script>

<style lang="scss" scoped>
  .user-container {
    width: 100%;
    height: 100%;
    background: #fff;
    padding: 20px;
    box-sizing: border-box;

    .user-nav {

    }
  }
</style>

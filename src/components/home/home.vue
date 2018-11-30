<template>
  <el-container class="home-container">
    <el-header class="header">
      <el-row>
        <!--<el-col :span="4"><div></div></el-col>-->
        <el-col :span="23"><h2>电商后台管理系统</h2></el-col>
        <el-col :span="1"><a @click.prevent="handleLoginOut()" href="#">退出</a></el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          :unique-opened="true"
          :router="true">
          <el-submenu :index="''+item.order" v-for="item in menusList" :key="item.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="item1.path" v-for="item1 in item.children" :key="item1.id">
              <i class="el-icon-menu"></i>
              {{item1.authName}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      menusList: []
    }
  },
  beforeCreate () {
    const token = localStorage.getItem('token')
    if (!token) {
      this.$router.push({name: 'login'})
    }
  },
  mounted () {
    this.getMenus()
  },
  methods: {
    handleLoginOut () {
      this.$message({
        message: '退出成功',
        type: 'warning'
      })
      localStorage.clear()
      this.$router.push({name: 'login'})
    },
    // 获取左侧导航栏数据
    async getMenus () {
      const res = await this.$http.get('menus')
      // console.log(res)
      const {meta: {msg, status}, data} = res.data
      if (status === 200) {
        this.menusList = data
      } else {
        this.$message.warning(msg)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .home-container {
    height: 100%;

    .header {
      background: #b3c0d1;
      width: 100%;

      div {
      }

      h2 {
        line-height: 20px;
        text-align: center;
        padding-bottom: 10px;
        color: #fff;
      }

      a {
        line-height: 60px;
      }
    }

    .aside {
      background: #fff;
    }

    .main {
      background: #e9eef3;
    }
  }
</style>

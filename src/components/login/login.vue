<template>
  <div class="login-wrap">
    <el-form class="login-form" :label-position="labelPosition" label-width="80px" :model="formdata">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button class="button" @click.prevent="headlelogin()" type="primary">登录</el-button>
    </el-form>
  </div>

</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        labelPosition: 'top',
        formdata: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      async headlelogin() {
        const res = await this.$http.post('login', this.formdata)
        const {meta:{msg, status}, data} = res.data
        console.log(data)
        if (status === 200) {
          this.$message({
            message: msg,
            type: 'success'
          })
          const token = localStorage.setItem('token', data.token)
          this.$router.push({name: 'home'})
        } else {
          this.$message({
            message: msg,
            type: 'success'
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-wrap {
    width: 100%;
    height: 100%;
    background: #324152;
    display: flex;
    justify-content: center;
    align-items: center;

    .login-form {
      width: 400px;
      background: #fff;
      padding: 30px;
      border-radius: 5px;

      .button {
        width: 100%;
      }
    }
  }

</style>

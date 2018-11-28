<template>
  <el-card class="box-card users-container">
    <!--面包屑导航-->
    <el-breadcrumb class="user-nav" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索-->
    <div class="search">
      <el-input @clear="clearUser()" clearable v-model="query" placeholder="请输入内容" class="input-with-select">
        <el-button @click="searchUser()" slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button @click="addClick" type="success" plain>添加用户</el-button>
    </div>
    <!--表格-->
    <el-table
      :data="usersList"
      style="width: 100%">
      <el-table-column
        type="index"
        label="#">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
      <el-table-column
        label="创建日期">
        <template slot-scope="scope">
          {{scope.row.create_time | timeDate}}
        </template>
      </el-table-column>
      <el-table-column
        label="用户状态">
        <template slot-scope="scope">
          <el-switch
            @change="stateUser(scope.row.id, scope.row.mg_state)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="editUser(scope.row.id)" size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
          <el-button @click="deleteUser(scope.row.id)" size="mini" plain type="danger" icon="el-icon-delete" circle></el-button>
          <el-button @click="getRoleUser(scope.row)" size="mini" plain type="success" icon="el-icon-check" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="this.pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="this.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.total">
    </el-pagination>
    <!--添加管理对话框-->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>
    <!--编辑管理对话框-->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消 编 辑</el-button>
        <el-button type="primary" @click="updateUser()">确 定 编 辑</el-button>
      </div>
    </el-dialog>
    <!--分配角色-->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRole">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          {{currUsername}}
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="currRoleId">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option
              v-for="(item, index) in roleName"
              :label="item.roleName"
              :value="item.id"
              :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
        <el-button type="primary" @click="setRoleUser()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  name: 'users',
  data () {
    return {
      query: '',
      usersList: [
        {
          create_time: '',
          email: '',
          id: '',
          mg_state: '',
          mobile: '',
          role_name: '',
          username: ''
        }
      ],
      pagenum: 1,
      pagesize: 2,
      total: -1,
      form: {
        username: '',
        password: '',
        mobile: '',
        email: '',
        id: '',
        rid: ''
      },
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleRole: false,
      formLabelWidth: '100px',
      currUsername: '',
      currRoleId: -1,
      roleName: [],
      currUserId: ''
    }
  },
  created () {
    this.getUsersList()
  },
  methods: {
    // 发送请求获取数据
    async getUsersList () {
      // const AUTH_TOKEN = localStorage.getItem('token')
      // this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      var res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      // console.log(res)
      const {meta: {msg, status}, data: {pagenum, total, users}} = res.data
      if (status === 200) {
        this.usersList = users
        this.pagenum = pagenum
        this.total = total
        this.$message.success(msg)
      } else {
        this.$message.warning(msg)
      }
    },
    // 每一页显示几条数据
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.getUsersList()
    },
    // 当前页码数
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getUsersList()
    },
    // 搜索功能
    searchUser () {
      this.pagenum = 1
      this.getUsersList()
    },
    // 搜索框清空时触发
    clearUser () {
      this.getUsersList()
    },
    // 点击添加按钮打开对话框
    addClick () {
      this.dialogFormVisibleAdd = true
      for (let key in this.form) {
        this.form[key] = ''
      }
    },
    // 点击确认按钮添加用户
    async addUser () {
      const res = await this.$http.post('users', this.form)
      // console.log(res)
      const {meta: {msg, status}} = res.data
      // console.log(status)
      if (status === 201) {
        for (let key in this.form) {
          this.form[key] = ''
        }
        this.$message.success(msg)
        this.dialogFormVisibleAdd = false
        this.getUsersList()
      } else {
        this.$message.warning(msg)
      }
    },
    // 删除用户
    async deleteUser (id) {
      const res = await this.$http.delete(`users/${id}`)
      console.log(res)
      const {meta: {msg, status}} = res.data
      if (status === 200) {
        this.getUsersList()
        this.$message.success(msg)
      } else {
        this.$message.warning(msg)
      }
    },
    // 点击编辑按钮打开对话框
    editUser (id) {
      this.dialogFormVisibleEdit = true
      this.getEdit(id)
    },
    // 根据id获取用户信息
    async getEdit (id) {
      const res = await this.$http.get(`users/${id}`)
      // console.log(res)
      const {meta: {msg, status}, data} = res.data
      if (status === 200) {
        this.form = data
        this.$message.success(msg)
      } else {
        this.$message.warning(msg)
      }
    },
    // 点击按钮编辑用户
    async updateUser () {
      const res = await this.$http.put(`users/${this.form.id}`, this.form)
      const {meta: {msg, status}} = res.data
      if (status === 200) {
        for (let key in this.form) {
          this.form[key] = ''
        }
        this.dialogFormVisibleEdit = false
        this.getUsersList()
        this.$message.success(msg)
      } else {
        this.$message.warning(msg)
      }
    },
    // 点击按钮切换用户状态
    async stateUser (id, state) {
      const res = await this.$http.put(`users/${id}/state/${state}`)
      // console.log(res)
      const {meta: {msg, status}} = res.data
      if (status === 200) {
        this.$message.success(msg)
      } else {
        this.$message.warning(msg)
      }
    },
    // 点击分配角色按钮弹出对话框
    async getRoleUser (user) {
      this.dialogFormVisibleRole = true
      this.currUsername = user.username
      this.currUserId = user.id
      const res = await this.$http.get('roles')
      const res2 = await this.$http.get(`users/${user.id}`)
      // console.log(res)
      const {meta: {status}, data} = res.data
      if (status === 200) {
        this.roleName = data
        this.currRoleId = res2.data.data.rid
      }
    },
    // 点击按钮更改角色信息
    async setRoleUser () {
      const res = await this.$http.put(`users/${this.currUserId}/role`, {rid: this.currRoleId})
      // console.log(res)
      const {meta: {msg, status}} = res.data
      if (status === 200) {
        this.dialogFormVisibleRole = false
        this.$message.success(msg)
      } else {
        this.$message.warning(msg)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .users-container {
    width: 100%;
    height: 100%;
    background: #fff;
    padding: 20px;
    box-sizing: border-box;

    .user-nav {
    }

    .search {
      margin-top: 15px;
      margin-bottom: 15px;
      width: 600px;
      .input-with-select {
        width: 350px;
      }
    }
  }
</style>

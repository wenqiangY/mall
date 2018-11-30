<template>
    <el-card class="box-card">
      <!--面包屑导航-->
      <my-brand level1="权限管理" level2="角色列表"></my-brand>
      <!--添加按钮-->
      <el-button class="addRole">添加角色</el-button>
      <!--表格-->
      <el-table
        :data="rolelist"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row class="level1" v-for="item1 in scope.row.children" :key="item1.id">
              <!--一级权限-->
              <el-col :span="4">
                <el-tag @close="deleteRole(scope.row, item1.id)" closable>{{item1.authName}}</el-tag>
                <i class="el-icon-arrow-right"></i>
              </el-col>
              <el-col :span="20">
                <el-row v-for="item2 in item1.children" :key="item2.id">
                  <!--二级权限-->
                  <el-col :span="4">
                    <el-tag @close="deleteRole(scope.row, item2.id)" type="success" closable>{{item2.authName}}</el-tag>
                    <i class="el-icon-arrow-right"></i>
                  </el-col>
                  <!--三级权限-->
                  <el-col :span="20">
                    <el-tag
                      @close="deleteRole(scope.row, item3.id)"
                      v-for="item3 in item2.children" :key="item3.id"
                      type="warning" closable>
                      {{item3.authName}}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row v-if="scope.row.children.length === 0">未分配权限</el-row>
          </template>
        </el-table-column>
        <el-table-column
          type="index"
          label="#">
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="角色名称">
        </el-table-column>
        <el-table-column
          prop="roleDesc"
          label="角色描述">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button @click="editUser(scope.row.id)" size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
            <el-button @click="deleteUser(scope.row.id)" size="mini" plain type="danger" icon="el-icon-delete" circle></el-button>
            <el-button @click="showSetRightDia(scope.row)" size="mini" plain type="success" icon="el-icon-check" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--权限分配-->
      <el-dialog title="分配权限" :visible.sync="dialogFormVisibleRight">
          <el-tree
            ref="tree"
            :data="treelist"
            show-checkbox
            node-key="id"
            default-expand-all
            :default-checked-keys="arrcheck"
            :props="defaultProps">
          </el-tree>
          <el-button @click="dialogFormVisibleRight = false">取 消</el-button>
          <el-button type="primary" @click="setRoleRight()">确 定</el-button>
      </el-dialog>
    </el-card>
</template>

<script>
export default {
  // name: "role"
  data () {
    return {
      rolelist: [],
      dialogFormVisibleRight: false,
      // 树形结构的权限数据
      treelist: [],
      arrexpand: [],
      arrcheck: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      // 当前要修改权限的角色id
      currRoleId: -1
    }
  },
  mounted () {
    this.getRole()
  },
  methods: {
    // 获取数据
    async getRole () {
      const res = await this.$http.get('roles')
      // console.log(res)
      const {meta: {msg, status}, data} = res.data
      if (status === 200) {
        // console.log(data)
        this.rolelist = data
      } else {
        this.$message.warning(msg)
      }
    },
    // 删除角色权限
    async deleteRole (role, itemId) {
      let roleId = role.id
      const res = await this.$http.delete(`roles/${roleId}/rights/${itemId}`)
      // console.log(res)
      const {meta: {msg, status}, data} = res.data
      if (status === 200) {
        role.children = data
        this.$message.success(msg)
      } else {
        this.$message.success(msg)
      }
    },
    // 获取权限列表
    async showSetRightDia (role) {
      this.currRoleId = role.id
      this.dialogFormVisibleRight = true
      const res = await this.$http.get('rights/tree')
      // console.log(res)
      const {meta: {msg, status}, data} = res.data
      if (status === 200) {
        this.treelist = data
        let arrtemp = []
        role.children.forEach(item1 => {
          // arrtemp.push(item1.id)
          item1.children.forEach(item2 => {
            // arrtemp.push(item2.id)
            item2.children.forEach(item3 => {
              arrtemp.push(item3.id)
            })
          })
        })
        this.arrcheck = arrtemp
      } else {
        this.$message.warning(msg)
      }
    },
    // 点击确定修改权限
    async setRoleRight () {
      // console.log(currRoleId)

      // roles/:roleId/rights  ->  this.currRoleId  = role.id
      // roleId 角色id
      // 请求体 rids:以 , 分割的权限 ID 列表
      // 获取全选或者半选的节点的id
      // 获取半选节点id的数组  getHalfCheckedKeys
      let arr2 = this.$refs.tree.getHalfCheckedKeys()
      // console.log(arr2)

      // 获取全选节点id的数组 getCheckedKeys
      let arr1 = this.$refs.tree.getCheckedKeys()
      // console.log(arr1)

      // ES6 展开操作运算符
      let arr = [...arr1, ...arr2]
      // console.log(arr)

      await this.$http.post(`roles/${this.currRoleId}/rights`, {
        rids: arr.join(',')
      })

      this.dialogFormVisibleRight = false
      this.getRole()
    }
  }
}
</script>

<style lang="scss" scoped>
  .addRole {
    margin-top: 20px;
  }
</style>

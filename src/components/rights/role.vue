<template>
    <el-card class="box-card">
      <!--面包屑导航-->
      <my-brand level1="权限管理" level2="角色列表"></my-brand>
      <!--表格-->
      <el-table
        :data="roleList"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row class="level1" v-for="item1 in scope.row.children" :key="item1.id">
              <!--一级权限-->
              <el-col :span="4">
                <el-tag closable>{{item1.authName}}</el-tag>
                <i class="el-icon-arrow-right"></i>
              </el-col>
              <el-col :span="20">
                <el-row v-for="item2 in item1.children" :key="item2.id">
                  <!--二级权限-->
                  <el-col :span="4">
                    <el-tag type="success" closable>{{item2.authName}}</el-tag>
                    <i class="el-icon-arrow-right"></i>
                  </el-col>
                  <!--三级权限-->
                  <el-col :span="16">
                    <el-tag
                      v-for="item3 in item2.children" :key="item3.id"
                      type="warning" closable>
                      {{item3.authName}}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
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
            <el-button @click="getRoleUser(scope.row)" size="mini" plain type="success" icon="el-icon-check" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
</template>

<script>
export default {
  // name: "role"
  data () {
    return {
      roleList: []
    }
  },
  mounted () {
    this.getRole()
  },
  methods: {
    async getRole () {
      const res = await this.$http.get('roles')
      // console.log(res)
      const {meta: {msg, status}, data} = res.data
      if (status === 200) {
        // console.log(data)
        this.roleList = data
        this.$message.success(msg)
      } else {
        this.$message.warning(msg)
      }
    }
  }
}
</script>

<style scoped>

</style>

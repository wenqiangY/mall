<template>
  <el-card class="box-card">
    <!--面包屑导航-->
    <my-brand level1="权限管理" level2="权限列表"></my-brand>
    <!--表格-->
    <el-table
      height="520"
      border
      :data="rightsList"
      style="width: 100%">
      <el-table-column
        type="index"
        label="#"
        width="80">
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限管理"
        width="180">
      </el-table-column>
      <el-table-column
        prop="path"
        label="权限列表"
        width="180">
      </el-table-column>
      <el-table-column
        label="权限列表"
        width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.level === '0'">一级</span>
          <span v-if="scope.row.level === '1'">二级</span>
          <span v-if="scope.row.level === '2'">三级</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  // name: "rights"
  data () {
    return {
      rightsList: [
        {
          authName: '',
          path: ''
        }
      ]
    }
  },
  mounted () {
    this.getRights()
  },
  methods: {
    async getRights () {
      const res = await this.$http.get('rights/list')
      // console.log(res)
      const {meta: {msg, status}, data} = res.data
      if (status === 200) {
        this.rightsList = data
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

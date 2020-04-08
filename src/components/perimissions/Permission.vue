<template>
  <el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
  <el-table
    :data="permissions"
    style="width: 100%">
    <el-table-column type="index"
                     label="#"
                     width="80">
    </el-table-column>
    <el-table-column
      prop="name"
      label="权限名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="value"
      label="权限值"
      width="180">
    </el-table-column>
    <el-table-column
      prop="createdAt"
      label="创建时间">
      <template slot-scope="scope">
        {{scope.row.createdAt | dateformat}}
      </template>
    </el-table-column>
  </el-table>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      permissions: []
    }
  },
  created () {
    this.getPermissions()
  },
  methods: {
    // 发送获取权限列表的请求
    async getPermissions () {
      // 获取登录后的token和userPk
      const token = localStorage.getItem('token')
      const userPk = localStorage.getItem('userPk')
      // 设置验证的token和用户信息
      this.$http.defaults.headers.common['Authorization'] = token
      this.$http.defaults.headers.common['X-CARALIU-USER-PK'] = userPk
      const result = await this.$http.get('/permissions')
      this.permissions = result.data.mngPermissionInfos
    }
  }
}
</script>

<style scoped>

</style>

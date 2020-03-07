<template>
  <el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="searchRow">
      <el-col>
        <el-input placeholder="请输入内容" v-model="query" class="inputSearch">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success">添加用户</el-button>
      </el-col>
    </el-row>

    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column type="index"
        label="#"
        width="80">
      </el-table-column>
      <el-table-column
        prop="nickName"
        label="昵称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="account"
        label="账号">
      </el-table-column>
      <el-table-column
        prop="status"
        label="用户状态">
      </el-table-column>
      <el-table-column
        prop="createAt"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="operate"
        label="操作">
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      pageNum: 1,
      pageSize: 2,
      tableData: [{
        nickName: '王小虎',
        account: '上海市普陀区金沙江路 1518 弄',
        status: '上海市普陀区金沙江路 1518 弄',
        createAt: '上海市普陀区金沙江路 1518 弄'
      }, {
        nickName: '王小虎',
        account: '上海市普陀区金沙江路 1518 弄',
        status: '上海市普陀区金沙江路 1518 弄',
        createAt: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  created () {
    this.getUsers()
  },
  methods: {
    async getUsers () {
      const token = localStorage.getItem('jwt')
      // this.$http.defaults.headers.common['Authorization'] = token
      const result = await this.$http.get(`users?query=${this.query}&pageNum=${this.pageNum}&pageSize=${this.pageSize}`,{
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      console.log(result)
    }
  }
}
</script>

<style scoped>
  .inputSearch {
    width: 300px;
  }
  .searchRow {
    margin-top: 20px;
  }
</style>

<template>
  <el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索框-->
    <el-row class="searchRow">
      <el-col>
        <el-input  @clear="reloadUsers()" placeholder="请输入内容"   v-model="nickName" clearable  class="inputSearch" @>
          <el-button @click="searchUsers()" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" @click="showUserDialog()" >添加用户</el-button>
      </el-col>
    </el-row>
    <!--用户显示列表-->
    <el-table
      :data="mngUsers"
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
        prop="mobileNumber"
        label="联系电话">
      </el-table-column>
      <el-table-column
        prop="type"
        label="用户类型">
      </el-table-column>
      <el-table-column
        prop="createdAt"
        label="创建时间">
        <template slot-scope="scope">
          {{scope.row.createdAt | dateformat}}
        </template>
      </el-table-column>
      <el-table-column
        prop="operate"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="showUpdateUserDialog(scope.row.pk)" size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
          <el-button @click="showDelUserMsgBox(scope.row.pk)" size="mini" plain type="danger" icon="el-icon-delete" circle></el-button>
          <el-button @click="showUpdateUserRoleDialog(scope.row)" type="success"  size="mini" icon="el-icon-check" plain circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页功能-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!--添加用户的对话框-->
    <el-dialog title="添加用户" :visible.sync="addUserDialog">
      <el-form :model="form">
        <el-form-item required label="用户账号" label-width="100px">
          <el-input v-model="form.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item required label="用户昵称" label-width="100px">
          <el-input v-model="form.nickName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item required label="账号密码" label-width="100px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" label-width="100px">
          <el-input v-model="form.mobileNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" label-width="100px">
          <el-select v-model="form.type" placeholder="请选择类型">
            <el-option label="超级管理员" value="1"></el-option>
            <el-option label="普通用户" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserDialog = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改用户的对话框-->
    <el-dialog title="修改用户" :visible.sync="updateUserDialog">
      <el-form :model="form">
        <el-form-item label="用户pk" label-width="100px" v-show="false">
          <el-input  v-model="form.pk" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户账号" label-width="100px">
          <el-input disabled v-model="form.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item required label="用户昵称" label-width="100px">
          <el-input v-model="form.nickName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" label-width="100px">
          <el-input v-model="form.mobileNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" label-width="100px">
          <el-select v-model="form.type" placeholder="请选择类型">
            <el-option label="超级管理员" :value="1"></el-option>
            <el-option label="普通用户" :value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateUserDialog = false,form={}">取 消</el-button>
        <el-button type="primary" @click="updateUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改用户的角色对话框-->
    <el-dialog title="修改用户角色" :visible.sync="updateUserRoleDialog">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          {{currentUserName}}
        </el-form-item>
        <el-form-item label="角色" label-width="100px">
          <el-select v-model="curRoleId" placeholder="请选择">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option :label="item.name" :value="item.pk"
            v-for="(item,i) in roles" :key="i"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateUserRoleDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateUserRole()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      nickName: '',
      pageNum: 1,
      pageSize: 10,
      total: 0,
      mngUsers: [],
      addUserDialog: false,
      updateUserDialog: false,
      updateUserRoleDialog: false,
      form: {
        nickName: '',
        account: '',
        password: '',
        mobileNumber: '',
        type: ''
      },
      // 分配角色
      curRoleId: -1,
      currentUserPk: -1,
      currentUserName: '',
      roles: []
    }
  },
  created () {
    this.getUsers()
  },
  methods: {
    // 修改用户角色
    async updateUserRole () {
      this.updateUserRoleDialog = false
      const result = await this.$http.put(`/user/role/${this.currentUserPk}/${this.curRoleId}`)
      if (result.status === 200) {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
      }
    },
    // 打开修改用户角色的对话框
    async showUpdateUserRoleDialog (user) {
      this.currentUserName = user.nickName
      this.currentUserPk = user.pk
      // 管理员没有角色的修改
      if (user.type === '超级管理员') {
        this.$message({
          type: 'warning',
          message: '超级管理员拥有所有权限，不需要设置角色'
        })
        return
      }
      this.updateUserRoleDialog = true
      const result = await this.$http.get('/roles')
      this.roles = result.data.roleInfos
      // 默认选中角色
      const role = await this.$http.get(`/user/role/${user.pk}`)
      if (role.data === '') {
        this.curRoleId = -1
      } else {
        this.curRoleId = role.data.pk
      }
    },
    // 修改用户信息
    async updateUser () {
      this.updateUserDialog = false
      // 发送更新请求
      const result = await this.$http.put('/user', this.form)
      if (result.status === 200) {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.getUsers()
      }
    },
    // 显示修改用户的对话框
    async showUpdateUserDialog (userPk) {
      // 查询用户信息
      const result = await this.$http.get(`user/${userPk}`, null)
      this.form = result.data
      this.updateUserDialog = true
    },
    // 删除用户
    async showDelUserMsgBox (userPk) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 发送删除用户的请求
        this.$http.delete(`/user/${userPk}`, null).then((result) => {
          if (result.status === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getUsers()
          }
        }).catch(error => {
          this.$message({
            type: 'error',
            message: error.response.data.errorMessage
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 添加用户
    async addUser () {
      // 关闭对话框
      this.addUserDialog = false
      const result = await this.$http.post('user', this.form)
      if (result.status === 200) {
        // 刷新界面
        this.getUsers()
        // 显示成功提示
        this.$message.success('添加成功')
        // 情况表单数据
        this.form = {}
      } else {
        this.$message.warning('添加失败')
      }
    },
    // 显示添加用户的对话框
    showUserDialog () {
      this.addUserDialog = true
    },
    // 重新加载用户列表
    reloadUsers () {
      this.getUsers()
    },
    // 发送搜索请求
    searchUsers () {
      this.getUsers()
    },
    handleCurrentChange (val) {
      this.pageNum = val
      this.getUsers()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getUsers()
    },
    async getUsers () {
      // 获取登录后的token和userPk
      const token = localStorage.getItem('token')
      const userPk = localStorage.getItem('userPk')
      // 设置验证的token和用户信息
      this.$http.defaults.headers.common['Authorization'] = token
      this.$http.defaults.headers.common['X-CARALIU-USER-PK'] = userPk
      // 发送请求用户列表的请求
      const result = await this.$http.post(`users`,
        {'pageNum': `${this.pageNum}`, 'pageSize': `${this.pageSize}`, 'nickName': `${this.nickName}`},
        { headers: {'Content-Type': 'application/json'}
        })
      result.data.mngUserInfos.forEach(x => {
        if (x.type === 1) {
          x.type = '超级管理员'
        } else {
          x.type = '普通用户'
        }
      })
      // 设置响应
      this.mngUsers = result.data.mngUserInfos
      // 设置记录的总条数
      this.total = result.data.total
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

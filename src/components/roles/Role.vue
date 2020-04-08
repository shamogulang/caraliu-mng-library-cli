<template>
  <el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col align="right">
        <el-button type="info" @click="showAddRoleDialog()" >添加角色</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="roles"
      style="width: 100%">
      <el-table-column type="expand"
                       label="#"
                       width="80">
        <template slot-scope="scope">
             <el-row>
               <el-col :span="4">
                 <el-tag>{{23123}}</el-tag>
               </el-col>
               <el-col :span="20">
                 <el-row>
                   <el-col :span="4">
                     <el-tag>{{23123}}</el-tag>
                   </el-col>
                   <el-col :span="20">
                     <el-tag>{{23123}}</el-tag>
                   </el-col>
                 </el-row>
               </el-col>
             </el-row>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="角色名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="createdAt"
        label="创建时间"
        width="180">
        <template slot-scope="scope">
          {{scope.row.createdAt | dateformat}}
        </template>
      </el-table-column>
      <el-table-column
        prop="operate"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="showUpdateRoleDialog(scope.row.pk)" size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
          <el-button @click="showDelRoleBox(scope.row.pk)" size="mini" plain type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--增加用户角色的对话框-->
    <el-dialog title="增加用户角色" :visible.sync="addRoleDialog">
      <el-form :model="form">
        <el-form-item label="用户角色" label-width="100px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addRoleDialog = false,form={}">取 消</el-button>
        <el-button type="primary" @click="addRole()">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改用户角色的对话框-->
    <el-dialog title="修改用户角色" :visible.sync="updateRoleDialog">
      <el-form :model="form">
        <el-form-item label="角色pk" label-width="100px" v-show="false">
          <el-input disable v-model="form.pk" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户角色" label-width="100px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateRoleDialog = false,form={}">取 消</el-button>
        <el-button type="primary" @click="updateRole()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      roles: [],
      addRoleDialog: false,
      updateRoleDialog: false,
      form: {
        'pk': '',
        'name': ''
      }
    }
  },
  created () {
    this.getRoles()
  },
  methods: {
    // 修改用户角色
    async updateRole () {
      // 关闭弹出框
      this.updateRoleDialog = false
      const result = await this.$http.put('/role', this.form)
      if (result.status === 200) {
        // 刷新界面
        this.getRoles()
        // 显示成功提示
        this.$message.success('修改成功')
        // 情况表单数据
        this.form = {}
      } else {
        this.$message.warning('添加失败')
      }
    },
    async showUpdateRoleDialog (rolePk) {
      this.updateRoleDialog = true
      const result = await this.$http.get(`/role/${rolePk}`)
      this.form = result.data
    },
    // 增加用户角色
    async addRole () {
      // 关闭弹出框
      this.addRoleDialog = false
      const result = await this.$http.post('/role', this.form)
      if (result.status === 200) {
        // 刷新界面
        this.getRoles()
        // 显示成功提示
        this.$message.success('添加成功')
        // 情况表单数据
        this.form = {}
      } else {
        this.$message.warning('添加失败')
      }
    },
    showAddRoleDialog () {
      this.addRoleDialog = true
    },
    // 删除用户
    async showDelRoleBox (rolePk) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 发送删除用户的请求
        this.$http.delete(`/role/${rolePk}`, null).then((result) => {
          if (result.status === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getRoles()
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
    async getRoles () {
      // 获取登录后的token和userPk
      const token = localStorage.getItem('token')
      const userPk = localStorage.getItem('userPk')
      // 设置验证的token和用户信息
      this.$http.defaults.headers.common['Authorization'] = token
      this.$http.defaults.headers.common['X-CARALIU-USER-PK'] = userPk
      const result = await this.$http.get('/roles')
      this.roles = result.data.roleInfos
    }
  }
}
</script>

<style scoped>

</style>

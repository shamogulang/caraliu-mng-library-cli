<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="3">
          <div class="">
            <img src="../../assets/logo.png" alt="图片无法显示" >
          </div>
        </el-col>
        <el-col :span="18" class="middle">
          <div class="grid-content bg-purple-light">
            <h3>小桃子私塾图书馆管理系统</h3>
          </div>
        </el-col>
        <el-col :span="1" class="logout">
          <div class="grid-content bg-purple">
            <a title="退出登录" class="signOut"
               @click.prevent="handleSignOut()" href="#"> <el-button plain size = "mini" type="danger" icon="el-icon-right" circle></el-button></a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">
        <el-menu :router="true" :unique-opened="true">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="users">
              <i class="el-icon-menu"></i>
              <span>用户列表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>

        <el-menu :router="true" :unique-opened="true">
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="roles">
              <i class="el-icon-menu"></i>
              <span>角色列表</span>
            </el-menu-item>
            <el-menu-item index="permissions">
              <i class="el-icon-menu"></i>
              <span>权限列表</span>
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
  beforeCreate () {
    // 获取token
    const token = localStorage.getItem('token')
    if (!token) {
      this.$router.push({name: 'Login'})
    }
  },
  methods: {
    handleSignOut () {
      localStorage.clear()
      this.$message.success('退出成功')
      this.$router.push({name: 'Login'})
    }
  }
}
</script>

<style scoped>
  .container {
    height: 100%;
  }

  .header {
    background-color: #b3c0d1;
  }

  .aside {
    background-color: #d3dcd6;
  }

  .main {
    background-color: #e9eef3;
  }

  .middle {
    text-align: center;
  }

  .logout {
    line-height: 60px;
    text-decoration: none;
  }
</style>

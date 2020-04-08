<template>
  <div id="login" class="login-warp">
    <el-form class="login-form" :label-position="labelPosition" label-width="40px" :model="formData">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formData.account"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password"></el-input>
      </el-form-item>
      <el-button @click.prevent="handleLogin()"
                 class="login-btn" type="primary">登录
      </el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      labelPosition: 'top',
      formData: {
        account: '',
        password: ''
      }
    }
  },
  methods: {
    handleLogin () {
      this.$http.post('login', this.formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        if (res.status === 200) {
          // 登录成功，保存token
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('userPk', res.data.pk)
          this.$router.push({name: 'Home'})
          this.$message.success('登录成功')
        } else {
          this.$message.error('用户不存在')
        }
      })
    }
  }
}
</script>

<style scoped>
  .login-warp {
    height: 100%;
    background-color: #2c3e50;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-warp .login-form {
    width: 400px;
    background-color: #fff;
    border-radius: 5px;
    padding: 30px;
  }

  .login-warp .login-btn {
    width: 100%;
  }
</style>

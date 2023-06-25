<template>
  <div v-loading="loading" element-loading-text="Logining..." class="body">
    <div class="login-warpper">
      <h1>登&nbsp;&nbsp;&nbsp;&nbsp;录</h1>
      <el-divider style="margin: 5px 20px 5px 20px;width: 85%;"></el-divider>
      <el-form v-model="loginForm" label-position="top" label-width="100px" style="width: 80%">
        <el-form-item label="用户名">
          <el-input v-model="loginForm.username" clearable />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginForm.password" clearable showPassword />
        </el-form-item>
      </el-form>
      <div style="display: flex;">
        <el-button type="primary" @click="handleLogin()" plain>Login</el-button>
        <el-button type="primary" @click="dialogFormVisible = true" plain>Register</el-button>
        <el-dialog v-model="dialogFormVisible" title="Sign In">
          <el-form :model="registerForm">
            <el-form-item label="User name" :label-width="formLabelWidth">
              <el-input v-model="registerForm.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Password" :label-width="formLabelWidth">
              <el-input v-model="registerForm.password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Role" :label-width="formLabelWidth">
              <el-select v-model="registerForm.role" placeholder="Please select a role">
                <el-option label="Normal user" value="user" />
                <el-option label="Super admin" value="admin" disabled />
              </el-select>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogFormVisible = false">Cancel</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">
                Confirm
              </el-button>
            </span>
          </template>
        </el-dialog>
      </div>
    </div>
    <div class="side-background"></div>
  </div>
</template>

<script>
import axios from 'axios';
import { useUserStore } from '../../store/modules/user';
import { storeToRefs } from "pinia";


export default {
  setup () {
    const store = useUserStore()
    let { token, username, role } = storeToRefs(store) //方法3：可以利用从pinia中引用的storeToRefs方法，进行解构赋值 再return出去 类似 vue3 中的 toRefs
    console.log(store)
    return {
      // store, //方法1：可以把整个store return出去
      // baseUrl: computed(() => store.baseUrl),  //方法2：可以利用computed属性，将需要展示的值return出去
      token,
      username,
      role,
    }
  },
  data () {
    return {
      loading: false,
      dialogFormVisible: false,
      loginForm: {
        username: '',
        password: '',
      },
      registerForm: {
        name: '',
        password: '',
        role: '',
      },
      formLabelWidth: '140px',
    }
  },
  methods: {
    test () {
      console.log(this.loginForm);
      console.log(JSON.stringify(this.loginForm))
    },
    handleLogin () {
      {
        var _this = this;
        if (_this.loginForm.username == null || _this.loginForm.username === ''
          || _this.loginForm.username.trim() === '') {
          ElMessage({
            type: 'warning',
            message: '用户名为空'
          })
        } else if (_this.loginForm.password == null || _this.loginForm.password === ''
          || _this.loginForm.password.trim() === '') {
          ElMessage({
            type: 'warning',
            message: '密码为空'
          })
        } else {
          _this.loading = true
          const userStore = useUserStore();
          let user = {
            "username": _this.loginForm.username,
            "password": _this.loginForm.password,
          }
          userStore
            .login(user)
            .then(() => {
              _this.$router.push("/");
            })
            .catch(() => {
              // 验证失败，重新生成验证码
              console.log("验证失败")
            })
            .finally(() => {
              _this.loading = false;
            });
        }
      }
    },
    login () {
      var _this = this;
      if (_this.loginForm.username == null || _this.loginForm.username === ''
        || _this.loginForm.username.trim() === '') {
        ElMessage({
          type: 'warning',
          message: '用户名为空'
        })
      } else if (_this.loginForm.password == null || _this.loginForm.password === ''
        || _this.loginForm.password.trim() === '') {
        ElMessage({
          type: 'warning',
          message: '密码为空'
        })
      } else {
        _this.loading = true

        axios.post("http://localhost:8099/user/login", {
          "username": _this.loginForm.username,
          "password": _this.loginForm.password,
        })
          .then((response) => {
            // console.log(response)
            if (response.data.code == 200) {
              ElMessage({
                type: 'success',
                message: response.data.msg
              })

              //保存token
              //转跳main
              _this.$router.push("/main")
            } else if (response.data.code == 400) {
              ElMessage({
                type: 'warning',
                message: response.data.msg
              })
            } else {
              //转跳404
            }
          })
          .finally(() => {
            _this.loading = false;
          })
      }

    }
  }
}


</script>
<style scoped>
.body {
  height: 100%;
  margin: 10px 10px 10px 10px;
  padding: 0;
  display: flex;
}

.login-warpper {
  /* background-color: bisque; */
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.side-background {
  width: 100%;
  height: 680px;
  margin-left: 8px;
  flex: 1;
  background-image: url(../../assets/images/bg.png);
  background-repeat: no-repeat;
  animation-name: backgroundWalkX;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-duration: 60s;
  animation-fill-mode: forwards;
  animation-direction: alternate;
}

@keyframes backgroundWalkX {
  0% {
    background-position: 0 0%;
  }

  100% {
    background-position: 100% 0;
  }
}

.el-select {
  width: 300px;
}

.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
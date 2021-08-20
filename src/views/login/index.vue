<template>
  <el-form
    ref="loginForm"
    :model="loginForm"
    :rules="loginRules"
    class="login-form"
    auto-complete="on"
    label-position="left"
  >
    <body>
      <div class="main">
        <div class="main0">
          <div class="main_top">病房信息化服务平台</div>
          <div class="main_left">
            <img src="./images/login-image-3.png" class="theimg" />
            <img src="./images/login-image-2.png" class="secimg" />
            <img src="./images/login-image-1.png" class="firimg" />
          </div>
          <div class="main_right">
            <div class="main_r_up">
              <img src="./images/user.png" />
              <div class="pp">登录</div>
            </div>
            <div class="sub">
              <td>
                <el-button
                  type="text"
                  style="margin-left: 120px; margin-top: -10px"
                  disabled
                  >还没有账号？</el-button
                >
              </td>
              <td>
                <el-button
                  type="text"
                  style="margin-left: 0px; margin-top: -10px"
                  @click.native.prevent="handleRegister"
                  >立即注册</el-button
                >
              </td>
            </div>
            <div class="txt">
              <td>
                <span style="letter-spacing: 4px">用户名:</span>
              </td>
              <td>
                <el-input
                  ref="username"
                  v-model="loginForm.username"
                  placeholder="请输入用户名"
                  name="username"
                  type="text"
                  tabindex="1"
                  auto-complete="on"
                  style="letter-spacing: 4px; margin-left: 16px; width: 210px"
                />
              </td>
            </div>
            <div class="txt">
              <td>
                <span style="letter-spacing: 4px">登录密码:</span>
              </td>
              <td>
                <el-input
                  :key="passwordType"
                  ref="password"
                  v-model="loginForm.password"
                  :type="passwordType"
                  placeholder="请输入密码"
                  name="password"
                  tabindex="2"
                  auto-complete="on"
                  style="letter-spacing: 4px; width: 210px"
                  @keyup.enter.native="handleLogin"
                />
              </td>
            </div>
            <div class="txt">
              <span style="float: left; letter-spacing: 8px">验证码:</span>
              <input name="" type="text" class="txtyzm" />
              <img src="./images/yanzhengma.png" class="yzmimg" />
            </div>
            <el-button
              :loading="loading"
              type="primary"
              style="
                width: 260px;
                height: 40px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                margin-left: 80px;
                margin-top: 40px;
                border-radius: 5px;
              "
              @click.native.prevent="handleLogin"
              >登录</el-button
            >
          </div>
        </div>
      </div>
    </body>
  </el-form>
</template>

<script>
//import store from './store'
import { validUsername } from "@/utils/validate";
import request from "../../utils/request.js";
import store from '../../store'
export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "admin",
        password: "123456",
      },
      loginRules: {
        username: [{ required: true, trigger: "blur" }],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          //   request({
          //     url: "/login/",
          //     method: "post",
          //     data: this.loginForm,
          //  }).then(()=>{
          //    this.$router.push({ path: '/register' })
          //  })
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch(() => {
              this.$message({
                message: "请检查账号密码或先去邮箱激活账号",
                type: "warning",
              });
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleRegister() {
      this.$router.push({ path: "/register" });
    },
  },
};
</script>

<style scoped>
@import "./css/login.css";
</style>

 
<template>
  <div class="wrapper">
    <div class="section-authentication-signin d-flex align-items-center justify-content-center my-5 my-lg-0">
      <div class="container-fluid">
        <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
          <div class="col mx-auto">
            <div class="mb-4 text-center">
              <img src="@/assets/images/logo-img.png" width="300" alt="" />
            </div>
            <div class="card">
              <div class="card-body">
                <div class="border p-4 rounded">
                  <div class="text-center">
                    <h3 class="">登录</h3>
                    <p>还没有账号吗? <a href="" @click.prevent="handleRegister">点击这里注册</a>
                    </p>
                  </div>
                  
                  <div class="login-separater text-center mb-4"> 
                    <hr/>
                  </div>
                  <div class="form-body">
                    <el-form ref="loginForm" class="row g-3" autocomplete="on" :model="loginForm" :rules="loginRules">
                      <div class="col-12">
                        <label for="inputUserName" class="form-label">用户名</label>
                        <el-form-item  prop="username">
                        <input
                          ref="username" 
                          type="text" 
                          class="form-control" 
                          id="inputUserName" 
                          placeholder="请输入用户名"
                          v-model="loginForm.username"
                          tabindex="1"
                          auto-complete="on"
                          />
                        </el-form-item>
                      </div>
                      <div class="col-12" style="margin-top: -10px">
                        <label for="inputChoosePassword" class="form-label">输入密码</label>
                        <el-form-item  prop="password">
                        <div class="input-group" id="show_hide_password">
                          
                          <input 
                            ref="password"
                            v-model="loginForm.password"
                            :key="passwordType"
                            :type="passwordType" 
                            name="password"
                            tabindex="2"
                            auto-complete="on"
                            @keyup.enter.native="handleLogin"
                            class="form-control border-end-0" 
                            id="inputChoosePassword" 
                            value="12345678" 
                            placeholder="请输入密码"
                            > <a  @click="showPwd" class="input-group-text bg-transparent"><i :class="passwordType === 'password' ? 'bx bx-hide' : 'bx bx-show'"></i></a>
                          
                        </div>
                        </el-form-item>
                      </div>
                      <div class="col-md-6" style="margin-top: -10px">
                         
                        <span for="verificationCode" class="form-label">验证码</span>
                        <el-form-item  prop="code">
                        <input id="verificationCode" name="" type="text" class="form-control" />
                        </el-form-item>

                      </div>
                      <div class="col-md-6" style="margin-top: -10px">
                        
                        <img src="./images/yanzhengma.png" style="margin-top:10%;margin-left:30%" />
                      </div>
                      
                      <div class="col-md-6">
                        <!-- <div class="form-check form-switch">
                          <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked>
                          <label class="form-check-label" for="flexSwitchCheckChecked">Remember Me</label>
                        </div> -->
                      </div>
                      
                      
                      <div class="col-md-6 text-end" style="margin-top: -10px">	<a href="authentication-forgot-password.html">忘记密码 ?</a>
                      </div>
                      
                      <div class="col-12">
                        <div class="d-grid">
                          <el-button 
                            :loading="loading"
                            type="primary" 
                            class="btn btn-light"
                            @click.prevent="handleLogin"
                          >
                            <i class="bx bxs-lock-open"></i>登录
                          </el-button>
                        </div>
                      </div>
                    </el-form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--end row-->
      </div>
    </div>
  </div>
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
        username: "patient",
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
  mounted() {
    document.getElementsByTagName('body')[0].className = "bg-theme bg-theme2";
  },
  // beforeDestroy() {
  //   document.getElementsByTagName('body')[0].className = "";
  //   location.reload();
  // },
};
</script>

<style scoped>
@import "./css/login.css";
@import "../../assets/plugins/simplebar/css/simplebar.css";
@import "../../assets/plugins/perfect-scrollbar/css/perfect-scrollbar.css";
@import "../../assets/plugins/metismenu/css/metisMenu.min.css";
@import "../../assets/css/pace.min.css";
@import "../../assets/css/bootstrap.min.css";
@import "../../assets/css/app.css";
@import "../../assets/css/icons.css";
</style>

 
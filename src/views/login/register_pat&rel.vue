<template>
  <div class="wrapper">
    <div class="section-authentication-signin d-flex align-items-center justify-content-center my-5 my-lg-0">
      <div class="container-fluid">
        <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-2">
          <div class="col mx-auto">
            <!-- <div class="mb-4 text-center">
              <img src="@/assets/images/logo-img.png" width="180" alt="" />
            </div> -->
            <div class="card">
              <div class="card-body">
                <div class="border p-4 rounded">
                  <div class="text-center">
                    <h3 class="">病人/家属注册</h3>
                    <p>已有账号？ <a href="" @click.prevent="jump_login">立即登录</a>
                    </p>
                  </div>
                  
                  <div class="login-separater text-center mb-4"> 
                    <hr/>
                  </div>
                  <div class="form-body">
                    <el-form ref="AdduserForm" class="row g-3" autocomplete="on" :model="AdduserForm" :rules="rules">
                      
                      <div class="col-12">
                        
                        <label for="inputUserAccount" class="form-label">用户账号</label>
                        <el-form-item  prop="username">
                        <input
                          ref="username" 
                          type="text" 
                          class="form-control" 
                          id="inputUserAccount" 
                          placeholder="请输入注册账号"
                          v-model="AdduserForm.username"
                          tabindex="1"
                          auto-complete="on"
                          />
                        </el-form-item>
                      </div>
                      <div class="col-sm-6" style="margin-top: -10px" >
                        <label for="inputChoosePassword" class="form-label">用户密码</label>
                        <el-form-item  prop="password">
                        <div class="input-group" id="show_hide_password">
                          <input 
                            ref="password"
                            v-model="AdduserForm.password"
                            :key="passwordType"
                            :type="passwordType" 
                            name="password"
                            tabindex="2"
                            auto-complete="on"
                            
                            class="form-control border-end-0" 
                            id="inputChoosePassword" 
                            value="12345678" 
                            placeholder="请输入密码"
                            > <a  @click="showPwd" class="input-group-text bg-transparent"><i :class="passwordType === 'password' ? 'bx bx-hide' : 'bx bx-show'"></i></a>
                        </div>
                        </el-form-item>
                      </div>
                      <div class="col-sm-6" style="margin-top: -10px" >
                        <label for="inputPasswordAgain" class="form-label">再次输入密码</label>
                        <el-form-item>
                        <div class="input-group" >
                          <input 
                            ref="password2"
                            
                            
                            :type="passwordType" 
                            name="password"
                            tabindex="2"
                            auto-complete="on"
                            
                            class="form-control border-end-0" 
                            id="inputPasswordAgain" 
                            
                            placeholder="请再次输入密码"
                            > <a  @click="showPwd2" class="input-group-text bg-transparent"><i :class="passwordType2 === 'password' ? 'bx bx-hide' : 'bx bx-show'"></i></a>
                        </div>
                        </el-form-item>
                      </div>
                      <div class="col-8" style="margin-top: -10px" >
                        <label for="inputUserName" class="form-label">姓名</label>
                        <el-form-item prop="name">
                        <input
                           
                          type="text" 
                          class="form-control" 
                          id="inputUserName" 
                          placeholder="请输入姓名"
                          v-model="AdduserForm.name"
                          tabindex="1"
                          auto-complete="on"
                          />
                        </el-form-item> 
                      </div>
                      <div class="col-4" style="margin-top: -10px" >
                        <label for="selectID" class="form-label">身份</label>
                        <el-form-item  prop="identity">
                        <select
                          v-model="AdduserForm.identity"
                          placeholder="请选择身份"
                          id="selectID"
                          class="form-select" 
                        >
                          <option label="病人" value="patient"></option>
                          <option label="家属" value="relation"></option>
                        </select>
                        </el-form-item>
                      </div>
                      <div class="col-sm-6" style="margin-top: -10px" >
                        <el-form-item prop="email">
                        <label for="inputUserEmail" class="form-label">用户邮箱</label>
                        <input
                           
                          type="email" 
                          class="form-control" 
                          id="inputUserEmail" 
                          placeholder="请输入邮箱"
                          v-model="AdduserForm.email"
                          tabindex="1"
                          auto-complete="on"
                          />
                        </el-form-item>
                      </div>
                      <div class="col-sm-6" style="margin-top: 10px">
                        <label for="inputUserPhonenumber" class="form-label">电话号码</label>
                        <el-form-item prop="phonenumber">
                        <input
                           
                          type="phonenumber" 
                          class="form-control" 
                          id="inputUserPhonenumber" 
                          placeholder="请输入电话号码"
                          v-model="AdduserForm.phonenumber"
                          tabindex="1"
                          auto-complete="on"
                          />
                        </el-form-item>
                      </div>
                      
                      <div class="col-12" style="margin-top: -10px">
                        <label for="inputUserBirthday" class="form-label">出生日期</label>
                        <el-form-item  prop="data">
                        <el-date-picker
                          id="inputUserBirthday"
                          v-model="AdduserForm.birthday"
                          type="date"
                          placeholder="选择日期"
                          value-format="yyyy-MM-dd"
                          
                          style="width:100%; background-color: rgb(0 0 0 / 15%);"
                        >
                        </el-date-picker>
                        </el-form-item>
                      </div>
                      
                      <div class="col-sm-4">
                        <div class="d-grid">
                          <el-button 
                            
                            type="primary" 
                            class="btn btn-light"
                            @click="backPage"
                          >
                            <i class="lni lni-chevron-left-circle"></i>上一步
                          </el-button>
                        </div>
                      </div>
                      <div class="col-sm-8">
                        <div class="d-grid">
                          <el-button 
                            
                            type="primary" 
                            class="btn btn-light"
                            @click="submitForm('AdduserForm')"
                          >
                            <i class="bx bx-user"></i>立即创建
                          </el-button>
                        </div>
                      </div>
                      <!-- <div class="col-sm-6">
                        <div class="d-grid">
                          <el-button 
                            
                            type="primary" 
                            class="btn btn-light"
                            @click="resetForm"
                          >
                            <i class="bx bxs-lock-open"></i>重置
                          </el-button>
                        </div>
                      </div> -->
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
import request from "../../utils/request.js";
export default {
  data() {
    return {
      passwordType: "password",
      passwordType2: "password",
      AdduserForm: {
        username: "",
        password: "",
        email: "",
        identity: "",
        name: "",
        phonenumber: "",
        birthday: "",
      },
      loginForm: {
        username: "admin",
        password: "123456",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phonenumber: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "请输入正确的电话号码",
            trigger: "blur",
          },
        ],
        identity: [
          { required: true, message: "请选择身份", trigger: "change" },
        ],
        birthday: [
          {
            type: "date",
            required: true,
            message: "请选择出生日期",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    jump_login() {
      this.$router.push({ path: "/login" });
    },
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
    showPwd2() {
      if (this.passwordType2 === "password") {
        this.passwordType2 = "";
      } else {
        this.passwordType2 = "password";
      }
      this.$nextTick(() => {
        this.$refs.password2.focus();
      });
    },
    submitForm(AdduserForm) {
      this.$refs[AdduserForm].validate((valid) => {
        if (valid) {
          this.$store.dispatch('user/login', this.loginForm).then(()=>{
          var emailform = new FormData();
          request({
            url: "/users/user/",
            method: "post",
            data: this.AdduserForm,
          }).then((res) => {
            this.AdduserForm.user_id = res.data.id;
            emailform.append("user_id", this.AdduserForm.user_id);
            request({
              url: "/email/",
              method: "post",
              data: emailform,
            });
            if (res.data.identity == "patient") {
              request({
                url: "/patient/patient/",
                method: "post",
                data: this.AdduserForm,
              }).then(()=>{
                this.$store.dispatch('user/logout')
              });
            }
            if (res.data.identity == "relation") {
              request({
                url: "/relation/relation/",
                method: "post",
                data: this.AdduserForm,
              }).then(()=>{
                this.$store.dispatch('user/logout')
              });
            }
          });
          this.$router.push({ path: "/register_succ" });
        })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs[this.AdduserForm].resetFields();
    },
    backPage() {
      this.$router.go(-1)
    }
  },
  mounted() {
    document.getElementsByTagName('body')[0].className = "bg-theme bg-theme2";
    
    setTimeout(function (){
 
      document.getElementsByClassName('el-input__inner')[0].style.backgroundColor = "rgb(0 0 0 / 15%)";
      
      // $('el-input__inner').css("backgroundColor","red")
    }, 50);
  },
};
</script>

<style scoped>
@import "./css/register.css";
@import "./css/login.css";
@import "../../assets/plugins/simplebar/css/simplebar.css";
@import "../../assets/plugins/perfect-scrollbar/css/perfect-scrollbar.css";
@import "../../assets/plugins/metismenu/css/metisMenu.min.css";
@import "../../assets/css/pace.min.css";
@import "../../assets/css/bootstrap.min.css";
@import "../../assets/css/app.css";
@import "../../assets/css/icons.css";
  
  .el-input__inner {
   background-color: rgb(0 0 0 / 15%);
  }
</style>

 
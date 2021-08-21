<template>
  <div class="wrapper">
    <div class="section-authentication-signin d-flex align-items-center justify-content-center my-5 my-lg-0">
      <div class="container-fluid">
        <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
          <div class="col mx-auto">
            <div class="mb-4 text-center">
              <img src="@/assets/images/logo-img.png" width="280" alt="" />
            </div>
            <div class="card">
              <div class="card-body">
                <div class="border p-4 rounded">
                  <div class="text-center">
                    <h3 class="">注册</h3>
                    <p>已有账号？<a href="" @click.prevent="jump_login">立即登录</a>
                    </p>
                  </div>
                  
                  <div class="login-separater text-center mb-4"> 
                    <hr/>
                  </div>
                  <div class="form-body">
                    <el-form class="row g-3">
                      <div class="col-md-6">
                        <el-radio  v-model="radio1" label="1" border style="width:100%" >我是医生/护士</el-radio>
                      </div>
                      <div class="col-md-6" style=" float: right">
                        <el-radio v-model="radio1" label="2" border style="width:100%">我是病人/家属</el-radio>
                      </div>
                      <div class="col-12">
                        <label v-show="radio1=='1'" for="inputPass" class="form-label">请输入密码</label>
                        <input id="inputPass" type="text" v-show="radio1=='1'" placeholder="请输入密码" v-model="input" class="form-control" />
                      </div>
                      
                    <div class="col-md-6" style="margin-top:10%">
                        <div class="d-grid">
                          <el-button   class="btn btn-light"  @click.prevent="backPage"><i class="lni lni-chevron-left-circle"></i>上一步</el-button>
                          
                        </div>
                      </div>
                    <div class="col-md-6" style="margin-top:10%">
                        <div class="d-grid">
                          <el-button   class="btn btn-light"  @click.prevent="register_next"><i class="lni lni-chevron-right-circle"></i>下一步</el-button>
                          
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
import request from "../../utils/request.js";
export default {
  data () {
      return {
        radio1: '1',
        input: '', 
        loginForm: {
        username: "admin",
        password: "123456",
      },
      };
    },
 methods: {
    register_next(){
      if(this.radio1=="1" && this.input=='admin'){
      //    console.log("111")
      // request({
      //   url: "/login/",
      //   method: "post",
      //   data: this.loginForm,
      // });
        this.$router.push({ path: '/register_doc&nur' });
      }
      else if(this.radio1=="2"){
        this.$router.push({ path: '/register_pat&rel' });
      }
      else{
        this.$message.error('密码错误');
      }
    },
    jump_login(){
      this.$router.push({ path: '/login' })
    },
    backPage() {
      this.$router.go(-1)
    }
  },
  mounted() {
    document.getElementsByTagName('body')[0].className = "bg-theme bg-theme2";
  },
}
</script>

<style scoped>
@import './css/register.css';
@import "./css/login.css";
@import "../../assets/plugins/simplebar/css/simplebar.css";
@import "../../assets/plugins/perfect-scrollbar/css/perfect-scrollbar.css";
@import "../../assets/plugins/metismenu/css/metisMenu.min.css";
@import "../../assets/css/pace.min.css";
@import "../../assets/css/bootstrap.min.css";
@import "../../assets/css/app.css";
@import "../../assets/css/icons.css";

</style>

 
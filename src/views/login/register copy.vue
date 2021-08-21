<template>
  <body>
<div class="main">
  <div class="main0">
    <div class="main_top">
          病房信息化服务平台
    </div>
     <div class="main_left">
        <img src="./images/zhuce-image-3.png" class="theimg"/>
        <img src="./images/zhuce-image-2.png" class="secimg"/>
        <img src="./images/zhuce-image-1.png" class="firimg"/>
     </div>
     <div class="main_right">
        <div class="main_r_up">
            <img src="./images/user.png" />
            <div class="pp">注册</div>
        </div>
        <div class="sub">
          <td>
            <el-button type="text" style="margin-left:120px;margin-top:-10px" disabled>已有账号？</el-button>
          </td>
          <td>
            <el-button type="text" style="margin-left:0px;margin-top:-10px" @click.native.prevent="jump_login">立即登录</el-button>
          </td>
        </div>
        <div>
        <el-radio v-model="radio1" label="1" border style="margin-top:70px;margin-left:40px">我是医生/护士</el-radio>
        <el-radio v-model="radio1" label="2" border>我是病人/家属</el-radio>
       </div>
        <el-input v-if="radio1=='1'" placeholder="请输入密码" style="margin-top:40px; width:200px;margin-left:100px" v-model="input" class="input1" :disabled="false"></el-input>
        <el-input v-else placeholder="请输入密码" style="margin-top:40px; width:200px;margin-left:100px" v-model="input" class="input1" :disabled="true"></el-input>
        <el-button :loading="loading" type="primary" style="width:260px;height:40px; text-align:center;color:#fff; font-size:14px; margin-left:70px; margin-top:40px;border-radius:5px;" @click.native.prevent="register_next">下一步</el-button>
     </div>
  </div>
</div>
</body>
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
    }
  }
}
</script>

<style scoped>
@import './css/register.css';

</style>

 
<template>
  <body>
<div class="main">
  <div class="main0">
    <div class="main_top">
          病房信息化服务平台
    </div>
     <div class="main_left">
        <img src="./images/zhuce-over-3.png" class="theimg"/>
        <img src="./images/zhuce-over-2.png" class="secimg"/>
        <img src="./images/zhuce-over-1.png" class="firimg"/>
     </div>
     <div class="main_right">
        <div class="main_r_up">
            <img src="./images/user.png" />
            <div class="pp">注册</div>
        </div>
        <div class="sub"></div>
        <div>
           <div class="font24"><span class="blue" style=" padding-right:20px">-^0^-</span>注册成功！</div>
           <el-button type="text" style=" margin:50px 150px ;font-size:20px;" @click.native.prevent="jump_login">跳转到登录界面</el-button>
        </div>
     </div>
  </div>
</div>
</body>
</template>

<script>

export default {
  methods: {
    jump_login(){
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style scoped>
@import './css/register_patient.css';

</style>

 
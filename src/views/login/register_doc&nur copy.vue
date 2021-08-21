<template>
  <body>
    <div class="main">
      <div class="main0">
        <div class="main_top">病房信息化服务平台</div>
        <div class="main_left">
          <img src="./images/zhuce-image-3.png" class="theimg" />
          <img src="./images/zhuce-image-2.png" class="secimg" />
          <img src="./images/zhuce-image-1.png" class="firimg" />
        </div>
        <div class="main_right">
          <div class="main_r_up">
            <img src="./images/user.png" />
            <div class="pp">医生/护士</div>
          </div>
          <div class="sub">
            <td>
              <el-button
                type="text"
                style="margin-left: 70px; margin-top: -10px"
                disabled
                >已有账号？</el-button
              >
            </td>
            <td>
              <el-button
                type="text"
                style="margin-left: 0px; margin-top: -10px"
                @click.native.prevent="jump_login"
                >立即登录</el-button
              >
            </td>
          </div>
          <el-form
            :model="AdduserForm"
            :rules="rules"
            ref="AdduserForm"
            label-width="100px"
            class="demo-AdduserForm"
          >
            <el-form-item label="用户账号" style="margin-top: 5px" prop="username">
              <el-input v-model="AdduserForm.username"></el-input>
            </el-form-item>
            <el-form-item label="用户密码" style="margin-top: -10px" prop="password">
              <el-input v-model="AdduserForm.password"></el-input>
            </el-form-item>
            <el-form-item label="用户邮箱" style="margin-top: -10px" prop="email">
              <el-input v-model="AdduserForm.email"></el-input>
            </el-form-item>
            <el-form-item label="身份" style="margin-top: -10px" prop="identity">
              <el-select
                v-model="AdduserForm.identity"
                placeholder="请选择身份"
              >
                <el-option label="医生" value="doctor"></el-option>
                <el-option label="护士" value="nurse"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="姓名" style="margin-top: -10px" prop="name">
              <el-input v-model="AdduserForm.name"></el-input>
            </el-form-item>
            <el-form-item label="电话号码" style="margin-top: -10px" prop="phonenumber">
              <el-input v-model="AdduserForm.phonenumber"></el-input>
            </el-form-item>
            <el-form-item label="出生日期" style="margin-top: -10px" prop="data">
              <el-date-picker
                v-model="AdduserForm.birthday"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('AdduserForm')"
                >立即创建</el-button
              >
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import request from "../../utils/request.js";
export default {
  data() {
    return {
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
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
        ],
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
            if (res.data.identity == "doctor") {
              request({
                url: "/doctor/doctor/",
                method: "post",
                data: this.AdduserForm,
              }).then(()=>{
                this.$store.dispatch('user/logout')
              });
            }
            if (res.data.identity == "nurse") {
              request({
                url: "/nurse/nurse/",
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
  },
};
</script>

<style scoped>
@import "./css/register.css";
</style>

 
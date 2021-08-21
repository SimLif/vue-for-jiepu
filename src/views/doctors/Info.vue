<template>
  <div class="dashboard-container">
    <div class="ui text container">
      
      
      <div class="ui grid">
        <div class="eight wide column">
          <h1 class="ui header">个人信息</h1>
        </div>
        <div class="eight wide column">
           <div class="ui right aligned container">
          <button v-show="ifEdit" @click="cancelEdit" class="ui button">
            取消修改
          </button>
          <button v-show="ifEdit" @click="confirmEdit" class="ui positive button">
            确认修改
          </button>
          <button v-show="!ifEdit" @click="editInfo" class="ui primary button">
            修改信息
          </button>
        </div>
        </div>
      </div>
      <div class="ui divider"></div>
      <form class="ui form">
        <div class="ui grid">
          <div class="eight wide column">
            <div class="field">
              <label>姓名</label>
              <input v-show="ifEdit" type="text" name="name" v-model="infomation.name">
              <div v-show="!ifEdit" class="ui vertical right aligned segment" style="padding:1% 0%">{{infomation.name}}</div>
              
              <label>性别</label>
              <div v-show="!ifEdit"  class="ui vertical right aligned segment" style="padding:1% 0%">{{infomation.sex=="male" ? "男" : "女"}}</div>
              <select v-show="ifEdit" class="ui dropdown" v-model="infomation.sex">
                <option value="">性别</option>
                <option value="male">男性</option>
                <option value="female">女性</option>
              </select>

              <label>年龄</label>
              <div v-show="!ifEdit" class="ui vertical right aligned segment" style="padding:1% 0%">{{infomation.age}}</div>
              <input v-show="ifEdit" type="number" name="age" v-model="infomation.age">
            </div>
          </div>

          <div class="eight wide column">
            <div class="field ">
                <div class="ui right aligned container" style="margin-top:5%">
                  <!-- <label>名</label> -->
                  <el-upload
                    class="avatar-uploader"
                    action="11"
                    :auto-upload="false"
                    :show-file-list="false"
                    v-show="ifEdit"
                    :on-change="handleeditfileChange"
                    :before-upload="beforeAvatarUpload"
                  >
                    <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" /> -->
                    <!-- <i class="el-icon-plus avatar-uploader-icon"></i> -->
                    <div id="user-avatar" class="blurring dimmable image">
                      <div  class="ui inverted dimmer">
                        <div class="content">
                          <div class="center">
                            <div class="ui primary button">修改头像</div>
                          </div>
                        </div>
                      </div>
                      <img  class="ui small rounded image" :src="imageUrl">
                    </div>
                    
                    <!-- <img class="ui small rounded image" src="@/assets/images/kristy.png"> -->
                  </el-upload>
                  <img v-show="!ifEdit" class="ui small rounded right floated  image" :src="avatar">
                  <!-- <label>头像</label> -->
                </div>
                
                
            </div>
          </div>
        </div>
        <div class="two fields">
          <div class="field">
            <label>电话号码</label>
            <div v-show="!ifEdit" class="ui segment">{{infomation.phonenumber}}</div>
            <input v-show="ifEdit" type="text" name="phonenumber" v-model="infomation.phonenumber">
          </div>
          <div class="field">
            <label>电子邮箱</label>
            <div v-show="!ifEdit" class="ui segment">{{infomation.email}}</div>
            <input v-show="ifEdit" type="text" name="email" v-model="infomation.email">           
          </div>
        </div>
        <div class="two fields">
          <div class="field">
            <label>部门</label>
            <div v-show="!ifEdit" class="ui segment">{{infomation.department}}</div>
            <input v-show="ifEdit" type="text" name="department" v-model="infomation.department">
          </div>
          <div class="field">
            <label>职称</label>
            <div v-show="!ifEdit" class="ui segment">{{infomation.title}}</div>
            <input v-show="ifEdit" type="text" name="title" v-model="infomation.title">           
          </div>
        </div> 
        <div class="field">
          <label>简介</label>  
            <div v-show="!ifEdit" class="ui stacked segment">{{infomation.introduction}}</div>
            <el-input v-show="ifEdit" type="textarea" v-model="infomation.introduction"></el-input>   
        </div>
      </form>


     
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import "@/assets/semantic-ui/semantic.min.js"
import "@/assets/semantic-ui/semantic.min.css"
import request from "../../utils/request.js";


export default {
  name: 'Dashboard',
  data() {
    return {
      // ifEdit表示是否点击修改个人信息按钮
      ifEdit : false,
      infomation : {
        name : "李凤",
        sex : 0,
        age : 56,
        phonenumber : "1231312312",
        email : "12312312@11.com",
        title : "院长",
        department : "住院部",
        introduction : "Pellentesque habitant morbi tristique senectus et netus et \
        malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, \
        ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas\
         semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo."

      },
      avatar:"@/assets/images/kristy.png",
      params:{
         user_id: 0,
      },
      imageUrl:"",
    }
  },
  created() {
    this.fetchDoctorData();
  },
  methods: {
    handleeditfileChange(file) {
      this.avatar = file.raw;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    //头像合理性校验
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    fetchDoctorData: function () {
      var storage = localStorage.getItem("id");
      this.params.user_id = storage;
      request({
        url: "/doctor/doctor/",
        method: "get",
        params: this.params,
      }).then((res)=>{
        request({
          url:"/doctor/doctor/"+res.data[0].id+"/",
          method:"get",
        }).then((res)=>{
          var strBirthdayArr=res.data.birthday.split("-"); 
          var birthYear = strBirthdayArr[0]; 
          this.infomation.name=res.data.name
          this.infomation.sex=res.data.sex
          this.infomation.age=2021-birthYear
          this.infomation.phonenumber=res.data.phonenumber
          this.infomation.title=res.data.title
          this.infomation.department=res.data.department
          this.infomation.introduction=res.data.introduction
        })
      })
      request({
        url:"/users/user/"+this.params.user_id+"/",
        method:"get"
      }).then((res)=>{
        this.infomation.email=res.data.email
        this.avatar=res.data.avatar
        this.imageUrl=res.data.avatar
      })
    },
    editInfo(event) {
      this.ifEdit = !this.ifEdit;
      // 通过深拷贝的方式备份现有的个人信息，方便取消修改时复原
      this.infomationBackup = JSON.parse(JSON.stringify(this.infomation))
    },
    confirmEdit(event) {
      this.ifEdit = !this.ifEdit;
      this.infomationBackup = {}
      var editform = new FormData();
      editform.append("email", this.infomation.email);
      if (typeof this.avatar != "string") {
        editform.append(
          "avatar",
          this.avatar ? this.avatar : ""
        );
      }
      request({
        url:"/users/user/"+this.params.user_id+"/",
        method:"patch",
        headers: { "Content-Type": "multipart/form-data" },
        data:editform,
      })
      var storage = localStorage.getItem("id");
      this.params.user_id = storage;
      request({
        url: "/doctor/doctor/",
        method: "get",
        params: this.params,
      }).then((res)=>{
        request({
          url:"/doctor/doctor/"+res.data[0].id+"/",
          method:"patch",
          data:this.infomation
        }).then(()=>{
          this.fetchDoctorData();
          this.$message({
          message: '修改成功！',
          type: 'success'
        });
        })
      })
      this.fetchDoctorData();
    },
    cancelEdit(event) {
      this.ifEdit = !this.ifEdit;
      // 复原个人信息
      this.infomation = this.infomationBackup
    },
    
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
    $('#user-avatar').dimmer({
      on: 'hover'
    });
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 50px;
  }
  &-text {
    font-size: 100px;
    line-height: 100px;
  }
}
</style>

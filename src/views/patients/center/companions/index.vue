<template>
  <div class="dashboard-container">
    <div class="ui text container">
      <h1 class="ui header">我的医护&紧急联系人</h1>
      <div class="ui divider"></div>
      <div class="ui three stackable special cards">
        <!-- 我的医生 -->
        <div class="card">
          <div class="blurring dimmable image">
            <div class="ui dimmer">
              <div class="content">
                <div class="center">
                  <div @click="handleShowDoctorInfo" class="ui inverted button">
                    个人信息
                  </div>
                </div>
              </div>
            </div>

            <img :src="avatar" />
            <div class="ui top left attached teal label">我的医生</div>
          </div>
          <div class="content">
            <a class="header">{{doctorInfo.name}}</a>
            <div class="meta">
              <span class="date">{{doctorInfo.phonenumber}}</span>
            </div>
          </div>
          <div class="extra content">
            <button class="fluid ui labeled icon orange button">
              <i class="bell outline icon"></i>
              联系
            </button>
          </div>
        </div>
        <!-- 我的护士 -->
        <div class="card">
          <div class="blurring dimmable image">
            <div class="ui dimmer">
              <div class="content">
                <div class="center">
                  <div @click="handleShowNurseInfo" class="ui inverted button">
                    个人信息
                  </div>
                </div>
              </div>
            </div>

            <img :src="avatar1" />
            <div class="ui top left attached olive label">我的护士</div>
          </div>
          <div class="content">
            <a class="header">{{nurseInfo.name}}</a>
            <div class="meta">
              <span class="date">{{nurseInfo.phonenumber}}</span>
            </div>
          </div>
          <div class="extra content">
            <button class="fluid ui labeled icon orange button">
              <i class="bell outline icon"></i>
              联系
            </button>
          </div>
        </div>
        <!-- 紧急联系人 -->
        <div v-show="haveFistConcat" class="card">
          <div class="blurring dimmable image">
            <div class="ui dimmer">
              <div class="content">
                <div class="center">
                  <div
                    @click="showmainInfo"
                    class="ui inverted button"
                  >
                    个人信息
                  </div>
                </div>
              </div>
            </div>

            <img :src="avatar3" />
            <div class="ui top left attached red label">紧急联系人</div>
          </div>
          <div class="content">
            <a class="header">{{mainrelationInfo.name}}</a>
            <div class="meta">
              <span class="date">{{mainrelationInfo.phonenumber}}</span>
            </div>
          </div>
          <div class="extra content">
            <div class="fluid ui two buttons">
              <button class="ui icon orange button">
                <i class="bell outline icon"></i>
              </button>
              <button @click="cancelFisrtConcat" class="ui icon button">
                <i class="user times icon"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="ui grid" style="margin-top: 5%">
        <div class="eight wide column">
          <h1 class="ui header">我的家属</h1>
        </div>
        <div class="eight wide column">
          <div class="ui right aligned container">
            <button class="ui primary button" @click="reverseAdd">
              添加家属
            </button>
          </div>
        </div>
      </div>
      <div class="ui divider" style="margin-bottom: -2%"></div>
      <div class="ui two cards">
        <div class="ui card" v-for="t in relationcount" :key="t.id">
          <div class="content">
            <a class="ui red ribbon label">{{relationTable[t-1].relationship}}</a>
            <i
              v-show="!haveFistConcat"
              @click="handlefirst(t-1)"
              class="right floated star icon"
            ></i>
            <i
              v-show="relationTable[t-1].first_contact"
              @click="handlefirst(t-1)"
              class="right floated yellow star icon"
            ></i>
            <div class="center aligned header">{{relationTable[t-1].name}} </div>
            <!-- <div class="ui container segment">
                
              </div> -->
          </div>
          <div class="extra content">
            <div class="ui two buttons">
              <div
                @click="handleShowRelationInfo(t-1)"
                class="ui basic green button"
              >
                查看详情
              </div>
              <div class="ui basic red button" @click="deleteRelation(t-1)">移除家属</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 添加家属 -->
    <el-dialog :visible.sync="ifAddRelation" width="60%">
      <!-- <span>这是一段信息</span> -->

      <div class="ui grid">
        <div class="eight wide column">
          <h1 class="ui header">添加家属</h1>
        </div>
        <div class="eight wide column">
          <div class="ui right aligned container">
            <div class="ui action input">
              <input type="text" placeholder="输入ID搜索添加家属..." />
              <button class="ui icon button">
                <i class="search icon"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="ui divider"></div>
      <div id="datatable">
        <el-table
          border
          :data="tableData"
          style="width: 100%; margin-top: 15px"
        >
          <el-table-column label="序号" width="50">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="家属姓名" align="center" width="180">
            <template slot-scope="scope">
             <span style="margin-left: 10px">{{ scope.row.name  }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="家属ID"
            align="center"
            width="150"
            style="margin-left: 10px"
          >
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column
            label="家属关系"
            align="center"
            width="150"
            style="margin-left: 10px"
          >
            <template slot-scope="">
              <el-input v-model="input" placeholder="请输入关系"></el-input>
            </template>
          </el-table-column> -->
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="addrela(scope.row.id)">添加家属</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div
        class="ui centered grid"
        style="margin-top: 3%; margin-bottom: 1%; overflow: auto"
      >
        <!-- <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination> -->
      </div>
    </el-dialog>

    <!-- 医生个人信息 -->
    <el-dialog :visible.sync="showDoctorInfo" width="45%">
      <form class="ui form">
        <div class="ui grid">
          <div class="eight wide column">
            <div class="field">
              <label>姓名</label>
              <input
                v-show="ifEdit"
                type="text"
                name="name"
                v-model="doctorInfo.name"
              />
              <div
                v-show="!ifEdit"
                class="ui vertical right aligned segment"
                style="padding: 1% 0%"
              >
                {{ doctorInfo.name }}
              </div>

              <label>性别</label>
              <div
                v-show="!ifEdit"
                class="ui vertical right aligned segment"
                style="padding: 1% 0%"
              >
                {{ doctorInfo.sex=="male" ? "男" : "女" }}
              </div>
              <select
                v-show="ifEdit"
                class="ui dropdown"
                v-model="doctorInfo.sex"
              >
                <option value="">性别</option>
                <option value="1">男性</option>
                <option value="0">女性</option>
              </select>

              <label>年龄</label>
              <div
                v-show="!ifEdit"
                class="ui vertical right aligned segment"
                style="padding: 1% 0%"
              >
                {{ doctorInfo.age }}
              </div>
              <input
                v-show="ifEdit"
                type="number"
                name="age"
                v-model="doctorInfo.age"
              />
            </div>
          </div>

          <div class="eight wide column">
            <div class="field">
              <div class="ui right aligned container" style="margin-top: 5%">
                <!-- <label>名</label> -->
                <el-upload
                  class="avatar-uploader"
                  action="11"
                  :auto-upload="false"
                  :show-file-list="false"
                  v-show="ifEdit"
                >
                  <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" /> -->
                  <!-- <i class="el-icon-plus avatar-uploader-icon"></i> -->
                  <div id="user-avatar" class="blurring dimmable image">
                    <div class="ui inverted dimmer">
                      <div class="content">
                        <div class="center">
                          <div class="ui primary button">修改头像</div>
                        </div>
                      </div>
                    </div>
                    <img
                      class="ui small rounded image"
                      src="@/assets/images/kristy.png"
                    />
                  </div>

                  <!-- <img class="ui small rounded image" src="@/assets/images/kristy.png"> -->
                </el-upload>
                <img
                  v-show="!ifEdit"
                  class="ui small rounded right floated image"
                  :src="avatar"
                />
                <!-- <label>头像</label> -->
              </div>
            </div>
          </div>
        </div>
        <div class="two fields">
          <div class="field">
            <label>电话号码</label>
            <div class="ui segment">{{ doctorInfo.phonenumber }}</div>
          </div>
          <div class="field">
            <label>电子邮箱</label>
            <div class="ui segment">{{ doctorInfo.email }}</div>
          </div>
        </div>
        <div class="two fields">
          <div class="field">
            <label>部门</label>
            <div class="ui segment">{{ doctorInfo.department }}</div>
          </div>
          <div class="field">
            <label>职称</label>
            <div class="ui segment">{{ doctorInfo.title }}</div>
          </div>
        </div>
        <div class="field">
          <label>简介</label>
          <div class="ui stacked segment">{{ doctorInfo.introduction }}</div>
        </div>
      </form>
    </el-dialog>

    <!-- 护士个人信息 -->
    <el-dialog :visible.sync="showNurseInfo" width="45%">
      <form class="ui form">
        <div class="ui grid">
          <div class="eight wide column">
            <div class="field">
              <label>姓名</label>
              <input
                v-show="ifEdit"
                type="text"
                name="name"
                v-model="nurseInfo.name"
              />
              <div
                v-show="!ifEdit"
                class="ui vertical right aligned segment"
                style="padding: 1% 0%"
              >
                {{ nurseInfo.name }}
              </div>

              <label>性别</label>
              <div
                v-show="!ifEdit"
                class="ui vertical right aligned segment"
                style="padding: 1% 0%"
              >
                {{ nurseInfo.sex=="male" ? "男" : "女" }}
              </div>
              <select
                v-show="ifEdit"
                class="ui dropdown"
                v-model="nurseInfo.sex"
              >
                <option value="">性别</option>
                <option value="1">男性</option>
                <option value="0">女性</option>
              </select>

              <label>年龄</label>
              <div
                v-show="!ifEdit"
                class="ui vertical right aligned segment"
                style="padding: 1% 0%"
              >
                {{ nurseInfo.age }}
              </div>
              <input
                v-show="ifEdit"
                type="number"
                name="age"
                v-model="nurseInfo.age"
              />
            </div>
          </div>

          <div class="eight wide column">
            <div class="field">
              <div class="ui right aligned container" style="margin-top: 5%">
                <!-- <label>名</label> -->
                <el-upload
                  class="avatar-uploader"
                  action="11"
                  :auto-upload="false"
                  :show-file-list="false"
                  v-show="ifEdit"
                >
                  <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" /> -->
                  <!-- <i class="el-icon-plus avatar-uploader-icon"></i> -->
                  <div id="user-avatar" class="blurring dimmable image">
                    <div class="ui inverted dimmer">
                      <div class="content">
                        <div class="center">
                          <div class="ui primary button">修改头像</div>
                        </div>
                      </div>
                    </div>
                    <img
                      class="ui small rounded image"
                      src="@/assets/images/kristy.png"
                    />
                  </div>

                  <!-- <img class="ui small rounded image" src="@/assets/images/kristy.png"> -->
                </el-upload>
                <img
                  v-show="!ifEdit"
                  class="ui small rounded right floated image"
                  :src="avatar1"
                />
                <!-- <label>头像</label> -->
              </div>
            </div>
          </div>
        </div>
        <div class="two fields">
          <div class="field">
            <label>电话号码</label>
            <div class="ui segment">{{ nurseInfo.phonenumber }}</div>
          </div>
          <div class="field">
            <label>电子邮箱</label>
            <div class="ui segment">{{ nurseInfo.email }}</div>
          </div>
        </div>
        <div class="two fields">
          <div class="field">
            <label>部门</label>
            <div class="ui segment">{{ nurseInfo.department }}</div>
          </div>
          <div class="field">
            <label>职称</label>
            <div class="ui segment">{{ nurseInfo.title }}</div>
          </div>
        </div>
        <div class="field">
          <label>简介</label>
          <div class="ui stacked segment">{{ nurseInfo.introduction }}</div>
        </div>
      </form>
    </el-dialog>

    <!-- 家属个人信息 -->
    <el-dialog :visible.sync="showRelationInfo" width="45%">
      <form class="ui form">
        <div class="ui grid">
          <div class="eight wide column">
            <div class="field">
              <label>姓名</label>
              <input
                v-show="ifEdit"
                type="text"
                name="name"
                v-model="relationInfo.name"
              />
              <div
                v-show="!ifEdit"
                class="ui vertical right aligned segment"
                style="padding: 1% 0%"
              >
                {{ relationInfo.name }}
              </div>

              <label>性别</label>
              <div
                v-show="!ifEdit"
                class="ui vertical right aligned segment"
                style="padding: 1% 0%"
              >
                {{ relationInfo.sex=="male" ? "男" : "女" }}
              </div>
              <select
                v-show="ifEdit"
                class="ui dropdown"
                v-model="relationInfo.sex"
              >
                <option value="">性别</option>
                <option value="1">男性</option>
                <option value="0">女性</option>
              </select>

              <label>生日</label>
              <div
                v-show="!ifEdit"
                class="ui vertical right aligned segment"
                style="padding: 1% 0%"
              >
                {{ relationInfo.birthday }}
              </div>
              <input
                v-show="ifEdit"
                type="number"
                name="age"
                v-model="relationInfo.birthday"
              />
            </div>
          </div>

          <div class="eight wide column">
            <div class="field">
              <div class="ui right aligned container" style="margin-top: 5%">
                <!-- <label>名</label> -->
                <el-upload
                  class="avatar-uploader"
                  action="11"
                  :auto-upload="false"
                  :show-file-list="false"
                  v-show="ifEdit"
                >
                  <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" /> -->
                  <!-- <i class="el-icon-plus avatar-uploader-icon"></i> -->
                  <div id="user-avatar" class="blurring dimmable image">
                    <div class="ui inverted dimmer">
                      <div class="content">
                        <div class="center">
                          <div class="ui primary button">修改头像</div>
                        </div>
                      </div>
                    </div>
                    <img
                      class="ui small rounded image"
                      src="@/assets/images/kristy.png"
                    />
                  </div>

                  <!-- <img class="ui small rounded image" src="@/assets/images/kristy.png"> -->
                </el-upload>
                <img
                  v-show="!ifEdit"
                  class="ui small rounded right floated image"
                  :src="avatar2"
                />
                <!-- <label>头像</label> -->
              </div>
            </div>
          </div>
        </div>
        <div class="two fields">
          <div class="field">
            <label>电话号码</label>
            <div class="ui segment">{{ relationInfo.phonenumber }}</div>
          </div>
          <div class="field">
            <label>电子邮箱</label>
            <div class="ui segment">{{ email }}</div>
          </div>
        </div>
      
      </form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import "@/assets/semantic-ui/semantic.min.js";
import "@/assets/semantic-ui/semantic.min.css";
import request from "../../../../utils/request.js";

export default {
  name: "Dashboard",
  data() {
    return {
      tableData:[],
      doctorInfo: {
        name: "李凤",
        sex: 0,
        age: 56,
        phonenumber: "1231312312",
        email: "12312312@11.com",
        title: "院长",
        department: "住院部",
        introduction:
          "Pellentesque habitant morbi tristique senectus et netus et \
        malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, \
        ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas\
         semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.",
      },
      avatar: "@/assets/images/kristy.png",
      nurseInfo: {
        name: "李凤",
        sex: 0,
        age: 56,
        phonenumber: "1231312312",
        email: "12312312@11.com",
        title: "院长",
        department: "住院部",
        introduction:
          "Pellentesque habitant morbi tristique senectus et netus et \
        malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, \
        ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas\
         semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.",
      },
      mainrelationInfo:{
        name: "李凤",
        sex: 0,
        age: 56,
        phonenumber: "1231312312",
      },
      relationInfo:{
        name: "李凤",
        sex: 0,
        age: 56,
        phonenumber: "1231312312",
      },
      relationTable:[
      ],
      avatarTable:[],
      relationcount:0,
      avatar1: "@/assets/images/kristy.png",
      avatar2:"@/assets/images/kristy.png",
      avatar3:"@/assets/images/kristy.png",
      email:"1654654@qq.com",
      email2:"1654654@qq.com",
      ifAddRelation: false,
      showDoctorInfo: false,
      showNurseInfo: false,
      showRelationInfo: false,
      input: ''
    };
  },
  computed: {
    haveFistConcat: {
      get() {
        let flag = false;
        this.relationTable.forEach((item) => {
          if (item.first_contact) {
            flag = !flag;
          }
        });
        return flag;
      },
    },
  },
  created() {
    this.fetchDoctorData();

  },
  methods: {
    addrela(id){
      var storage = localStorage.getItem("id");
      var params = {
        user_id: storage,
      };
      var params1={
        patient_id:0,
        relationship: "父亲",
      }
      request({
        url: "/patient/patient/",
        method: "get",
        params: params,
      }).then((res) => {
        params1.patient_id=res.data.results[0].id
        params1.relationship=this.input
        request({
          url:"/relation/relation/"+id+"/",
          method:"patch",
          data:params1
        })
      })
      this.fetchDoctorData();
    },
    deleteRelation(t){
      var params={
        "patient_id":1,
        "first_contact":false
      }
      request({
        url:"/relation/relation/"+this.relationTable[t].id+"/",
        method:"patch",
        data:params
      })
      this.fetchDoctorData();
    },
    haveFistConcat: function() {
        let flag = false;
        this.relationTable.forEach((item) => {
          if (item.first_contact) {
            flag = !flag;
          }
        });
        return flag;
      },
    
    reverseAdd(e) {
      var params={
        patient_id:1,
        page:1,
        page_size:10,
      }
      request({
        url:"/relation/relation/",
        method:"get",
        params:params
      }).then((res)=>{
        this.tableData=res.data.results
      })
      
      this.ifAddRelation = !this.ifAddRelation;
      
    },
    cancelFisrtConcat(e) {
      var params={
        "first_contact":false
      }
      this.relationTable.forEach((item) => {
        if (item.first_contact) {
          item.first_contact = !item.first_contact;
          request({
            url:"/relation/relation/"+item.id+"/",
            method:"patch",
            data:params
          })
        }
      });
    },
    showmainInfo(){
      this.relationTable.forEach((item) => {
        if (item.first_contact) {
        this.relationInfo=item
        this.avatar2=this.avatar3
        this.email=this.email1
        this.showRelationInfo = !this.showRelationInfo;
        }
      });
    },
    handleShowDoctorInfo(e) {
      this.showDoctorInfo = !this.showDoctorInfo;
    },
    handleShowNurseInfo(e) {
      this.showNurseInfo = !this.showNurseInfo;
    },
    handleShowRelationInfo(t) {
      this.relationInfo=this.relationTable[t]
      this.avatar2=this.avatarTable[t].avatar
      this.email=this.avatarTable[t].email
      this.showRelationInfo = !this.showRelationInfo;
    },
    handlefirst(t){
      var params={
        "first_contact":!this.relationTable[t].first_contact
      }
      this.relationTable[t].first_contact=!this.relationTable[t].first_contact
      request({
            url:"/relation/relation/"+this.relationTable[t].id+"/",
            method:"patch",
            data:params
          })
      this.fetchDoctorData()
    },
    fetchDoctorData: function () {
      var storage = localStorage.getItem("id");
      var params = {
        user_id: storage,
      };
      var params1 ={
        patient_id:0
      }
     
      request({
        url: "/patient/patient/",
        method: "get",
        params: params,
      }).then((res) => {
        params1.patient_id=res.data.results[0].id
        request({
          url:"/relation/relation/",
          method:"get",
          params:params1
        }).then((res)=>{
          this.relationTable=res.data.results
          this.relationcount=res.data.count
          for(var i=0;i<res.data.count;i++)
          {
            request({
              url:"/users/user/"+this.relationTable[i].user_id,
              method:"get",
            }).then((res)=>{
              this.avatarTable.push(res.data)
            })
          }
          this.relationTable.forEach((item) => {
          if(item.first_contact){
          this.mainrelationInfo=item
          request({
              url:"/users/user/"+item.user_id,
              method:"get",
            }).then((res)=>{
              this.avatar3=res.data.avatar
              this.email1=res.data.email
            })
        }
       })
        })
        request({
          url: "/patient/patient/" + res.data.results[0].id + "/",
          method: "get",
        }).then((res) => {
          request({
            url: "/doctor/doctor/" + res.data.doctor_id + "/",
            method: "get",
          }).then((res) => {
            var strBirthdayArr = res.data.birthday.split("-");
            var birthYear = strBirthdayArr[0];
            this.doctorInfo.name = res.data.name;
            this.doctorInfo.sex = res.data.sex;
            this.doctorInfo.age = 2021 - birthYear;
            this.doctorInfo.phonenumber = res.data.phonenumber;
            this.doctorInfo.title = res.data.title;
            this.doctorInfo.department = res.data.department;
            this.doctorInfo.introduction = res.data.introduction;
            request({
              url: "/users/user/" + res.data.user_id + "/",
              method: "get",
            }).then((res) => {
              console.log("111");
              this.doctorInfo.email = res.data.email;
              this.avatar = res.data.avatar;
              //this.imageUrl=res.data.avatar
            });
          });
          request({
            url:"/ward/ward/"+res.data.ward_id+"/",
            method:"get",
          }).then((res)=>{
            request({
              url:"/nurse/nurse/"+res.data.nurse[0]+"/",
              method:"get",
            }).then((res)=>{
            var strBirthdayArr = res.data.birthday.split("-");
            var birthYear = strBirthdayArr[0];
            this.nurseInfo.name = res.data.name;
            this.nurseInfo.sex = res.data.sex;
            this.nurseInfo.age = 2021 - birthYear;
            this.nurseInfo.phonenumber = res.data.phonenumber;
            this.nurseInfo.title = res.data.title;
            this.nurseInfo.department = res.data.department;
            this.nurseInfo.introduction = res.data.introduction;
            request({
              url: "/users/user/" + res.data.user_id + "/",
              method: "get",
            }).then((res) => {
              console.log("111");
              this.nurseInfo.email = res.data.email;
              this.avatar1 = res.data.avatar;
              //this.imageUrl=res.data.avatar
            });
            })
          })
        });
      });
    },
  },
  mounted() {
    $(".special.cards .image").dimmer({
      on: "hover",
    });
  },
};
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
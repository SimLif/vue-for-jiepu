<template>
  <div class="dashboard-container">
    <div class="ui text container">
        <h1 class="ui header">我的医护&紧急联系人</h1>
        <div class="ui divider"></div>
        <div class = "ui three stackable special cards">
            <!-- 我的医生 -->
            <div class="card">
              <div class="blurring dimmable image">
                <div class="ui dimmer">
                  <div class="content">
                    <div class="center">
                      <div @click="handleShowDoctorInfo" class="ui inverted button">个人信息</div>
                    </div>
                  </div>
                </div>
                
                <img src="@/assets/images/kristy.png">
                <div class="ui top left attached teal label">我的医生</div>
              </div>
              <div class="content">
                <a class="header">Team Fu</a>
                <div class="meta">
                  <span class="date">Create in Sep 2014</span>
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
                      <div class="ui inverted button">个人信息</div>
                    </div>
                  </div>
                </div>
                
                <img src="@/assets/images/kristy.png">
                <div class="ui top left attached olive label">我的护士</div>
              </div>
              <div class="content">
                <a class="header">Team Fu</a>
                <div class="meta">
                  <span class="date">Create in Sep 2014</span>
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
                      <div class="ui inverted button">个人信息</div>
                    </div>
                  </div>
                </div>
                
                <img src="@/assets/images/kristy.png">
                <div class="ui top left attached red label">紧急联系人</div>
              </div>
              <div class="content">
                <a class="header">Team Fu</a>
                <div class="meta">
                  <span class="date">Create in Sep 2014</span>
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


        <div class="ui grid" style="margin-top:5%;">
          <div class="eight wide column">
            <h1 class="ui header">我的家属</h1>
          </div>
          <div class="eight wide column">
            <div class="ui right aligned container">
              <button class="ui primary button" @click="reverseAdd">添加家属</button>
            </div>
          </div>
        </div>

        <div class="ui divider" style="margin-bottom:-2%;"></div>
        <div class="ui two cards">
          <div class="ui card" v-for="t in test" :key="t.id">
            
            <div class="content">
              <a class="ui red ribbon label">弟弟</a>
              <i v-show="!haveFistConcat" @click="t.first_contact=true" class="right floated star icon"></i>
              <i v-show="t.first_contact" @click="t.first_contact=false" class="right floated yellow star icon"></i>
              <div class="center aligned  header">马山山</div>
              <!-- <div class="ui container segment">
                
              </div> -->
            </div>
            <div class="extra content">
              <div class="ui two buttons">
                  <div class="ui basic green button">查看详情</div>
                  <div class="ui basic red button">移除家属</div>
                </div>
            </div>
          </div>
          
        </div>
    </div>

    <el-dialog
      :visible.sync="ifAddRelation"
      width="60%"
      >

      

      <!-- <span>这是一段信息</span> -->

      <div class="ui grid">
        <div class="eight wide column">
          <h1 class="ui header">添加家属</h1>
        </div>
        <div class="eight wide column">
           <div class="ui right aligned container">
          
              <div class="ui action input">
                <input type="text" placeholder="输入ID搜索添加家属...">
                <button  class="ui icon button">
                  <i class="search icon"></i>
                </button>
              </div>

            </div>
         </div>
      </div>
      <div class="ui divider"></div>
      <div id="datatable">
        <el-table border :data="tableData" style="width: 100%; margin-top: 15px">
          <el-table-column label="序号" width="50">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="家属姓名" align="center" width="180">
            <template slot-scope="scope">
              <el-image
                style="width: 40px; height: 40px"
                :src="scope.row.avatar"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column
            label="家属ID"
            align="center"
            width="150"
            style="margin-left: 10px"
          >
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.username }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                
                >添加患者</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      
      <div class="ui centered grid" style="margin-top:3%;margin-bottom:1%;overflow:auto">
          <el-pagination
              background
              layout="prev, pager, next"
              :total="1000">
          </el-pagination>
      </div>
      
    </el-dialog>

    <el-dialog
      :visible.sync="showDoctorInfo"
      width="60%"
      >
    <form class="ui form">
        <div class="ui grid">
          <div class="eight wide column">
            <div class="field">
              <label>姓名</label>
              <input v-show="ifEdit" type="text" name="name" v-model="doctorInfo.name">
              <div v-show="!ifEdit" class="ui vertical right aligned segment" style="padding:1% 0%">{{doctorInfo.name}}</div>
              
              <label>性别</label>
              <div v-show="!ifEdit"  class="ui vertical right aligned segment" style="padding:1% 0%">{{doctorInfo.sex ? "男" : "女"}}</div>
              <select v-show="ifEdit" class="ui dropdown" v-model="doctorInfo.sex">
                <option value="">性别</option>
                <option value="1">男性</option>
                <option value="0">女性</option>
              </select>

              <label>年龄</label>
              <div v-show="!ifEdit" class="ui vertical right aligned segment" style="padding:1% 0%">{{doctorInfo.age}}</div>
              <input v-show="ifEdit" type="number" name="age" v-model="doctorInfo.age">
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
                      <img  class="ui small rounded image" src="@/assets/images/kristy.png">
                    </div>
                    
                    <!-- <img class="ui small rounded image" src="@/assets/images/kristy.png"> -->
                  </el-upload>
                  <img v-show="!ifEdit" class="ui small rounded right floated  image" src="@/assets/images/kristy.png">
                  <!-- <label>头像</label> -->
                </div>
                
                
            </div>
          </div>
        </div>
        <div class="two fields">
          <div class="field">
            <label>电话号码</label>
            <div v-show="!ifEdit" class="ui segment">{{doctorInfo.phonenumber}}</div>
            <input v-show="ifEdit" type="text" name="phonenumber" v-model="doctorInfo.phonenumber">
          </div>
          <div class="field">
            <label>电子邮箱</label>
            <div v-show="!ifEdit" class="ui segment">{{doctorInfo.email}}</div>
            <input v-show="ifEdit" type="text" name="email" v-model="doctorInfo.email">           
          </div>
        </div>
        <div class="two fields">
          <div class="field">
            <label>部门</label>
            <div v-show="!ifEdit" class="ui segment">{{doctorInfo.department}}</div>
            <input v-show="ifEdit" type="text" name="department" v-model="doctorInfo.department">
          </div>
          <div class="field">
            <label>职称</label>
            <div v-show="!ifEdit" class="ui segment">{{doctorInfo.title}}</div>
            <input v-show="ifEdit" type="text" name="title" v-model="doctorInfo.title">           
          </div>
        </div> 
        <div class="field">
          <label>简介</label>  
            <div v-show="!ifEdit" class="ui stacked segment">{{doctorInfo.description}}</div>
            <el-input v-show="ifEdit" type="textarea" v-model="doctorInfo.description"></el-input>   
        </div>
      </form>
      

      
      
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import "@/assets/semantic-ui/semantic.min.js"
import "@/assets/semantic-ui/semantic.min.css"

export default {
  name: 'Dashboard',
  data () {
    return {
      test : [
        {
          first_contact : true
        },
        {
          first_contact : false
        },
        {
          first_contact : false
        },
        {
          first_contact : false
        },
      ],
      doctorInfo : {
        name : "李凤",
        sex : 0,
        age : 56,
        phonenumber : "1231312312",
        email : "12312312@11.com",
        image : "@/assets/images/kristy.png",
        title : "院长",
        department : "住院部",
        description : "Pellentesque habitant morbi tristique senectus et netus et \
        malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, \
        ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas\
         semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo."

      },
      ifAddRelation : false,
      showDoctorInfo : false,
      
    }
  },
  computed: {
    
    haveFistConcat : {
      get() {
        let flag = false
        this.test.forEach((item) => {
          if (item.first_contact){
            flag = !flag
          }
        })
        return flag
      }
    }
  },
  methods: {
    reverseAdd(e) {
      this.ifAddRelation = !this.ifAddRelation;
    },
    cancelFisrtConcat(e) {
        this.test.forEach((item) => {
        if (item.first_contact){
          item.first_contact = !item.first_contact
        }
      })
    },
    handleShowDoctorInfo(e) {
      this.showDoctorInfo = !this.showDoctorInfo
    }
  },
  mounted() {
    $('.special.cards .image').dimmer({
      on: 'hover'
    });
  },
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
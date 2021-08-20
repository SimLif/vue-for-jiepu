<template>
  <div class="app-container">
    <!--模板-->
    <!--1.搜索栏-->
    <div class="ui container">
    <div id="search">
      <el-input
        style="width: 300px; margin-right: 10px"
        placeholder="请输入关键字"
        v-model="input"
        clearable
      >
      </el-input>
      <el-select
        v-model="input"
        clearable
        placeholder="请选择用户状态"
        style="margin-right: 10px"
      >
        <el-option label="冻结" value="0"></el-option>
        <el-option label="活跃" value="1"></el-option>
      </el-select>
      <el-select v-model="params.identity" clearable placeholder="用户类型">
        <el-option label="超级管理员" value="admin"></el-option>
        <el-option label="医生" value="doctor"></el-option>
        <el-option label="护士" value="nurse"></el-option>
        <el-option label="病人" value="patient"></el-option>
        <el-option label="家属" value="relation"></el-option>
      </el-select>
      <el-button
        type="primary"
        class="ui primary button"
        
        style="float: right; margin-right: 3%; margin-top:5px"
        @click="addUserFormVisible = true"
        >新增用户</el-button
      >
    </div>

    <!--2.数据展示表格-->
    
    <div id="datatable">
      <el-table border :data="tableData" style="width: 100%; margin-top: 15px">
        <el-table-column label="编号" align="center" width="50">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户头像" align="center" width="90">
          <template slot-scope="scope">
            <el-image
              style="width: 40px; height: 40px"
              :src="scope.row.avatar"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column
          label="用户账号"
          align="center"
          width="150"
          
        >
          <template slot-scope="scope">
            <span>{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column label="邮箱" align="center" width="300">
          <template slot-scope="scope">
            <span >{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户类型" align="center" width="100">
          <template slot-scope="scope">
            <span >{{ scope.row.identity }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="是否是超级管理员" width="180"> -->
        <!-- <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.is_superuser }}</span>
          </template> -->
        <!-- <template slot-scope="scope">
          <el-tooltip :content="'is_superuser: ' + scope.row.is_superuser" placement="top">
            <el-switch v-if(scope.row.is_superuser)
              v-model= is_superuser
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value= true
              inactive-value= false
            >
            </el-switch>
            <el-switch v-if(!scope.row.is_superuser)
              v-model= is_superuser1
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value= true
              inactive-value= false
            >
            </el-switch>
          </el-tooltip>
           </template>
        </el-table-column> -->
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--3.分页-->
    <div id="page" style="margin-top:1%;">
      <el-pagination
        background
        style="float: right;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="params.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total_number"
      >
      </el-pagination>
    </div>
    </div>
    <!-- 新增用户模态框 -->
    <el-dialog :visible.sync="addUserFormVisible">
      <div class="ui grid" style="padding:0 2%">
            <div class="eight wide column">
              <h1 class="ui header">
                <i class="user plus icon"> </i>
                <div class="content">
                  <h1 class="ui header">新增用户</h1>
                </div>
              </h1>
            </div>
            <div class="eight wide column">
            <div class="ui right aligned container">
                
                <el-button class="ui primary  button"  @click="addUserInfo">确 定</el-button>
                <el-button class="ui  button" @click="addUserFormVisible = false">取 消</el-button>
                
                
                
            
            </div>
            </div>
        </div>
        <div class="ui divider" style="margin-bottom: 20px; padding:0 2%"></div>
      <div class="ui container" style="width:60%">
      <el-form :model="adduserform">
        
        <el-form-item label="用户账号" :label-width="formLabelWidth">
          <el-input
            v-model="adduserform.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户密码" :label-width="formLabelWidth">
          <el-input
            v-model="adduserform.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" :label-width="formLabelWidth">
          <el-input v-model="adduserform.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份" :label-width="formLabelWidth">
          <el-select
            v-model="adduserform.identity"
            placeholder="请选择活动区域"
          >
            <el-option label="超级管理员" value="admin"></el-option>
            <el-option label="医生" value="doctor"></el-option>
            <el-option label="护士" value="nurse"></el-option>
            <el-option label="病人" value="patient"></el-option>
            <el-option label="家属" value="relation"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="adduserform.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" :label-width="formLabelWidth">
          <el-input
            v-model="adduserform.phonenumber"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="出生日期" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              v-model="adduserform.birthday"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="头像" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="11"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handlefileChange"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      </div>
      
    </el-dialog>
    <!-- 编辑用户模态框 -->
    <el-dialog :visible.sync="editUserFormVisible">
      <div class="ui grid" style="padding:0 2%">
            <div class="four wide column">
            <h1 class="ui header">用户编辑</h1>
            </div>
            <div class="twelve wide column">
            <div class="ui right aligned container">
                <el-button class="ui primary  button"  @click="editUserInfo">确 定</el-button>
                <el-button class="ui  button" @click="editUserFormVisible = false">取 消</el-button>
                
                
            
            </div>
            </div>
        </div>
        <div class="ui divider" style="margin-bottom: 20px; padding:0 2%"></div>
        <div class="ui container" style="width:50%">
          <el-form :model="edituserform" class="ui form">
            <!-- {{ edituserform }} -->
            
            
            <el-form-item label="用户账号" :label-width="formLabelWidth">
              
              <el-input
                v-model="edituserform.username"
                autocomplete="off"
                
              ></el-input>
              
            </el-form-item>
            <el-form-item label="用户密码" :label-width="formLabelWidth">
              
              <el-input
                type="password"
                show-password
                v-model="edituserform.password"
                autocomplete="off"
              ></el-input>
              
            </el-form-item>
            <el-form-item label="用户邮箱" :label-width="formLabelWidth">
              
              <el-input v-model="edituserform.email" autocomplete="off"></el-input>
              
            </el-form-item>
            <el-form-item label="头像" :label-width="formLabelWidth" >
              <el-upload
                class="avatar-uploader"
                action="12"
                :auto-upload="false"
                :show-file-list="false"
                :on-change="handleeditfileChange"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
      
    </el-dialog>
  </div>
</template>

<script>
import request from "../../utils/request.js";
import "@/assets/semantic-ui/semantic.min.js"
import "@/assets/semantic-ui/semantic.min.css"
export default {
  data() {
    return {
      // 所有数据变量定义在此处
      value: "",
      input: "",
      //表格数据
      tableData: [],
      params: {
        page: 1,
        page_size: 5,
      },
      params_edit: {},
      total_number: 0,
      addUserFormVisible: false,
      editUserFormVisible: false,
      adduserform: {}, //新增用户表单数据
      edituserform: {},

      formLabelWidth: "80px",
      imageUrl: "",
      // is_superuser: true,
      // is_superuser1: false,
    };
  },
  //初始化完成:data中的数据以及method中的方法均可使用
  created() {
    this.fetchUserData();
  },
  watch: {
    params: {
      handler: function (newparams, oldparams) {
        //时刻监听params数据的变化，一旦发生变化自动调用该方法
        //console.log(newparams, oldparams, "11");
        //重新加载数据
        this.fetchUserData();
      },
      deep: true, //深度监听（对象或数据）
    },
  },
  methods: {
    editUserInfo: function () {
      var editform = new FormData();
      editform.append("username", this.edituserform.username);
      if (this.edituserform.password != "123456") {
        editform.append("password", this.edituserform.password);
      }
      editform.append("email", this.edituserform.email);
      editform.append("identity", this.edituserform.identity);
      editform.append("name", this.edituserform.name);
      editform.append("phonenumber", this.edituserform.phonenumber);
      editform.append("birthday", this.edituserform.birthday);
      if (typeof this.edituserform.avatar != "string") {
        editform.append(
          "avatar",
          this.edituserform.avatar ? this.edituserform.avatar : ""
        );
      }
      request({
        url: "users/user/" + this.edituserform.id + "/",
        method: "patch",
        headers: { "Content-Type": "multipart/form-data" },
        data: editform,
      })
        .then((res) => {
          editform.append("user_id", this.edituserform.birthday);
          this.edituserform.user_id = res.data.id;
          if (res.data.identity == "patient") {
            request({
              url: "/patient/patient/",
              method: "post",
              data: this.adduserform,
            });
          }
          if (res.data.identity == "relation") {
            request({
              url: "/relation/relation/",
              method: "post",
              data: this.adduserform,
            });
          }
          if (res.data.identity == "doctor") {
            request({
              url: "/doctor/doctor/",
              method: "post",
              data: this.adduserform,
            });
          }
          if (res.data.identity == "nurse") {
            request({
              url: "/nurse/nurse/",
              method: "post",
              data: this.adduserform,
            });
          }
          //请求成功后的逻辑数据
          console.log(res, "patchres");
          this.$message({
            message: "恭喜你，编辑成功",
            type: "success",
          });
          //this.addUserFormVisible = false;
          this.fetchUserData();
        })
        .catch((error) => {
          console.log(error);
          this.$message({
            message: "编辑失败",
            type: "warning",
          });
          //this.addUserFormVisible = false;
        })
        .finally(() => {
          this.editUserFormVisible = false;
        });
    },
    //新增用户信息
    addUserInfo: function () {
      var emailform = new FormData();
      //发起请求，新增用户-不涉及图片
      request({
        url: "/users/user/",
        method: "post",
        data: this.adduserform,
      })
        .then((res) => {
          this.adduserform.user_id = res.data.id;
          // emailform.user_id=this.adduserform.user_id
          emailform.append("user_id", this.adduserform.user_id);
          console.log(emailform[0].user_id,"444")
          request({
            url: "/email/",
            method: "post",
            data: emailform,
          });
          if (res.data.identity == "patient") {
            request({
              url: "/patient/patient/",
              method: "post",
              data: this.adduserform,
            });
          }
          if (res.data.identity == "relation") {
            request({
              url: "/relation/relation/",
              method: "post",
              data: this.adduserform,
            });
          }
          if (res.data.identity == "doctor") {
            request({
              url: "/doctor/doctor/",
              method: "post",
              data: this.adduserform,
            });
          }
          if (res.data.identity == "nurse") {
            request({
              url: "/nurse/nurse/",
              method: "post",
              data: this.adduserform,
            });
          }
          this.$message({
            message: "恭喜你，新建成功",
            type: "success",
          });
          //this.addUserFormVisible = false;
          this.fetchUserData();
          this.adduserform = {};
        })
        .catch((error) => {
          console.log(error);
          this.$message({
            message: "新建失败",
            type: "warning",
          });
          //this.addUserFormVisible = false;
        })
        .finally(() => {
          this.addUserFormVisible = false;
        });
    },
    //获取全部用户数据
    fetchUserData: function () {
      var form = new FormData();
      request({
        url: "/users/user/",
        method: "get",
        params: this.params,
      }).then((res) => {
        //请求成功的处理
        this.tableData = res.data.results;
        this.total_number = res.data.count;
      });
    },
    // 所需要的所有的方法定义在此处
    handleEdit(index, row) {
      this.editUserFormVisible = true;
      this.edituserform = row;
      this.edituserform.password = "123456";
      this.imageUrl = row.avatar;
    },
    handleDelete(userid) {
      var deleteForm = new FormData();
      console.log(userid);
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调用删除用户的接口将用户删除
          request({
            url: "users/user/" + userid + "/",
            method: "delete",
            params: userid,
          }).then((res) => {
            //请求成功后的处理
            this.fetchUserData();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.fetchUserData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //头像上传成功钩子
    handlefileChange(file) {
      console.log(file);
      this.adduserform.avatar = file.raw;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleeditfileChange(file) {
      console.log(file);
      this.edituserform.avatar = file.raw;
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.params.page_size = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.params.page = val;
    },
  },
};
</script>

<style scoped>
/*scoped说明当前的样式修饰只针对当前组件有效 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<template>
  <div class="dashboard-container">
    <!-- <h1 class="ui header">我的病人</h1> -->

    <!-- <div class="ui menu">
        <div class="right menu">
            <div class="item">
                <el-button>添加患者</el-button>
            </div>
        </div>
    </div> -->

    <div v-show="!ifSearch" class="ui right aligned container segment">
      <div class="ui action input">
        <input type="text" v-model="id" placeholder="输入ID搜索添加病人..." />
        <button @click="reverseSearchFlag" class="ui icon button">
          <i class="search icon"></i>
        </button>
      </div>
    </div>
    <div v-show="ifSearch" class="ui right aligned container segment">
      <button @click="reverseSearchFlag" class="ui button">取消添加</button>
    </div>

    <div v-show="ifSearch" class="ui center aligned container segment">
      <div id="datatable">
        <el-table
          border
          :data="tableData"
          style="width: 100%; margin-top: 15px"
        >
          <el-table-column
            label="病人ID"
            align="center"
            width="150"
            style="margin-left: 10px"
            prop="id"
          >
          </el-table-column>
          <el-table-column label="病人姓名" align="center" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleAdd(scope.row.id)"
                >添加患者</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="ui container">
      <div class="ui four stackable cards">
        <div v-for="t in count " class="ui centered card" :key="t.index">
          <div class="content">
            <!-- <img
              class="right floated mini ui image"
              :src="patienttable[t - 1].avatar"
            /> -->
            <div class="header">{{ patienttable[t - 1].name }}</div>
            <div class="meta">病房{{ patienttable[t - 1].ward_id==2?101:102 }}</div>
            <div class="description">
              <div class="ui internally celled grid">
                <div class="eight wide column" >心率{{data[t-1].Heart_rate}}次/分钟</div>
                <div class="eight wide column">血压{{data[t-1].Dbq}}/{{data[t-1].Sbq}}mmHg</div>

                <div class="three column row">
                  <div class="column">体温{{data[t-1].Body_temperature}}℃</div>
                  <div class="column">血氧{{data[t-1].Blood_oxygen}}%</div>
                  <div class="column">呼吸值{{data[t-1].Breathing_value}}次/分钟</div>
                </div>
              </div>
            </div>
          </div>
          <div class="extra content">
            <div class="ui three buttons">
              <div class="ui basic green button">重点关注</div>
              <div class="ui basic red button" @click="deletepatient(patienttable[t-1].id)">移除病人</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="ui container segment" style="position:fixed;top:40%;left:0;right:0;margin:0 auto;">
        123
    </div> -->

    <!-- <div class="ui divider"></div> -->

    <div class="ui centered grid" style="margin-top: 3%">
      <el-pagination background layout="prev, pager, next" :total=10>
      </el-pagination>
    </div>
  </div>
</template>

<script>
import store from "../../store";
import { mapGetters } from "vuex";
import request from "../../utils/request.js";
// import $ from "jquery";
import "@/assets/semantic-ui/semantic.min.js";
import "@/assets/semantic-ui/semantic.min.css";

export default {
  name: "Dashboard",
  data() {
    return {
      tableData: [
        {
          id: "",
        },
      ],
      page: 1,
      ifSearch: false,
      id: null,
      params: {
        user_id: 0,
      },
      count: 0,
      patienttable: [],

      params1: {
        doctor_id: 0,
      },
      params2: {
        patient_id: 0,
        name,
      },
      params3: {
        patient_id: 1,
        name: "",
      },
      params4: {
        device_id: 0,
      },
      data: [
        // {
        //   Heart_rate: 0,
        //   Blood_pressure: 0,
        //   Body_temperature: 0,
        //   Blood_oxygen: 0,
        //   Breathing_value: 0,
        // },
        // {
        //   Heart_rate: 1,
        //   Blood_pressure: 0,
        //   Body_temperature: 0,
        //   Blood_oxygen: 0,
        //   Breathing_value: 0,
        // },
        // {
        //   Heart_rate: 1,
        //   Blood_pressure: 0,
        //   Body_temperature: 0,
        //   Blood_oxygen: 0,
        //   Breathing_value: 0,
        // },
        // {
        //   Heart_rate: 1,
        //   Blood_pressure: 0,
        //   Body_temperature: 0,
        //   Blood_oxygen: 0,
        //   Breathing_value: 0,
        // },
      ],
    };
  },
  watch: {
    id: {
      handler: function (newparams, oldparams) {
        //时刻监听params数据的变化，一旦发生变化自动调用该方法
        //console.log(newparams, oldparams, "11");
        //重新加载数据
        request({
          url: "/patient/patient/" + this.id + "/",
          method: "get",
        }).then((res) => {
          //请求成功的处理
          this.tableData[0] = res.data;
        });
      },
      deep: true, //深度监听（对象或数据）
    },
  },
  created() {
    this.fetchPatientData();
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
    },
    deletepatient(id) {
      var editform = {
        doctor_id: 1,
      };
      request({
        url: "/patient/patient/" + id + "/",
        method: "patch",
        data: editform,
      });
      request({
        url:"/device/medicaleq/",
        method:"get",
        params:{
          "patient_id":id,
          "page_size":20,
        }
      }).then((res)=>{
        for(var i=0;i<res.data.count;i++)
        {
          request({
            url:"/device/medicaleq/"+res.data.results[i].id+"/",
            method:"patch",
            data:{
              "patient_id":1
            }
          })
        }
      })
      this.fetchPatientData();
    },
    reverseSearchFlag(event) {
      this.ifSearch = !this.ifSearch;
    },
    handleAdd(id) {
      var storage = localStorage.getItem("id");
      var editform = new FormData();
      var editform2 = new FormData();
      this.params.user_id = storage;
      //将病人与医生绑定
      request({
        url: "/doctor/doctor/",
        method: "get",
        params: this.params,
      }).then((res) => {
        editform.append("doctor_id", res.data[0].id);
        editform.append("ward_id", 2);
        request({
          url: "patient/patient/" + id + "/",
          method: "patch",
          data: editform,
        }).then(()=>{
          //添加一个病人后会自动绑定五个空闲的设备
      this.params3.name = "体温计";
      request({
        url: "/device/medicaleq/",
        method: "get",
        params: this.params3,
      }).then((res) => {
        editform2.append("patient_id", id);
        request({
          url: "/device/medicaleq/" + res.data.results[0].id + "/",
          method: "patch",
          data: editform2,
        });
      });
      this.params3.name = "收缩压计";
      request({
        url: "/device/medicaleq/",
        method: "get",
        params: this.params3,
      }).then((res) => {
        editform2.append("patient_id", id);
        request({
          url: "/device/medicaleq/" + res.data.results[0].id + "/",
          method: "patch",
          data: editform2,
        });
      });
      this.params3.name = "血氧机";
      request({
        url: "/device/medicaleq/",
        method: "get",
        params: this.params3,
      }).then((res) => {
        editform2.append("patient_id", id);
        request({
          url: "/device/medicaleq/" + res.data.results[0].id + "/",
          method: "patch",
          data: editform2,
        });
      });
      this.params3.name = "心跳测量器";
      request({
        url: "/device/medicaleq/",
        method: "get",
        params: this.params3,
      }).then((res) => {
        editform2.append("patient_id", id);
        request({
          url: "/device/medicaleq/" + res.data.results[0].id + "/",
          method: "patch",
          data: editform2,
        });
      });
      this.params3.name = "呼吸机";
      request({
        url: "/device/medicaleq/",
        method: "get",
        params: this.params3,
      }).then((res) => {
        editform2.append("patient_id", id);
        request({
          url: "/device/medicaleq/" + res.data.results[0].id + "/",
          method: "patch",
          data: editform2,
        });
      });
      this.params3.name = "舒张压计";
      request({
        url: "/device/medicaleq/",
        method: "get",
        params: this.params3,
      }).then((res) => {
        editform2.append("patient_id", id);
        request({
          url: "/device/medicaleq/" + res.data.results[0].id + "/",
          method: "patch",
          data: editform2,
        });
      });
        });
      });
      this.fetchPatientData();
    },
    //加载医生管理的病人到patienttable，并将与病人绑定的设备添加到data
    fetchPatientData: function () {
      var storage = localStorage.getItem("id");
      this.params.user_id = storage;
      var form = new FormData();
      request({
        url: "/doctor/doctor/",
        method: "get",
        params: this.params,
      }).then((res) => {
        this.params1.doctor_id = res.data[0].id;
        request({
          url: "/patient/patient/",
          method: "get",
          params: this.params1,
        }).then((res) => {
          this.count = res.data.count;
          this.patienttable = res.data.results;
          var m1 = 0;
          var m2 = 0;
          var m3 = 0;
          var m4 = 0;
          var m5 = 0;
          var m6 = 0;
          for (var i = 0; i < this.count; i++) {
            this.data.push({
              Heart_rate: 74,
              Dbq: 124,
              Sbq: 76,
              Body_temperature: 36.8,
              Blood_oxygen: 90,
              Breathing_value: 24,
            });}
          for (var i = 0; i < this.count; i++) {
            this.params2.patient_id = res.data.results[i].id;
            //给每个用户的五个设备赋值
            this.params2.name = "体温计";
            request({
              url: "/device/medicaleq/",
              methog: "get",
              params: this.params2,
            }).then((res) => {
              console.log(res.data, "44444");
              this.params4.device_id = res.data.results[0].id;
              request({
                url: "/device/medicaldata/",
                method: "get",
                params: this.params4,
              }).then((res) => {
                this.data[m1].Body_temperature =
                  res.data[res.data.length - 1].data;
                m1++;
              });
            });
            this.params2.name = "心跳测量器";
            request({
              url: "/device/medicaleq/",
              methog: "get",
              params: this.params2,
            }).then((res) => {
              this.params4.device_id = res.data.results[0].id;
              request({
                url: "/device/medicaldata/",
                method: "get",
                params: this.params4,
              }).then((res) => {
                this.data[m2].Heart_rate = res.data[res.data.length - 1].data;
                m2++;
              });
            });
            this.params2.name = "舒张压计";
            request({
              url: "/device/medicaleq/",
              methog: "get",
              params: this.params2,
            }).then((res) => {
              this.params4.device_id = res.data.results[0].id;
              request({
                url: "/device/medicaldata/",
                method: "get",
                params: this.params4,
              }).then((res) => {
                this.data[m3].Dbq =
                  res.data[res.data.length - 1].data;
                m3++;
              });
            });
            this.params2.name = "血氧机";
            request({
              url: "/device/medicaleq/",
              methog: "get",
              params: this.params2,
            }).then((res) => {
              this.params4.device_id = res.data.results[0].id;
              request({
                url: "/device/medicaldata/",
                method: "get",
                params: this.params4,
              }).then((res) => {
                this.data[m4].Blood_oxygen = res.data[res.data.length - 1].data;
                m4++;
              });
            });
            this.params2.name = "呼吸机";
            request({
              url: "/device/medicaleq/",
              methog: "get",
              params: this.params2,
            }).then((res) => {
              this.params4.device_id = res.data.results[0].id;
              request({
                url: "/device/medicaldata/",
                method: "get",
                params: this.params4,
              }).then((res) => {
                this.data[m5].Breathing_value =
                  res.data[res.data.length - 1].data;
                m5++;
              });
            });
             this.params2.name = "收缩压计";
            request({
              url: "/device/medicaleq/",
              methog: "get",
              params: this.params2,
            }).then((res) => {
              this.params4.device_id = res.data.results[0].id;
              request({
                url: "/device/medicaldata/",
                method: "get",
                params: this.params4,
              }).then((res) => {
                this.data[m6].Sbq =
                  res.data[res.data.length - 1].data;
                m6++;
              });
            });
          }
        });
      });
    },
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

<style scoped>
/* @import "@/assets/css/semantic.min.css"; */
</style>

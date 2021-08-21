<template>
  <div class="dashboard-container">
    <!-- 设备管理对话框 -->
    <el-dialog :visible.sync="deviceInfoVisible" width="60%">
      <!-- 嵌套在设备管理对话框中的阈值设置对话框 -->
      <el-dialog
        :visible.sync="deviceThresholdVisible"
        width="40%"
        append-to-body
        :before-close="cancelThreshold"
      >
        <!-- <span>这是一段信息</span> -->

        <div class="ui grid">
          <div class="eight wide column">
            <h1 class="ui header">阈值设定</h1>
          </div>
          <div class="eight wide column">
            <div class="ui right aligned container">
              <button
                @click="confirmThreshold"
                class="ui labeled icon primary button"
              >
                <i class="save outline icon"></i>
                保存
              </button>
              <button @click="cancelThreshold" class="ui labeled icon button">
                <i class="trash alternate outline icon"></i>
                取消
              </button>
            </div>
          </div>
        </div>
        <div class="ui divider"></div>

        <div class="ui grid">
        <div class="eight wide column">
            <h4 class="ui header">最小值</h4>
          </div>
          <div class="eight wide column">
            <div class="ui right aligned container">
              <span>单位：{{ tableData[current_index].unit }}</span>
            </div>
          </div>
          <div class="sixteen wide column">
            <div class="ui text segment" style="margin-top: -4%">
              <el-slider
                v-model="tableData[current_index].min_value"
                :min="min_threshold_min"
                :max="min_threshold_max"
                show-input
              ></el-slider>
            </div>
          </div>
          <!-- <div class="ui divider"></div> -->
          <div class="eight wide column">
            <h4 class="ui header">最大值</h4>
          </div>
          <div class="eight wide column">
            <div class="ui right aligned container">
              <span>单位：{{ tableData[current_index].unit }}</span>
            </div>
          </div>
          <div class="sixteen wide column">
            <div class="ui text segment" style="margin-top: -4%">
              <el-slider
                v-model="tableData[current_index].max_value"
                :min="max_threshold_min"
                :max="max_threshold_max"
                show-input
              ></el-slider>
            </div>
          </div>
        </div>
      </el-dialog>

      <!-- 嵌套在设备管理对话框中的空调遥控对话框 -->
      <el-dialog
        :visible.sync="controlAirConVisible"
        width="30%"
        append-to-body
      >
        <!-- <span>这是一段信息</span> -->
        <div
          class="ui right aligned segment"
          style="overflow: auto; background: #f9fafb"
        >
          <div class="ui huge header" style="font-family: LCD">{{tableData[current_index].data}}</div>

          <div class="ui grid">
            <div class="ui eight wide column">
              <div class="ui left aligned container">制冷</div>
            </div>
            <div class="ui eight wide column">℃</div>
          </div>
        </div>

        <div class="ui divider"></div>
        <el-button class="fluid ui positive button">模式</el-button>
        <el-button
          @click="up()"
          class="fluid ui icon primary basic button"
          style="margin-top: 2%"
          ><i class="chevron up icon"></i
        ></el-button>
        <el-button
          @click="down()"
          class="fluid ui icon negative basic button"
          style="margin-top: 2%"
          ><i class="chevron down icon"></i
        ></el-button>
      </el-dialog>

      <!-- 嵌套在设备管理对话框中的灯遥控对话框 -->
      <el-dialog :visible.sync="controlLightVisible" width="30%" append-to-body>
        <!-- <span>这是一段信息</span> -->
        <button
          @click="confirmLight"
          class="ui labeled icon primary button"
          style="margin-left:250px"
        >
                <i class="save outline icon"></i>
                保存
              </button>
        <div
          class="ui right aligned padded segment"
          style="overflow: auto; background: #f9fafb"
        >
        
          <div class="ui grid">
            <div class="ui eight wide column">
              <div class="ui left aligned container">
                <div class="ui huge header" style="font-family: LCD">
                  {{ tableData[current_index].data }}
                </div>
              </div>
            </div>
            <div class="ui eight wide column">
              <span style="font-size: 60%">单位： 流明度 </span>
            </div>
          </div>
        </div>
        <div class="ui divider"></div>

        <el-slider
          v-model="tableData[current_index].data"
          :min="300"
          :max="1200"
          show-input
        ></el-slider>
      </el-dialog>

      <!-- 设备管理对话框的主体 -->
      <!-- <span>这是一段信息</span> -->

      <div class="ui grid">
        <div class="eight wide column">
          <h1 class="ui header">设备管理</h1>
        </div>
        <div class="eight wide column">
          <div class="ui right aligned container">
            <!-- <el-select
              v-model="input"
              clearable
              placeholder="设备类型"
              style="margin-right: 10px"
            >
              <el-option label="家居" value="0"></el-option>
              <el-option label="医疗" value="1"></el-option>
            </el-select> -->
            <button @click="reverseAdd" class="ui primary button">
              添加设备
            </button>
          </div>
        </div>
      </div>
      <div class="ui divider"></div>
      
      <div id="datatable">
        <el-table
          border
           :data="tableData.slice(8 * (page - 1), 8 + 8 * (page - 1))"
          style="width: 100%; margin-top: 15px"
        >
          <el-table-column label="序号" align="center" width="50">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="设备ID" align="center" width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
         
          <el-table-column label="设备名称" align="center" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.kind  }}</span>
            </template>
          </el-table-column>
           <el-table-column label="设备类型" align="center" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="设备状态" align="center" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.on ? "开" : "关" }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <button class="ui small positive basic button" @click="turn(scope.row.id,scope.row.name,scope.row.on)">开关</button>
              <button
                @click="judgmentType(scope.row.name,scope.$index,scope.row.on)"
                class="ui small primary basic button"
              >
                控制
              </button>
              <button class="ui small negative basic button" @click="deleteeq(scope.row.id,scope.row.name)">移除</button>
              <!-- <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row.id)"
                >添加患者</el-button
              > -->
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div
        class="ui centered grid"
        style="margin-top: 3%; margin-bottom: 1%; overflow: auto"
      >
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :current-page="page"
          :total="tableData.length"
        >
        </el-pagination>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="deviceAddVisible" width="60%">
      <!-- <span>这是一段信息</span> -->

      <div class="ui grid">
        <div class="eight wide column">
          <h1 class="ui header">设备添加</h1>
        </div>
        <div class="eight wide column">
          <div class="ui right aligned container">
            <el-select
              v-model="params6.name"
              clearable
              placeholder="设备类型"
              style="margin-right: 10px"
            >
              <el-option label="舒张压计" value="舒张压计"></el-option>
          <el-option label="收缩压计" value="收缩压计"></el-option>
          <el-option label="体温计" value="体温计"></el-option>
          <el-option label="心电仪" value="心电仪"></el-option>
          <el-option label="心跳测量器" value="心跳测量器"></el-option>
          <el-option label="血氧机" value="血氧机"></el-option>
          <el-option label="呼吸机" value="呼吸机"></el-option>
          <el-option label="灯" value="灯"></el-option>
          <el-option label="空调" value="空调"></el-option>
          <el-option label="温度计" value="温度计"></el-option>
          <el-option label="湿度计" value="湿度计"></el-option>
          <el-option label="窗帘" value="窗帘"></el-option>
            </el-select>
            <button @click="reverseAdd" class="ui labeled icon button">
              <i class="right arrow icon"></i>
              返回
            </button>
          </div>
        </div>
      </div>
      <div class="ui divider"></div>
      <div id="datatable">
        <el-table
          border
          :data="table.slice(10 * (page - 1), 10 + 10 * (page - 1))"
          style="width: 100%; margin-top: 15px"
        >
          <el-table-column label="序号" align="center" width="80">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="设备ID" align="center" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="设备名称" align="center" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.kind  }}</span>
            </template>
          </el-table-column>
           <el-table-column label="设备类型" align="center" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="设备状态" align="center" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.on ? "开" : "关" }}</span>
            </template>
          </el-table-column>

        
            <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <button class="ui small positive basic button" @click="Add(scope.row.id,scope.row.name)">添加</button>
              
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div
        class="ui centered grid"
        style="margin-top: 3%; margin-bottom: 1%; overflow: auto"
      >
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :current-page="page"
          :total="table.length"
        >
        </el-pagination>
      </div>
    </el-dialog>

    <div class="ui container">

      <div class="ui four stackable cards">
        <div v-for="t in patienttable.length" class="ui centered card" :key="t.index">
          <div class="content">
            <!-- <img
              class="right floated mini ui image"
              src="@/assets/images/kristy.png"
            /> -->
            <div class="header">{{ patienttable[t - 1].name }}</div>
            <div class="meta">病房{{ patienttable[t - 1].ward_id==2?101:102 }}</div>
            <div class="description">
              <div class="ui internally celled grid">
                <div class="eight wide column" >
                  
                  <a class="ui top attached green  label" @click="reverseHistory(patienttable[t - 1].id,device1)" style="text-align: center">心率</a>
                  <div class="ui center aligned container" style="height:20px">
                  {{data[t-1].Heart_rate}}PM
                  </div>
                  
                </div>
                <div class="eight wide column">
                  <a class="ui top attached teal label" @click="reverseHistory(patienttable[t - 1].id,device2)" style="text-align: center">血压</a>
                  <div class="ui right aligned container">
                  {{data[t-1].Dbq}}/{{data[t-1].Sbq}}mmHg
                  </div>
                
                  
                </div>

                <div class="three column row">
                  <div class="column">
                    
                    <div class="ui center aligned container">
                    {{data[t-1].Body_temperature}}℃
                    </div>
                    <a class="ui bottom attached teal label" @click="reverseHistory(patienttable[t - 1].id,device3)" style="text-align: center">体温</a>
                  </div>
                  <div class="column">
                      
                      <div class="ui center aligned container">
                      {{data[t-1].Blood_oxygen}}%
                      </div>
                      <a class="ui bottom attached green label" @click="reverseHistory(patienttable[t - 1].id,device4)" style="text-align: center">血氧</a>    
                  </div>
                  <div class="column">
                    
                    <div class="ui center aligned container" style="height:50px">
                      {{data[t-1].Breathing_value}}PM
                    </div>
                    <a class="ui bottom attached teal label" @click="reverseHistory(patienttable[t - 1].id,device5)" style="text-align: center">呼吸值</a>    
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="extra content">
            <div class="ui two buttons">
              <div class="ui basic green button">重点关注</div>
              <div class="ui basic red button"  @click="deletepatient(patienttable[t - 1].id)">移除病人</div>
            </div>

            <div
              class="fluid ui basic blue button"
              style="margin-top: 2%"
              @click="reverseInfo(patienttable[t - 1].id,patienttable[t - 1].ward_id)"
            >
              设备管理
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
      <el-pagination background layout="prev, pager, next"  :total=1>
      </el-pagination>
    </div>
     <!-- 历史数据对话框 -->
    <el-dialog :visible.sync="controlHistoryVisible" width="60%">
      <!-- <span>这是一段信息</span> -->
      <div class="ui grid">
        <div class="four wide column">
          <h1 class="ui header">历史数据</h1>
        </div>
        <div class="twelve wide column">
          <div class="ui right aligned container">
            <div id="search">
              <el-date-picker
                v-model="searchtime"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                align="right"
              >
              </el-date-picker>
            </div>
          </div>
        </div>
      </div>
      <div class="ui divider"></div>
      <echartsline :linedata="tlinedata"></echartsline>
    </el-dialog>
  </div>
</template>

<script>
import request from "../../utils/request.js";
import { mapGetters } from "vuex";
import echartsline from "@/components/EchartsComponents/Echartsline.vue";
// import $ from "jquery";
import "@/assets/semantic-ui/semantic.min.js";
import "@/assets/semantic-ui/semantic.min.css";

export default {
  name: "Dashboard",
  components: {
    echartsline,
  },
  data() {
    return {
      device1:"心跳测量器",
      device2:"收缩压计",
      device3:"体温计",
      device4:"血氧机",
      device5:"呼吸机",
      searchtime:"",
      controlHistoryVisible: false,
       tlinedata: {
        xdata: [],
        ydata: [],
      },
      ward_id:0,
      patient_id:0,
      data: [
       //五项指标数据
      ],
      current_index: 0,
      page: 1,
      patienttable: [],
      ward_set: [],
      params: {
        user_id: 0,
      },
      params1: {
        ward_id: 0,
      },
      params2: {
        patient_id: 0,
        name,
      },
      params4: {
        device_id: 0,
      },
      params3: {
        ward_id: 0,
        //page,
        page_size:50
      },
      params5: {
        patient_id: 0,
        //page,
        page_size:50
      },
      params6:{
        page: 1,
        page_size: 100,
        ward_id:1,
        patient_id:1
      },
      deviceInfoVisible: false,
      deviceAddVisible: false,
      deviceThresholdVisible: false,
      controlAirConVisible: false,
      controlLightVisible: false,
      tableData: [
        //已添加设备
        {
          name: "温度计",
          on: true,
          id: 1,
          max_value: 100,
          min_value: 0,
          unit: null,
        },
      ],
      table:[],//待添加设备库
      input: "",
      min_threshold_min: 0,
      min_threshold_max: 0,
      max_threshold_min: 0,
      max_threshold_max: 0,
    };
  },
  computed: {
    ...mapGetters(["name"]),
  },
  created() {
    this.fetchPatientData();
  },
  watch: {
     searchtime:{
      handler:function(){
        this.controlHistoryVisible = !this.controlHistoryVisible;
        this.reverseHistory();
      },
      deep:true
    },
    tableData: {
      handler: function (newparams, oldparams) {
        //时刻监听params数据的变化，一旦发生变化自动调用该方法
        //console.log(newparams, oldparams, "11");
        //重新加载数据
      },
      deep: true, //深度监听（对象或数据）
    },
     params6: {
      handler: function (newparams, oldparams) {
        //时刻监听params数据的变化，一旦发生变化自动调用该方法
        //console.log(newparams, oldparams, "11");
        //重新加载数据
        this.reverseAdd();
        this.deviceInfoVisible = !this.deviceInfoVisible;
      this.deviceAddVisible = !this.deviceAddVisible;
      },
      deep: true, //深度监听（对象或数据）
    },
  },

  methods: {
     reverseHistory(id,name) {
      // this.deviceInfoVisible = !this.deviceInfoVisible
      console.log("1111111111")
      this.controlHistoryVisible = !this.controlHistoryVisible;
      this.tlinedata.xdata = [];
      this.tlinedata.ydata = [];
      request({
        url:"/device/medicaleq/",
        method:"get",
        params:{
          "name":name,
          "patient_id":id,
        }
      }).then((res)=>{
          request({
        url: "device/medicaldata",
        method: "get",
        params: {"start_time":this.searchtime[0],"end_time":this.searchtime[1],"device_id":res.data.results[0].id}
      })
        .then((res) => {
          // console.log(res,"tempdata")
          res.data.forEach((item) => {
            this.tlinedata.xdata.push(item.addtime);
            this.tlinedata.ydata.push(item.data);
          });
        })
        .catch((error) => {
          console.log(error);
        });
      })
     
    },
    deletepatient(id){
      request({
        url:"/patient/patient/"+id+"/",
        method:"patch",
        data:{
          "ward_id":1
        }
      })
      this.fetchPatientData();
    },
    deleteeq(device_id,name){
      if(name=="灯"||name=="空调"||name=="温度计"||name=="湿度计"||name=="窗帘")
      {
        request({
          url:"/device/furnitureeq/"+device_id+"/",
          method:"patch",
          data:{
            "ward_id":1,
            "on":"false",
          }
        })
      }
      else{
        request({
          url:"/device/medicaleq/"+device_id+"/",
          method:"patch",
          data:{
            "patient_id":1,
            "on":"false",
          }
        })
      }
      this.deviceInfoVisible = !this.deviceInfoVisible;
      this.reverseInfo(this.patient_id,this.ward_id)
    },
    Add(device_id,name){
      if(name=="灯"||name=="空调"||name=="温度计"||name=="湿度计"||name=="窗帘")
      {
        request({
          url:"/device/furnitureeq/"+device_id+"/",
          method:"patch",
          data:{
            "ward_id":this.ward_id
          }
        })
      }
      else{
        request({
          url:"/device/medicaleq/"+device_id+"/",
          method:"patch",
          data:{
            "patient_id":this.patient_id
          }
        })
      }
     this.reverseAdd();
     this.deviceInfoVisible = !this.deviceInfoVisible;
     this.deviceAddVisible = !this.deviceAddVisible;
    
    },
    turn(id, name, on1) {
      var params = {
        on: !on1,
      };
      console.log(name, id);
      if (name == "空调" || name == "灯"||name=="温度计"||name=="湿度计"||name=="窗帘") {
        request({
          url: "/device/furnitureeq/" + id + "/",
          method: "patch",
          data: params,
        }).then(() => {
          this.deviceInfoVisible = !this.deviceInfoVisible;
          this.reverseInfo(this.params5.patient_id, this.params3.ward_id);
        });
      }
      if (name != "空调" && name != "灯"&& name != "湿度计"&& name != "温度计"&& name != "窗帘") {
        request({
          url: "/device/medicaleq/" + id + "/",
          method: "patch",
          data: params,
        }).then(() => {
          this.deviceInfoVisible = !this.deviceInfoVisible;
          this.reverseInfo(this.params5.patient_id, this.params3.ward_id);
        });
      }
    },
    fetchPatientData: function () {
      this.patienttable.length=0
      var storage = localStorage.getItem("id");
      this.params.user_id = storage;
      request({
        url: "/nurse/nurse/",
        method: "get",
        params: this.params,
      }).then((res) => {
        request({
          url: "/nurse/nurse/" + res.data[0].id + "/",
          method: "get",
        }).then((res) => {
          this.ward_set = res.data.ward_set;
          var m1 = 0;
          var m2 = 0;
          var m3 = 0;
          var m4 = 0;
          var m5 = 0;
          var m6 = 0;

          for (var i = 0; i < this.ward_set.length; i++) {
            this.params1.ward_id = this.ward_set[i];
            request({
              url: "/patient/patient/",
              method: "get",
              params: this.params1,
            }).then((res) => {
              for (var i = 0; i < res.data.results.length; i++) {
                this.data.push({
                  Heart_rate: 75,
                  Dbq: 123,
                  Sbq:78,
                  Body_temperature: 36.4,
                  Blood_oxygen: 90,
                  Breathing_value: 17,
                });
              }
              for (var m = 0; m < res.data.results.length; m++) {
                this.patienttable.push(res.data.results[m]);
                this.params2.patient_id = res.data.results[m].id;
                this.params2.name = "体温计";
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
                    this.data[m2].Heart_rate =
                      res.data[res.data.length - 1].data;
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
                    this.data[m4].Blood_oxygen =
                      res.data[res.data.length - 1].data;
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
                    this.data[m3].Sbq =
                      res.data[res.data.length - 1].data;
                    m6++;
                  });
                });
              }
            });
          }
        });
      });
    },
    reverseInfo(patient_id, ward_id) {
      this.patient_id=patient_id
      this.ward_id=ward_id
      this.tableData.length = 0;
      //this.deviceInfoVisible = !this.deviceInfoVisible;
      this.params3.ward_id = ward_id;
      this.params5.patient_id = patient_id;
      request({
        url: "/device/furnitureeq/",
        method: "get",
        params: this.params3,
      }).then((res) => {
        for (var i = 0; i < res.data.results.length; i++) {
          this.tableData.push(res.data.results[i]);
        }
        request({
          url: "/device/medicaleq/",
          method: "get",
          params: this.params5,
        }).then((res) => {
          for (var i = 0; i < res.data.results.length; i++) {
            this.tableData.push(res.data.results[i]);
          }
        });
      });     
      this.deviceInfoVisible = !this.deviceInfoVisible;
    },
    reverseAdd(e) {
      request({
        url:"/device/medicaleq",
        method:"get",
        params:this.params6
      }).then((res)=>{
         this.table=res.data.results
         request({
           url:"/device/furnitureeq",
           method:"get",
           params:this.params6
         }).then((res)=>{
           for(var i=0;i<res.data.results.length;i++)
           {
             this.table.push(res.data.results[i])
           }
         })
      })
      this.deviceInfoVisible = !this.deviceInfoVisible;
      this.deviceAddVisible = !this.deviceAddVisible;
    },
    activeThreshold(index) {
      this.current_index = index;
      console.log(this.current_index);
      this.deviceThresholdVisible = !this.deviceThresholdVisible;
      // this.deviceInfoVisible = !this.deviceInfoVisible
      this.max_value_backup = this.tableData[index].max_value;
      this.min_value_backup = this.tableData[index].min_value;
      this.min_threshold_min = this.tableData[index].min_value - 10;
      this.min_threshold_max = this.tableData[index].min_value + 20;
      this.max_threshold_min = this.tableData[index].max_value - 20;
      this.max_threshold_max = this.tableData[index].max_value + 10;
    },
    cancelThreshold() {
      // this.deviceInfoVisible = !this.deviceInfoVisible
      this.deviceThresholdVisible = !this.deviceThresholdVisible;
      this.tableData[this.current_index].max_value = this.max_value_backup;
      this.tableData[this.current_index].min_value = this.min_value_backup;
      this.current_index = 0;
    },
    confirmThreshold() {
      // this.deviceInfoVisible = !this.deviceInfoVisible
      this.deviceThresholdVisible = !this.deviceThresholdVisible;
      request({
        url: "/device/medicaleq/" + this.tableData[this.current_index].id + "/",
        method: "patch",
        data: this.tableData[this.current_index],
      });
      this.current_index = 0;
    },
    confirmLight() {
      var params = {
        data: this.tableData[this.current_index].data,
        device_id: this.tableData[this.current_index].id,
      };
      request({
        url: "/device/furnituredata/",
        method: "post",
        data: params,
      }).then(() => {
        this.controlLightVisible = !this.controlLightVisible;
        this.current_index = 0;
      });
    },
    reverseLight(index) {
      this.current_index = index;
      // this.deviceInfoVisible = !this.deviceInfoVisible
      var params = {
        device_id: this.tableData[this.current_index].id,
      };
      request({
        url: "/device/furnituredata/",
        method: "get",
        params: params,
      }).then((res) => {
        console.log(res.data[res.data.length - 1]);
        this.tableData[this.current_index].data =
          res.data[res.data.length - 1].data;
        this.controlLightVisible = !this.controlLightVisible;
      });
    },
    reverseAirCon(index) {
      this.current_index = index;
      // this.deviceInfoVisible = !this.deviceInfoVisible
      var params = {
        device_id: this.tableData[this.current_index].id,
      };
      request({
        url: "/device/furnituredata/",
        method: "get",
        params: params,
      }).then((res) => {
        console.log(res.data[res.data.length - 1]);
        this.tableData[this.current_index].data =
          res.data[res.data.length - 1].data;
        this.controlAirConVisible = !this.controlAirConVisible;
      });
    },
    up() {
      var params = {
        data: Number(this.tableData[this.current_index].data) + 1 + "",
        device_id: this.tableData[this.current_index].id,
      };
      request({
        url: "/device/furnituredata/",
        method: "post",
        data: params,
      }).then(() => {
        this.controlAirConVisible = !this.controlAirConVisible;
        var params = {
          device_id: this.tableData[this.current_index].id,
        };
        request({
          url: "/device/furnituredata/",
          method: "get",
          params: params,
        }).then((res) => {
          console.log(res.data[res.data.length - 1]);
          this.tableData[this.current_index].data =
            res.data[res.data.length - 1].data;
          this.controlAirConVisible = !this.controlAirConVisible;
        });
      });
    },
    down() {
      var params = {
        data: Number(this.tableData[this.current_index].data) - 1 + "",
        device_id: this.tableData[this.current_index].id,
      };
      request({
        url: "/device/furnituredata/",
        method: "post",
        data: params,
      }).then(() => {
        this.controlAirConVisible = !this.controlAirConVisible;
        var params = {
          device_id: this.tableData[this.current_index].id,
        };
        request({
          url: "/device/furnituredata/",
          method: "get",
          params: params,
        }).then((res) => {
          console.log(res.data[res.data.length - 1]);
          this.tableData[this.current_index].data =
            res.data[res.data.length - 1].data;
          this.controlAirConVisible = !this.controlAirConVisible;
        });
      });
    },
    judgmentType(deviceName, index,on) {
      console.log(index);
      if (deviceName == "空调") {
        if(on){this.reverseAirCon(index);}
        else{this.$message('请先开启空调再进行调节');}
      } else if (deviceName == "灯") {
        if(on){this.reverseLight(index);}
        else{this.$message('请先开灯再进行控制');}
      } else if (deviceName == "温度计"||deviceName == "湿度计"||deviceName == "窗帘"){
        this.$message('该设备无法调节阈值');
      }
      else {
        if(!on){this.activeThreshold(index);}
        else{this.$message('请先关闭设备再进行调节');}
      }
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
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

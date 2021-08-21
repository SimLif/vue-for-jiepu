<template>
  <div class="dashboard-container">
    <!-- 空调遥控对话框 -->
    <el-dialog :visible.sync="controlAirConVisible" width="30%">
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

    <!-- 灯遥控对话框 -->
    <el-dialog :visible.sync="controlLightVisible" width="30%">
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
            <span style="font-size: 60%">单位：流明度</span>
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

    <div class="ui container">
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
          <el-table-column label="设备名称" align="center" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.kind }}</span>
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
              <button
                class="ui small positive basic button"
                @click="turn(scope.row.id, scope.row.on)"
              >
                开关
              </button>
              <button
                @click="judgmentType(scope.row.name, scope.row.on,scope.$index)"
                class="ui small primary basic button"
              >
                控制
              </button>
              <button
                @click="reverseHistory(scope.row.id)"
                class="ui small orange basic button"
              >
                历史数据
              </button>
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
        <!-- <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import echartsline from "@/components/EchartsComponents/Echartsline.vue";
import "@/assets/semantic-ui/semantic.min.js";
import "@/assets/semantic-ui/semantic.min.css";
import request from "../../../utils/request.js";

export default {
  name: "Dashboard",
  components: {
    echartsline,
  },
  data() {
    return {
      controlAirConVisible: false,
      controlLightVisible: false,
      controlHistoryVisible: false,
      tableData: [],
      tlinedata: {
        xdata: [],
        ydata: [],
      },
      params: {
        user_id: 0,
      },
      params1: {
        ward_id: 0,
        page_size:50
      },
      current_index: 0,
      searchtime:"",
    };
  },
  computed: {
    ...mapGetters(["name"]),
  },
  created() {
    this.fetchData();
  },
  watch:{
    searchtime:{
      handler:function(){
        this.controlHistoryVisible = !this.controlHistoryVisible;
        this.reverseHistory();
      },
      deep:true
    }
  },
  methods: {
    fetchData: function () {
      var storage = localStorage.getItem("id");
      this.params.user_id = storage;
      request({
        url: "/patient/patient/",
        method: "get",
        params: this.params,
      }).then((res) => {
        request({
          url: "/patient/patient/" + res.data.results[0].id + "/",
          method: "get",
        }).then((res) => {
          this.params1.ward_id = res.data.ward_id;
          request({
            url: "/device/furnitureeq/",
            method: "get",
            params: this.params1,
          }).then((res) => {
            this.tableData = res.data.results;
            console.log(this.tableData, "111");
          });
        });
      });
    },
    confirmLight(){
      var params={
        data:this.tableData[this.current_index].data,
        device_id:this.tableData[this.current_index].id
      }
      request({
        url: "/device/furnituredata/",
        method: "post",
        data: params,
      }).then(()=>{
         this.controlLightVisible = !this.controlLightVisible;
         this.current_index = 0;
      });
    },
    up(){
      var params={
        data:Number(this.tableData[this.current_index].data)+1+"",
        device_id:this.tableData[this.current_index].id
      }
      request({
        url: "/device/furnituredata/",
        method: "post",
        data: params,
      }).then(()=>{
        this.controlAirConVisible = !this.controlAirConVisible;
        var params={
        device_id: this.tableData[this.current_index].id
      }
      request({
        url:"/device/furnituredata/",
        method:"get",
        params: params
      }).then((res)=>{
        console.log(res.data[res.data.length-1])
        this.tableData[this.current_index].data=res.data[res.data.length-1].data
        this.controlAirConVisible = !this.controlAirConVisible;
      })
      })
    },
    down(){
      var params={
        data:Number(this.tableData[this.current_index].data)-1+"",
        device_id:this.tableData[this.current_index].id
      }
      request({
        url: "/device/furnituredata/",
        method: "post",
        data: params,
      }).then(()=>{
        this.controlAirConVisible = !this.controlAirConVisible;
        var params={
        device_id: this.tableData[this.current_index].id
      }
      request({
        url:"/device/furnituredata/",
        method:"get",
        params: params
      }).then((res)=>{
        console.log(res.data[res.data.length-1])
        this.tableData[this.current_index].data=res.data[res.data.length-1].data
        this.controlAirConVisible = !this.controlAirConVisible;
      })
      })
    
    },
    turn(id, on1) {
      var params = {
        on: !on1,
      };
      request({
        url: "/device/furnitureeq/" + id + "/",
        method: "patch",
        data: params,
      }).then(() => {
        this.fetchData()
      });
    },
    reverseLight(index) {
       this.current_index = index;
      // this.deviceInfoVisible = !this.deviceInfoVisible
      var params={
        device_id: this.tableData[this.current_index].id
      }
      request({
        url:"/device/furnituredata/",
        method:"get",
        params: params
      }).then((res)=>{
        console.log(res.data[res.data.length-1])
        this.tableData[this.current_index].data=res.data[res.data.length-1].data
        this.controlLightVisible = !this.controlLightVisible;
      })
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
    reverseHistory(id) {
      // this.deviceInfoVisible = !this.deviceInfoVisible
      this.controlHistoryVisible = !this.controlHistoryVisible;
      this.tlinedata.xdata = [];
      this.tlinedata.ydata = [];
      request({
        url: "device/furnituredata",
        method: "get",
        params: {"start_time":this.searchtime[0],"end_time":this.searchtime[1],"device_id":id}
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
    },
    judgmentType(deviceName,on,index) {
      if(on){
      if (deviceName == "空调") {
        this.reverseAirCon(index);
      } else if (deviceName == "灯") {
        this.reverseLight(index);
      }
      else if(deviceName == "温度计"||deviceName == "湿度计"||deviceName == "窗帘")
      {
        this.$message('该设备无法调节阈值');
      }
      }
      if(!on){
        this.$message('请先开启设备');
      }
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

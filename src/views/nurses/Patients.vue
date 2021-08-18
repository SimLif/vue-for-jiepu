<template>
  <div class="dashboard-container ">
    
    <!-- 设备管理对话框 -->
    <el-dialog
      :visible.sync="deviceInfoVisible"
      width="60%"
      >
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
              <button @click="confirmThreshold" class="ui labeled icon primary button">
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
              <span>单位：{{ tableData[0].unit }}</span>
            </div>
          </div>
          <div class="sixteen wide column">
            <div class="ui text segment" style="margin-top:-4%">
              <el-slider v-model="tableData[0].min_value" :min="min_threshold_min" :max="min_threshold_max" show-input></el-slider>
            </div>
          </div>
          <!-- <div class="ui divider"></div> -->
          <div class="eight wide column">
            <h4 class="ui header">最大值</h4>
          </div>
          <div class="eight wide column">
            <div class="ui right aligned container">
              <span>单位：{{ tableData[0].unit }}</span>
            </div>
          </div>
          <div class="sixteen wide column">
            <div class="ui text segment" style="margin-top:-4%">
              <el-slider v-model="tableData[0].max_value" :min="max_threshold_min" :max="max_threshold_max" show-input></el-slider>
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
        <div class="ui right aligned segment" style=" overflow:auto; background:#f9fafb;">
          <div class="ui huge header" style="font-family: LCD;">26</div>
          
          <div class="ui grid">
            <div class="ui eight wide column">
              <div class="ui left aligned container">
                制冷
              </div>
            </div>
            <div class="ui eight wide column">
              ℃
            </div>
          </div>
        </div>

        <div class="ui divider"></div>
        <el-button class="fluid ui positive button" >模式</el-button>
        <el-button class="fluid ui icon primary basic  button" style="margin-top:2%"><i class="chevron up icon"></i></el-button>
        <el-button class="fluid ui icon negative basic button" style="margin-top:2%"><i class="chevron down icon"></i></el-button>
        
      </el-dialog>

      <!-- 嵌套在设备管理对话框中的灯遥控对话框 -->
      <el-dialog
        :visible.sync="controlLightVisible"
        width="30%"
        append-to-body
        >
        <!-- <span>这是一段信息</span> -->

        <div class="ui right aligned padded segment" style=" overflow:auto; background:#f9fafb;">
          <div class="ui grid">
            <div class="ui eight wide column">
              <div class="ui left aligned container">
                <div class="ui huge header" style="font-family: LCD;">{{tableData[2].data}}</div>
              </div>
            </div>
            <div class="ui eight wide column">
              <span style="font-size: 60%;">单位：{{tableData[2].unit}}</span>
            </div>
          </div>
        </div>
        <div class="ui divider"></div>

            <el-slider v-model="tableData[2].data" :min="tableData[2].min_value" :max="tableData[2].max_value"></el-slider>
          
      </el-dialog>
      
      
      <!-- 设备管理对话框的主体 -->
      <!-- <span>这是一段信息</span> -->

      <div class="ui grid">
        <div class="eight wide column">
          <h1 class="ui header">设备管理</h1>
        </div>
        <div class="eight wide column">
           <div class="ui right aligned container">
          
          <el-select
            v-model="input"
            clearable
            placeholder="设备类型"
            style="margin-right: 10px"
          >
            <el-option label="家居" value="0"></el-option>
            <el-option label="医疗" value="1"></el-option>
          </el-select>
          <button @click="reverseAdd" class="ui primary button">
            添加设备
          </button>
        </div>
        </div>
      </div>
      <div class="ui divider"></div>
      <div id="datatable">
        <el-table border :data="tableData" style="width: 100%; margin-top: 15px">
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
          <el-table-column label="设备名称" align="center" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="设备类型" align="center" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.type ? "家具" : "医疗" }}</span>
            </template>
          </el-table-column>
          <el-table-column label="设备状态" align="center" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.on ? "开" : "关" }}</span>
            </template>
          </el-table-column>


          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <button class="ui small positive basic button">开关</button>
              <button @click="judgmentType(scope.row.name)" class="ui small primary basic button">控制</button>
              <button class="ui small negative basic button">移除</button>
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
      
      <div class="ui centered grid" style="margin-top:3%;margin-bottom:1%;overflow:auto">
          <el-pagination
              background
              layout="prev, pager, next"
              :total="1000">
          </el-pagination>
      </div>
      
    </el-dialog>

    <el-dialog
      :visible.sync="deviceAddVisible"
      width="60%"
      >

      

      <!-- <span>这是一段信息</span> -->

      <div class="ui grid">
        <div class="eight wide column">
          <h1 class="ui header">设备添加</h1>
        </div>
        <div class="eight wide column">
           <div class="ui right aligned container">
          
          <el-select
            v-model="input"
            clearable
            placeholder="设备类型"
            style="margin-right: 10px"
          >
            <el-option label="家居" value="0"></el-option>
            <el-option label="医疗" value="1"></el-option>
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
        <el-table border :data="tableData" style="width: 100%; margin-top: 15px">
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
          <el-table-column label="设备名称" align="center" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="设备类型" align="center" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.type ? "家具" : "医疗" }}</span>
            </template>
          </el-table-column>
          <el-table-column label="设备状态" align="center" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.on ? "开" : "关" }}</span>
            </template>
          </el-table-column>


          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <button class="ui small positive basic button">添加</button>
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
      
      <div class="ui centered grid" style="margin-top:3%;margin-bottom:1%;overflow:auto">
          <el-pagination
              background
              layout="prev, pager, next"
              :total="1000">
          </el-pagination>
      </div>
      
    </el-dialog>

    

    

    <div class="ui container">
        <div class = "ui four stackable cards">
            <div v-for="t in test"  class="ui centered card" :key="t.index">
              <div class="content">
                <img class="right floated mini ui image" src="@/assets/images/kristy.png">
                <div class="header">
                  病人姓名
                </div>
                <div class="meta">
                  病人所处病房
                </div>
                <div class="description">
                  <div class="ui internally celled grid">
                    
                    <div class="eight wide column">心率</div>
                    <div class="eight wide column">血压</div>

                    <div class="three column row">
                      <div class="column">体温</div>
                      <div class="column">血氧</div>
                      <div class="column">呼吸值</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="extra content">
                <div class="ui two buttons">
                  <div class="ui basic green button">重点关注</div>
                  <div class="ui basic red button">移除病人</div>
                </div>
 
                <div class=" fluid ui basic blue button" style="margin-top:2%" @click="reverseInfo">设备管理</div>

              </div>
            </div>
        </div>
    </div>

    <!-- <div class="ui container segment" style="position:fixed;top:40%;left:0;right:0;margin:0 auto;">
        123
    </div> -->

    <!-- <div class="ui divider"></div> -->

    <div class="ui centered grid" style="margin-top:3%">
        <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
        </el-pagination>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import $ from "jquery";
import "@/assets/semantic-ui/semantic.min.js"
import "@/assets/semantic-ui/semantic.min.css"

export default {
  name: 'Dashboard',
  data() {
      return {
          test : [1, 2, 3, 4, 6, 7, 8, 9],
          deviceInfoVisible : false,
          deviceAddVisible : false,
          deviceThresholdVisible : false,
          controlAirConVisible : false,
          controlLightVisible : false,
          tableData : [{
            id: 1,            
            name : "体温计",
            type : 0,
            on : false,
            max_value : 123,
            min_value : 1,
            unit : "摄氏度",
          },
          {
            id: 1,            
            name : "空调",
            type : 1,
            on : false,
            max_value : 123,
            min_value : 1,
            unit : "摄氏度",
          },
          {
            id: 1,            
            name : "灯",
            type : 1,
            on : false,
            max_value : 123,
            min_value : 1,
            unit : "流明度",
            data : 5,
          }],
          input : "",
          min_threshold_min:0,
          min_threshold_max:0,
          max_threshold_min:0,
          max_threshold_max:0,
          }

          
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    reverseInfo(e) {
      this.deviceInfoVisible = !this.deviceInfoVisible
    },
    reverseAdd(e) {
      this.deviceInfoVisible = !this.deviceInfoVisible
      this.deviceAddVisible = !this.deviceAddVisible
    },
    activeThreshold() {
      this.deviceThresholdVisible = !this.deviceThresholdVisible
      // this.deviceInfoVisible = !this.deviceInfoVisible   
      this.max_value_backup = this.tableData[0].max_value
      this.min_value_backup = this.tableData[0].min_value
      this.min_threshold_min = this.tableData[0].min_value - 10
      this.min_threshold_max = this.tableData[0].min_value + 20
      this.max_threshold_min = this.tableData[0].max_value - 20
      this.max_threshold_max = this.tableData[0].max_value + 10
    },
    cancelThreshold() {
      // this.deviceInfoVisible = !this.deviceInfoVisible
      this.deviceThresholdVisible = !this.deviceThresholdVisible
      this.tableData[0].max_value = this.max_value_backup  
      this.tableData[0].min_value = this.min_value_backup 
    },
    confirmThreshold() {
      // this.deviceInfoVisible = !this.deviceInfoVisible
      this.deviceThresholdVisible = !this.deviceThresholdVisible
    },
    reverseLight() {
      // this.deviceInfoVisible = !this.deviceInfoVisible
      this.controlLightVisible = !this.controlLightVisible
    },
    reverseAirCon() {
      // this.deviceInfoVisible = !this.deviceInfoVisible
      this.controlAirConVisible = !this.controlAirConVisible
    },
    judgmentType(deviceName) {
      if (deviceName == '空调') {
        this.reverseAirCon()
      }
      else if (deviceName == '灯') {
        this.reverseLight()
      }
      else {
        this.activeThreshold()
      }
    }
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

<style scoped>
    /* @import "@/assets/css/semantic.min.css"; */
</style>

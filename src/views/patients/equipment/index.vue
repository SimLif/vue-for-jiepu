<template>
  <div class="dashboard-container">
    <!-- 空调遥控对话框 -->
    <el-dialog
    :visible.sync="controlAirConVisible"
    width="30%"
    
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

    <!-- 灯遥控对话框 -->
    <el-dialog
    :visible.sync="controlLightVisible"
    width="30%"
    
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

    <!-- 历史数据对话框 -->
    <el-dialog
    :visible.sync="controlHistoryVisible"
    width="60%"
    
    >
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
        <echartsline/>

        
    </el-dialog>

    <div class="ui  container">
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
                <button @click="reverseHistory" class="ui small orange basic button">历史数据</button>
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
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import echartsline from "@/components/EchartsComponents/Echartsline.vue";
import "@/assets/semantic-ui/semantic.min.js"
import "@/assets/semantic-ui/semantic.min.css"

export default {
  name: 'Dashboard',
  components: {
    echartsline,
  },
  data () {
    return {
        controlAirConVisible : false,
        controlLightVisible : false,
        controlHistoryVisible : false,
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
    }  
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    reverseLight() {
      // this.deviceInfoVisible = !this.deviceInfoVisible
      this.controlLightVisible = !this.controlLightVisible
    },
    reverseAirCon() {
      // this.deviceInfoVisible = !this.deviceInfoVisible
      this.controlAirConVisible = !this.controlAirConVisible
    },
    reverseHistory() {
      // this.deviceInfoVisible = !this.deviceInfoVisible
      this.controlHistoryVisible = !this.controlHistoryVisible
    },
    judgmentType(deviceName) {
      if (deviceName == '空调') {
        this.reverseAirCon()
      }
      else if (deviceName == '灯') {
        this.reverseLight()
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

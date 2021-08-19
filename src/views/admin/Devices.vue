<template>
  <div class="dashboard-container">
    <!-- 新增设备 -->
    <el-dialog
      :visible.sync="addDeviceVisible"
      width="45%"
      :before-close="closeAdd"
      >
      <div class="ui container">
          <h1 class="ui header">添加设备</h1>
      </div>
      <div class="ui divider"></div>
      <div class="ui aligned container segment">
            <!-- 设备类型 -->
            <el-select
                v-model="addDeviceClass"
                clearable
                placeholder="设备类型"
                style="margin-right: 4%; width:48%"
            >
                <el-option label="家具" value="0"></el-option>
                <el-option label="医疗" value="1"></el-option>
            </el-select>
            <!-- 家具设备种类 -->
            <el-select
                v-if="addDeviceClass=='0'"
                v-model="addDeviceType"
                clearable
                placeholder="设备种类"
                style="width:48%"
            >
                <el-option label="窗户" value="0"></el-option>
                <el-option label="窗帘" value="1"></el-option>
                <el-option label="床帘" value="2"></el-option>
                <el-option label="空调" value="3"></el-option>
                <el-option label="灯光" value="4"></el-option>
                <el-option label="温度计" value="5"></el-option>
                <el-option label="湿度计" value="6"></el-option>
                <el-option label="烟雾警报" value="7"></el-option>
            </el-select>
            <!-- 医疗设备种类 -->
            <el-select
                v-model="addDeviceType"
                v-else-if="addDeviceClass=='1'"
                clearable
                placeholder="设备名称"
                style="width:48%"
            >
                <el-option label="心电仪" value="0"></el-option>
                <el-option label="血压计" value="1"></el-option>
                <el-option label="体温计" value="2"></el-option>
                <el-option label="血氧计" value="3"></el-option>
                <el-option label="呼吸机" value="4"></el-option>
                <el-option label="病床" value="5"></el-option>

            </el-select>
            <!-- 未选择设备类型类型 -->
            <el-select
                v-model="addDeviceName"
                v-else
                clearable
                placeholder="请先选择设备类型"
                style="width:48%"
            >
                
            </el-select>
            <div class="ui divider"></div>
            <div class="ui grid">
                <div class="four wide column">
                    <div class="ui text container" style="margin-top:4%">设备名称：</div>
                </div>
                <div class="twelve wide column">
                    <div class="fluid ui input">
                        <input v-model="defaultDeviceName" type="text" placeholder="添加设备名称">
                    </div>
                </div>
            </div>
      </div>
      <div class="ui container">
          <div class="fluid ui buttons">
              <div v-show="completeAddDevice" class="ui basic teal button">增添设备</div>
              <div @click="closeAdd" class="ui basic red button">取消添加</div>
          </div>
      </div>


      

      <!-- <span>这是一段信息</span> -->

      
      
    </el-dialog>
    
    <div class="ui text container">
        <div class="ui grid">
            <div class="four wide column">
            <h1 class="ui header">设备管理</h1>
            </div>
            <div class="twelve wide column">
            <div class="ui right aligned container">
                <button @click="reverseAdd" class="ui primary  button">新增设备</button>
                
            
            </div>
            </div>
        </div>
        <div class="ui divider"></div>
        <div class="ui right aligned container segment">
            <el-select
                v-model="input"
                clearable
                placeholder="设备状态"
                style="margin-right: 10px"
            >
                <el-option label="家居" value="0"></el-option>
                <el-option label="医疗" value="1"></el-option>
            </el-select>
            <el-select
                v-model="input"
                clearable
                placeholder="设备类型"
                
            >
                <el-option label="空闲" value="0"></el-option>
                <el-option label="使用中" value="1"></el-option>
            </el-select>
        </div>
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
                <span>{{ scope.row.status ? "使用中" : "空闲" }}</span>
                </template>
            </el-table-column>


            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
 
                <button  class="ui small red basic button">设备报废</button>
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
        addDeviceVisible : false,
        ifFirstEditDeviceName : true,
        addDeviceClass : "",
        addDeviceType : "",
        addDeviceName : "",
        tableData : [{
            id: 1,            
            name : "体温计",
            type : 0,
            status : false,
            max_value : 123,
            min_value : 1,
            unit : "摄氏度",
          },
          {
            id: 1,            
            name : "空调",
            type : 1,
            status : false,
            max_value : 123,
            min_value : 1,
            unit : "摄氏度",
          },
          {
            id: 1,            
            name : "灯",
            type : 1,
            status : false,
            max_value : 123,
            min_value : 1,
            unit : "流明度",
            data : 5,
          }],
    }  
  },
  computed: {
    completeAddDevice() {
        return this.addDeviceClass && this.addDeviceType && this.addDeviceName
    },
    defaultDeviceName : {
        get() {
            if (this.ifFirstEditDeviceName && this.addDeviceType) {
                this.addDeviceName = "我的" + this.addDeviceType
                this.ifFirstEditDeviceName = false
            }
            return this.addDeviceName
        },
        set(deviceName) {
            this.addDeviceName = deviceName
            
        }
        
    }
  },
  methods: {
    reverseAdd() {
      // this.deviceInfoVisible = !this.deviceInfoVisible
      this.addDeviceVisible = !this.addDeviceVisible
    },
    closeAdd() {
      this.addDeviceClass=""
      this.addDeviceType=""
      this.addDeviceName=""
      this.addDeviceVisible = !this.addDeviceVisible
      this.ifFirstEditDeviceName = true
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

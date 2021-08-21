<template>
  <div class="app-container">
    <!-- 搜索栏 -->
    <div id="search" style= "margin-bottom:15px">
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
    <!-- 使用自定义组件3，以标签形式使用自定义组件 -->
    <echartsline :linedata="tlinedata"></echartsline>
    <echartsline :linedata="slinedata"></echartsline>
    <!-- <echartsline></echartsline> -->
    <!-- <echartsline></echartsline> -->
  </div>
</template>

<script>
//使用自定义组件1，引入
import echartsline from "../../components/EchartsComponents/Echartsline.vue";
import request from "../../utils/request.js";
export default {
  //使用自定义组件2，组件注册
  components: {
    echartsline,
  },
  data() {
    return {
      tlinedata: {
        title: "温度折线图",
        legend: "温度",
        xdata: [],
        ydata: [],
        color: "#ceefe4",
      },
      slinedata: {
        title: "湿度柱状图",
        legend: "湿度",
        xdata: [],
        ydata: [],
        color: "#d9d9f3",
      },
    
      //时间空间的参数（带快捷键）
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      searchtime:"",
    };
  },
  created() {
    this.fetchTempData();
  },
  watch:{
    searchtime:{
      handler:function(){
        this.fetchTempData();
      },
      deep:true
    }
  },
  methods: {
    fetchTempData() {
      this.tlinedata.xdata = [];
      this.tlinedata.ydata = [];
      request({
        url: "device/furnituredata",
        method: "get",
        params: {"start_time":this.searchtime[0],"end_time":this.searchtime[1]}
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
  },
};
</script>

<style scoped>
</style>


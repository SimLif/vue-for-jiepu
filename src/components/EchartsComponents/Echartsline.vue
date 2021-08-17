<template>
  <div>
    <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
    <div ref="main" style="width: 100%; height: 400px"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //指定图表配置项和数据
      option: {
        title: {
          text: this.linedata.title,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
          // grid: {
          //   left: "3%",
          //   right: "4%",
          //   bottom: "3%",
          //   containLabel: true,
          // },
        },
        legend: {
          data: [this.linedata.legend],
        },
        xAxis: {
          data: this.linedata.xdata,
          type: 'category',
          boundaryGap: false,
        },
        yAxis: {},
        series: [
          {
            name: this.linedata.legend,
            type: "line",
            data: this.linedata.ydata,
            areaStyle:{},
            itemStyle:{
              color:this.linedata.color
            }
          },
        ],
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
      },
    };
  },
  //当前组件参数定义
  props: ["linedata"],
  watch:{
    linedata:{
      handler:function(){
        this.option.xAxis.data=this.linedata.xdata
        this.option.series[0].data=this.linedata.ydata,
        console.log(this.linedata.xdata,"yyyy")
        console.log(this.option.xAxis.data,"xxxx")
        this.DrawLine();
      },
      deep:true
    }
  },
  //挂载完成，绘制图表
  mounted() {
    // console.log(this.linedata.xdata,"xxxx")
    this.DrawLine();
  },
  methods: {
    //绘制图表
    DrawLine: function () {
      //基于准备好的dom，初始化echarts实例
      //var myChart = echarts.init(document.getElementById('main'));
      var myChart = echarts.init(this.$refs.main);
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.option);
    },
  },
};
</script>

<style>
</style>

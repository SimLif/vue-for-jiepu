<template>
  <div>
    <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
    <div ref="main3" style="width: 100%; height:70px"></div>
  </div>
</template>

<script>
export default {
  data() {
    let data_temp = [["2000-06-05",116],["2000-06-06",129],["2000-06-07",135],["2000-06-08",86],["2000-06-09",73],["2000-06-10",85],["2000-06-11",73],["2000-06-12",68],["2000-06-13",92],["2000-06-14",130],["2000-06-15",245],["2000-06-16",139],["2000-06-17",115],["2000-06-18",111],["2000-06-19",309],["2000-06-20",206],["2000-06-21",137],["2000-06-22",128],["2000-06-23",85],["2000-06-24",94],["2000-06-25",71],["2000-06-26",106],["2000-06-27",84],["2000-06-28",93],["2000-06-29",85],["2000-06-30",73],["2000-07-01",83],["2000-07-02",125],["2000-07-03",107],["2000-07-04",82],["2000-07-05",44],["2000-07-06",72],["2000-07-07",106],["2000-07-08",107],["2000-07-09",66],["2000-07-10",91],["2000-07-11",92],["2000-07-12",113],["2000-07-13",107],["2000-07-14",131],["2000-07-15",111],["2000-07-16",64],["2000-07-17",69],["2000-07-18",88],["2000-07-19",77],["2000-07-20",83],["2000-07-21",111],["2000-07-22",57],["2000-07-23",55],["2000-07-24",60]];
    return {
      //指定图表配置项和数据
      option: {
            tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
            visualMap: [{
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 300
        }],
        xAxis: {
            type: 'category',
            data: data_temp.map(function (item) {
                return item[0];
            }),
            show:false
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: data_temp.map(function (item) {
                return item[1];
            }),
            type: 'line',
            showSymbol: false,
        }]
      },
    }
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
      var myChart = echarts.init(this.$refs.main3);
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.option);
    },
    
  },
};
</script>

<style>
</style>

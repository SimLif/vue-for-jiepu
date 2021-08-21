<template>
  <div>
    <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
    <div ref="main2" style="width: 100%; height:70px"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //指定图表配置项和数据
      option : {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    show:false,
                },
                yAxis: {
                    
                    type: 'value'
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    areaStyle: {
                            opacity: 0.8,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(224, 62, 76)'
                                
                            }, {
                                offset: 1,
                                color: 'rgba(255, 191, 0)'
                            }])
                        },
                    lineStyle: {
                            width: 0
                        },
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
        // console.log(this.linedata.ydata,"yyyy")
        // console.log(this.option.xAxis.data,"xxxx")
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
      var myChart = echarts.init(this.$refs.main2);
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.option);
    },
  },
};
</script>

<style>
</style>

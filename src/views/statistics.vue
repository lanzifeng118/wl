<template>
  <div class="statistics">
    <div id="chart" class="echarts"></div>
  </div>
</template>
 
 
<script>
import echarts from 'echarts'
export default {
  mounted() {
    console.log(document.getElementById('chart'))
    var myChart = echarts.init(document.getElementById('chart'))
    // 绘制图表
    myChart.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    })
  }
}
</script>
<style>
.statistics {
  padding: 25px;
}
.echarts {
  height: 300px;
  width: 500px
}
</style>
<template>
  <div class="statistics">
    <div id="chart" class="echarts"></div>
  </div>
</template>
 
 
<script>
import echarts from 'echarts'
// import 'echarts/lib/chart/bar'
// import 'echarts/lib/component/tooltip'
// import 'echarts/lib/component/title'
export default {
  mounted() {
    var myChart = echarts.init(document.getElementById('chart'))
    // 绘制图表
    // myChart.setOption({
    //   title: {
    //     text: 'ECharts 入门示例'
    //   },
    //   tooltip: {},
    //   xAxis: {
    //     data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    //   },
    //   yAxis: {},
    //   series: [
    //     {
    //       name: '销量',
    //       type: 'bar',
    //       data: [5, 20, 36, 10, 10, 20]
    //     }
    //   ]
    // })

    myChart.setOption({
      title: {
        text: '示例'
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          data: [
            { value: 235, name: '视频广告' },
            { value: 274, name: '联盟广告' },
            { value: 310, name: '邮件营销' },
            { value: 335, name: '直接访问' },
            { value: 400, name: '搜索引擎' }
          ]
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
  width: 500px;
}
</style>
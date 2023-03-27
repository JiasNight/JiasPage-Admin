<template>
  <div ref="mapChart" style="width: 90%; height: 800px">
  </div>
  <h1>首页</h1>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import china from '../../public/map/china.json';
let mapChart: HTMLElement | undefined = $ref<HTMLElement>();
const initMapChart = () => {
  echarts.registerMap('china', china as any);
  let myChart = echarts.init(mapChart as HTMLElement);
  let option = {
    geo: {
      map: 'china',
      roam: false,
      scaleLimit: {
        min: 1.2,
        max: 3
      },
      zoom: 1.2,
      //图形上的文本标签，可用于说明图形的一些数据信息
      label: {
        normal: {
          show: true,
          fontSize: '10',
          color: 'rgba(0,0,0,0.7)'
        }
      },
      //地图区域的多边形 图形样式，有 normal 和 emphasis 两个状态
      itemStyle: {
        //normal 是图形在默认状态下的样式；
        normal: {
          borderColor: 'rgba(0, 0, 0, 0.2)'
        },
        //emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
        emphasis: {
          areaColor: '#F3B329',
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 20,
          borderWidth: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    },
    series: [
      {
        name: '信息量',
        type: 'map',
        mapType: 'china',
        geoIndex: 0
        // data: dataList
      }
    ]
  };
  myChart.setOption(option);
};

onMounted(() => {
  initMapChart();
});
</script>

<style lang="scss" scoped>
.app-container {
}
</style>

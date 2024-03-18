<template>
  <div ref="mapChart" style="width: 100%; height: calc(100vh - 110px)"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { getJSON } from '@/api/app';

let mapChart: HTMLElement | undefined = $ref<HTMLElement>();

let chinaMap: any = null;

// 获取地图数据
const getMap = async () => {
  await getJSON('/map/china.json').then((res) => {
    chinaMap = res;
  });
};
const initMapChart = async () => {
  await getMap();
  echarts.registerMap('china', chinaMap as any);
  let myChart = echarts.getInstanceByDom(mapChart as HTMLElement);
  if (!myChart) {
    myChart = echarts.init(mapChart as HTMLElement);
  }
  let option = {
    geo: {
      map: 'china',
      roam: true,
      scaleLimit: {
        min: 1.2,
        max: 3
      },
      zoom: 1.2,
      // 图形上的文本标签，可用于说明图形的一些数据信息
      label: {
        show: true,
        fontSize: '10',
        color: 'rgba(0,0,0,0.7)'
      },
      // 地图区域的多边形 图形样式，有 normal 和 emphasis 两个状态
      itemStyle: {
        borderColor: 'rgba(0, 0, 0, 0.2)'
      },
      // emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
      emphasis: {
        itemStyle: {
          areaColor: '#F3B329',
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 20,
          borderWidth: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        },
        label: {}
      }
    },
    series: [
      {
        name: '信息量',
        type: 'map',
        map: 'china',
        geoIndex: 0
        // data: dataList
      }
    ]
  };
  myChart.clear();
  myChart.resize();
  myChart && myChart.setOption(option);
};

onMounted(() => {
  initMapChart();
  window.addEventListener('resize', () => {
    initMapChart();
  });
});
</script>

<style lang="scss" scoped>
.app-container {
}
</style>

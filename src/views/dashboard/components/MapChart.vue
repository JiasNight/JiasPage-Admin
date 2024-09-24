<template>
  <div class="map-container">
    <div class="flex justify-end">
      <q-btn-group rounded>
        <q-btn rounded glossy :icon="mdiMap" @click="handleChangeChart('map')" />
        <q-btn rounded glossy :icon="mdiEarth" @click="handleChangeChart('earth')" />
      </q-btn-group>
    </div>
    <div v-if="chartType === 'map'" ref="mapChart" class="chart"></div>
    <div v-if="chartType === 'earth'" ref="earthChart" class="chart"></div>
    <q-inner-loading :showing="chartLoading">
      <q-spinner-cube size="50px" color="primary" />
    </q-inner-loading>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import "echarts-gl";
import { getJSON } from "@/api/app";
import { mdiEarth, mdiMap } from "@quasar/extras/mdi-v6";

let chartType = $ref<string>("map");

let mapChart: HTMLElement | undefined = $ref<HTMLElement>();
let earthChart: HTMLElement | undefined = $ref<HTMLElement>();
let chartLoading = $ref<boolean>(false);

let chinaMap: any = null;
let earthMap: any = null;

// 获取地图数据
const getMapData = async () => {
  await getJSON("/map/china.json").then((res) => {
    chinaMap = res.data;
  });
};

// 获取地图数据
const getEarthData = async () => {
  await getJSON("/map/earth.json").then((res) => {
    earthMap = res.data;
  });
};
const initMapChart = async () => {
  chartLoading = true;
  await getMapData();
  echarts.registerMap("china", chinaMap as any);
  let myChart = echarts.getInstanceByDom(mapChart as HTMLElement);
  if (!myChart) {
    myChart = echarts.init(mapChart as HTMLElement);
  }
  let option = {
    tooltip: {
      show: true,
    },
    geo: {
      map: "china",
      roam: true,
      scaleLimit: {
        min: 1.2,
        max: 3,
      },
      zoom: 1.2,
      // 区域文本的样式
      label: {
        show: true,
        fontSize: 10,
        fontWeight: "bold",
        color: "#666",
      },
      // 地图区域的边样式，有 normal 和 emphasis 两个状态
      itemStyle: {
        areaColor: "#7cc7ff",
        borderColor: "#d9ffff",
        borderWidth: 1.5,
      },
      // emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
      emphasis: {
        itemStyle: {
          areaColor: "#FA8C16",
          borderWidth: 0,
        },
        label: {
          color: "#fff",
        },
      },
    },
    series: [
      {
        name: "effectScatter",
        type: "effectScatter",
        coordinateSystem: "geo",
        zlevel: 1,
        effectType: "ripple",
        symbol: "circle",
        rippleEffect: {
          period: 4,
          number: 3,
          brushType: "fill",
        },
        symbolSize: (value: Array<any>, params: any) => {
          return 20;
        },
        showEffectOn: "render",
        label: {
          show: true,
          position: "top",
          color: "#e74c3c",
          fontSize: 14,
          fontWeight: "bold",
          formatter: "{b}",
        },
        itemStyle: {
          color: "#e74c3c",
          shadowBlur: 10,
        },
        emphasis: {
          label: {
            show: true,
          },
        },
        tooltip: {
          formatter: "{a} <br/>{b} : {c}",
        },
        data: [{ name: "昆明", value: [102.712251, 25.040609, 20] }],
      },
      {
        name: "scatter",
        type: "scatter",
        coordinateSystem: "geo",
        zlevel: 1,
        symbol: "pin",
        symbolSize: (value: Array<any>, params: any) => {
          return 50;
        },
        label: {
          show: true,
          position: "top",
          color: "#9b59b6",
          fontSize: 14,
          fontWeight: "bold",
          formatter: "{b}",
        },
        itemStyle: {
          color: "#9b59b6",
        },
        tooltip: {
          formatter: "{a} <br/>{b} : {c}",
        },
        data: [
          { name: "北京", value: [116.405285, 39.904989, 30] },
          { name: "上海", value: [121.472644, 31.231706, 20] },
        ],
      },
      {
        name: "lines",
        type: "lines",
        coordinateSystem: "geo",
        zlevel: 1,
        effect: {
          show: true,
          // 箭头指向速度，值越小速度越快
          period: 6,
          // 特效尾迹长度[0,1]值越大，尾迹越长重
          trailLength: 0.02,
          // 箭头图标
          symbol: "arrow",
          // 图标大小
          symbolSize: 8,
        },
        tooltip: {
          formatter: "{a} <br/>{b} : {c}",
        },
        lineStyle: {
          // 尾迹线条宽度
          width: 2,
          color: "#e84118",
          // 尾迹线条透明度
          opacity: 1,
          // 尾迹线条曲直度
          curveness: 0.3,
        },
        data: [
          {
            coords: [
              [116.405285, 39.904989],
              [102.712251, 25.040609],
            ],
          },
          {
            coords: [
              [121.472644, 31.231706],
              [102.712251, 25.040609],
            ],
          },
        ],
      },
    ],
  };
  myChart.clear();
  myChart.resize();
  myChart && myChart.setOption(option);
  chartLoading = false;
};

const initEarthChart = async () => {
  chartLoading = true;
  await getEarthData();
  echarts.registerMap("earth", earthMap as any);
  let myChart = echarts.getInstanceByDom(earthChart as HTMLElement);
  if (!myChart) {
    myChart = echarts.init(earthChart as HTMLElement);
  }

  // 地球球面纹理
  let canvas = document.createElement("canvas");
  let baseTexture = echarts.init(canvas, null as any, {
    width: 4096,
    height: 2048,
  });
  let earthOption = {
    backgroundColor: "#031c48",
    geo: {
      type: "map",
      map: "earth",
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      boundingCoords: [
        [-180, 90],
        [180, -90],
      ],
      zoom: 0,
      label: {
        show: false,
      },
      itemStyle: {
        areaColor: "#174f87",
        color: "#fff",
        borderColor: "#ecf0f1",
        borderWidth: 1,
        opacity: 0.9,
      },
    },
  };
  baseTexture.setOption(earthOption);
  let option = {
    tooltip: {
      show: true,
    },
    globe: {
      baseTexture: baseTexture,
      silent: true,
      globeRadius: 60,
      globeOuterRadius: 100,
      shading: "lambert",
      // shading: 'color',
      environment: "#000",
      light: {
        ambient: {
          // 设置环境光
          intensity: 1,
        },
        main: {
          // 设置主光源
          intensity: 1.6,
          // 开启阴影
          shadow: true,
          alpha: 40,
          beta: -30,
        },
      },
      atmosphere: {
        show: true,
        offset: 4,
        color: "rgba(61,149,248,0.6)",
        glowPower: 5,
        innerGlowPower: 8,
      },
      viewControl: {
        distance: 150,
        // 起始坐标
        targetCoord: [103.79, 25.51],
        // 自动旋转
        autoRotate: false,
        // 开启球体自旋转
        // 设置地球的自转速度: 单位为 度/秒，默认值为10，也就是36秒转一圈！
        autoRotateSpeed: 5,
        // 缩放操作的灵敏度，值越大越灵敏。默认为`` 0为不缩放
        zoomSensitivity: 1,
        // 在鼠标停止操纵后，球体恢复自转的事件
        autoRotateAfterStill: 5,
        // 旋转操作的灵敏度，值越大越灵敏。支持使用数组分别设置横向和纵向的旋转灵敏度。
        rotateSensitivity: 10,
        // 平移操作的灵敏度，值越大越灵敏。支持使用数组分别设置横向和纵向的平移灵敏度 默认为`` 设置为0后无法平移
        panSensitivity: 10,
      },
      // 为画面添加高光，景深，环境光遮蔽（SSAO），调色等效果
      postEffect: {
        // 是否开启
        enable: false,
        // 环境光遮蔽
        SSAO: {
          // 环境光遮蔽的采样半径。半径越大效果越自然
          radius: 1,
          // 环境光遮蔽的强度
          intensity: 1,
          enable: true,
        },
      },
    },
    series: [
      {
        name: "scatter3D",
        type: "scatter3D",
        coordinateSystem: "globe",
        zlevel: 1,
        symbol: "circle",
        symbolSize: 15,
        silent: true,
        label: {
          show: true,
          position: "right",
          formatter: "{b}",
          textStyle: {
            fontSize: 16,
            color: "#f5d909",
            fontWeight: "bold",
          },
        },
        itemStyle: {
          color: "rgb(29,183,255)",
        },
        data: [
          {
            name: "北京",
            value: [116.46, 39.92],
          },
          {
            name: "上海",
            value: [121.48, 31.22],
          },
          {
            name: "昆明",
            value: [102.73, 25.04],
          },
        ],
      },
      // 柱状图
      // {
      //   name: 'bar3D',
      //   type: 'bar3D',
      //   coordinateSystem: 'globe',
      //   zlevel: 5,
      //   barSize: 2, //柱子粗细
      //   shading: 'color',
      //   opacity: 1,
      //   bevelSize: 0,
      //   minHeight: 10,
      //   itemStyle: {
      //     color: '#00d2d3',
      //     opacity: 1
      //   },
      //   label: {
      //     show: true,
      //     formatter: '{b}'
      //   },
      //   data: [
      //     {
      //       name: '北京',
      //       value: [116.46, 39.92]
      //     },
      //     {
      //       name: '昆明',
      //       value: [102.73, 25.04]
      //     }
      //   ]
      // },
      {
        name: "lines3D",
        type: "lines3D",
        coordinateSystem: "globe",
        zlevel: 2,
        // 飞线的尾迹特效。
        effect: {
          // 是否显示尾迹特效
          show: true,
          // 尾迹特效的周期
          period: 2,
          // 尾迹的宽度
          trailWidth: 3,
          // 尾迹的长度，范围从 0 到 1，为线条长度的百分比
          trailLength: 0.5,
          // 尾迹的不透明度，默认跟线条不透明度相同
          trailOpacity: 1,
          // 尾迹的颜色，默认跟线条颜色相同
          trailColor: "#0087f4",
        },
        blendMode: "lighter",
        // 图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件
        silent: true,
        // 飞线的线条样式
        lineStyle: {
          width: 1,
          color: "#0087f4",
          opacity: 0,
        },
        data: [
          {
            coords: [
              [116.46, 39.92],
              [102.73, 25.04],
            ],
            value: 100,
          },
          {
            coords: [
              [-155.589933, 19.901194],
              [116.46, 39.92],
            ],
            value: 1010,
          },
        ],
      },

      {
        type: "lines3D",
        coordinateSystem: "globe",
        zlevel: 2,
        effect: {
          show: true,
          trailWidth: 5,
          trailOpacity: 1,
          trailLength: 0.2,
          constantSpeed: 5,
        },
        blendMode: "lighter",
        lineStyle: {
          // 航线的视图效果
          color: "#EBE806",
          width: 1,
          opacity: 1,
        },
        data: [
          [
            [121.48, 31.22],
            [102.73, 25.04],
          ],
        ],
      },
    ],
  };
  myChart.on("click", (params) => {
    console.log(params);
  });
  myChart.clear();
  myChart.resize();
  myChart && myChart.setOption(option);
  chartLoading = false;
};

const handleChangeChart = (type: string) => {
  if (type === "map") {
    chartType = "map";
    initMapChart();
  } else {
    chartType = "earth";
    initEarthChart();
  }
};

onMounted(() => {
  if (chartType === "map") {
    initMapChart();
  } else {
    initEarthChart();
  }
  window.addEventListener("resize", () => {
    if (chartType === "map") {
      initMapChart();
    } else {
      initEarthChart();
    }
  });
});
</script>

<style lang="scss" scoped>
.map-container {
  .chart {
    width: 100%;
    height: calc(100vh - 80px);
    cursor: pointer;
  }
}
</style>

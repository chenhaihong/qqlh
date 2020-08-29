<template>
  <div>
    <div class="DataEarning container">
      <div class="box">
        <h1 class="title">营收数据</h1>
        <div class="content">
          <TEcharts
            id="barDataEarning"
            :option="optionEarning"
            :loading="loading"
            resize="true"
            style="width: 100%; height: 400px;"
          ></TEcharts>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { WELCOME_EARNING_TRAFFIC_FLOW } from "../../../api/index.js";
import isLeapYear from "@/helpers/isLeapYear";

export default {
  name: "DataEarning",
  data: () => ({
    loading: true,
    xAxis: [],

    earningLastMonth: [],
    earningThisMonth: []
  }),
  props: [],
  computed: {
    optionEarning() {
      let aName = "上月营收";
      let bName = "本月营收";
      let aData = this.earningLastMonth;
      let bData = this.earningThisMonth;

      return {
        title: {
          show: false
        },
        tooltip: {
          trigger: "axis",
          // backgroundColor: 'rgba(200,200,200,0.9)',
          axisPointer: {
            type: "shadow"
          }
        },
        toolbox: {
          showTitle: false,
          show: true,
          feature: {
            magicType: { type: ["line"] },
            restore: { show: true },
            dataView: { readOnly: false },
            saveAsImage: {}
          },
          left: "right",
          top: "bottom"
        },
        legend: {
          left: "center",
          bottom: "20px",
          data: [aName, bName]
        },
        grid: {
          show: false,
          top: "20px",
          left: "20px",
          right: "30px",
          bottom: "60px",
          containLabel: true,
          borderColor: "red"
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          axisLine: {
            lineStyle: {
              color: "#CCD6EB",
              width: 1
            }
          },
          axisTick: {
            interval: 0,
            inside: true,
            lineStyle: {
              color: "#CCD6EB"
            }
          },
          axisLabel: {
            textStyle: {
              color: "#727272"
            }
          },
          splitLine: {
            show: true,
            interval: 5,
            lineStyle: {
              color: "#FE9700",
              width: 1,
              type: "dashed"
            }
          },
          splitArea: {
            interval: 0,
            show: true,
            areaStyle: {
              color: ["rgba(255,255,255,0.3)", "rgba(200,200,200,0.3)"]
            }
          },
          data: this.xAxis,
          z: 2
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "rgba(0,0,0,0)",
              width: 2
            }
          },
          axisLabel: {
            //formatter: '{value} ' + (this.isEarning ? '元' : '辆'),
            textStyle: {
              color: "#727272"
            }
          },
          splitLine: {
            lineStyle: {
              color: "#eee",
              width: 1
            }
          }
        },
        series: [
          {
            name: aName,
            type: "bar",
            symbol: "circle",
            symbolSize: 6,
            showAllSymbol: true,
            data: aData
          },
          {
            name: bName,
            type: "bar",
            symbol: "diamond",
            symbolSize: 8,
            showAllSymbol: true,
            // barGap: '-100%',
            barCategoryGap: "40%",
            data: bData
          }
        ]
        // animation: false,
        // blendMode: 'lighter',
      };
    }
  },
  methods: {
    // 每天横轴
    getDayAxis() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let L = 31; // 1,3,5,7,8,10,12：每个月31天

      if (month == 2) {
        L = isLeapYear(year) ? 29 : 28;
      } else if ([4, 6, 9, 11].indexOf(month) !== -1) {
        // 4,6,9,11
        L = 30;
      }

      let arr = [];
      for (let i = 1; i <= L; i++) {
        arr.push(`${i}号`);
      }

      return arr;
    }
  },
  watch: {},
  created() {
    this.xAxis = this.getDayAxis();

    // WELCOME_EARNING_TRAFFIC_FLOW({
    //   success: response => {
    //     let data = response.data;

    //     this.earningLastMonth = data.earningLastMonth;
    //     this.earningThisMonth = data.earningThisMonth;

    //     this.loading = false;
    //   }
    // });
  }
};
</script>

<style lang="less" scoped>
</style>
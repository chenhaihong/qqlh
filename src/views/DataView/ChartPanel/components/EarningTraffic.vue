<template>
  <div style="height: 100%;">
    <div class="titleBox">
      <TTab
        v-model="dataType"
        :title="[
          { value: 0, name: '营收' },
          { value: 1, name: '车流' }
        ]"
      />
      <TSwitcher
        v-model="axisType"
        :data="[
          { value: 0, name: '月' },
          { value: 1, name: '年' }
        ]"
      />
    </div>
    <div class="contentBox">
      <TEcharts
        id="barEarningTraffic"
        :option="chartOption"
        :loading="loading"
        resize="true"
        style="height: 100%;"
      ></TEcharts>
    </div>
  </div>
</template>

<script>
import { getEarningTrafficData } from "@/api/dataView";

import isLeapYear from "@/helpers/isLeapYear";

import TTab from "@/views/DataView/components/TTab";
import TSwitcher from "@/views/DataView/components/TSwitcher";

export default {
  name: "EarningTraffic",
  data: () => ({
    loading: true,
    isEarning: true,

    dataType: 0, // 0 => 营收数据、1 => 车流数据
    axisType: 1, // 0=> 年粒度、1=> 月粒度

    xAxis: [],

    earningLastMonth: [],
    earningThisMonth: [],
    earningLastYear: [],
    earningThisYear: [],

    trafficFLowLastMonth: [],
    trafficFLowThisMonth: [],
    trafficFLowLastYear: [],
    trafficFLowThisYear: []
  }),
  components: { TTab, TSwitcher },
  computed: {
    chartOption() {
      // dataType 0 => 营收数据、1 => 车流数据
      // axisType 0 => 年粒度、1=> 月粒度
      const { dataType, axisType } = this;
      let [aName, bName, aData, bData] = ["", "", [], []];

      if (dataType == 0) {
        if (axisType == 0) {
          aName = "上月营收";
          bName = "本月营收";
          aData = this.earningLastMonth;
          bData = this.earningThisMonth;
        } else {
          aName = "去年营收";
          bName = "今年营收";
          aData = this.earningLastYear;
          bData = this.earningThisYear;
        }
      } else {
        if (axisType === 0) {
          aName = "上月车流";
          bName = "本月车流";
          aData = this.trafficFLowLastMonth;
          bData = this.trafficFLowThisMonth;
        } else {
          aName = "去年车流";
          bName = "今年车流";
          aData = this.trafficFLowLastYear;
          bData = this.trafficFLowThisYear;
        }
      }

      return {
        title: { show: false },
        tooltip: {
          trigger: "axis",
          // backgroundColor: 'rgba(200,200,200,0.9)',
          axisPointer: { type: "shadow" }
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
            barCategoryGap: "20%",
            data: bData
          }
        ]
        // animation: false,
        // blendMode: 'lighter',
      };
    }
  },
  methods: {
    // 月的横轴——每个月的天数不确定
    getMonthAxis() {
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
    },
    // 年的横轴——有12个月
    getYearAxis() {
      let arr = [];
      for (let i = 1; i <= 12; i++) {
        arr.push(`${i}月`);
      }
      return arr;
    }
  },
  watch: {
    axisType: {
      immediate: true,
      handler(next) {
        this.xAxis = next == 0 ? this.getMonthAxis() : this.getYearAxis();
      }
    }
  },
  async created() {
    // this.loading = false;
    const [err, data] = await getEarningTrafficData();
    if (!err) {
      this.earningLastMonth = data.earningLastMonth;
      this.earningThisMonth = data.earningThisMonth;
      this.earningLastYear = data.earningLastYear;
      this.earningThisYear = data.earningThisYear;
      this.trafficFLowLastMonth = data.trafficFLowLastMonth;
      this.trafficFLowThisMonth = data.trafficFLowThisMonth;
      this.trafficFLowLastYear = data.trafficFLowLastYear;
      this.trafficFLowThisYear = data.trafficFLowThisYear;
      this.loading = false;
    }
  }
};
</script>

<style lang="less" scoped></style>

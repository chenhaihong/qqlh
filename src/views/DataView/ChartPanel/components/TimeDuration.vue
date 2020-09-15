<template>
  <div style="height: 100%;">
    <div class="titleBox">
      <TTab
        v-model="dataType"
        :title="[
          { value: 0, name: '营收时分分析' },
          { value: 1, name: '车流时分分析' }
        ]"
      />
      <TSwitcher
        v-model="axisType"
        :data="[
          { value: 0, name: '日' },
          { value: 1, name: '月' }
        ]"
      />
    </div>
    <div class="contentBox">
      <TEcharts
        id="lineTimeDuration"
        :option="chartOption"
        :loading="loading"
        :resize="true"
        style="height: 100%;"
      ></TEcharts>
    </div>
  </div>
</template>

<script>
import { getTimeDurationAnalysisData } from "@/api/dataView";

import TTab from "@/views/DataView/components/TTab";
import TSwitcher from "@/views/DataView/components/TSwitcher";

export default {
  name: "TimeDuration",
  data: () => ({
    loading: true,
    dataType: 0, // dataType 0 => 营收时分分析、 1 => 车流时分分析
    axisType: 0, // axisType 0 => 日粒度、 1=> 月粒度
    xAxis: [],

    earningLastDay: [],
    earningThisDay: [],
    earningLastMonth: [],
    earningThisMonth: [],

    trafficFLowLastDay: [],
    trafficFLowThisDay: [],
    trafficFLowLastMonth: [],
    trafficFLowThisMonth: []
  }),
  props: [],
  components: { TTab, TSwitcher },
  computed: {
    chartOption() {
      // dataType 0 => 营收时分分析、 1 => 车流时分分析
      // axisType 0 => 日粒度、 1=> 月粒度
      const { dataType, axisType } = this;
      let [aName, bName, aData, bData] = ["", "", [], []];

      if (dataType == 0) {
        if (axisType == 0) {
          aName = "昨日营收（元）";
          bName = "今日营收（元）";
          aData = this.earningLastDay;
          bData = this.earningThisDay;
        } else {
          aName = "上月营收（元）";
          bName = "本月营收（元）";
          aData = this.earningLastMonth;
          bData = this.earningThisMonth;
        }
      } else {
        if (axisType == 0) {
          aName = "昨日车流（辆）";
          bName = "今日车流（辆）";
          aData = this.trafficFLowLastDay;
          bData = this.trafficFLowThisDay;
        } else {
          aName = "上月车流（辆）";
          bName = "本月车流（辆）";
          aData = this.trafficFLowLastMonth;
          bData = this.trafficFLowThisMonth;
        }
      }

      return {
        title: {
          show: false
        },
        tooltip: {
          trigger: "axis"
          // backgroundColor: 'rgba(200,200,200,0.9)',
        },
        toolbox: {
          showTitle: false,
          show: true,
          feature: {
            magicType: { type: ["bar"] },
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
          right: "70px",
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
            show: true
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
            show: true,
            lineStyle: {
              color: "#eee",
              width: 1
            }
          }
        },
        series: [
          {
            name: aName,
            type: "line",
            symbol: "circle",
            symbolSize: 6,
            showAllSymbol: true,
            smooth: true,
            data: aData,
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          },
          {
            name: bName,
            type: "line",
            symbol: "diamond",
            symbolSize: 8,
            showAllSymbol: true,
            smooth: true,
            data: bData
          }
        ]
        // animation: false,
        // blendMode: 'lighter',
      };
    }
  },
  methods: {
    // 时分分析横轴
    getHourAxis() {
      let arr = [];
      for (let i = 0; i < 24; i++) {
        arr.push(`${i}点-${i + 1}点`);
      }
      return arr;
    }
  },
  async created() {
    this.xAxis = this.getHourAxis();

    const [err, data] = await getTimeDurationAnalysisData();
    if (!err) {
      this.loading = false;

      this.earningLastDay = data.earningLastDay;
      this.earningThisDay = data.earningThisDay;
      this.earningLastMonth = data.earningLastMonth;
      this.earningThisMonth = data.earningThisMonth;

      this.trafficFLowLastDay = data.trafficFLowLastDay;
      this.trafficFLowThisDay = data.trafficFLowThisDay;
      this.trafficFLowLastMonth = data.trafficFLowLastMonth;
      this.trafficFLowThisMonth = data.trafficFLowThisMonth;
    }
  }
};
</script>

<style lang="less" scoped></style>

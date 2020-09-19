<template>
  <div>
    <div class="titleBox">
      <TTab :title="[{ value: 0, name: '区域分析' }]" />
      <TDropList v-model="type" :data="typeNames" />
    </div>
    <div class="contentBox">
      <TEcharts
        ref="techarts"
        v-if="!loadingGeoJSON"
        :option="chartOption"
        :loading="loading"
        :map="map"
        :mapName="mapName"
        :resize="true"
        style="height: 100%;"
      ></TEcharts>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { getDistrictAnalysisData } from "@/api/dataView";

import TTab from "@/views/DataView/components/TTab";
import TDropList from "@/views/DataView/components/TDropList";

export default {
  name: "DistrictAnalysis",
  data: () => ({
    loadingGeoJSON: true,
    loading: true,
    map: null,
    mapName: null,

    // 下拉列表
    type: 0,
    typeNames: [
      { value: 0, name: "车流量" },
      { value: 1, name: "出发地流量" },
      { value: 2, name: "目的地流量" }
    ],

    busAll: [],
    busStart: [],
    busEnd: [],

    truckAll: [],
    truckStart: [],
    truckEnd: []
  }),
  props: ["isRebateAddComponent"],
  components: { TTab, TDropList },
  computed: {
    ...mapState("leftMenu", ["show", "fixed"]),
    chartOption() {
      let bus = [];
      let truck = [];

      switch (this.type) {
        case 0:
          bus = this.busAll;
          truck = this.truckAll;
          break;
        case 1:
          bus = this.busStart;
          truck = this.truckStart;
          break;
        case 2:
          bus = this.busEnd;
          truck = this.truckEnd;
          break;
        default:
        // no default
      }

      return {
        legend: {
          left: "center",
          top: "20px",
          data: ["货车", "客车"]
        },
        tooltip: {
          trigger: "item"
          // formatter: '{a0}，{b0}，{c0}<br />{a1}，{b1}，{c1}',
          // formatter: function(params) {
          //     let html = '_NAME_<br/> 全部：_VALUE_';
          //     return html.replace('_NAME_', params.name)
          //         .replace('_VALUE_', params.value);
          // }
        },
        toolbox: {
          showTitle: false,
          feature: {
            dataView: { readOnly: false },
            saveAsImage: {}
          },
          left: "right",
          top: "bottom"
        },
        visualMap: {
          min: 0,
          max: 100000,
          range: [0, 100000],
          text: ["高", "低"],
          realtime: true,
          calculable: true,
          inRange: {
            color: ["#E3F2F7", "#43A9F1"]
            // symbolSize: [30, 100],
          },
          orient: "horizontal"
        },
        series: [
          {
            name: "货车",
            type: "map",
            mapType: "广东",
            roam: true,
            label: {
              normal: { show: true },
              emphasis: { show: true }
            },
            itemStyle: {
              normal: {
                borderWidth: 1,
                borderColor: "#DDD"
              }
            },
            data: truck
          },
          {
            name: "客车",
            type: "map",
            mapType: "广东",
            roam: true,
            label: {
              normal: { show: true },
              emphasis: { show: true }
            },
            itemStyle: {
              normal: {
                borderWidth: 1,
                borderColor: "#DDD"
              }
            },
            data: bus
          }
        ],
        textStyle: {
          color: "#ff0000",
          textShadow: "0px 0px 5px #ffffff"
        }
      };
    }
  },
  methods: {},
  watch: {
    show() {
      this.$refs.techarts.resizeHandler();
    },
    fixed() {
      this.$refs.techarts.resizeHandler();
    }
  },
  async created() {
    import("@/config/gdGeo.json")
      .then(data => {
        this.loadingGeoJSON = false;
        this.map = Object.freeze(data.default);
        this.mapName = "广东";
      })
      .catch(() => {});

    const [err, data] = await getDistrictAnalysisData();
    if (!err) {
      this.loading = false;
      this.truckAll = data.truckAll;
      this.truckStart = data.truckStart;
      this.truckEnd = data.truckEnd;

      this.busAll = data.busAll;
      this.busStart = data.busStart;
      this.busEnd = data.busEnd;
    }
  }
};
</script>
<style lang="less" scoped>
// .contentBox {
//   // @deep: ~">>>";
//   margin: -10px;

//   // @{deep} #mapDistrictAnalysis {
//   //   margin: 0 -10px;
//   // }
// }
</style>

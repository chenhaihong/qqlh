<template>
  <div class="ChartPanel">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="panelTop">
          <earning-traffic></earning-traffic>
        </div>
        <div class="panelBottom">
          <time-duration></time-duration>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="panel">
          <district-analysis></district-analysis>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="panelTop">
          <station-analysis></station-analysis>
        </div>
        <div class="panelBottom">
          <vehicle-typeNews></vehicle-typeNews>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "ChartPanel",
  data: () => ({
    district: {},
    station: {
      isDay: true
    },
    vehicleAndNews: {
      isVehicle: true
    }
  }),
  props: [],
  components: {
    EarningTraffic: () => import("./components/EarningTraffic.vue"),
    TimeDuration: () => import("./components/TimeDuration.vue"),

    DistrictAnalysis: () => import("./components/DistrictAnalysis.vue"),

    StationAnalysis: () => import("./components/StationAnalysis.vue"),
    VehicleTypeNews: () => import("./components/VehicleTypeNews.vue")
  },
  computed: {},
  watch: {},
  methods: {},
  beforeCreate() {},
  created() {}
};
</script>
<style lang="less" scoped>
.ChartPanel {
  @titleBox-height: 50px;
  @deep: ~">>>";

  @{deep} .el-row {
    height: 100%;

    & > .el-col {
      display: flex;
      height: 100%;
      flex-flow: column nowrap;

      .panel {
        position: relative;
        height: 100%;
        background: #ffffff;
      }

      .panelTop,
      .panelBottom {
        position: relative;
        display: inline-flex;
        flex-flow: column nowrap;
        height: 50%;
        background: #ffffff;
      }

      .titleBox {
        position: relative;
        z-index: 100;
        height: @titleBox-height - 2;
        border-top: 1px solid #e9e8e8;
        border-bottom: 1px solid #e9e8e8;
        flex-shrink: 0;

        .tab-type1 {
          float: left;
          margin: 10px 0;
        }
        .switcher {
          float: right;
          margin: 15px 0;
        }
        .droplist {
          float: right;
          margin-top: 15px;
          margin-right: 30px;
        }
      }

      .contentBox {
        @g: 10px;
        position: absolute;
        top: @titleBox-height + @g;
        bottom: @g;
        left: @g;
        right: @g;

        //position: relative;
        //height: auto;
        //padding: 10px;
        //box-sizing: border-box;
      }
    }
  }
}
</style>

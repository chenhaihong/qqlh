<template>
  <div>
    <div class="titleBox">
      <TTab
        v-model="isVehicle"
        :title="[
          { value: 0, name: '车型分析' },
          { value: 1, name: '行业资讯' }
        ]"
      />
    </div>
    <div v-show="isVehicle" class="contentBox">
      <TEcharts
        id="barVehicleTypeNews"
        :option="option"
        resize="true"
        :loading="loading"
        style="height: 100%;"
      ></TEcharts>
    </div>
    <div v-show="!isVehicle" class="contentBox">
      <el-row>
        <el-col :span="24">
          <ul class="news">
            <li>
              <i class="iconfont icon-news"></i>
              <span>内蒙古：包头今年将实施22个公路重点项目</span>
            </li>
            <li>
              <i class="iconfont icon-news"></i>
              <span>交通运输部：全国民用运输机场布局规划出炉</span>
            </li>
            <li>
              <i class="iconfont icon-news"></i>
              <span>江苏：县道公路网新一轮线路命名与编号正式发布</span>
            </li>
            <li>
              <i class="iconfont icon-news"></i>
              <span>新疆：车师古道拟建129公里一级公路（图）</span>
            </li>

            <li>
              <i class="iconfont icon-news"></i>
              <span>黑龙江：打造农村公路“升级版” 确定“八个100%”目标</span>
            </li>
            <li>
              <i class="iconfont icon-news"></i>
              <span>贵州：遵义湄潭至铜仁石阡高速今年内开建</span>
            </li>
            <li>
              <i class="iconfont icon-news"></i>
              <span>北京：本周末迎首个清明祭扫高峰 祭扫点增至215处</span>
            </li>
            <li>
              <i class="iconfont icon-news"></i>
              <span>甘肃：2017-3-22高速公路最新路况</span>
            </li>

            <li>
              <i class="iconfont icon-news"></i>
              <span>昆明：南收费站预计4月完成主体工程</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import TTab from "@/views/DataView/components/TTab";
export default {
  name: "VehicleTypeNews",
  data: () => ({
    loading: true,
    isVehicle: 1,
    truck: [-10, -10, -5, -10, -20],
    bus: [10, 10, 10, 15]
  }),
  props: [],
  components: { TTab },
  computed: {
    option() {
      let truck = this.truck;
      let bus = this.bus;

      return {
        title: {
          text: "货车、客车比例",
          // subtext: '客车、货车比例',
          textStyle: {
            color: "#aaa",
            fontWeight: "normal",
            fontSize: 15
          },
          left: "center"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        toolbox: {
          showTitle: false,
          show: true,
          feature: {
            dataView: { readOnly: false },
            saveAsImage: {}
          },
          left: "right",
          top: "bottom"
        },
        legend: {
          // show: false,
          bottom: "20px",
          data: ["货车", "客车"]
        },
        grid: {
          top: "40px",
          left: "20px",
          right: "30px",
          bottom: "60px",
          containLabel: true
        },
        xAxis: [
          {
            type: "value",
            axisLabel: {
              textStyle: {
                color: "#727272"
              },
              formatter: function(v) {
                return (v > 0 ? v : -v) + "%";
              }
            },
            axisLine: {
              lineStyle: {
                color: "#CCD6EB",
                width: 1
              }
            }
          }
        ],
        yAxis: [
          {
            show: true,
            type: "category",
            boundaryGap: true,
            axisLine: {
              lineStyle: {
                color: "#CCD6EB",
                width: 1
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: "#727272"
              }
            },
            splitArea: {
              interval: 0,
              show: true,
              areaStyle: {
                color: ["rgba(255,255,255,0.3)", "rgba(200,200,200,0.3)"]
              }
            },
            data: ["一型车", "二型车", "三型车", "四型车", "五型车"]
          }
        ],
        series: [
          {
            name: "货车",
            type: "bar",
            stack: "车型",
            label: {
              normal: {
                show: true,
                formatter: function(param) {
                  return -param.value + "%";
                }
              }
            },
            barCategoryGap: "40%",
            data: truck
          },
          {
            name: "客车",
            type: "bar",
            stack: "车型",
            label: {
              normal: {
                show: true,
                formatter: function(param) {
                  return param.value + "%";
                }
              }
            },
            data: bus
          }
        ]
      };
    }
  },
  methods: {},
  watch: {},
  created() {
    this.loading = false;
  }
};
</script>

<style lang="less" scoped>
.ChartPanel .contentBox .news {
  padding: 10px;

  li {
    margin-bottom: 6px;
    height: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    span {
      font-size: 14px;
    }

    .iconfont {
      margin-right: 10px;
    }
  }
}
</style>

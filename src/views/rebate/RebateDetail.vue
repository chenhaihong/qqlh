<template>
  <div>
    <div class="RebateDetail">
      <div class="rebate">
        <h1 class="title">折扣条件</h1>
        <div class="discount">
          <span>行程记录在满足下面的一个条件后，进行打</span>
          <el-input-number
            v-model="discount"
            :step="0.5"
            :min="1"
            :max="10"
            size="small"
          ></el-input-number>
          <span>折</span>
        </div>

        <el-row class="rules">
          <el-col :span="isShowMap ? 14 : 24">
            <div class="rule">
              <el-radio class="radio" v-model="radio" label="1"
                >规则1：</el-radio
              >
              <span>在本公路上消费满</span>
              <el-input
                v-model="money"
                size="small"
                placeholder="请输入金额"
                style="width: 100px;"
              ></el-input>
              <span>元，可以享受优惠。</span>
            </div>
            <div class="rule">
              <el-radio class="radio" v-model="radio" label="2"
                >规则2：</el-radio
              >
              <span>选择本优惠生效路段，起始路段为：</span>
              <el-select
                v-model="startRoad"
                placeholder="请选择"
                style="width: 160px;"
              >
                <el-option
                  v-for="item in startRoads"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span>，结果路段为：</span>
              <el-select
                v-model="endRoad"
                placeholder="请选择"
                style="width: 160px;"
              >
                <el-option
                  v-for="item in endRoads"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div class="rule">
              <el-radio class="radio" v-model="radio" label="3"
                >规则3：</el-radio
              >
              <span>选择本优惠生效时间，起始时间为：</span>
              <el-date-picker
                v-model="date1"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions0"
                style="width: 160px;"
              ></el-date-picker>
              <span>，结果时间为：</span>
              <el-date-picker
                v-model="date2"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions0"
                style="width: 160px;"
              ></el-date-picker>
            </div>
            <div class="rule">
              <el-radio class="radio" v-model="radio" label="4"
                >规则4：</el-radio
              >
              <span>选择本优惠生效车型：</span>
              <el-select
                v-model="vehicle.value"
                placeholder="请选择车型"
                style="width: 160px;"
              >
                <el-option-group
                  v-for="group in vehicle.groups"
                  :label="group.label"
                  :key="group.label"
                >
                  <el-option
                    v-for="item in group.options"
                    :label="item.label"
                    :value="item.value"
                    :key="item.value"
                  ></el-option>
                </el-option-group>
              </el-select>
            </div>
            <div class="rule">
              <el-radio class="radio" v-model="radio" label="5"
                >规则5：</el-radio
              >
              <span>当全程出发地为：（可多选）</span>
              <el-select
                v-model="cityStart.selected"
                multiple
                filterable
                allow-create
                placeholder="城市"
                style="width: 500px;"
              >
                <el-option
                  v-for="item in cityStart.list"
                  :label="item.label"
                  :value="item.value"
                  :key="item.value"
                ></el-option>
              </el-select>
              <transition name="fade">
                <span
                  v-if="cityStart.selected.length"
                  @click="cityStart.selected = []"
                  style="margin-left: 5px; cursor: pointer;"
                  >清空</span
                >
              </transition>
            </div>
            <div class="rule">
              <el-radio class="radio" v-model="radio" label="6"
                >规则6：</el-radio
              >
              <span>当全程目的地为：（可多选）</span>
              <el-select
                v-model="cityEnd.selected"
                multiple
                filterable
                allow-create
                placeholder="城市"
                style="width: 500px;"
              >
                <el-option
                  v-for="item in cityEnd.list"
                  :label="item.label"
                  :value="item.value"
                  :key="item.value"
                ></el-option>
              </el-select>
              <transition name="fade">
                <span
                  v-if="cityEnd.selected.length"
                  @click="cityEnd.selected = []"
                  style="margin-left: 5px; cursor: pointer;"
                  >清空</span
                >
              </transition>
            </div>
          </el-col>
          <transition name="fade">
            <el-col v-if="isShowMap" :span="10" class="mapBox">
              <div class="map">
                <TEcharts
                  id="mapRebateDetail"
                  :option="chartOption"
                  :loading="loading"
                  :map="map"
                  :mapName="mapName"
                  :resize="true"
                  :events="mapEvents"
                  style="height: 100%"
                ></TEcharts>
              </div>
            </el-col>
          </transition>
        </el-row>
        <el-row class="buttons">
          <el-col :span="14" style="text-align: center">
            <el-button :plain="true" type="info">取消</el-button>
            <el-button type="primary" @click="handleSaveOne">保存</el-button>
          </el-col>
          <el-col :span="10" style="text-align: right">
            <el-button type="danger">删除</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
// import { WELCOME_GD_DISTRICT_ANALYSIS } from "../../../api/index.js";
// let gdGeoJson = require("./gdGeo.json");

export default {
  name: "RebateDetail",
  data: () => ({
    radio: "1",

    discount: 8.5,
    money: "",
    startRoad: "",
    startRoads: [],
    endRoad: "",
    endRoads: [],

    date1: "",
    date2: "",
    pickerOptions0: {
      disabledDate(time) {
        return time.getTime() < Date.now() - 8.64e7;
      }
    },

    vehicle: {
      value: "",
      groups: [
        {
          label: "客车",
          options: [
            { value: "1.1", label: "客车 一型车" },
            { value: "1.2", label: "客车 二型车" },
            { value: "1.3", label: "客车 三型车" },
            { value: "1.4", label: "客车 四型车" }
          ]
        },
        {
          label: "货车",
          options: [
            { value: "2.1", label: "货车 一型车" },
            { value: "2.2", label: "货车 二型车" },
            { value: "2.3", label: "货车 三型车" },
            { value: "2.4", label: "货车 四型车" },
            { value: "2.5", label: "货车 五型车" }
          ]
        }
      ]
    },

    cityStart: {
      list: [],
      selected: []
    },

    cityEnd: {
      list: [],
      selected: []
    },

    loading: true,

    map: null, // gdGeoJson,
    mapName: "广东",
    mapEvents: {},

    busAll: [],
    busStart: [],
    busEnd: [],

    truckAll: [],
    truckStart: [],
    truckEnd: []
  }),
  computed: {
    cityList() {
      return [
        { value: "qingyuan", label: "清远市" },
        { value: "shaoguan", label: "韶关市" },
        { value: "zhanjiang", label: "湛江市" },
        { value: "meizhou", label: "梅州市" },
        { value: "heyuan", label: "河源市" },

        { value: "zhaoping", label: "肇庆市" },
        { value: "huizhou", label: "惠州市" },
        { value: "maoming", label: "茂名市" },
        { value: "jiangmen", label: "江门市" },
        { value: "yangjiang", label: "阳江市" },

        { value: "yunfu", label: "云浮市" },
        { value: "guangzhou", label: "广州市" },
        { value: "shanwei", label: "汕尾市" },
        { value: "jieyang", label: "揭阳市" },
        { value: "zhuhai", label: "珠海市" },

        { value: "foshan", label: "佛山市" },
        { value: "chaozhou", label: "潮州市" },
        { value: "shantou", label: "汕头市" },
        { value: "shenzhen", label: "深圳市" },
        { value: "dongguan", label: "东莞市" },

        { value: "zhongshan", label: "中山市" }
      ];
    },
    mapTitle() {
      return {
        "5": "请选择全程出发地",
        "6": "请选择全程目的地"
      }[this.radio];
    },
    mapSubTitle() {
      return {
        "5": "点击城市块即可在规则5中添加出发地",
        "6": "点击城市块即可在规则6中添加目的地"
      }[this.radio];
    },
    isShowMap() {
      return this.radio == "5" || this.radio == "6";
    },
    chartOption() {
      let bus = [];
      let truck = [];

      bus = this.busAll;
      truck = this.truckAll;

      return {
        title: {
          text: this.mapTitle,
          subtext: this.mapSubTitle,
          backgroundColor: "rgba(255, 255, 255, 0.4)"
        },
        legend: {
          show: false
        },
        tooltip: {
          trigger: "item"
        },
        visualMap: [
          {
            min: 0,
            max: 100000,
            range: [0, 100000],
            text: ["高", "低"],
            realtime: true,
            calculable: true,
            inRange: {
              color: ["#E3F2F7", "#43A9F1"]
            },
            left: 10,
            bottom: 10
          }
        ],
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
  methods: {
    pushCityValue(cityName) {
      let value = this.getCityValue(cityName);
      if (this.radio == "5") {
        if (this.canPushValue(value)) {
          this.cityStart.selected.push(value);
        } else {
          this.$message(`已添加 ${cityName}`);
        }
      } else if (this.radio == "6") {
        if (this.canPushValue(value)) {
          this.cityEnd.selected.push(value);
        } else {
          this.$message(`已添加 ${cityName}`);
        }
      }
    },
    getCityValue(cityName) {
      let value = "";
      let cityList = this.cityList;
      for (let i = 0, l = cityList.length; i < l; i++) {
        let city = cityList[i];
        if (city.label == cityName) {
          value = city.value;
          break;
        }
      }
      return value;
    },
    canPushValue(value) {
      let selected = [];
      if (this.radio == "5") {
        selected = this.cityStart.selected;
      } else if (this.radio == "6") {
        selected = this.cityEnd.selected;
      }

      let can = true;
      for (let i = 0, l = selected.length; i < l; i++) {
        if (selected[i] == value) {
          can = false;
          break;
        }
      }

      return can;
    },
    handleSaveOne() {
      this.$confirm(`确认保存吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            setTimeout(() => {
              done();
              this.$router.push("/rebate/list");
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 3000);
          } else {
            done();
          }
        }
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "执行成功!"
          });
        })
        .catch(() => {});
    }
  },
  watch: {},
  created() {
    this.loading = false;

    let cityList = this.cityList;
    this.cityStart.list = cityList;
    this.cityEnd.list = cityList;

    this.mapEvents = {
      click: params => {
        let name = params.name; // city name
        this.pushCityValue(name);
      }
    };

    import("@/config/gdGeo.json")
      .then(data => {
        this.map = Object.freeze(data.default);
      })
      .catch(() => {});

    // WELCOME_GD_DISTRICT_ANALYSIS({
    //   success: response => {
    //     let data = response.data;

    //     this.truckAll = data.truckAll;
    //     this.busAll = data.busAll;
    //   }
    // });
  }
};
</script>

<style lang="less" scoped>
.RebateDetail {
  padding: 20px;

  h1 {
    font-size: 16px;
  }
}

.RebateDetail {
  font-size: 14px;

  .rebate {
    background: #ffffff;
  }

  .title {
    padding: 20px;
    font-size: 16px;
    border-bottom: 1px solid #eeeeee;
  }

  .discount {
    padding: 20px;
    border-bottom: 1px solid #eeeeee;

    .el-input-number {
      vertical-align: middle;
    }
  }

  .rules {
    border-bottom: 1px solid #eeeeee;

    .rule {
      padding: 20px;
      border-bottom: 1px solid #eeeeee;

      &:last-child {
        border-bottom: none;
      }
    }

    .mapBox {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      display: flex;
      height: 100%;
      flex-flow: row nowrap;
      align-items: center;
      border-left: 1px solid #eeeeee;
      overflow: hidden auto;

      .map {
        width: 100%;
        height: 100%;
      }
    }
  }

  .buttons {
    padding: 20px;
  }

  .operation {
    padding: 20px;
    background: #ffffff;
  }
}
</style>

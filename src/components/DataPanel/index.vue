<template>
  <div class="DataPanel">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="panel trafficFlowDay">
          <div class="img"></div>
          <div class="numberBox">
            <p class="number">{{ tfd }}</p>
            <p class="name">{{ trafficFlowDay.name }}</p>
          </div>
        </div>
      </el-col>

      <el-col :span="6">
        <div class="panel trafficFlowMonth">
          <div class="img"></div>
          <div class="numberBox">
            <p class="number">{{ tfm }}</p>
            <p class="name">{{ trafficFlowMonth.name }}</p>
          </div>
        </div>
      </el-col>

      <el-col :span="6">
        <div class="panel earning">
          <div class="img"></div>
          <div class="numberBox">
            <p class="number">{{ ern }}</p>
            <p class="name">{{ earning.name }}</p>
          </div>
        </div>
      </el-col>

      <el-col :span="6">
        <div class="panel audit">
          <div class="img"></div>
          <div class="numberBox">
            <p class="number">{{ adt }}</p>
            <p class="name">{{ audit.name }}</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// import { WELCOME_DATA_PANEL } from "../../../api/index.js";

// import { Row, Col } from "element-ui";

export default {
  name: "DataPanel",
  data: () => ({
    trafficFlowDay: { number: 3000, name: "今日车流" },
    trafficFlowMonth: { number: 5000, name: "本月车流" },
    earning: { number: 2000, name: "今日增收" },
    audit: { number: 1000, name: "待审核" }
  }),
  props: [],
  computed: {
    tfd() {
      return this.format(this.trafficFlowDay.number);
    },
    tfm() {
      return this.format(this.trafficFlowMonth.number);
    },
    ern() {
      return this.format(this.earning.number);
    },
    adt() {
      return this.format(this.audit.number);
    }
  },
  watch: {},
  methods: {
    format(num) {
      if (num > 999) {
        let a = (num + "").split("");
        let b = [];

        for (let i = 0, l = a.length; i < l; i = i + 3) {
          if (a.length >= 3) {
            let c = a.pop() + "";
            c = a.pop() + c;
            c = a.pop() + c;
            b.unshift(c);
          }
        }

        if (a.length > 0) {
          let c = a.join("");
          b.unshift(c);
        }

        return b.join(",");
      } else {
        return num;
      }
    }
  },
  beforeCreate() {},
  created() {
    // WELCOME_DATA_PANEL({
    //   success: response => {
    //     this.trafficFlowDay.number = response.data.trafficFlowDay;
    //     this.trafficFlowMonth.number = response.data.trafficFlowMonth;
    //     this.earning.number = response.data.earning;
    //     this.audit.number = response.data.audit;
    //   },
    //   fail: error => {}
    // });
  }
};
</script>
<style lang="less" scoped>
.DataPanel {
  .panel {
    display: flex;
    flex-flow: row nowrap;
    height: 100px;
    background-color: #d3dce6;

    .img {
      flex-shrink: 0;
      width: 100px;
      height: 100px;
    }

    .numberBox {
      display: inline-flex;
      flex-flow: column nowrap;
      justify-content: center;
      width: 100%;
      height: 100px;
      text-align: center;
      color: white;

      .number {
        margin: 0 auto;
        height: 50px;
        line-height: 50px;
        font-size: 45px;
        font-weight: bold;
        transition: font-size ease-in 0.2s;
      }
      .name {
        margin: 0 auto;
        height: 30px;
        line-height: 30px;
        font-size: 16px;
      }
    }

    &.trafficFlowDay {
      background: url(/assets/welcome/image/car-bg.png) no-repeat 0 0 fixed;
      background-size: 100%;

      .img {
        background: url(/assets/welcome/image/car.png) no-repeat center center;
      }
    }

    &.trafficFlowMonth {
      background: url(/assets/welcome/image/wheel-bg.png) no-repeat 0 0 fixed;
      background-size: 100%;

      .img {
        background: url(/assets/welcome/image/wheel.png) no-repeat center center;
      }
    }

    &.earning {
      background: url(/assets/welcome/image/money-bg.png) no-repeat 0 0 fixed;
      background-size: 100%;

      .img {
        background: url(/assets/welcome/image/money.png) no-repeat center center;
      }
    }

    &.audit {
      background: url(/assets/welcome/image/book-bg.png) no-repeat 0 0 fixed;
      background-size: 100%;

      .img {
        background: url(/assets/welcome/image/book.png) no-repeat center center;
      }
    }
  }
}

//@media (min-width: 768px) and (max-width: 1260px) {
@media (max-width: 1260px) {
  .DataPanel .panel .numberBox .number {
    font-size: 30px;
  }
}
</style>

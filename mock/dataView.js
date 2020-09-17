/* eslint-disable */

const Mock = require("mockjs");

const n = 1000; // 收费站每小时过1000辆车
const f = 10; // 每辆车收费10元

const WELCOME_HOUR_TRAFFIC_FLOW = n;
const WELCOME_DAY_TRAFFIC_FLOW = n * 24;
const WELCOME_MONTH_TRAFFIC_FLOW = n * 24 * 30;

const WELCOME_HOUR_EARNING = n * f;
const WELCOME_DAY_EARNING = n * f * 24;
const WELCOME_MONTH_EARNING = n * f * 24 * 30;

let date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let hour = date.getHours() + 1;

module.exports = {
  "GET /dataView/dataPanel": (req, res) => {
    return Mock.mock({
      success: true,
      data: {
        "trafficFlowDay|8000-15000": 1,
        "trafficFlowMonth|200000-400000": 1,
        "earning|50000-150000": 1,
        "audit|8000-15000": 1,
      },
    });
  },
  "GET /dataView/earningTrafficData": (req, res) => {
    // 营收：上月每天、本月每天、上年每月、今年每月
    // 车流：上月每天、本月每天、上年每月、今年每月
    return Mock.mock({
      success: true,
      data: {
        "earningLastMonth|31": [
          function() {
            return parseInt(Math.random() * WELCOME_DAY_EARNING);
          },
        ],
        [`earningThisMonth|${day}`]: [
          function() {
            return parseInt(Math.random() * WELCOME_DAY_EARNING);
          },
        ],
        "earningLastYear|12": [
          function() {
            return parseInt(Math.random() * WELCOME_MONTH_EARNING);
          },
        ],
        [`earningThisYear|${month}`]: [
          function() {
            return parseInt(Math.random() * WELCOME_MONTH_EARNING);
          },
        ],
        "trafficFLowLastMonth|31": [
          function() {
            return parseInt(Math.random() * WELCOME_DAY_TRAFFIC_FLOW);
          },
        ],
        [`trafficFLowThisMonth|${day}`]: [
          function() {
            return parseInt(Math.random() * WELCOME_DAY_TRAFFIC_FLOW);
          },
        ],
        "trafficFLowLastYear|12": [
          function() {
            return parseInt(Math.random() * WELCOME_MONTH_TRAFFIC_FLOW);
          },
        ],
        [`trafficFLowThisYear|${month}`]: [
          function() {
            return parseInt(Math.random() * WELCOME_MONTH_TRAFFIC_FLOW);
          },
        ],
      },
    });
  },
  "GET /dataView/timeDurationAnalysisData": (req, res) => {
    // 营收 时分分析：昨日（各小时）、今日（各小时）、上月（平均各小时）、本月（平均各小时）
    // 车流 时分分析：昨日（各小时）、今日（各小时）、上月（平均各小时）、本月（平均各小时）
    return Mock.mock({
      success: true,
      data: {
        "earningLastDay|24": [
          function() {
            return parseInt(Math.random() * WELCOME_HOUR_EARNING);
          },
        ],
        [`earningThisDay|${hour}`]: [
          function() {
            return parseInt(Math.random() * WELCOME_HOUR_EARNING);
          },
        ],
        "earningLastMonth|24": [
          function() {
            return parseInt(Math.random() * WELCOME_HOUR_EARNING);
          },
        ],
        "earningThisMonth|24": [
          function() {
            return parseInt(Math.random() * WELCOME_HOUR_EARNING);
          },
        ],
        "trafficFLowLastDay|24": [
          function() {
            return parseInt(Math.random() * WELCOME_HOUR_TRAFFIC_FLOW);
          },
        ],
        [`trafficFLowThisDay|${hour}`]: [
          function() {
            return parseInt(Math.random() * WELCOME_HOUR_TRAFFIC_FLOW);
          },
        ],
        "trafficFLowLastMonth|24": [
          function() {
            return parseInt(Math.random() * WELCOME_HOUR_TRAFFIC_FLOW);
          },
        ],
        "trafficFLowThisMonth|24": [
          function() {
            return parseInt(Math.random() * WELCOME_HOUR_TRAFFIC_FLOW);
          },
        ],
      },
    });
  },
  "GET /dataView/districtAnalysisData": (req, res) => {
    // 广东区域客货车分析
    return Mock.mock({
      success: true,
      data: {
        busAll: [
          { name: "清远市", value: 28397 },
          { name: "韶关市", value: 28397 },
          { name: "湛江市", value: 839 },
          { name: "梅州市", value: 8397 },
          { name: "河源市", value: 8397 },

          { name: "肇庆市", value: 397 },
          { name: "惠州市", value: 397 },
          { name: "茂名市", value: 997 },
          { name: "江门市", value: 897 },
          { name: "阳江市", value: 697 },

          { name: "云浮市", value: 20597 },
          { name: "广州市", value: 56497 },
          { name: "汕尾市", value: 839 },
          { name: "揭阳市", value: 10 },
          { name: "珠海市", value: 44837 },

          { name: "佛山市", value: 8397 },
          { name: "潮州市", value: 697 },
          { name: "汕头市", value: 397 },
          { name: "深圳市", value: 597 },
          { name: "东莞市", value: 20397 },

          { name: "中山市", value: 131 },
        ],
        busStart: [
          { name: "清远市", value: 28397 },
          { name: "韶关市", value: 28397 },
          { name: "湛江市", value: 839 },
          { name: "梅州市", value: 8397 },
          { name: "河源市", value: 8397 },

          { name: "肇庆市", value: 397 },
          { name: "惠州市", value: 397 },
          { name: "茂名市", value: 997 },
          { name: "江门市", value: 897 },
          { name: "阳江市", value: 697 },

          { name: "云浮市", value: 20597 },
          { name: "广州市", value: 56497 },
          { name: "汕尾市", value: 839 },
          { name: "揭阳市", value: 10 },
          { name: "珠海市", value: 44837 },

          { name: "佛山市", value: 8397 },
          { name: "潮州市", value: 697 },
          { name: "汕头市", value: 397 },
          { name: "深圳市", value: 597 },
          { name: "东莞市", value: 20397 },

          { name: "中山市", value: 131 },
        ],
        busEnd: [
          { name: "清远市", value: 28397 },
          { name: "韶关市", value: 28397 },
          { name: "湛江市", value: 839 },
          { name: "梅州市", value: 8397 },
          { name: "河源市", value: 8397 },

          { name: "肇庆市", value: 397 },
          { name: "惠州市", value: 397 },
          { name: "茂名市", value: 997 },
          { name: "江门市", value: 897 },
          { name: "阳江市", value: 697 },

          { name: "云浮市", value: 20597 },
          { name: "广州市", value: 56497 },
          { name: "汕尾市", value: 839 },
          { name: "揭阳市", value: 10 },
          { name: "珠海市", value: 44837 },

          { name: "佛山市", value: 8397 },
          { name: "潮州市", value: 697 },
          { name: "汕头市", value: 397 },
          { name: "深圳市", value: 597 },
          { name: "东莞市", value: 20397 },

          { name: "中山市", value: 131 },
        ],
        truckAll: [
          { name: "清远市", value: 28397 },
          { name: "韶关市", value: 28397 },
          { name: "湛江市", value: 839 },
          { name: "梅州市", value: 8397 },
          { name: "河源市", value: 8397 },

          { name: "肇庆市", value: 397 },
          { name: "惠州市", value: 397 },
          { name: "茂名市", value: 997 },
          { name: "江门市", value: 897 },
          { name: "阳江市", value: 697 },

          { name: "云浮市", value: 20597 },
          { name: "广州市", value: 56497 },
          { name: "汕尾市", value: 839 },
          { name: "揭阳市", value: 10 },
          { name: "珠海市", value: 44837 },

          { name: "佛山市", value: 8397 },
          { name: "潮州市", value: 697 },
          { name: "汕头市", value: 397 },
          { name: "深圳市", value: 597 },
          { name: "东莞市", value: 20397 },

          { name: "中山市", value: 131 },
        ],
        truckStart: [
          { name: "清远市", value: 28397 },
          { name: "韶关市", value: 28397 },
          { name: "湛江市", value: 839 },
          { name: "梅州市", value: 8397 },
          { name: "河源市", value: 8397 },

          { name: "肇庆市", value: 397 },
          { name: "惠州市", value: 397 },
          { name: "茂名市", value: 997 },
          { name: "江门市", value: 897 },
          { name: "阳江市", value: 697 },

          { name: "云浮市", value: 20597 },
          { name: "广州市", value: 56497 },
          { name: "汕尾市", value: 839 },
          { name: "揭阳市", value: 10 },
          { name: "珠海市", value: 44837 },

          { name: "佛山市", value: 8397 },
          { name: "潮州市", value: 697 },
          { name: "汕头市", value: 397 },
          { name: "深圳市", value: 597 },
          { name: "东莞市", value: 20397 },

          { name: "中山市", value: 131 },
        ],
        truckEnd: [
          { name: "清远市", value: 28397 },
          { name: "韶关市", value: 28397 },
          { name: "湛江市", value: 839 },
          { name: "梅州市", value: 8397 },
          { name: "河源市", value: 8397 },

          { name: "肇庆市", value: 397 },
          { name: "惠州市", value: 397 },
          { name: "茂名市", value: 997 },
          { name: "江门市", value: 897 },
          { name: "阳江市", value: 697 },

          { name: "云浮市", value: 20597 },
          { name: "广州市", value: 56497 },
          { name: "汕尾市", value: 839 },
          { name: "揭阳市", value: 10 },
          { name: "珠海市", value: 44837 },

          { name: "佛山市", value: 8397 },
          { name: "潮州市", value: 697 },
          { name: "汕头市", value: 397 },
          { name: "深圳市", value: 597 },
          { name: "东莞市", value: 20397 },

          { name: "中山市", value: 131 },
        ],
      },
    });
  },
  "GET /dataView/stationAnalysisData": (req, res) => {
    return Mock.mock({
      success: true,
      data: {
        stations: ["化龙", "双岗", "朱山岗", "隔岗", "钟村"],
        "truckThisDay|5": [
          function() {
            return parseInt(Math.random() * WELCOME_DAY_TRAFFIC_FLOW);
          },
        ],
        "truckThisMonth|5": [
          function() {
            return parseInt(Math.random() * WELCOME_DAY_TRAFFIC_FLOW);
          },
        ],
        "busThisDay|5": [
          function() {
            return parseInt(Math.random() * WELCOME_DAY_TRAFFIC_FLOW);
          },
        ],
        "busThisMonth|5": [
          function() {
            return parseInt(Math.random() * WELCOME_DAY_TRAFFIC_FLOW);
          },
        ],
        "inThisDay|5": [
          function() {
            return parseInt(Math.random() * WELCOME_DAY_TRAFFIC_FLOW);
          },
        ],
        "inThisMonth|5": [
          function() {
            return parseInt(Math.random() * WELCOME_DAY_TRAFFIC_FLOW);
          },
        ],
        "outThisDay|5": [
          function() {
            return parseInt(Math.random() * WELCOME_DAY_TRAFFIC_FLOW);
          },
        ],
        "outThisMonth|5": [
          function() {
            return parseInt(Math.random() * WELCOME_DAY_TRAFFIC_FLOW);
          },
        ],
      },
    });
  },
};

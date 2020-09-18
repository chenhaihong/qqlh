import Vue from "vue";
import SvgIcon from "./icons/SvgIcon.vue";

// 自动化加载svg目录下所有svg文件
// 使用webpack提供的require.context()指定固定上下文
const req = require.context("./icons/svg", false, /\.svg$/);
// kyes()返回上下文中所有文件名
req.keys().map(req);

Vue.component("SvgIcon", SvgIcon);

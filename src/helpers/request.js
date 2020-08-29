import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
import router from "@/router";

const TIMEOUT = 30000;

// create an axios instance
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // real url = baseURL + request url
  withCredentials: true, // send cookies when cross-domain requests
  headers: {
    "Content-Type": "application/json; charset=UTF-8", // 'application/x-www-form-urlencoded',
    "X-Requested-With": "XMLHttpRequest"
  },
  timeout: TIMEOUT // request timeout
});

// Using application/x-www-form-urlencoded format
// https://www.npmjs.com/package/axios#using-applicationx-www-form-urlencoded-format
// request.interceptors.request.use(
//   (config) => {
//     if (config.method === 'post') {
//       config.data = qs.stringify(config.data)
//     }
//     return config
//   },
//   (err) => {}
// )

// response interceptor
request.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data;
    const status = parseInt(res.status);
    if (status === 0) {
      // return { res, error: null };
      return [null, res];
    }

    const code = parseInt(res.code);
    switch (code) {
      case 2020:
      case 30010:
      case 32001:
      case 50012:
        // 登录超时，重新跳往SSO登录页
        store.dispatch("auth/clear");
        MessageBox.confirm("登录超时或账号在其他浏览器登录", "请重新登录", {
          confirmButtonText: "重新登录",
          cancelButtonText: "取消",
          type: "warning",
          callback() {
            const forward = "?forward=" + encodeURIComponent(location.href);
            location.href = process.env.VUE_APP_SSO_LOGIN_URL + forward;
          }
        });
        break;
      case 2021:
        // 已登录但没权限访问或其他原因
        // 进入错误消息页
        router.push("/403");
        break;
      default:
        Message({
          message: res.message || "请求服务失败，请重试",
          type: "error",
          duration: 5000
        });
        break;
    }
    // return Promise.reject(new Error(res.message || 'Error'))
    // return { error: new Error(res.message || "Error") };
    return [new Error(res.message || "Error"), null];
  },
  error => {
    Message({
      message: error.message,
      type: "error",
      duration: 5000
    });
    return [error, null];
  }
);

export default request;

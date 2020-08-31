import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
import router from "@/router";

// create an axios instance
const request = axios.create({
  baseURL: "/", // real url = baseURL + request url
  withCredentials: true, // send cookies when cross-domain requests
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
    "X-Requested-With": "XMLHttpRequest",
  },
  timeout: 30000, // request timeout
});

// request interceptor
request.interceptors.request.use((config) => {
  const { token } = store.state.auth;
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

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
  (response) => {
    const res = response.data;
    if (res.success) {
      return [null, res.data];
    }

    const code = parseInt(res.code);
    switch (code) {
      case 50408:
        // 登录超时，重新跳往登录页
        store.commit("auth/clear");
        MessageBox.confirm("登录超时", "请重新登录", {
          confirmButtonText: "重新登录",
          cancelButtonText: "取消",
          type: "warning",
          callback() {
            router.push(`/login?redirect=${encodeURIComponent(location.href)}`);
          },
        });
        break;
      case 50403:
        // 已登录但没权限访问或其他原因
        // 进入错误消息页
        router.push("/403");
        break;
      default:
        Message({
          message: res.message || "请求服务失败，请重试",
          type: "error",
          duration: 5000,
        });
        break;
    }
    return [new Error(res.message || "Error"), null];
  },
  (error) => {
    Message({
      message: error.message,
      type: "error",
      duration: 5000,
    });
    return [error, null];
  }
);

export default request;

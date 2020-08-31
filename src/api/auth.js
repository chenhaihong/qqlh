// 注登销
import request from "@/helpers/request";

export function login({ username, password }) {
  const data = { username, password };
  return request({ url: "/auth/login", method: "post", data });
}
export function logout() {
  return request({ url: "/auth/logout", method: "get" });
}
export function getUserinfo() {
  return request({ url: "/auth/userinfo", method: "get" });
}

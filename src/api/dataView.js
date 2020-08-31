import request from "@/helpers/request";

// 数字面板的数据
export function getDataPanel() {
  return request({ url: "/dataView/dataPanel" });
}

// 营收、车流
export function getEarningTrafficData() {
  return request({ url: "/dataView/earningTrafficData" });
}

// 营收时分分析、车流时分分析
export function getTimeDurationAnalysisData() {
  return request({ url: "/dataView/timeDurationAnalysisData" });
}

// 区域分析
export function getDistrictAnalysisData() {
  return request({ url: "/dataView/districtAnalysisData" });
}

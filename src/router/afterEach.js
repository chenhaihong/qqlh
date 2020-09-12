import setting from "@/setting";

const afterEach = route => {
  const { title = "" } = route.meta;
  document.title = title ? `${title} - ${setting.name}` : setting.name;
};
export default afterEach;

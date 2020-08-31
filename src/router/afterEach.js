const afterEach = (route) => {
  const { title = "" } = route.meta;
  document.title = title ? `${title} - 阡阡路惠` : "阡阡路惠";
};
export default afterEach;

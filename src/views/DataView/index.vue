<template>
  <div class="dataView">
    <data-panel></data-panel>
    <chart-panel></chart-panel>
  </div>
</template>
<script>
export default {
  name: "DataView",
  components: {
    DataPanel: () => import("./DataPanel/index.vue"),
    ChartPanel: () => import("./ChartPanel/index.vue")
  }
};
</script>
<style lang="less" scoped>
.dataView {
  @g: 20px; // 间距
  @h: 100px; // 高度
  @deep: ~">>>";

  & {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    min-width: 1100px;
    min-height: 800px;
    background: #f2f2f2;
  }

  @{deep} .DataPanel {
    position: absolute;
    top: @g;
    left: @g;
    right: @g;
    height: @h;
  }

  @{deep} .ChartPanel {
    position: absolute;
    top: @h + @g * 2;
    right: @g;
    left: @g;
    bottom: @g;
  }
}
</style>

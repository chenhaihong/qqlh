<template>
  <div ref="container" :style="strStyle"></div>
</template>
<script>
const echarts = window.echarts;
export default {
  echartsInstance: null,
  name: "TEcharts",
  props: ["loading", "map", "mapName", "option", "resize", "events"],
  components: {},
  computed: {
    strStyle() {
      return this.$attrs.style || "";
    },
    optionWithColor() {
      let option = this.option;

      if (!this.option.color) {
        option.color = [
          "#FF9900",
          "#2095F2",
          "#CCCC33",
          "#A148F4",
          "#3366CC",
          "#FF6699",
          "#c23531",
          "#2f4554",
          "#61a0a8",
          "#d48265",
          "#91c7ae",
          "#749f83",
          "#ca8622",
          "#bda29a",
          "#6e7074",
          "#546570",
          "#c4ccd3"
        ];
      }

      return option;
    }
  },
  methods: {
    updateOption() {
      if (!this.echartsInstance) {
        let container = this.$refs.container;
        this.echartsInstance = echarts.init(container);
      }
      this.echartsInstance.setOption(this.optionWithColor);
    },
    resizeHandler() {
      this.echartsInstance && this.echartsInstance.resize();
    }
  },
  watch: {
    option() {
      this.updateOption();
    },
    loading: {
      immediate: true,
      handler(val) {
        if (this.echartsInstance) {
          if (val) {
            this.echartsInstance.showLoading();
          } else {
            this.echartsInstance.hideLoading();
          }
        }
      }
    },
    map: {
      immediate: true,
      handler(val) {
        if (this.mapName && val) {
          echarts && echarts.registerMap(this.mapName, val);
          this.resizeHandler();
        }
      }
    }
  },
  // created() {
  //   const lazyLoadEcharts = () => {
  //     import("echarts")
  //       .then(echarts => {
  //         this.echarts = echarts;
  //       })
  //       .catch(function(err) {
  //         console.log("Failed to load echarts", err);
  //       });
  //   };
  //   lazyLoadEcharts();
  // },
  mounted() {
    this.updateOption();

    if (this.loading) {
      this.echartsInstance.showLoading();
    }

    const { events } = this;
    if (events) {
      for (let e in events) {
        this.echartsInstance.on(e, events[e]);
      }
    }

    if (this.resize) {
      this.__resizeHandler__ = () => {
        this.resizeHandler();
      };
      window.addEventListener("resize", this.__resizeHandler__);
    }
  },
  beforeDestroy() {
    if (this.resize) {
      window.removeEventListener("resize", this.__resizeHandler__);
    }
    if (this.echartsInstance && !this.echartsInstance.isDisposed()) {
      echarts.dispose(this.echartsInstance);
    }
  }
};
</script>
<style scoped></style>

<template>
  <div :id="id" :style="strStyle"></div>
</template>
<script>
const echarts = window.echarts;
export default {
  oEcharts: null,
  name: "TEcharts",
  data: () => ({ echarts: null, oEcharts: null }),
  props: ["id", "loading", "map", "mapName", "option", "resize", "events"],
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
      if (!this.oEcharts) {
        let container = document.getElementById(this.id);
        this.oEcharts = echarts.init(container);
      }
      this.oEcharts.setOption(this.optionWithColor);
    },
    resizeHandler() {
      this.oEcharts && this.oEcharts.resize();
    }
  },
  watch: {
    option() {
      echarts && this.updateOption();
    },
    loading: {
      immediate: true,
      handler(val) {
        if (this.oEcharts) {
          if (val) {
            this.oEcharts.showLoading();
          } else {
            this.oEcharts.hideLoading();
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
    
    const { events } = this;
    if (events) {
      for (let e in events) {
        this.oEcharts.on(e, events[e]);
      }
    }

    if (this.resize) {
      window.addEventListener("resize", this.resizeHandler);
    }
  },
  beforeDestroy() {
    if (this.resize) {
      window.removeEventListener("resize", this.resizeHandler);
    }
  }
};
</script>
<style scoped></style>

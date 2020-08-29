<template>
  <div
    class="switcher"
    :class="[selected === 0 ? 'switcher-begin' : 'switcher-end']"
    @click="handler"
  >
    <label class="switcher-aLabel">{{ data[0]["name"] }}</label>
    <div class="switcher-bar">
      <div class="switcher-bar-radius"></div>
    </div>
    <label class="switcher-bLabel">{{ data[1]["name"] }}</label>
  </div>
</template>
<script>
export default {
  name: "TSwitcher",
  data: () => {
    return { selected: 0 };
  },
  props: {
    value: { type: Number, default: 0 },
    data: {
      type: Array,
      default: () => [
        { value: 0, name: "左文字" },
        { value: 1, name: "右文字" }
      ]
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(nextValue) {
        for (let i = 0; i < this.data.length; i++) {
          const item = this.data[i];
          if (nextValue === item.value) {
            this.selected = i;
            break;
          }
        }
      }
    }
  },
  methods: {
    handler() {
      const { selected, data } = this;
      const index = selected === 0 ? 1 : 0;
      this.$emit("input", data[index]["value"]);
    }
  }
};
</script>
<style lang="less" scoped>
.switcher {
  //switcher
  @switcher-height: 20px;
  //switcher-bar
  @switcher-bar-width: 40px;
  @switcher-bar-border: 1px solid #c2c2c2;
  @switcher-bar-radius: 10px;
  //switcher-bar-radius
  @switcher-bar-radius-width: 16px;
  @switcher-bar-radius-height: 16px;
  @switcher-bar-radius-bgc: #3cd341;
  @switcher-bar-radius-radius: 100%;

  /**---------------------------------*/
  height: @switcher-height;

  &.switcher-begin {
    .switcher-aLabel {
      color: #232323;
      cursor: default;
    }
    .switcher-bLabel {
      color: #cccccc;
      cursor: default;
    }
    .switcher-bar-radius {
      left: 2px;
    }
  }

  &.switcher-end {
    .switcher-aLabel {
      color: #cccccc;
      cursor: default;
    }
    .switcher-bLabel {
      color: #232323;
      cursor: default;
    }
    .switcher-bar-radius {
      left: @switcher-bar-width - @switcher-bar-radius-width - 2;
    }
  }

  .switcher-aLabel,
  .switcher-bLabel,
  .switcher-bar {
    float: left;
    cursor: pointer;
  }

  .switcher-aLabel,
  .switcher-bLabel {
    margin: 0 5px;
    font-size: 14px;
    line-height: @switcher-height;
  }

  .switcher-aLabel,
  .switcher-bLabel {
    color: #232323;
    transition: color ease-in 0.3s;
  }

  .switcher-bar {
    position: relative;
    width: @switcher-bar-width;
    height: @switcher-height - 2;
    border: @switcher-bar-border;
    border-radius: @switcher-bar-radius;
  }

  .switcher-bar-radius {
    position: absolute;
    top: 1px;
    left: 2px;
    width: @switcher-bar-radius-width;
    height: @switcher-bar-radius-height;
    background-color: @switcher-bar-radius-bgc;
    border-radius: @switcher-bar-radius-radius;
    cursor: pointer;
    transition: left ease-in-out 0.2s;
  }
}
</style>

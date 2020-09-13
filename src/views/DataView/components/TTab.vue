<template>
  <ul :class="tabClass" :style="$attrs.style">
    <li
      v-for="(item, index) in title"
      :key="item.id || index"
      class="tab-button"
      :class="{ active: selected === index }"
      @click="handleClick(item)"
    >
      <span>{{ title[index]["name"] }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: "TTab",
  props: {
    type: { type: Number, default: 1 },
    value: { type: Number, default: 0 },
    title: {
      type: Array,
      default: () => []
    }
  },
  data: () => {
    return { selected: 0 };
  },
  computed: {
    tabClass() {
      const { type } = this;
      const config = {
        "1": "tab-type1",
        "2": "tab-type2"
      };
      return config[type];
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(nextValue) {
        for (let i = 0; i < this.title.length; i++) {
          const item = this.title[i];
          if (nextValue === item.value) {
            this.selected = i;
            break;
          }
        }
      }
    }
  },
  methods: {
    handleClick(item) {
      this.$emit("input", item["value"]);
    }
  }
};
</script>

<style lang="less" scoped>
.tab-type1 {
  margin: 10px 0;

  .tab-button {
    float: left;
    margin: 0 10px;
    padding: 0 3px;
    height: 26px;
    line-height: 30px;
    font-size: 16px;
    font-weight: bold;
    color: #666666;
    border-bottom: 2px solid #ffffff;
    cursor: pointer;

    &.active {
      color: #333333;
      cursor: default;
      border-bottom: 2px solid #333333;
      transition: border ease 0.3s;
    }
  }
}

.tab-type2 {
  //tab
  @tab-height: 20px;

  height: @tab-height;

  .tab-button {
    float: left;
    margin: 0 5px;
    padding: 0 8px;
    height: @tab-height;
    font-size: 12px;
    line-height: @tab-height;
    color: #666666;
    border-radius: 5px;

    &:hover {
      cursor: pointer;
    }

    &.active {
      cursor: default;
    }

    &:hover,
    &.active {
      color: white;
      background-color: #1e9fd1;
    }
  }
}
</style>

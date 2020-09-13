<template>
  <dl class="droplist">
    <dt class="droplist-dt">
      {{ data[selected]["name"] }}
      <i></i>
    </dt>
    <dd class="droplist-dd">
      <ul>
        <li
          v-for="(item, index) in data"
          :key="item.key || index"
          @click="handleClick(item)"
        >
          {{ data[index]["name"] }}
        </li>
      </ul>
    </dd>
  </dl>
</template>

<script>
export default {
  name: "TDropList",
  props: {
    value: { type: Number, default: 0 },
    data: { type: Array, default: () => [] }
  },
  data() {
    return { selected: 0 };
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
    handleClick(item) {
      this.$emit("input", item.value);
    }
  }
};
</script>

<style lang="less" scoped>
.droplist {
  @height: 20px;

  position: relative;
  height: @height;
  font-size: 12px;
  border-radius: 3px;
  border: 1px solid #fff;

  &:hover {
    //border: 1px solid #ccc;
    //transition: border 0.5s;

    .droplist-dt {
      color: #36afdd;

      i {
        transform: rotate(180deg);
      }
    }

    .droplist-dd {
      display: block;
    }
  }

  .droplist-dt {
    padding: 0 20px;
    height: @height;
    color: #333333;
    line-height: @height;
    border-radius: 5px;

    i {
      position: relative;
      left: 10px;
      float: right;
      width: 5px;
      height: @height;
      background: url(/assets/welcome/image/menu-droplist-triangle.png) center
        center no-repeat;
      transition: transform ease 0.3s;
    }
  }

  .droplist-dd {
    display: none;

    ul {
      position: absolute;
      top: @height - 1;
      padding: 8px 0;
      width: 100px;
      background-color: white;
      border: 1px solid #cccccc;
      box-shadow: 0 0 10px #999999;
      border-radius: 6px;

      li {
        padding: 0 10px;
        height: 25px;
        line-height: 25px;
        color: #333333;
        word-wrap: normal;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        cursor: pointer;

        &:hover {
          color: white;
          background-color: #36afdd;
        }
      }
    }
  }
}
</style>

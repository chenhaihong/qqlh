<template>
  <div :class="$style.breadcrumb">
    <div :class="$style.square"></div>
    <a v-if="$route.name == 'Home'" :class="[$style.link, $style.disabled]"
      >首页</a
    >
    <template v-else>
      <!-- <router-link :class="$style.link" :to="{ path: '/home' }">首页</router-link> -->
      <template v-for="(item, index) in $route.matched">
        <div :class="$style.linkSep" :key="item.fullPath">
          <span v-if="index > 0" :class="$style.separator">{{
            separator
          }}</span>
          <router-link
            v-if="index < $route.matched.length - 1"
            :to="{ path: item.path }"
            :class="$style.link"
            >{{ item.meta.title }}</router-link
          >
          <a v-else :class="[$style.link, $style.disabled]">{{
            item.meta.title
          }}</a>
        </div>
      </template>
    </template>
  </div>
</template>
<script>
export default {
  name: "Breadcrumb",
  data() {
    return { separator: "-" };
  }
};
</script>
<style lang="less" scoped module>
.breadcrumb {
  position: relative;
  height: @breadcrumb-height;
  line-height: @breadcrumb-height;
  font-size: @breadcrumb-font-size;
  background: @breadcrumb-background-color;
  border-bottom: 1px solid #ddd;
  overflow: hidden;
  box-sizing: border-box;

  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;

  .square {
    @a: 9px;
    margin: 0 12px;
    width: @a;
    height: @a;
    background: #3ca9f4;
  }
  .linkSep {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
  }
  .link {
    font-weight: bold;
    color: @breadcrumb-color;
    &.disabled {
      cursor: default;
      font-weight: normal;
      color: @breadcrumb-disabled-color;
    }
  }
  .separator {
    margin: 0 8px;
    font-weight: bold;
    color: @breadcrumb-disabled-color;
  }
}
</style>

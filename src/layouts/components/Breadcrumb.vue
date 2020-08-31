<template>
  <div :class="$style.breadcrumb">
    <div :class="$style.square"></div>
    <a v-if="$route.name == 'Home'" :class="[$style.link, $style.disabled]">首页</a>
    <template v-else>
      <router-link :class="$style.link" :to="{ path: '/home' }">首页</router-link>
      <template v-for="(item, index) in $route.matched">
        <div :class="$style.linkSep" :key="item.fullPath">
          <span :class="$style.separator">{{separator}}</span>
          <router-link
            v-if="index < $route.matched.length - 1"
            :to="{ path: item.path }"
            :class="$style.link"
          >{{ item.meta.title }}</router-link>
          <a v-else :class="[$style.link, $style.disabled]">{{ item.meta.title }}</a>
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
  @h: 57px;

  position: relative;
  height: @h - 1;
  border-bottom: 1px solid #ddd;
  font-size: 16px;
  overflow: hidden;

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
    font-weight: 700;
    color: #303133;
    &.disabled {
      cursor: default;
      font-weight: 400;
      color: #606266;
    }
  }
  .separator {
    margin: 0 8px;
    font-weight: 700;
    color: #c0c4cc;
  }
}
</style>

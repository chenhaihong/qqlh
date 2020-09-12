<template>
  <div class="left-menu">
    <el-col>
      <el-menu
        :router="true"
        :default-active="defaultActive"
        :default-openeds="defaultOpeneds"
      >
        <template v-for="item in visibledAddressableRoutes">
          <template v-if="item.children && item.children.length">
            <el-submenu :index="item.path" :key="item.path">
              <template slot="title">
                <svg-icon :iconClass="item.icon" />
                {{ item.meta.title || item.name }}
              </template>
              <template v-for="v in item.children">
                <el-menu-item :index="v.path" :key="v.path">{{
                  v.meta.title || v.name
                }}</el-menu-item>
              </template>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :index="item.path" :key="item.path">
              <svg-icon :iconClass="item.icon" />
              {{ item.meta.title || item.name }}
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "LeftMenu",
  data: () => ({
    defaultOpeneds: [],
    defaultActive: "/home"
  }),
  computed: {
    visibledAddressableRoutes() {
      return this.$store.state.leftMenu.visibledAddressableRoutes;
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(nextRoute) {
        // 检测 $route 变化时，只需要设置 el-menu 的 default-active 即可，
        // 如果同时设置 default-openeds，会关闭其他组。
        if (nextRoute.path.indexOf("home") !== -1) {
          this.defaultActive = "/home";
        } else {
          this.defaultActive =
            nextRoute.matched[nextRoute.matched.length - 1].path;
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.left-menu {
  @deep: ~">>>";

  @{deep} .el-menu {
    background: none;

    // 一级菜单、二级菜单、二级菜单标题，统一高度
    .el-menu-item,
    .el-submenu-item,
    .el-submenu__title {
      padding-top: 0;
      padding-bottom: 0;
      height: @leftMenu-menu-height;
      line-height: @leftMenu-menu-height;
      color: @leftMenu-menu-color;
      font-size: @leftMenu-menu-font-size;
      background: none;
      transition: none;
    }

    // 一级菜单
    & > .el-menu-item {
      &:hover,
      &.is-active {
        color: @leftMenu-menu-active-color;
        background: @leftMenu-menu-active-background-color;
      }
    }

    // 二级菜单
    .el-submenu {
      color: @leftMenu-submenu-color;

      // 二级菜单标题
      // 和一级菜单样式一样
      .el-submenu__title {
        &:hover,
        &.is-active {
          color: @leftMenu-menu-active-color;
          background: @leftMenu-menu-active-background-color;
        }
      }
      &.is-active .el-submenu__title {
        color: @leftMenu-menu-active-color;
        background: @leftMenu-menu-active-background-color;
      }

      // 菜单
      .el-menu {
        background: @leftMenu-submenu-background-color;

        .el-menu-item {
          &:hover,
          &.is-active {
            color: @leftMenu-submenu-active-color;
            background: none;
          }
        }
      }
    }
  }
}
</style>

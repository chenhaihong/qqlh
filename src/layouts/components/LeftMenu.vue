<template>
  <div class="left-menu">
    <el-col>
      <el-menu :router="true" :default-active="defaultActive" :default-openeds="defaultOpeneds">
        <template v-for="item in visibledAddressableRoutes">
          <template v-if="item.children && item.children.length">
            <el-submenu :index="item.path" :key="item.path">
              <template slot="title">
                <i class="iconfont" :class="item.icon" />
                {{ item.meta.title || item.name }}
              </template>
              <template v-for="v in item.children">
                <el-menu-item :index="v.path" :key="v.path">{{ v.meta.title || v.name }}</el-menu-item>
              </template>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :index="item.path" :key="item.path">
              <i class="iconfont" :class="item.icon"></i>
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

    a {
      text-decoration: none;
    }

    .iconfont {
      margin-right: 10px;
    }

    // 一级菜单、二级菜单标题
    .el-menu-item,
    .el-submenu__title {
      background: none;
      transition: none;

      &:hover {
        color: #ffffff;
        background: #3294e1;
      }

      &.is-active {
        color: #ffffff;
        background: #16659d;
      }
    }

    // 二级菜单
    .el-submenu .el-menu {
      background: #6699cc;

      .el-menu-item {
        margin-left: 15px;
        font-size: 12px;

        &:hover,
        &.is-active {
          color: #ffffff;
          background: #6699cc;
        }
      }
    }

    .el-submenu.is-active .el-submenu__title {
      color: #ffffff;
      background: #16659d;
    }
  }
}
</style>

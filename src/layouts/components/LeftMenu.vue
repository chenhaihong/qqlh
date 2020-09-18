<template>
  <div class="left-menu">
    <el-menu
      :router="false"
      unique-opened
      :default-active="defaultActive"
      :default-openeds="defaultOpeneds"
      @select="select"
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
    <div class="wrapper--pin" :class="{ active: sticky }" @click="toggleSticky">
      <SvgIcon class="icon--pin" iconClass="pin" />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "LeftMenu",
  data: () => ({
    defaultOpeneds: [],
    defaultActive: "/home"
  }),
  computed: {
    ...mapState("leftMenu", ["visibledAddressableRoutes", "sticky"])
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
  },
  methods: {
    ...mapMutations("leftMenu", ["toggleSticky"]),
    select(index) {
      const { route } = this.$router.resolve(index);
      const { meta = {}, fullPath } = route;
      if (meta.link) {
        let title = "提示";
        let desc = `即将进入新页面，点击前往 <a class="leftMenu-comfirm-link" href='${
          meta.link
        }' target="_blank">${meta.title || meta.link}</a>`;
        return this.$confirm(desc, title, {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "确定",
          showConfirmButton: false,
          cancelButtonText: "取消",
          type: "warning"
        }).catch(() => {});
      }
      if (this.$route.fullPath !== fullPath) this.$router.push(fullPath);
    }
  }
};
</script>
<style lang="less">
.leftMenu-comfirm-link {
  color: @leftMenu-comfirm-link-color;
  &:hover {
    text-decoration: underline;
    color: @leftMenu-comfirm-link-color;
  }
}
</style>

<style lang="less" scoped>
.left-menu {
  @deep: ~">>>";
  // padding-bottom: @leftMenu-pin-height;

  @{deep} .el-menu {
    border-right: none;
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

  .wrapper--pin {
    position: fixed;
    bottom: 0;
    width: @leftMenu-width;
    text-align: center;
    height: @leftMenu-pin-height;
    line-height: @leftMenu-pin-height;
    background: @leftMenu-pin-background-color;
    font-size: @leftMenu-pin-font-size;
    color: @leftMenu-pin-color;
    cursor: pointer;

    &.active {
      .icon--pin {
        color: @leftMenu-pin-active-color;
      }
    }
  }
}
</style>

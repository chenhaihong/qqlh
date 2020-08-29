<template>
  <div class="left-menu">
    <el-col>
      <el-menu :router="true" :default-active="defaultActive" :default-openeds="defaultOpeneds">
        <template v-for="item in menus">
          <template v-if="item.children">
            <el-submenu :index="item.path" :key="item.path">
              <template slot="title">
                <i class="iconfont" :class="item.icon"></i>
                {{item.name}}
              </template>
              <template v-for="v in item.children">
                <el-menu-item :index="v.path" :key="v.path">{{v.name}}</el-menu-item>
              </template>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :index="item.path" :key="item.path">
              <i class="iconfont" :class="item.icon"></i>
              {{item.name}}
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
// import { USER_MENU } from "../../../../api/index.js";

export default {
  name: "leftMenu",
  data: () => ({
    menus: [],
    defaultOpeneds: [""],
    defaultActive: "/home"
  }),
  computed: {},
  methods: {
    handleOpen(index, indexPath) {
      console.log(index, indexPath);
    },
    handleClose(index, indexPath) {
      console.log(index, indexPath);
    },
    handleSelect(index) {
      console.log(index);
    },
    _lightMenu(route) {
      const matched = route.matched;

      if (route.path.indexOf("home") !== -1) {
        this.defaultOpeneds = [""];
        this.defaultActive = "/home";
      } else {
        this.defaultOpeneds = [matched[0].path];
        this.defaultActive = matched[1].path;
      }
    }
  },
  watch: {
    $route(nextRoute) {
      // 检测 $route 变化时，只需要设置 el-menu 的 default-active 即可，
      // 如果同时设置 default-openeds，会导致其他菜组关闭。
      if (nextRoute.path.indexOf("home") !== -1) {
        this.defaultActive = "/home";
      } else {
        this.defaultActive = nextRoute.matched[1].path;
      }
    }
  },
  beforeCreate() {},
  created() {
    // 首次渲染，高亮菜单。
    // 必须在菜单数据之前设置好default-active、default-openeds。
    this._lightMenu(this.$router.currentRoute);

    this.menus = [
      { path: "/home", name: "首页", icon: "icon-home" },
      {
        path: "/path",
        name: "行程审批",
        icon: "icon-path",
        children: [
          { name: "行程列表", path: "/path/list" },
          { name: "投诉订单", path: "/path/complaint" }
        ]
      },
      {
        path: "/rebate",
        name: "返利管理",
        icon: "icon-rebate",
        children: [
          { name: "规则列表", path: "/rebate/list" },
          { name: "添加规则", path: "/rebate/add" }
        ]
      },
      {
        path: "/admin",
        name: "管理员设置",
        icon: "icon-admin",
        children: [
          { name: "角色管理", path: "/admin/role" },
          { name: "管理员列表", path: "/admin/list" }
        ]
      },
      {
        path: "/user",
        name: "用户管理",
        icon: "icon-user",
        children: [
          { name: "用户列表", path: "/user/list" },
          { name: "标签管理", path: "/user/tag" }
        ]
      },
      {
        path: "/data",
        name: "数据分析",
        icon: "icon-data",
        children: [{ name: "营收数据", path: "/data/earning" }]
      }
    ];

    // USER_MENU({
    //   success: response => {
    //     this.menus = response.result;
    //   },
    //   fail: error => {}
    // });
  },
  mounted() {}
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
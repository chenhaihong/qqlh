<template>
  <div class="mainLayout">
    <head-nav class="head-nav" />
    <div class="body">
      <left-menu class="left-menu" />
      <div class="right-content">
        <breadcrumb class="Breadcrumb" />
        <!-- <transition :name="transitionName"> -->
        <transition name="slide" mode="out-in">
          <router-view class="child-view" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainLayout",
  // data() {
  //   return {
  //     transitionName: "slide-left"
  //   };
  // },
  components: {
    HeadNav: () => import("./components/HeadNav.vue"),
    LeftMenu: () => import("./components/LeftMenu.vue"),
    Breadcrumb: () => import("./components/Breadcrumb.vue")
  }
  // watch: {
  //   $route(to, from) {
  //     const toDepth = to.path.split("/").length;
  //     const fromDepth = from.path.split("/").length;
  //     this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
  //   }
  // }
};
</script>
<style lang="less" scoped>
.mainLayout {
  @header-height: 60px;
  @leftMenu-width: 200px;
  @breadcrumb-height: 57px;

  position: relative;
  box-sizing: border-box;

  .head-nav {
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: @header-height;
    background-color: #43a9f1;
  }

  .body {
    z-index: 2000;
    position: fixed;
    top: @header-height;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-flow: row nowrap;
    align-items: stretch;

    .left-menu {
      z-index: 100;
      position: relative;
      width: @leftMenu-width;
      //background: #eef1f6;
      background: #96d0f8;
      //border-right: 1px solid #96D0F8;
      overflow: hidden auto;
      flex-shrink: 0;
    }

    .right-content {
      position: relative;
      width: 100%;
      background: #ffffff;
      overflow: auto;

      .child-view {
        position: absolute;
        top: @breadcrumb-height;
        left: 0;
        right: 0;
        bottom: 0;
        //width: 100%;
        //height: 100%;
        background: #f2f2f2;
        overflow: auto;
        transition: opacity 0.5s cubic-bezier(0.55, 0, 0.1, 1),
          transform 0.5s cubic-bezier(0.55, 0, 0.1, 1);
      }
    }
  }
}
</style>
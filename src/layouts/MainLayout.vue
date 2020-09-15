<template>
  <div class="mainLayout">
    <Head class="mainLayout__head" />
    <div
      class="mainLayout__body"
      :class="{ 'mainLayout__body--hideLeftMenu': !show }"
    >
      <transition name="slide">
        <LeftMenu v-show="show" class="left-menu" />
      </transition>
      <div class="right-content">
        <Breadcrumb />
        <div class="child-view">
          <transition :name="transitionName">
            <keep-alive>
              <router-view v-if="isKeepAlive" />
            </keep-alive>
          </transition>
          <transition :name="transitionName">
            <router-view v-if="!isKeepAlive" />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MainLayout",
  components: {
    Head: () => import("./components/Head.vue"),
    LeftMenu: () => import("./components/LeftMenu.vue"),
    Breadcrumb: () => import("./components/Breadcrumb.vue")
  },
  data() {
    return {
      transitionName: "cv-slide-left"
    };
  },
  computed: {
    ...mapState("leftMenu", ["show"]),
    isKeepAlive() {
      return !!this.$route.meta.keepAlive;
    }
  },
  watch: {
    $route() {
      const { __routerType__ } = this.$router;
      this.transitionName =
        __routerType__ === "forward" ? "cv-slide-left" : "cv-slide-right";
    }
  }
};
</script>
<style lang="less" scoped>
.mainLayout {
  position: relative;
  box-sizing: border-box;
}
.mainLayout__head {
  z-index: @head-z-index;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: @header-height;
  background-color: @header-background-color;
}

.mainLayout__body {
  z-index: @body-z-index;
  position: fixed;
  top: @header-height;
  bottom: 0;
  left: 0;
  right: 0;

  &.mainLayout__body--hideLeftMenu {
    .right-content {
      margin-left: 0;
    }
  }

  .left-menu {
    z-index: @leftMenu-z-index;
    position: fixed;
    top: @header-height;
    width: @leftMenu-width;
    height: calc(100% - @header-height);
    background-color: @leftMenu-background-color;
    overflow: hidden auto;
  }

  .right-content {
    z-index: @rightContent-z-index;
    position: relative;
    margin-left: @leftMenu-width;
    height: 100%;
    background: @rightContent-background-color;
    overflow: auto;

    .child-view {
      position: absolute;
      top: @breadcrumb-height;
      left: 0;
      right: 0;
      bottom: 0;
      padding: @childView-padding;
      background: @childView-background-color;
      box-sizing: border-box;
      overflow: auto;
    }
  }
}
</style>

<style lang="less">
// slide-left
.cv-slide-left-enter {
  opacity: 0;
  transform: translate(20px, 0);
}
.cv-slide-left-enter-active {
  transition: opacity 0.3s cubic-bezier(0.55, 0, 0.1, 1),
    transform 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}
.cv-slide-left-enter-to {
  opacity: 1;
  transform: translate(0, 0);
}

// slide-right
.cv-slide-right-enter {
  opacity: 0;
  transform: translate(-20px, 0);
}
.cv-slide-right-enter-active {
  transition: opacity 0.3s cubic-bezier(0.55, 0, 0.1, 1),
    transform 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}
.cv-slide-right-enter-to {
  opacity: 1;
  transform: translate(0, 0);
}
</style>

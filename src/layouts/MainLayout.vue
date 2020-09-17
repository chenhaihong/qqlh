<template>
  <div class="mainLayout">
    <Head class="mainLayout__head" />
    <div
      class="mainLayout__body"
      :class="{
        'mainLayout__body--hideLeftMenu': !show,
        'mainLayout__body--stickyLeftMenu': sticky
      }"
    >
      <transition name="slide">
        <LeftMenu v-show="show" class="left-meÎnu" />
      </transition>
      <transition name="el-fade-in-linear">
        <div
          v-show="sticky && show"
          class="left-menu-shadow"
          @click="toggleMenu"
        ></div>
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
import { mapState, mapMutations } from "vuex";

import Head from "./components/Head.vue";
import LeftMenu from "./components/LeftMenu.vue";
import Breadcrumb from "./components/Breadcrumb.vue";

export default {
  name: "MainLayout",
  components: { Head, LeftMenu, Breadcrumb },
  data() {
    return {
      transitionName: "cv-slide-left"
    };
  },
  computed: {
    ...mapState("leftMenu", ["show", "sticky"]),
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
  },
  methods: {
    ...mapMutations("leftMenu", ["toggleMenu"])
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
  &.mainLayout__body--stickyLeftMenu {
    .left-menu {
      top: @header-height + @breadcrumb-height - 1;
      box-shadow: inset 0px 0px 1px #000;
    }
    .right-content {
      margin-left: 0;
    }
  }

  .left-menu {
    z-index: @leftMenu-z-index;
    position: fixed;
    top: @header-height;
    bottom: 0;
    width: @leftMenu-width;
    background-color: @leftMenu-background-color;
    overflow: hidden auto;
  }

  .left-menu-shadow {
    z-index: @leftMenu-shadow-z-index;
    position: fixed;
    top: @header-height + @breadcrumb-height - 1;
    left: 0;
    right: 0;
    bottom: 0;
    background: @leftMenu-shadow-background-color;
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

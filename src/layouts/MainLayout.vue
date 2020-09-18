<template>
  <div class="mainLayout">
    <Head class="mainLayout__head" />
    <div
      class="mainLayout__body"
      :class="{
        'mainLayout__body--hiddenLeftMenu': !show,
        'mainLayout__body--fixedLeftMenu': fixed
      }"
    >
      <transition name="el-fade-in-linear">
        <div
          v-show="fixed && show"
          class="mainLayout__body__left-menu-shadow"
          @click="toggleShow"
        />
      </transition>
      <transition name="slide">
        <LeftMenu v-show="show" class="mainLayout__body__left-menu" />
      </transition>
      <Breadcrumb class="mainLayout__body__breadcrumb" />
      <div ref="childView" class="mainLayout__body__childView">
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
    ...mapState("leftMenu", ["show", "fixed"]),
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
    ...mapMutations("leftMenu", ["toggleShow"])
  },
  beforeUpdate: function() {
    const { childView } = this.$refs;
    childView.scrollLeft = 0;
    childView.scrollTop = 0;
  }
};
</script>
<style lang="less" scoped>
@ctn: mainLayout;
@head: mainLayout__head;
@body: mainLayout__body;

.@{ctn} {
  position: relative;
  box-sizing: border-box;
}
.@{head} {
  z-index: @head-z-index;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: @header-height;
  background-color: @header-background-color;
}
.@{body} {
  z-index: @body-z-index;
  position: fixed;
  top: @header-height;
  bottom: 0;
  left: 0;
  right: 0;

  &.@{body}--hiddenLeftMenu {
    .@{body}__breadcrumb {
      left: 0;
    }
    .@{body}__childView {
      margin-left: 0;
    }
  }
  &.@{body}--fixedLeftMenu {
    .@{body}__left-menu {
      top: @header-height + @breadcrumb-height - 1;
      box-shadow: inset 0px 0px 1px #000;
    }
    .@{body}__breadcrumb {
      left: 0;
    }
    .@{body}__childView {
      margin-left: 0;
    }
  }
}
.@{body}__breadcrumb {
  z-index: @breadcrumb-z-index;
  position: fixed;
  left: @leftMenu-width;
}
.@{body}__left-menu {
  z-index: @leftMenu-z-index;
  position: fixed;
  top: @header-height;
  bottom: 0;
  width: @leftMenu-width;
  background-color: @leftMenu-background-color;
  overflow: hidden auto;
}
.@{body}__left-menu-shadow {
  z-index: @leftMenu-shadow-z-index;
  position: fixed;
  top: @header-height + @breadcrumb-height - 1;
  left: 0;
  right: 0;
  bottom: 0;
  background: @leftMenu-shadow-background-color;
}
.@{body}__childView {
  z-index: @childView-z-index;
  position: absolute;
  margin-left: @leftMenu-width;
  top: @breadcrumb-height;
  left: 0;
  right: 0;
  bottom: 0;
  background: @childView-background-color;
  // scroll-behavior: smooth;
  overflow: auto;
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

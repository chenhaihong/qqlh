<template>
  <transition name="app-fade">
    <router-view />
  </transition>
</template>

<style lang="less">
.app-fade-enter,
.app-fade-leave-to {
  opacity: 0;
}
.app-fade-enter-active,
.app-fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.app-fade-enter-to,
.app-fade-leave {
  opacity: 1;
}
</style>

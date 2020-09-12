<template>
  <transition name="app-fade">
    <router-view />
  </transition>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

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

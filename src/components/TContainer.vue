<template>
  <section class="chilView__container">
    <section v-if="$slots.head" class="chilView__container__head">
      <slot name="head"></slot>
    </section>
    <section class="chilView__container__body">
      <slot></slot>
    </section>
  </section>
</template>

<script>
export default { name: "TContainer" };
</script>

<style lang="less" scoped>
.chilView__container {
  margin: 20px;
  padding-bottom: 1px;
}
.chilView__container__head {
  margin-bottom: 8px;
  padding: 20px;
  background-color: white;
}
.chilView__container__body {
  padding: 20px;
  background-color: white;
  overflow-x: auto;
}
</style>

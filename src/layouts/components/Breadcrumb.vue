<template>
  <div class="breadcrumb">
    <div class="square"></div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <template v-for="item in $route.matched">
        <el-breadcrumb-item
          v-if="$route.name != 'Home'"
          :key="item.fullPath"
          :to="{ path: item.path }"
        >{{item.meta.title}}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>
<script>
export default { name: "Breadcrumb" };
</script>
<style lang="less" scoped>
.breadcrumb {
  @h: 57px;
  @deep: ~">>>";

  position: relative;
  height: @h - 1;
  border-bottom: 1px solid #ddd;
  overflow: hidden;

  .square {
    @a: 9px;

    float: left;
    margin-top: (@h - @a) / 2;
    margin-left: 20px;
    width: @a;
    height: @a;
    background: #3ca9f4;
  }

  @{deep} .el-breadcrumb {
    margin-left: 40px;
    line-height: @h;
    font-size: 16px;
  }
}
</style>
<template>
  <TContainer>
    <section slot="head">
      <h1>样式</h1>
    </section>
    <section slot="default">
      <h2>1. 如何修改变量？</h2>
      <br />
      <p>在 /src/assets/less/variables.less 配置样式变量。下面是项目代码里使用到的变量。</p>
      <pre class="pre">
        <code class="less" v-hljs>{{variables}}</code>
      </pre>
    </section>
  </TContainer>
</template>

<script>
export default {
  name: "DocStyle",
  data() {
    return {
      variables: `
//////////////////////////
// ! mainLayout__head
//////////////////////////
@head-z-index: 1000;
@header-height: 50px;
@header-color: #ffffff;
@header-background-color: #3ba4e2;
// logo
@header-logo-height: 30px;
// userinfo
@header-userinfo-color: white;
@header-userinfo-font-size: 14px;
@header-userinfo-li-padding: 0 20px;
@header-userinfo-li-hover-background-color: #3494e1;
@header-userinfo-splitter-height: 20px;
@header-userinfo-splitter-background-color: #ccc;
// popover
@header-popver-padding: 20px;
@header-popver-width: 140px;
@header-popver-color: #aaa;
@header-popver-background-color: white;
@header-popver-background-box-shadow: 0 0 5px #ccc;
@header-popver-avatar-size: 50px;

//////////////////////////
// ! mainLayout__body
//////////////////////////
@body-z-index: 900;

//////////////////////////
// ! leftMenu
//////////////////////////
@leftMenu-z-index: 100;
@leftMenu-width: 160px;
@leftMenu-background-color: #96d0f8;
@leftMenu-menu-height: 50px;
@leftMenu-menu-font-size: 12px;
@leftMenu-menu-icon-size: 12px;
// menu
@leftMenu-menu-color: #000;
@leftMenu-menu-active-color: #ffffff;
@leftMenu-menu-active-background-color: #16659d;
// sub menu
@leftMenu-submenu-color: #000;
@leftMenu-submenu-background-color: #7aabcd;
@leftMenu-submenu-active-color: #fff;
// comfirm
@leftMenu-comfirm-link-color: #16659d;

//////////////////////////
// ! rightContent
//////////////////////////
@rightContent-z-index: 99;
@rightContent-background-color: #ffffff;

// rightContent 的 breadcrumb
@breadcrumb-height: 50px;
@breadcrumb-color: #303133;
@breadcrumb-disabled-color: #606266;
@breadcrumb-font-size: 14px;
@breadcrumb-background-color: #ffffff;
// toggler
@breadcrumb-toggler-font-size: 20px;
@breadcrumb-toggler-color: #000;
@breadcrumb-toggler-active-color: #3ca9f4;

// rightContent 的 childView
@childView-padding: 0;
@childView-background-color: #f2f2f2;

      `
    };
  }
};
</script>


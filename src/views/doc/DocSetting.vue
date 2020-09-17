<template>
  <TContainer>
    <section slot="head">
      <h1>项目配置</h1>
      <br />
      <p>代码中有2个配置，</p>
      <ul>
        <li>- /setting.js，存放项目需要的js配置</li>
        <li>- /src/assets/less/variables.less，用于项目需要的样式配置</li>
      </ul>
    </section>
    <section slot="default">
      <h2>1. 如何修改变量？</h2>
      <br />
      <p>
        在 /setting.js 安装需要修改即可。
      </p>
      <pre class="pre">
        <code class="less" v-hljs>{{setting}}</code>
      </pre>

      <h2>2. 如何修改样式变量？</h2>
      <br />
      <p>
        在 /src/assets/less/variables.less
        配置样式变量。下面是项目代码里使用到的变量。
      </p>
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
      setting: `
module.exports = {
  name: "阡阡路惠管理系统",
  logo: "/assets/images/logo.png",
  loginLogo: "/assets/images/login-logo.png",
  slogan: "方便、快捷、精准",
  copyright: "版权所有 ©2014 广州益车益路软件科技有限公司",
  onStickyLeftMenu: false, // false：不强制使用sticky菜单
  icpCode: "粤ICP备05014984号",
  icpLink: "http://beian.miit.gov.cn/",
  beianCode: "粤公网安备 44011302002141号",
  beianLink:
    "http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44011302002141",
};
      `,
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

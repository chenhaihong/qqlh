<template>
  <TContainer>
    <section slot="head">
      <h1>路由配置</h1>
      <br />
      <p>在 /src/router/routes.js 处配置。</p>
    </section>
    <section slot="default">
      <pre class="pre">
{
  path: "/admin",
  name: "Admin",
  meta: { title: "管理员管理", roles: [1] },
  component: MainLayout,
  icon: "", // 一级菜单的inconfont
  hidden: true, // true  不再菜单上展示，false 在菜单上展示
  children: [
    {
      path: "list",
      name: "AdminList", // 用于标识唯一性的key值
      hidden: true, // true  不再菜单上展示，false 在菜单上展示
      meta: {
        keepAlive: true, // true 启用 keep-alive，为空、undefined、null时，不启用
        title: "管理员列表", // 用于修改document.title的字符串
        roles: [1], // 用于定义该页面可以访问的角色，为空、undefined、null时，任何已经登录的任何角色可以访问
      },
      component: () => import("@/views/admin/AdminRole.vue"),
    },
  ],
}
      </pre>
    </section>
  </TContainer>
</template>

<script>
export default {
  name: "DocRoute"
};
</script>

<style lang="less" scoped>
.pre {
  font-size: 16px;
}
</style>

<template>
  <TContainer>
    <section slot="head">
      菜单权限 —— 在路由的元信息字段里配置好 roles 字段即可。
      <br />
      <br />
      <ul>
        <li>1.每一层的路由都需要配置角色权限。</li>
        <li>2.如果不配置，则所有的已登录角色都能进行访问。</li>
      </ul>
    </section>
    <section slot="default">
      <pre class="pre">
        <code class="javascript" v-hljs>
const routes = [
  {
    path: "/GithubChenHaihong",
    name: "Github",
    icon: "github",
    meta: { 
      title: "Github", 
      link: "https://github.com/chenhaihong/qqlh", 
      roles: [1], // 用于定义该页面可以访问的角色，为空、undefined、null时，任何已经登录的任何角色可以访问
    },
  },
];
        </code>
      </pre>
    </section>
  </TContainer>
</template>

<script>
export default { name: "DocPermission" };
</script>

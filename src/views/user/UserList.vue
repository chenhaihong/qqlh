<template>
  <TContainer>
    <p slot="head">这里提供了3个用于演示的角色</p>
    <template slot="default">
      <el-table :data="list" stripe border>
        <el-table-column prop="username" label="登录账号"></el-table-column>
        <el-table-column prop="nickname" label="昵称"></el-table-column>
        <el-table-column prop="roleName" label="角色"></el-table-column>
        <el-table-column prop="roles" label="拥有的角色值">
          <template v-slot:default="scope">{{
            scope.row.roles.join(", ")
          }}</template>
        </el-table-column>
        <el-table-column prop="permission" label="权限说明"></el-table-column>
        <el-table-column label="登录密码">任意密码</el-table-column>
      </el-table>
    </template>
  </TContainer>
</template>

<script>
export default {
  name: "UserList",
  data: () => ({
    list: [
      {
        username: "haihong",
        uid: 1,
        roles: [1, 2],
        roleName: "海宏",
        nickname: "haihong",
        permission: "可以访问所有菜单"
      },
      {
        username: "admin",
        uid: 2,
        roles: [1],
        roleName: "管理员",
        nickname: "admin",
        permission: "可以访问管理员角色的菜单"
      },
      {
        username: "doc",
        uid: 3,
        roles: [2],
        roleName: "阅读文档者",
        nickname: "doc",
        permission: "可以访问阅读文档者角色的菜单"
      }
    ]
  })
};
</script>

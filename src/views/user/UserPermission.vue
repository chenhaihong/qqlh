<template>
  <TContainer>
    <p slot="head">仅用于演示，任何操作都是无效的</p>
    <template slot="default">
      <el-table :data="list" stripe border>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleId" label="角色值"></el-table-column>
        <el-table-column prop="onManage" label="允许管理演示角色">
          <template slot-scope="scope">
            <el-switch
              active-text
              inactive-text
              v-model="scope.row.onManage"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="onDoc" label="允许阅读使用文档">
          <template slot-scope="scope">
            <el-switch
              active-text
              inactive-text
              v-model="scope.row.onDoc"
            ></el-switch>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </TContainer>
</template>

<script>
export default {
  name: "UserPermission",
  data: () => ({
    list: [
      {
        roleId: 1,
        roleName: "管理员",
        onDoc: false,
        onManage: true
      },
      {
        roleId: 2,
        roleName: "阅读文档者",
        onDoc: true,
        onManage: false
      }
    ]
  })
};
</script>

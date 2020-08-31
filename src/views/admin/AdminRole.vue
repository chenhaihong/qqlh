<template>
  <div>
    <section class="AdminRole container">
      <section class="box">
        <h1 class="title">
          <span>角色管理</span>
          <div class="fr">
            <el-button type="primary" style="float: right" @click="showAddRole">
              <i class="el-icon-plus"></i>
              <span>新增角色</span>
            </el-button>
          </div>
        </h1>
        <div class="content">
          <div class="table">
            <el-table :data="rolesData" stripe>
              <el-table-column prop="name" label="等级"></el-table-column>
              <el-table-column prop="rebate" label="管理优惠规则">
                <template scope="scope">
                  <el-switch
                    on-text
                    off-text
                    v-model="scope.row.rebate"
                  ></el-switch>
                </template>
              </el-table-column>
              <el-table-column prop="path" label="行程审核">
                <template scope="scope">
                  <el-switch
                    on-text
                    off-text
                    v-model="scope.row.path"
                  ></el-switch>
                </template>
              </el-table-column>

              <el-table-column prop="user" label="管理员工">
                <template scope="scope">
                  <el-switch
                    on-text
                    off-text
                    v-model="scope.row.user"
                  ></el-switch>
                </template>
              </el-table-column>
              <el-table-column prop="blacklist" label="黑名单用户">
                <template scope="scope">
                  <el-switch
                    on-text
                    off-text
                    v-model="scope.row.blacklist"
                  ></el-switch>
                </template>
              </el-table-column>
              <el-table-column prop="data" label="观看数据">
                <template scope="scope">
                  <el-switch
                    on-text
                    off-text
                    v-model="scope.row.data"
                  ></el-switch>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </section>
    </section>

    <div v-if="showAdminRoleAdd" class="AdminRoleAdd">
      <section class="shadow"></section>
      <section class="addBox">
        <h1 class="title">添加角色</h1>
        <div class="content">
          <el-form ref="formAdd" :model="formAdd" label-width="120px">
            <el-form-item label="角色名">
              <el-input
                v-model="formAdd.name"
                placeholder="请输入角色名"
                style="width: 200px;"
              ></el-input>
            </el-form-item>
            <el-form-item label="管理优惠规则">
              <el-switch on-text off-text v-model="formAdd.rebate"></el-switch>
            </el-form-item>
            <el-form-item label="行程审核">
              <el-switch on-text off-text v-model="formAdd.path"></el-switch>
            </el-form-item>
            <el-form-item label="管理员工">
              <el-switch on-text off-text v-model="formAdd.user"></el-switch>
            </el-form-item>
            <el-form-item label="黑名单用户">
              <el-switch
                on-text
                off-text
                v-model="formAdd.blacklist"
              ></el-switch>
            </el-form-item>
            <el-form-item label="观看数据">
              <el-switch on-text off-text v-model="formAdd.data"></el-switch>
            </el-form-item>
            <el-form-item>
              <el-button @click="onQuit">取消</el-button>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
            </el-form-item>
          </el-form>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminRole",
  data: () => ({
    rolesData: [
      {
        name: "一级管理员",
        rebate: true,
        path: true,
        user: true,
        blacklist: true,
        data: true
      },
      {
        name: "审核员",
        rebate: true,
        path: true,
        user: true,
        blacklist: true,
        data: true
      }
    ],
    showAdminRoleAdd: false,
    formAdd: {
      name: "",
      rebate: false,
      path: false,
      user: false,
      blacklist: false,
      data: false
    }
  }),
  props: [],
  components: {},
  computed: {},
  methods: {
    showAddRole() {
      this.showAdminRoleAdd = true;
    },
    switchRebate(scope) {
      scope.row.rebate = !scope.row.rebate;
    },
    switchPath(scope) {
      scope.row.path = !scope.row.path;
    },
    switchUser(scope) {
      scope.row.user = !scope.row.user;
    },
    switchBlacklist(scope) {
      scope.row.blacklist = !scope.row.blacklist;
    },
    switchData(scope) {
      scope.row.data = !scope.row.data;
    },
    onSubmit() {
      this.rolesData.push({
        name: this.formAdd.name,
        rebate: this.formAdd.rebate,
        path: this.formAdd.path,
        user: this.formAdd.user,
        blacklist: this.formAdd.blacklist,
        data: this.formAdd.data
      });
      this.showAdminRoleAdd = false;
      this.resetFormAdd();
    },
    onQuit() {
      this.showAdminRoleAdd = false;
      this.resetFormAdd();
    },
    resetFormAdd() {
      this.formAdd.name = "";

      this.formAdd.rebate = false;
      this.formAdd.path = false;
      this.formAdd.user = false;
      this.formAdd.blacklist = false;
      this.formAdd.data = false;
    }
  },
  watch: {},
  created() {}
};
</script>

<style lang="less" scoped>
.AdminRoleAdd {
  .addBox {
    @w: 400px;
    @h: 500px;

    z-index: 2001;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -(@w / 2);
    margin-top: -(@h / 2);
    width: @w;
    height: @h;
    background: #ffffff;
    border-radius: 3px;

    .title {
      margin-bottom: 20px;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      text-align: center;
      border-bottom: 1px solid #ddd;
    }
  }
}
</style>

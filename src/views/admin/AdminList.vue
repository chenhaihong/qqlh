<template>
  <div>
    <div class="AdminList container">
      <section class="box">
        <h1 class="title">
          <span>管理员列表</span>
          <div class="fr">
            <el-button type="primary" @click="addAdmin">
              <i class="el-icon-plus"></i>
              <span>新增管理员</span>
            </el-button>
          </div>
        </h1>
        <div class="content">
          <div class="table">
            <el-table :data="adminsData" stripe>
              <el-table-column prop="role" label="角色"></el-table-column>
              <el-table-column prop="cname" label="昵称"></el-table-column>
              <el-table-column
                prop="username"
                label="登录账号"
              ></el-table-column>
              <el-table-column
                prop="createTime"
                label="创建时间"
              ></el-table-column>
              <el-table-column
                prop="lastTime"
                label="上次登录时间"
              ></el-table-column>
              <el-table-column label="操作">
                <template scope="scope">
                  <el-button
                    size="small"
                    @click="handleEdit(scope.$index, scope.row)"
                    >编辑</el-button
                  >
                  <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </section>

      <div v-if="showAdminAdd" class="AdminAddWrapper">
        <section class="shadow"></section>
        <section class="addBox">
          <h1 class="title">添加管理员</h1>
          <div class="content">
            <el-form ref="formAdd" :model="formAdd" label-width="120px">
              <el-form-item label="用户名">
                <el-input
                  v-model="formAdd.username"
                  placeholder="请输入用户名"
                  style="width: 200px;"
                ></el-input>
              </el-form-item>
              <el-form-item label="昵称">
                <el-input
                  v-model="formAdd.cname"
                  placeholder="请输入昵称"
                  style="width: 200px;"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input
                  type="password"
                  v-model="formAdd.password1"
                  placeholder="请输入密码"
                  style="width: 200px;"
                ></el-input>
              </el-form-item>
              <el-form-item label="确认密码">
                <el-input
                  type="password"
                  v-model="formAdd.password2"
                  placeholder="请确认密码"
                  style="width: 200px;"
                ></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="formAdd.comment"
                  placeholder="请输入备注"
                  style="width: 200px;"
                ></el-input>
              </el-form-item>
              <el-form-item label="角色">
                <el-select
                  v-model="formAdd.role"
                  placeholder="请选择角色"
                  style="width: 200px;"
                >
                  <el-option label="一级管理员" value="一级管理员"></el-option>
                  <el-option label="审核员" value="审核员"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button @click="onAdminAddQuit">取消</el-button>
                <el-button type="primary" @click="onAdminAddSubmit"
                  >立即添加</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </section>
      </div>

      <div v-if="showAdminEdit" class="AdminEditWrapper">
        <section class="shadow"></section>
        <section class="addBox">
          <h1 class="title">编辑管理员</h1>
          <div class="content">
            <el-form ref="formEdit" :model="formEdit" label-width="120px">
              <el-form-item label="用户名">
                <el-input
                  v-model="formEdit.username"
                  placeholder="请输入用户名"
                  style="width: 200px;"
                ></el-input>
              </el-form-item>
              <el-form-item label="昵称">
                <el-input
                  v-model="formEdit.cname"
                  placeholder="请输入昵称"
                  style="width: 200px;"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input
                  type="password"
                  v-model="formEdit.password1"
                  placeholder="请输入密码"
                  style="width: 200px;"
                ></el-input>
              </el-form-item>
              <el-form-item label="确认密码">
                <el-input
                  type="password"
                  v-model="formEdit.password2"
                  placeholder="请确认密码"
                  style="width: 200px;"
                ></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="formEdit.comment"
                  placeholder="请输入备注"
                  style="width: 200px;"
                ></el-input>
              </el-form-item>
              <el-form-item label="角色">
                <el-select
                  v-model="formEdit.role"
                  placeholder="请选择角色"
                  style="width: 200px;"
                >
                  <el-option label="一级管理员" value="一级管理员"></el-option>
                  <el-option label="审核员" value="审核员"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button @click="onAdminEditQuit">取消</el-button>
                <el-button type="primary" @click="onAdminEditSubmit"
                  >立即修改</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminList",
  data: () => ({
    adminsData: [
      {
        role: "一级管理员",
        cname: "海宏",
        username: "chh",
        createTime: "2017年3月24日 10:30:10",
        lastTime: "2017年3月24日 10:35:10"
      },
      {
        role: "审核员",
        cname: "XXX",
        username: "XXX",
        createTime: "2017年3月24日 10:30:10",
        lastTime: "2017年3月24日 10:35:10"
      },
      {
        role: "审核员",
        cname: "FZX",
        username: "FZX",
        createTime: "2017年3月24日 10:30:10",
        lastTime: "2017年3月24日 10:35:10"
      }
    ],
    showAdminAdd: false,
    formAdd: {
      cname: "",
      username: "",
      password1: "",
      password2: "",
      comment: "",
      role: ""
    },
    showAdminEdit: false,
    formEdit: {
      index: "",

      cname: "",
      username: "",
      password1: "",
      password2: "",
      comment: "",
      role: ""
    }
  }),
  props: [],
  components: {},
  computed: {},
  methods: {
    addAdmin() {
      this.showAdminAdd = true;
    },
    onAdminAddQuit() {
      this.showAdminAdd = false;
    },
    onAdminAddSubmit() {
      this.adminsData.push({
        role: this.formAdd.role,
        cname: this.formAdd.cname,
        username: this.formAdd.username,
        createTime: "2017年3月24日 10:30:10",
        lastTime: "2017年3月24日 10:30:10"
      });
      this.showAdminAdd = false;
    },
    onAdminEditQuit() {
      this.showAdminEdit = false;
    },
    onAdminEditSubmit() {
      let index = this.formEdit.index;

      this.$set(this.adminsData, index, {
        role: this.formEdit.role,
        cname: this.formEdit.cname,
        username: this.formEdit.username,
        createTime: "2017年3月24日 10:30:10",
        lastTime: "2017年3月24日 10:35:10"
      });

      this.showAdminEdit = false;
    },
    handleEdit(index) {
      let admin = this.adminsData[index];

      this.showAdminEdit = true;
      this.formEdit = {
        index: index,

        cname: admin.cname,
        username: admin.username,
        password1: "",
        password2: "",
        comment: admin.comment,
        role: admin.role
      };
    },
    handleDelete(index) {
      this.adminsData.splice(index, 1);
    }
  },
  watch: {},
  created() {}
};
</script>

<style lang="less" scoped>
.AdminAddWrapper,
.AdminEditWrapper {
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
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      text-align: center;
      border-bottom: 1px solid #ddd;
    }
  }
}
</style>

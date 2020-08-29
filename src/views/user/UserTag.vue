
<template>
  <div>
    <div class="UserTag container">
      <section class="box">
        <h1 class="title">
          <span>用户标签</span>
          <div class="fr">
            <el-button type="primary" @click="onShowAddFormClick">
              <i class="el-icon-plus"></i>
              <span>新增标签</span>
            </el-button>
          </div>
        </h1>
        <div class="content">
          <div class="table">
            <el-table :data="tagsData" stripe>
              <el-table-column prop="name" label="标签名"></el-table-column>
              <el-table-column prop="note" label="备注"></el-table-column>
              <el-table-column label="操作">
                <template scope="scope">
                  <el-button size="small" @click="onShowEditFormClick(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click="onDeleteTagClick(scope.$index, scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </section>
    </div>

    <div v-if="isShowAdd" class="UserTagAddWrapper">
      <section class="shadow"></section>
      <section class="addBox">
        <h1 class="title">添加标签</h1>
        <div class="content">
          <el-form ref="formAdd" :model="formAdd" label-width="120px">
            <el-form-item label="标签名">
              <el-input v-model="formAdd.name" placeholder="请输入标签名" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="formAdd.note" placeholder="请输入备注" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="onQuitAddFormClick">取消</el-button>
              <el-button type="primary" @click="onSubmitAddFormClick">添加</el-button>
            </el-form-item>
          </el-form>
        </div>
      </section>
    </div>

    <div v-if="isShowEdit" class="UserTagEditWrapper">
      <section class="shadow"></section>
      <section class="addBox">
        <h1 class="title">编辑标签</h1>
        <div class="content">
          <el-form ref="formAdd" :model="formEdit" label-width="120px">
            <el-form-item label="标签名">
              <el-input v-model="formEdit.name" placeholder="请输入标签名" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="formEdit.note" placeholder="请输入备注" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="onQuitEditFormClick">取消</el-button>
              <el-button type="primary" @click="onSubmitEditFormClick">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </section>
    </div>
  </div>
</template>


<script>
export default {
  name: "UserTag",
  data: () => ({
    tagsData: [
      { name: "普通用户", note: "正常" },
      { name: "黑名单", note: "不获得返利" },
      { name: "VIP", note: "免费" }
    ],
    isShowAdd: false,
    formAdd: {
      name: "",
      note: ""
    },
    isShowEdit: false,
    formEdit: {
      index: "", //添加index字段，

      name: "",
      note: ""
    }
  }),
  props: [],
  components: {},
  computed: {},
  methods: {
    onShowAddFormClick() {
      this.isShowAdd = true;
    },
    onQuitAddFormClick() {
      this.isShowAdd = false;
    },
    onSubmitAddFormClick() {
      this.tagsData.push({
        name: this.formAdd.name,
        note: this.formAdd.note
      });

      this.isShowAdd = false;

      this.formAdd.name = "";
      this.formAdd.note = "";
    },

    onDeleteTagClick(index) {
      this.tagsData.splice(index, 1);
    },

    onShowEditFormClick(index, row) {
      this.formEdit.index = index;

      this.formEdit.name = row.name;
      this.formEdit.note = row.note;

      this.isShowEdit = true;
    },
    onQuitEditFormClick() {
      this.isShowEdit = false;
    },
    onSubmitEditFormClick() {
      let index = this.formEdit.index;

      this.$set(this.tagsData, index, {
        name: this.formEdit.name,
        note: this.formEdit.note
      });

      this.isShowEdit = false;

      this.formEdit.index = "";
      this.formEdit.name = "";
      this.formEdit.note = "";
    }
  },
  watch: {},
  created() {}
};
</script>

<style lang="less" scoped>
.UserTagAddWrapper,
.UserTagEditWrapper {
  .addBox {
    @w: 400px;
    @h: 260px;

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
<template>
  <div>
    <section class="UserList container">
      <section class="box">
        <h1 class="title">搜索条件</h1>
        <div class="content" style="margin-bottom: 0">
          <el-form
            :inline="true"
            :model="conditionForm"
            ref="conditionForm"
            label-width="100px"
          >
            <el-form-item label="车型" prop="carType">
              <el-checkbox-group v-model="conditionForm.carType">
                <el-checkbox
                  v-for="item in vehicle.bus"
                  :label="item.value"
                  :key="item.value"
                  name="carType"
                  >{{ item.label }}</el-checkbox
                >
              </el-checkbox-group>
              <el-checkbox-group v-model="conditionForm.carType">
                <el-checkbox
                  v-for="item in vehicle.truck"
                  :label="item.value"
                  :key="item.value"
                  name="carType"
                  >{{ item.label }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>
            <br />
            <el-form-item label="用户标签" prop="tag">
              <el-checkbox-group v-model="conditionForm.tag">
                <el-checkbox
                  v-for="item in tags"
                  :label="item.id"
                  :key="item.id"
                  name="tag"
                  >{{ item.name }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>
            <br />
            <el-form-item label="首次行驶时间">
              <el-col :span="11">
                <el-form-item prop="date1">
                  <el-date-picker
                    type="datetime"
                    placeholder="起始日期"
                    v-model="conditionForm.date1"
                    style="width: 180px;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="2" style="text-align: center;">至</el-col>
              <el-col :span="11">
                <el-form-item prop="date2">
                  <el-date-picker
                    type="datetime"
                    placeholder="结束日期"
                    v-model="conditionForm.date2"
                    style="width: 180px;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button @click="resetForm" style="margin-left: 50px"
                >重置</el-button
              >
              <el-button type="primary" @click="submitForm">立即搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
      </section>
    </section>

    <section class="UserList container" style="margin-top: 0;">
      <section class="box">
        <div class="content">
          <div class="table">
            <el-table :data="userData" stripe>
              <el-table-column prop="name" label="昵称"></el-table-column>
              <el-table-column prop="carNO" label="车牌号"></el-table-column>
              <el-table-column prop="carType" label="车型"></el-table-column>

              <el-table-column
                prop="firstTime"
                label="首次行程时间"
              ></el-table-column>
              <el-table-column
                prop="lastTime"
                label="最近行程时间"
              ></el-table-column>
              <el-table-column
                prop="totalMileage"
                label="累计行程"
              ></el-table-column>

              <el-table-column
                prop="runTimes"
                label="行驶次数"
              ></el-table-column>
              <el-table-column
                prop="totalToll"
                label="涉及总路费"
              ></el-table-column>
              <el-table-column
                prop="totalReward"
                label="总奖励金额"
              ></el-table-column>

              <el-table-column
                prop="passingRate"
                label="审批通过率"
              ></el-table-column>
              <el-table-column prop="tag" label="用户标签"></el-table-column>
              <el-table-column prop="note" label="用户备注"></el-table-column>

              <el-table-column label="操作">
                <template scope="scope">
                  <el-button
                    size="small"
                    @click="onShowUserEditClick(scope.row.id)"
                    >编辑</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagination">
            <el-pagination
              @current-change="onCurrentChange"
              :current-page="pagination.currentPage"
              :page-size="pagination.pageSize"
              layout="total, prev, pager, next, jumper"
              :total="pagination.total"
            ></el-pagination>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  name: "UserList",
  data: () => ({
    conditionForm: {
      carType: [],
      date1: "",
      date2: "",
      carNumber: "",
      tag: []
    },
    vehicle: {
      bus: [
        { value: "1.1", label: "客车 一型车" },
        { value: "1.2", label: "客车 二型车" },
        { value: "1.3", label: "客车 三型车" },
        { value: "1.4", label: "客车 四型车" }
      ],
      truck: [
        { value: "2.1", label: "货车 一型车" },
        { value: "2.2", label: "货车 二型车" },
        { value: "2.3", label: "货车 三型车" },
        { value: "2.4", label: "货车 四型车" },
        { value: "2.5", label: "货车 五型车" }
      ]
    },
    tags: [
      { id: 1, name: "普通用户", note: "正常" },
      { id: 2, name: "黑名单", note: "不获得返利" },
      { id: 3, name: "VIP", note: "免费" }
    ],
    userData: [
      {
        id: 1,
        name: "陈海宏",
        carNO: "粤A88888",
        carType: "客车 一型车",

        firstTime: "2017年4月20日11:20:30",
        lastTime: "2017年4月21日11:20:30",
        totalMileage: "800公里",

        runTimes: 10,
        totalToll: 300,
        totalReward: 50,

        passingRate: "100%",
        tag: "普通用户",
        note: "不获得返利"
      },
      {
        id: 2,
        name: "陈天下",
        carNO: "粤A99999",
        carType: "客车 一型车",

        firstTime: "2017年4月20日11:20:30",
        lastTime: "2017年4月21日11:20:30",
        totalMileage: "800公里",

        runTimes: 10,
        totalToll: 300,
        totalReward: 50,

        passingRate: "100%",
        tag: "普通用户",
        note: "不获得返利"
      },
      {
        id: 3,
        name: "陈地上",
        carNO: "粤A11111",
        carType: "客车 一型车",

        firstTime: "2017年4月20日11:20:30",
        lastTime: "2017年4月21日11:20:30",
        totalMileage: "800公里",

        runTimes: 10,
        totalToll: 300,
        totalReward: 50,

        passingRate: "100%",
        tag: "普通用户",
        note: "不获得返利"
      }
    ],
    pagination: {
      currentPage: 1,
      pageSize: 10,
      total: 100
    },
    showUserEdit: false,
    formEdit: {}
  }),
  props: [],
  components: {},
  computed: {},
  methods: {
    onCurrentChange() {},
    submitForm() {
      this.$refs["conditionForm"].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs["conditionForm"].resetFields();
    },
    onShowUserEditClick(id) {
      this.$router.push(`/user/list/${id}`);
    }
  },
  watch: {},
  created() {}
};
</script>

<style lang="less" scoped>
.UserList {
  .box {
    padding-top: 1px;

    .content {
      .table {
        margin-bottom: 20px;
      }

      .pagination {
        text-align: center;
      }
    }
  }
}
</style>

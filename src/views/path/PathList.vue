<template>
  <div class="PathList">
    <el-row>
      <el-col :span="24">
        <section class="searchBox">
          <h1 class="title">搜索类型</h1>
          <div class="content">
            <el-form
              :inline="true"
              :model="auditForm"
              :rules="rules"
              ref="auditForm"
            >
              <el-form-item label="选择车型" prop="vehicle">
                <el-select
                  v-model="auditForm.vehicle"
                  placeholder="客车/货车"
                  style="width: 180px;"
                >
                  <el-option-group
                    v-for="group in vehicle.groups"
                    :label="group.label"
                    :key="group.label"
                  >
                    <el-option
                      v-for="item in group.options"
                      :label="item.label"
                      :value="item.value"
                      :key="item.value"
                    ></el-option>
                  </el-option-group>
                </el-select>
              </el-form-item>
              <el-form-item label="选择日期">
                <el-col :span="11">
                  <el-form-item prop="date1">
                    <el-date-picker
                      type="date"
                      placeholder="起始日期"
                      v-model="auditForm.date1"
                      style="width: 180px;"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="2" style="text-align: center;">至</el-col>
                <el-col :span="11">
                  <el-form-item prop="date2">
                    <el-date-picker
                      type="date"
                      placeholder="结束日期"
                      v-model="auditForm.date2"
                      style="width: 180px;"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <br />
              <el-form-item label="输入车牌" prop="carNumber">
                <el-input
                  v-model="auditForm.carNumber"
                  placeholder="车牌号/行程ID"
                  style="width: 180px;"
                ></el-input>
              </el-form-item>
              <el-form-item label="选择站点">
                <el-col :span="11">
                  <el-form-item prop="station1">
                    <el-select
                      v-model="auditForm.station1"
                      placeholder="起始站点"
                      style="width: 180px;"
                    >
                      <el-option
                        v-for="item in station.starts"
                        :label="item.label"
                        :value="item.id"
                        :key="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="2" style="text-align: center;">至</el-col>
                <el-col :span="11">
                  <el-form-item prop="station2">
                    <el-select
                      v-model="auditForm.station2"
                      placeholder="结束站点"
                      style="width: 180px;"
                    >
                      <el-option
                        v-for="item in station.ends"
                        :label="item.label"
                        :value="item.id"
                        :key="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  icon="search"
                  @click="submitForm('auditForm')"
                  >查询</el-button
                >
              </el-form-item>
              <el-form-item>
                <el-button type="primary" icon="document">导出行程</el-button>
              </el-form-item>
            </el-form>
          </div>
        </section>
      </el-col>
    </el-row>

    <div style="margin-bottom: 20px"></div>

    <el-row>
      <el-col :span="24">
        <section class="tableBox">
          <el-tabs v-model="activeName" @tab-click="handleTabClick">
            <el-tab-pane label="全部行程" name="first">
              <div class="content">
                <div class="table">
                  <el-table
                    :data="all.data"
                    border
                    stripe
                    style="width: 100%"
                    :row-class-name="tableRowClassName"
                    @row-click="auditOne"
                  >
                    <el-table-column
                      prop="id"
                      label="行程ID"
                      width="110"
                    ></el-table-column>
                    <el-table-column
                      prop="name"
                      label="用户昵称"
                      width="100"
                    ></el-table-column>
                    <el-table-column
                      prop="carNumber"
                      label="车牌号"
                      width="100"
                    ></el-table-column>

                    <el-table-column
                      prop="carType"
                      label="车型"
                    ></el-table-column>
                    <el-table-column
                      prop="road"
                      label="行程路段"
                    ></el-table-column>
                    <el-table-column
                      prop="distance"
                      label="里程"
                    ></el-table-column>

                    <el-table-column
                      prop="roadFee"
                      label="涉及路费"
                    ></el-table-column>
                    <el-table-column
                      prop="rebateFee"
                      label="奖励金额"
                    ></el-table-column>
                    <el-table-column
                      prop="rebateType"
                      label="优惠方式"
                    ></el-table-column>

                    <el-table-column
                      prop="startTime"
                      label="开始时间"
                    ></el-table-column>
                    <el-table-column
                      prop="endTime"
                      label="结束时间"
                    ></el-table-column>
                    <el-table-column
                      prop="status"
                      label="审批状态"
                    ></el-table-column>

                    <el-table-column prop="operation" label="审批" width="180">
                      <template scope="scope">
                        <div
                          v-if="scope.row.status == '审核成功'"
                          style="color: #3BA4E2;"
                        >
                          {{ scope.row.auditor }} 批准通过
                        </div>
                        <div v-else-if="scope.row.status == '审核失败'">
                          审核未通过
                        </div>
                        <div v-else>
                          <el-button
                            :plain="true"
                            type="primary"
                            size="small"
                            @click.stop.prevent="passOne(scope.row.id)"
                            >通过</el-button
                          >
                          <el-button
                            :plain="true"
                            type="danger"
                            size="small"
                            @click.stop.prevent="failOne(scope.row.id)"
                            >不通过</el-button
                          >
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="pagination">
                  <el-pagination
                    @size-change="handleAllSizeChange"
                    @current-change="handleAllCurrentChange"
                    :current-page="all.pagination.currentPage"
                    :page-size="all.pagination.pageSize"
                    layout="total, prev, pager, next, jumper"
                    :total="all.pagination.total"
                  ></el-pagination>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="通过行程" name="second">
              <div class="content">
                <el-table :data="passed.data" stripe style="width: 100%">
                  <el-table-column prop="date" label="行程ID"></el-table-column>
                  <el-table-column
                    prop="name"
                    label="用户昵称"
                  ></el-table-column>
                  <el-table-column
                    prop="address"
                    label="车牌号"
                  ></el-table-column>
                  <el-table-column
                    prop="address"
                    label="车型"
                  ></el-table-column>
                  <el-table-column
                    prop="address"
                    label="行程路段"
                  ></el-table-column>

                  <el-table-column
                    prop="address"
                    label="里程"
                  ></el-table-column>
                  <el-table-column
                    prop="address"
                    label="涉及路费"
                  ></el-table-column>
                  <el-table-column
                    prop="address"
                    label="奖励金额"
                  ></el-table-column>
                  <el-table-column
                    prop="address"
                    label="优惠方式"
                  ></el-table-column>
                  <el-table-column
                    prop="address"
                    label="开始时间"
                  ></el-table-column>

                  <el-table-column
                    prop="address"
                    label="结束时间"
                  ></el-table-column>
                  <el-table-column
                    prop="address"
                    label="审批状态"
                  ></el-table-column>
                  <el-table-column
                    prop="address"
                    label="审批"
                  ></el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="待审批行程" name="third">
              <div class="content">
                <el-table :data="waiting.data" stripe style="width: 100%">
                  <el-table-column prop="date" label="行程ID"></el-table-column>
                  <el-table-column
                    prop="name"
                    label="用户昵称"
                  ></el-table-column>
                  <el-table-column
                    prop="address"
                    label="车牌号"
                  ></el-table-column>
                  <el-table-column
                    prop="address"
                    label="车型"
                  ></el-table-column>
                  <el-table-column
                    prop="address"
                    label="行程路段"
                  ></el-table-column>

                  <el-table-column
                    prop="address"
                    label="里程"
                  ></el-table-column>
                  <el-table-column
                    prop="address"
                    label="涉及路费"
                  ></el-table-column>
                  <el-table-column
                    prop="address"
                    label="奖励金额"
                  ></el-table-column>
                  <el-table-column
                    prop="address"
                    label="优惠方式"
                  ></el-table-column>
                  <el-table-column
                    prop="address"
                    label="开始时间"
                  ></el-table-column>

                  <el-table-column
                    prop="address"
                    label="结束时间"
                  ></el-table-column>
                  <el-table-column
                    prop="address"
                    label="审批状态"
                  ></el-table-column>
                  <el-table-column
                    prop="address"
                    label="审批"
                  ></el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="未通过行程" name="fourth">
              <div class="content">
                <el-table :data="failed.data" stripe style="width: 100%">
                  <el-table-column prop="date" label="行程ID"></el-table-column>
                  <el-table-column
                    prop="name"
                    label="用户昵称"
                  ></el-table-column>
                  <el-table-column
                    prop="address"
                    label="车牌号"
                  ></el-table-column>
                  <el-table-column
                    prop="address"
                    label="车型"
                  ></el-table-column>
                  <el-table-column
                    prop="address"
                    label="行程路段"
                  ></el-table-column>

                  <el-table-column
                    prop="address"
                    label="里程"
                  ></el-table-column>
                  <el-table-column
                    prop="address"
                    label="涉及路费"
                  ></el-table-column>
                  <el-table-column
                    prop="address"
                    label="奖励金额"
                  ></el-table-column>
                  <el-table-column
                    prop="address"
                    label="优惠方式"
                  ></el-table-column>
                  <el-table-column
                    prop="address"
                    label="开始时间"
                  ></el-table-column>

                  <el-table-column
                    prop="address"
                    label="结束时间"
                  ></el-table-column>
                  <el-table-column
                    prop="address"
                    label="审批状态"
                  ></el-table-column>
                  <el-table-column
                    prop="address"
                    label="审批"
                  ></el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
          </el-tabs>
        </section>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "PathList",
  data() {
    let regCarNumber = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/i;
    let regPathId = /^[A-Za-z0-9]+$/i;
    let validateCarNumber = (rule, value, callback) => {
      if (regCarNumber.test(value) || regPathId.test(value)) {
        callback();
      } else {
        callback(new Error("请输入车牌号/行程ID"));
      }
    };

    return {
      auditForm: {
        vehicle: "",
        date1: "",
        date2: "",
        carNumber: "",
        station1: "",
        station2: ""
      },
      rules: {
        vehicle: [{ required: true, message: "请选择车型", trigger: "change" }],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择起始日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择结束日期",
            trigger: "change"
          }
        ],
        carNumber: [
          { validator: validateCarNumber, required: true, trigger: "blur" }
        ],
        station1: [
          { required: true, message: "请选择起始站点", trigger: "change" }
        ],
        station2: [
          { required: true, message: "请选择结束站点", trigger: "change" }
        ]
      },
      vehicle: {
        groups: [
          {
            label: "客车",
            options: [
              { value: "1.1", label: "客车 一型车" },
              { value: "1.2", label: "客车 二型车" },
              { value: "1.3", label: "客车 三型车" },
              { value: "1.4", label: "客车 四型车" }
            ]
          },
          {
            label: "货车",
            options: [
              { value: "2.1", label: "货车 一型车" },
              { value: "2.2", label: "货车 二型车" },
              { value: "2.3", label: "货车 三型车" },
              { value: "2.4", label: "货车 四型车" },
              { value: "2.5", label: "货车 五型车" }
            ]
          }
        ]
      },
      station: {
        starts: [
          { id: "st1", label: "起始站点1" },
          { id: "st2", label: "起始站点2" }
        ],
        ends: [
          { id: "st3", label: "结束站点1" },
          { id: "st4", label: "结束站点2" }
        ]
      },
      activeName: "first",
      all: {
        data: [],
        pagination: {
          currentPage: 1,
          pageSize: 10,
          total: 100
        }
      },
      passed: {
        data: [],
        pagination: {
          currentPage: 1,
          pageSize: 10,
          total: 100
        }
      },
      waiting: {
        data: [],
        pagination: {
          currentPage: 1,
          pageSize: 10,
          total: 100
        }
      },
      failed: {
        data: [],
        pagination: {
          currentPage: 1,
          pageSize: 10,
          total: 100
        }
      }
    };
  },
  props: [],
  components: {},
  computed: {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleTabClick(tab) {
      console.log(tab.name);
    },
    handleAllSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleAllCurrentChange(val) {
      this.all.pagination.currentPage = val;
      console.log(`当前页: ${val}`);
    },
    tableRowClassName(row) {
      let status = row.status;
      let className = "";

      if (status == "审核成功") {
        className = "passed-row";
      } else if (status == "审核失败") {
        className = "failed-row";
      }

      return className;
    },
    auditOne(row) {
      this.$router.push(`/path/list/${row.id}`);
    },
    passOne() {
      this.$confirm(`确认审核通过？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnPressEscape: false,
        closeOnClickModal: false,
        type: "warning",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.isDoing = true; // 屏蔽取消按钮与关闭按钮

            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            setTimeout(() => {
              done();
              this.$message({
                message: "审核通过",
                type: "info"
              });

              setTimeout(() => {
                instance.isDoing = false;
                instance.confirmButtonLoading = false;
              }, 300);
            }, 3000);
          } else {
            if (!instance.isDoing) {
              done();
            } else {
              this.$message({
                message: "请等待，正在审核...",
                type: "warning"
              });
            }
          }
        }
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "执行成功!"
          });
        })
        .catch(() => {});
    },
    failOne() {
      this.$confirm(`确认审核不通过？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 3000);
          } else {
            done();
          }
        }
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "执行成功!"
          });
        })
        .catch(() => {});
    }
  },
  watch: {},
  created() {},
  mounted() {
    this.all.data = [
      {
        id: "AB001012",
        name: "王小虎",
        carNumber: "粤A88888",

        carType: "客车（一型车）",
        road: "机场——广州南",
        distance: "30公里",

        roadFee: "￥102.5",
        rebateFee: "￥20",
        rebateType: "无",

        startTime: "2017-03-16 12:20:20",
        endTime: "2017-03-16 13:20:20",
        status: "审核成功",

        auditor: "阿狸狼狼狼"
      },
      {
        id: "AB001013",
        name: "王小虎",
        carNumber: "粤A88888",

        carType: "客车（一型车）",
        road: "机场——广州南",
        distance: "30公里",

        roadFee: "￥102.5",
        rebateFee: "￥20",
        rebateType: "无",

        startTime: "2017-03-16 12:20:20",
        endTime: "2017-03-16 13:20:20",
        status: "待审核",

        auditor: ""
      },
      {
        id: "AB001014",
        name: "王小虎",
        carNumber: "粤A88888",

        carType: "客车（一型车）",
        road: "机场——广州南",
        distance: "30公里",

        roadFee: "￥102.5",
        rebateFee: "￥20",
        rebateType: "无",

        startTime: "2017-03-16 12:20:20",
        endTime: "2017-03-16 13:20:20",
        status: "审核失败",

        auditor: "阿狸狼狼狼"
      }
    ];
  }
};
</script>
<style lang="less" scoped>
.PathList {
  padding: 20px;

  .searchBox {
    padding-bottom: 1px;
    background: white;

    .title {
      height: 60px;
      line-height: 60px;
      font-size: 16px;
      text-indent: 20px;
      border-bottom: 1px solid #dddddd;
    }

    .content {
      margin: 20px 20px 0 20px;
    }
  }

  .tableBox {
    padding-bottom: 1px;
    // background: white;

    .el-tabs__item {
      height: 60px;
      line-height: 60px;
      font-size: 16px;
    }

    .el-table tr {
      cursor: pointer;
    }

    .el-table tr.passed-row {
      background: #e2f0e4;
    }

    .el-table tr.failed-row {
      background: #dddddd;
    }

    .content {
      // margin: 5px 20px 20px 20px;

      & > .table {
        margin-bottom: 20px;
      }

      & > .pagination {
        text-align: center;
      }
    }
  }
}
</style>

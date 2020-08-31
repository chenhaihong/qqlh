<template>
  <div class="RebateList">
    <el-row>
      <el-col :span="24">
        <section class="tableBox">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="全部" name="first">
              <div class="content">
                <div class="table">
                  <el-table :data="allData" stripe @row-click="rowClick">
                    <el-table-column prop="id" label="规则ID"></el-table-column>
                    <el-table-column
                      prop="type"
                      label="优惠方式"
                    ></el-table-column>
                    <el-table-column
                      prop="content"
                      label="优惠内容"
                    ></el-table-column>
                    <el-table-column
                      prop="vehicle"
                      label="生效车类"
                    ></el-table-column>

                    <el-table-column
                      prop="time"
                      label="时间段"
                    ></el-table-column>
                    <el-table-column
                      prop="road"
                      label="涉及路段"
                    ></el-table-column>
                    <el-table-column
                      prop="times"
                      label="触发次数"
                    ></el-table-column>
                    <el-table-column prop="running" label="是否生效">
                      <template scope="scope">
                        <div
                          class="switcher"
                          :class="{
                            'switcher-begin': !scope.row.running,
                            'switcher-end': scope.row.running
                          }"
                          @click.prevent.stop="switchClick(scope)"
                        >
                          <label class="switcher-aLabel"></label>
                          <div class="switcher-bar">
                            <div
                              class="switcher-bar-radius"
                              :style="{
                                'background-color': scope.row.running
                                  ? '#3CD341'
                                  : '#cccccc'
                              }"
                            ></div>
                          </div>
                          <label class="switcher-bLabel"></label>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="pagination">
                  <el-pagination
                    @current-change="handleAllCurrentChange"
                    :current-page="all.pagination.currentPage"
                    :page-size="all.pagination.pageSize"
                    layout="total, prev, pager, next, jumper"
                    :total="all.pagination.total"
                  ></el-pagination>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="已生效" name="second">
              <div class="content">
                <div class="table">
                  <el-table :data="runningData" stripe @row-click="rowClick">
                    <el-table-column prop="id" label="规则ID"></el-table-column>
                    <el-table-column
                      prop="type"
                      label="优惠方式"
                    ></el-table-column>
                    <el-table-column
                      prop="content"
                      label="优惠内容"
                    ></el-table-column>
                    <el-table-column
                      prop="vehicle"
                      label="生效车类"
                    ></el-table-column>

                    <el-table-column
                      prop="time"
                      label="时间段"
                    ></el-table-column>
                    <el-table-column
                      prop="road"
                      label="涉及路段"
                    ></el-table-column>
                    <el-table-column
                      prop="times"
                      label="触发次数"
                    ></el-table-column>
                    <el-table-column prop="running" label="是否生效">
                      <template scope="scope">
                        <div
                          class="switcher"
                          :class="{
                            'switcher-begin': !scope.row.running,
                            'switcher-end': scope.row.running
                          }"
                          @click.prevent.stop="switchClick(scope)"
                        >
                          <label class="switcher-aLabel"></label>
                          <div class="switcher-bar">
                            <div
                              class="switcher-bar-radius"
                              :style="{
                                'background-color': scope.row.running
                                  ? '#3CD341'
                                  : '#cccccc'
                              }"
                            ></div>
                          </div>
                          <label class="switcher-bLabel"></label>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="pagination">
                  <el-pagination
                    @current-change="handleRunningCurrentChange"
                    :current-page="running.pagination.currentPage"
                    :page-size="running.pagination.pageSize"
                    layout="total, prev, pager, next, jumper"
                    :total="running.pagination.total"
                  ></el-pagination>
                </div>
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
  name: "RebateList",
  data: () => ({
    activeName: "first",
    allData: [],
    runningData: [],

    all: {
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 3
      }
    },
    running: {
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 1
      }
    }
  }),
  props: [],
  components: {},
  computed: {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleAllCurrentChange(val) {
      this.all.pagination.currentPage = val;
      console.log(`当前页: ${val}`);
    },
    handleRunningCurrentChange(val) {
      this.running.pagination.currentPage = val;
      console.log(`当前页: ${val}`);
    },
    // rowClick(row, event, column) {
    rowClick(row) {
      let id = row.id;
      this.$router.push(`/rebate/list/${id}`);
    },
    switchClick(scope) {
      let running = scope.row.running;
      let subText = running ? `确认停止该规则吗？` : `确认启用该规则吗？`;

      this.$confirm(subText, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            setTimeout(() => {
              scope.row.running = !scope.row.running;
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
  created() {
    this.allData = [
      {
        id: "RL000001",
        type: "打折",
        content: "八折",
        vehicle: "客车（1、2、3） 货车（1、2、3、4）",
        time: "7:00 - 18:00",
        road: "全路段",
        times: 5000,
        running: true
      },
      {
        id: "RL000002",
        type: "打折",
        content: "八折",
        vehicle: "客车（1、2、3） 货车（1、2、3、4）",
        time: "7:00 - 18:00",
        road: "全路段",
        times: 5000,
        running: false
      },
      {
        id: "RL000003",
        type: "打折",
        content: "八折",
        vehicle: "客车（1、2、3） 货车（1、2、3、4）",
        time: "7:00 - 18:00",
        road: "全路段",
        times: 5000,
        running: false
      }
    ];

    this.runningData = [
      {
        id: "RL000001",
        type: "打折",
        content: "八折",
        vehicle: "客车（1、2、3） 货车（1、2、3、4）",
        time: "7:00 - 18:00",
        road: "全路段",
        times: 5000,
        running: true
      }
    ];
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.RebateList {
  padding: 20px;
  background: #ffffff;

  .tableBox {
    .el-tabs__item {
      height: 60px;
      line-height: 60px;
      font-size: 16px;
    }

    .el-table tr {
      cursor: pointer;
    }

    /*.el-table tr.passed-row {*/
    /*background: #e2f0e4;*/
    /*}*/

    /*.el-table tr.failed-row {*/
    /*background: #dddddd;*/
    /*}*/

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

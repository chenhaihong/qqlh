<template>
  <div class="PathComplaint">
    <div class="box">
      <el-row>
        <el-col :span="24">
          <section class="tableBox">
            <el-tabs v-model="activeName" @tab-click="handleTabClick">
              <el-tab-pane label="全部" name="first">
                <div class="content">
                  <div class="table">
                    <el-table :data="allData" stripe>
                      <el-table-column prop="id" label="ID"></el-table-column>
                      <el-table-column prop="user" label="发起人"></el-table-column>
                      <el-table-column prop="content" label="投诉内容"></el-table-column>
                      <el-table-column prop="admin" label="审批人"></el-table-column>
                      <el-table-column prop="time" label="时间"></el-table-column>
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
              <el-tab-pane label="已处理" name="second">
                <div class="content">
                  <div class="table">
                    <el-table :data="completeData" stripe>
                      <el-table-column prop="id" label="ID"></el-table-column>
                      <el-table-column prop="user" label="发起人"></el-table-column>
                      <el-table-column prop="content" label="投诉内容"></el-table-column>
                      <el-table-column prop="admin" label="审批人"></el-table-column>
                      <el-table-column prop="time" label="时间"></el-table-column>
                    </el-table>
                  </div>
                  <div class="pagination">
                    <el-pagination
                      @current-change="handleCompleteCurrentChange"
                      :current-page="complete.pagination.currentPage"
                      :page-size="complete.pagination.pageSize"
                      layout="total, prev, pager, next, jumper"
                      :total="complete.pagination.total"
                    ></el-pagination>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="未处理" name="third">
                <div class="content">
                  <div class="table">
                    <el-table :data="waitingData" stripe>
                      <el-table-column prop="id" label="ID"></el-table-column>
                      <el-table-column prop="user" label="发起人"></el-table-column>
                      <el-table-column prop="content" label="投诉内容"></el-table-column>
                      <el-table-column prop="admin" label="审批人"></el-table-column>
                      <el-table-column prop="time" label="时间"></el-table-column>
                    </el-table>
                  </div>
                  <div class="pagination">
                    <el-pagination
                      @current-change="handleWaitingCurrentChange"
                      :current-page="waiting.pagination.currentPage"
                      :page-size="waiting.pagination.pageSize"
                      layout="total, prev, pager, next, jumper"
                      :total="waiting.pagination.total"
                    ></el-pagination>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </section>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "PathComplaint",
  data: () => ({
    activeName: "first",
    allData: [],
    completeData: [],
    waitingData: [],
    all: {
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 3
      }
    },
    complete: {
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 1
      }
    },
    waiting: {
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
    handleTabClick(tab, event) {
      console.log(tab, event);
    },
    handleAllCurrentChange() {},
    handleCompleteCurrentChange() {},
    handleWaitingCurrentChange() {}
  },
  created() {}
};
</script>

<style lang="less" scoped>
.PathComplaint {
  padding: 20px;

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
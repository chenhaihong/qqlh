
<template>
  <div>
    <section class="UserDetail container">
      <section class="box">
        <h1 class="title">用户详情</h1>
        <div class="content">
          <el-row>
            <el-col :span="12">
              <table class="detail">
                <tr>
                  <th>用户名称</th>
                  <td>{{detail.name}}</td>
                </tr>
                <tr>
                  <th>用户车牌</th>
                  <td>{{detail.carNO}}</td>
                </tr>
                <tr>
                  <th>车型</th>
                  <td>{{detail.carType}}</td>
                </tr>
                <tr>
                  <th>用户首次行程时间</th>
                  <td>{{detail.firstTime}}</td>
                </tr>
                <tr>
                  <th>最近行驶时间</th>
                  <td>{{detail.lastTime}}</td>
                </tr>
                <tr>
                  <th>累计行程</th>
                  <td>{{detail.totalMileage}}</td>
                </tr>
                <tr>
                  <th>行驶次数</th>
                  <td>{{detail.runTimes}}</td>
                </tr>
                <tr>
                  <th>涉及总路费</th>
                  <td>{{detail.totalToll}}</td>
                </tr>
                <tr>
                  <th>总奖励金额</th>
                  <td>{{detail.totalReward}}</td>
                </tr>
                <tr>
                  <th>审批通过率</th>
                  <td>{{detail.passingRate}}</td>
                </tr>
              </table>
            </el-col>
            <el-col :span="12">
              <el-form :model="formEdit" ref="formEdit" label-width="100px">
                <el-form-item label="用户标签" prop="tag">
                  <el-select v-model="formEdit.tag" placeholder="请选择用户标签" style="width: 220px;">
                    <el-option
                      v-for="item in tags"
                      :label="item.name"
                      :value="item.id"
                      :key="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="用户备注" prop="note">
                  <el-input v-model="formEdit.note" style="width: 220px;"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button @click="onBackClick">返回列表</el-button>
                  <el-button type="primary" @click="onFormSubmitClick">保存并退出</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  name: "UserDetail",
  data: () => ({
    detail: {
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
    formEdit: {
      tag: 1,
      note: "不获得返利"
    },
    tags: [
      { id: 1, name: "普通用户", note: "正常" },
      { id: 2, name: "黑名单", note: "不获得返利" },
      { id: 3, name: "VIP", note: "免费" }
    ]
  }),
  props: [],
  components: {},
  computed: {},
  methods: {
    onBackClick() {
      this.$router.push("/user/list");
    },
    onFormSubmitClick() {
      this.$router.push("/user/list");
    }
  },
  watch: {},
  created() {}
};
</script>

<style lang="less" scoped>
.UserDetail {
  .detail {
    display: block;
    padding: 10px 0;
    line-height: 30px;

    tr {
      font-size: 14px;

      th {
        width: 180px;
        font-weight: bold;
      }

      td {
      }
    }
  }
}
</style>
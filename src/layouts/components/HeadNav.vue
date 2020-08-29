<template>
  <header class="head-nav">
    <router-link :to="{ path: '/home' }">
      <img class="logo" src="/assets/_bootstrap/home/image/headNav/logo.png" alt="阡阡路惠" />
    </router-link>
    <div class="userBox">
      <ul class="userBox-ul">
        <li class="profileBox">
          <div class="profile">
            <img class="head" :src="head" />
            <div class="roleInfo">
              <p class="name">{{name}}</p>
              <p class="role">{{role}}</p>
            </div>
          </div>
        </li>
        <li class="splitter"></li>
        <li class="quit">
          <a @click="quit">退出</a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
// import { GLOBAL_CLEAR_USER } from "../../../../store/global/mutation-types.js";

export default {
  name: "HeadNav",
  data: () => ({
    role: "广东 系统管理员",
    head: "/assets/_bootstrap/home/image/headNav/profile.png"
  }),
  computed: {
    name() {
      return this.$store.state.global.user.username || "匿名用户";
    }
  },
  watch: {},
  methods: {
    quit() {
      let title = "您确定要退出吗？";
      let desc = "退出前，请确认您的操作已经执行完毕。";
      this.$confirm(desc, title, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$router.push("/login");
          // USER_QUIT({
          //   success: response => {
          //     this.$store.dispatch(GLOBAL_CLEAR_USER);
          //     this.$router.push("/login");
          //   }
          // });
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="less" scoped>
.head-nav {
  @header-height: 60px;
  @header-background-color: #3ba4e2;

  .logo {
    margin-top: (@header-height - 38) / 2;
    margin-bottom: (@header-height - 38) / 2;
    margin-left: 25px;
    width: 134px;
    height: 38px;
    text-decoration: none;
  }

  //用户框，包含：我的收藏、个人信息框。
  .userBox {
    float: right;
    height: @header-height;

    .userBox-ul {
      height: @header-height;
      color: white;

      li {
        float: left;
        position: relative;
        height: @header-height;
        line-height: @header-height;

        &:hover {
          background-color: #3494e1;
        }
      }

      li.quit a {
        padding: 0 20px;
        display: inline-block;
        height: @header-height;
        font-size: 14px;
        color: white;
      }

      li.splitter {
        padding: 0;
        width: 2px;
        background: url(/assets/_bootstrap/home/image/headNav/splitter.png)
          center center no-repeat;
      }

      li.profileBox {
        .profile {
          padding: 0 20px;
          height: @header-height;

          .head {
            float: left;
            margin: 10px 10px 10px 0;
            width: 40px;
            height: 40px;
            border-radius: 100%;
          }

          .roleInfo {
            float: left;
            padding: 10px 0;
            max-width: 100px;
            height: 40px;

            p {
              height: 20px;
              line-height: 20px;

              &.name {
                font-weight: bold;
              }
              &.role {
                overflow: hidden;
                word-wrap: normal;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
          }
        } /** .profile end */
      }
    }
  }
}
</style>
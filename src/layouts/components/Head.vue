<template>
  <header class="head-nav">
    <router-link to="/">
      <img class="logo" :src="logo" :alt="alt" />
    </router-link>
    <ul class="userinfo">
      <li>
        <p>{{ userinfo.nickname }}</p>
        <div class="popover--profile">
          <img class="avatar" :src="userinfo.avatar" />
          <p>昵称：{{ userinfo.nickname }}</p>
          <p>角色：{{ userinfo.roleName }}</p>
        </div>
      </li>
      <li>
        <a class="quit" @click="quit">退出</a>
      </li>
    </ul>
  </header>
</template>

<script>
import { mapState } from "vuex";
import setting from "@/setting";

export default {
  name: "Head",
  data() {
    return {
      logo: setting.logo,
      alt: setting.name
    };
  },
  computed: { ...mapState("auth", ["userinfo"]) },
  methods: {
    quit() {
      let title = "您确定要退出吗？";
      let desc = "退出前，请确认您的操作已经执行完毕。";
      this.$confirm(desc, title, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const [err] = await this.$store.dispatch("auth/logout");
          if (!err) this.$router.push("/login");
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="less" scoped>
.head-nav {
  .logo {
    margin-top: (@header-height - @header-logo-height) / 2;
    margin-bottom: (@header-height - @header-logo-height) / 2;
    margin-left: (@header-height - @header-logo-height) / 2;
    height: @header-logo-height;
    text-decoration: none;
  }

  .userinfo {
    float: right;
    height: @header-height;
    color: @header-color;

    li {
      float: left;
      position: relative;
      display: block;
      padding: @header-userinfo-li-padding;
      height: @header-height;
      line-height: @header-height;
      height: @header-height;
      font-size: @header-userinfo-font-size;
      color: @header-userinfo-color;

      & > a.quit {
        color: @header-userinfo-color;
        position: relative;

        &::after {
          content: "";
          position: absolute;
          top: -20px;
          right: -10px;
          bottom: -20px;
          left: -10px;
        }
      }
      &:hover {
        background-color: @header-userinfo-li-hover-background-color;
        .popover--profile {
          display: block;
        }
      }
      &::after {
        position: absolute;
        left: 0;
        top: (@header-height - @header-userinfo-splitter-height) / 2;
        display: block;
        content: "";
        padding: 0;
        width: 1px;
        height: @header-userinfo-splitter-height;
        background-color: @header-userinfo-splitter-background-color;
      }
      &:first-child::after {
        display: none;
      }
    }
  }

  .popover--profile {
    display: none;
    position: absolute;
    top: @header-height - 1;
    right: 0;
    padding: @header-popver-padding;
    width: @header-popver-width;
    color: @header-popver-color;
    background-color: @header-popver-background-color;
    box-shadow: @header-popver-background-box-shadow;
    border-radius: 4px 0 4px 4px;

    .avatar {
      margin: 0 auto 20px;
      display: block;
      width: @header-popver-avatar-size;
      height: @header-popver-avatar-size;
    }

    p {
      margin-top: 16px;
      line-height: 16px;
      overflow: hidden;
      word-wrap: normal;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>

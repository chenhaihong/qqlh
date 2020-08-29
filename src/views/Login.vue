<template>
  <div class="login">
    <div class="wrapper">
      <p class="slogan">
        阡阡路惠后台管理系统
        <br />方便、快捷、精准
      </p>
      <input
        class="input"
        type="text"
        placeholder="用户名"
        v-model="username"
        v-focus="usernameFocus"
        @input="check"
        @blur="usernameFocus = false"
        @keyup.enter="login"
      />
      <input
        class="input"
        type="password"
        placeholder="密码"
        v-model="password"
        v-focus="passwordFocus"
        @input="check"
        @blur="passwordFocus = false"
        @keyup.enter="login"
      />
      <button
        class="btn"
        v-bind:class="{ isInRequest: isInRequest, cantRequest: cantRequest }"
        @click="login"
      >
        <template v-if="isInRequest">
          <i class="el-icon-loading"></i> 登陆中
        </template>
        <template v-else>登录</template>
      </button>
    </div>
    <div class="copyright">版权所有 ©2014 广州益车益路软件科技有限公司 粤ICP备05014984号</div>
  </div>
</template>

<script>
// import { GLOBAL_SET_USER } from "@/store/global/mutation-types";

export default {
  name: "login",
  data: () => ({
    username: "haihong",
    password: "",

    usernameFocus: true,
    passwordFocus: false,

    cantRequest: true,
    isInRequest: false
  }),
  directives: {
    focus: {
      inserted(el, { value }) {
        if (value) {
          el.focus();
        }
      },
      update(el, { value }) {
        if (value) {
          el.focus();
        }
      }
    }
  },
  methods: {
    check() {
      this.cantRequest = !(this.username && this.password);
    },

    login() {
      let username = this.username;
      let password = this.password;

      if (!username) {
        this.$message({
          type: "warning",
          message: `请输入用户名`
        });

        this.usernameFocus = true;

        return false;
      }

      if (!password) {
        this.$message({
          type: "warning",
          message: `请输入密码`
        });

        this.passwordFocus = true;

        return false;
      }

      this.isInRequest = true;
      this.$router.replace("/home");
      this.isInRequest = false;

      //TODO 请求登录接口
      // USER_LOGIN({
      //   data: {
      //     username,
      //     password
      //   },
      //   success: response => {
      //     if (response.success == true) {
      //       this.$store.dispatch(GLOBAL_SET_USER, {
      //         username: username,
      //         password: password,
      //         token: response.token
      //       });

      //       this.$router.push("/home");
      //     } else {
      //       this.$message({
      //         type: "error",
      //         message: `请求失败，请重试`
      //       });

      //       this.isInRequest = false;
      //     }
      //   },
      //   fail: () => {
      //     this.$message({
      //       type: "warning",
      //       message: `请求失败，请重试`
      //     });

      //     this.isInRequest = false;
      //   }
      // });
    }
  },
  beforeCreate() {},
  created() {}
};
</script>
<style lang="less" scoped>
.login {
  @mgb: 20px;
  @glay: #ccc;

  position: relative;
  margin: 100px auto 0 auto;
  padding-bottom: 1px;
  width: 500px;

  .wrapper {
    margin: auto;
    padding-top: 150px;
    width: 300px;
    text-align: center;
    background: url(/assets/_bootstrap/login/image/logo.png) top center
      no-repeat;
  }

  .slogan {
    margin-bottom: @mgb;
    font-size: 14px;
    line-height: 1.6;
    color: @glay;
  }

  .input {
    display: block;
    margin-bottom: 20px;
    width: 300px;
    height: 46px;
    line-height: 46px;
    font-size: 14px;
    text-indent: 12px;
    color: #ccc;
    border: solid 1px #d9d9d9;
    border-radius: 3px;
    outline: none;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

    &:focus {
      border-color: #20a0ff;
    }
  }

  .btn {
    display: block;
    margin-bottom: 40px;
    width: 300px;
    height: 46px;
    line-height: 46px;
    font-size: 16px;
    color: #fff;
    text-align: center;
    border: none;
    background: #03aaf4;
    border-radius: 3px;
    cursor: pointer;

    &.cantRequest {
      background: #cccccc;
      cursor: default;
    }

    &.isInRequest {
      background: #cccccc;
      cursor: default;
    }
  }

  .copyright {
    margin-bottom: 30px;
    width: 100%;
    font-size: 12px;
    color: @glay;
    text-align: center;
  }
}
</style>

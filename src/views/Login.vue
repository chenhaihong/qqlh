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
        v-focus
        @keyup.enter="login"
      />
      <input class="input" type="password" placeholder="密码" v-model="password" @keyup.enter="login" />
      <button class="btn" :class="{ disabled: disabled }" @click="login">
        <template v-if="isLoading">
          <i class="el-icon-loading"></i> 登陆中
        </template>
        <template v-else>登录</template>
      </button>
    </div>
    <div class="copyright">版权所有 ©2014 广州益车益路软件科技有限公司 粤ICP备05014984号</div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    isLoading: false,
    username: "haihong",
    password: "123123"
  }),
  computed: {
    disabled() {
      return this.isLoading || !this.username || !this.password;
    }
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      }
    }
  },
  methods: {
    async login() {
      if (this.disabled) return;
      this.isLoading = true;
      const { username, password } = this;
      const [err] = await this.$store.dispatch("auth/login", {
        username,
        password
      });
      this.isLoading = false;
      if (err) return;
      this.$message({
        type: "success",
        message: `登录成功`
      });
      const { redirect } = this.$route.query;
      this.$router.push(redirect ? decodeURIComponent(redirect) : "/");
    }
  }
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
    // color: #ccc;
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

    &.disabled {
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

<template>
  <div class="login">
    <div class="wrapper">
      <img class="login-logo" :src="loginLogo" :alt="name" />
      <p class="slogan">
        {{ name }}
        <br />
        {{ slogan }}
      </p>
      <input
        class="input"
        type="text"
        placeholder="用户名"
        v-model="username"
        v-focus
        @keyup.enter="login"
      />
      <input
        class="input"
        type="password"
        placeholder="密码"
        v-model="password"
        @keyup.enter="login"
      />
      <button class="btn" :class="{ disabled: disabled }" @click="login">
        <template v-if="isLoading">
          <i class="el-icon-loading"></i> 登陆中
        </template>
        <template v-else>登录</template>
      </button>
    </div>
    <div class="copyright">
      {{ copyright }}
      <br />
      <a
        v-if="icpCode"
        :href="icpLink"
        target="_blank"
        rel="noopener noreferrer"
        >{{ icpCode }}</a
      >
      <template v-if="icpCode && beianCode">
        <span> | </span>
      </template>
      <a
        v-if="beianCode"
        :href="beianLink"
        target="_blank"
        rel="noopener noreferrer"
        >{{ beianCode }}</a
      >
    </div>
  </div>
</template>

<script>
import setting from "@/setting";
export default {
  name: "Login",
  data: () => {
    const {
      name,
      copyright,
      loginLogo,
      slogan,
      icpCode,
      icpLink,
      beianCode,
      beianLink
    } = setting;
    return {
      name,
      copyright,
      loginLogo,
      slogan,
      icpCode,
      icpLink,
      beianCode,
      beianLink,
      isLoading: false,
      username: "haihong",
      password: "123123"
    };
  },
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
  margin: 80px auto 0 auto;
  padding-bottom: 1px;
  width: 500px;

  .wrapper {
    margin: auto;
    width: 300px;
    text-align: center;
  }

  .login-logo {
    margin-bottom: 20px;
    height: 120px;
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
    line-height: 22px;
    a {
      color: @glay;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>

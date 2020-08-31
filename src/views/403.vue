<template>
  <div class="Error404">
    <h1>403</h1>
    <p>您没有访问权限！</p>
    <p>
      {{ timeout }}秒后自动返回首页，
      <router-link to="/">立即返回</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: "Error404",
  data: () => ({
    timeout: 10,
    id: null
  }),
  props: [],
  components: {},
  computed: {},
  methods: {},
  created() {
    this.id = setInterval(() => {
      this.timeout--;

      if (this.timeout <= 0) {
        this.id && clearInterval(this.id);

        this.$router.push("/");
      }
    }, 1000);
  },
  beforeDestroy() {
    this.id && clearInterval(this.id);
  }
};
</script>

<style scoped style="less">
.Error404 {
  margin: 200px auto 0;
  width: 400px;
  text-align: center;
}

h1 {
  font-size: 100px;
  line-height: 1.4;
}

p {
  font-size: 20px;
  line-height: 2;
}

a {
  color: #03aaf4;
}
</style>

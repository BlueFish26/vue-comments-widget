<template>
  <div class="home">
    <div class="nav">
      <span class="login" v-if="!$auth.isAuthenticated" v-on:click="login">Login</span>
    </div>
    <post />
  </div>
</template>

<script>
import Post from "@/components/Post.vue";

export default {
  name: "Home",
  data() {
    return {
      id: ""
    };
  },
  methods: {
    login() {
      this.$auth.loginWithRedirect();
    }
  },
  components: {
    Post
  }
};
</script>
<style scoped>
.nav {
  display: flex;
  justify-content: flex-end;
  padding-left: 10px;
  padding-right: 10px;
}
.login {
  cursor: pointer;
}
</style>

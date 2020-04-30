<template>
  <div class="container">
    <div class="text">{{currentPost.text}}</div>
    <div class="add-comment" v-if="$auth.isAuthenticated">
      <textarea v-model="comment_text" cols="30" rows="5"></textarea>
      <button v-on:click="addCommentToPost">Post Comment</button>
    </div>
    <div v-if="post_id">
      <comments v-bind:post_id="post_id" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Comments from "@/components/Comments.vue";
export default {
  name: "post",
  components: {
    Comments
  },
  data() {
    return {
      message: "",
      token: "",
      post_id: "",
      comment_text: ""
    };
  },
  computed: {
    ...mapGetters(["currentPost"])
  },
  methods: {
    ...mapActions(["fetchPost", "postComment"]),
    async getToken() {
      return await this.$auth.getTokenSilently();
    },
    async addCommentToPost() {
      const user = this.$auth.user;
      const data = {
        email: user.email,
        name: user.name,
        text: this.comment_text
      };
      this.token = await this.getToken();
      await this.postComment({
        token: this.token,
        post_id: this.post_id,
        data
      });
      this.comment_text = "";
    }
  },
  async created() {
    this.post_id = "5ea7ac99eeaf49380f2ba30c";
    await this.fetchPost(this.post_id);
  }
};
</script>

<style scoped>
.container {
  max-width: 500px;
}
.text {
  text-align: left;
  margin: 20px 10px;
}
.add-comment {
  display: flex;
  flex-direction: column;
  margin: 20px 10px;
  justify-content: flex-start;
}
.add-comment textarea {
  margin-bottom: 10px;
  outline: none;
}
.add-comment button {
  height: 30px;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  max-width: 300px;
}
</style>
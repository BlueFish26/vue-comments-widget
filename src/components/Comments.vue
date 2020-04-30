<template>
  <div class="container">
    <ul class="comment-list">
      <li v-for="comment in commentsForPost" v-bind:key="comment._id">
        <b>{{comment.name}}</b>
        {{comment.text}}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "comments",
  props: {
    post_id: ""
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["commentsForPost"])
  },
  methods: {
    ...mapActions(["fetchComments"])
  },
  async created() {
    await this.fetchComments(this.post_id);
  }
};
</script>

<style scoped>
.container {
  max-width: 500px;
}
.comment-list {
  padding: 0;
  margin-left: 10px;
}
.comment-list li {
  text-align: left;
  list-style: none;
}
</style>
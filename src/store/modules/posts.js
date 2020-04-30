import axios from 'axios';

const state = {
  posts: [],
  post: {},
  comments: [],
};

const getters = {
  allPosts: (state) => state.posts,
  currentPost: (state) => state.post,
  commentsForPost: (state) => state.comments,
};

const actions = {
  async fetchPostsForApp({ commit }, token) {
    const response = await axios.get('/api/posts/vue-comment-widget', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    commit('populatePostsForApp', response.data);
  },
  async fetchPost({ commit }, id) {
    const response = await axios.get(`/api/posts/${id}`);
    commit('populatePost', response.data);
  },
  async fetchComments({ commit }, post_id) {
    const response = await axios.get(`/api/posts/comments/${post_id}`);
    commit('populateComments', response.data.comments);
  },
  async postComment({ commit }, { token, post_id, data }) {
    const response = await axios({
      method: 'post',
      url: `api/posts/comment/${post_id}`,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Add Comment Response', response.data);
    commit('addComment', response.data);
  },
};

const mutations = {
  populatePostsForApp: (state, posts) => (state.posts = posts),
  populatePost: (state, post) => {
    state.post = post;
  },
  populateComments: (state, comments) => {
    state.comments = comments;
  },
  addComment: (state, comment) => {
    state.comments.unshift(comment);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

<template>
  <div>
    <p>{{ comment?.content }}</p>
    <button @click="flagChange">수정</button>
    <div v-if="flag">
      <form @submit.prevent="updateCommunityComment">
        <label for="content">내용</label>
        <textarea type="text" id="content" v-model="content"></textarea>
        <input type="submit">
      </form>
    </div>
    <button @click.prevent="deleteCommunityComment">삭제</button>
    <hr>
  </div>
</template>

<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'CommunityCommentItem',
  data(){
    return{
      flag: false,
      content: this.comment.content
    }
  },
  props:{
    comment: Object,
    community: Object,
  },
  methods:{
    flagChange() {
      this.flag = !this.flag
    },
    deleteCommunityComment() {
      this.$emit('delete-comment', this.comment.id)
    },
    updateCommunityComment() {
      // const communityId = this.community.id
      // const commentId = this.comment.id
      // const content = this.content
      axios({
        method: 'put',
        url: `${API_URL}/community/comments/${ this.comment.id }/`,
        data:{
          // comment_pk : this.comment.id,
          community_pk : this.community.id,
          content : this.content
        },
        headers: {
            Authorization : `Token ${this.$store.state.token}`
        },
      })
        .then(() => {
          this.flagChange()
          this.$emit('get-comment', this.comment.id)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
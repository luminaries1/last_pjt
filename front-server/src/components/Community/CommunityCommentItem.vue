<template>
  <div>
    <span>{{ comment?.content }}</span>
    <button v-if="isUser" @click="flagChange" class="btn btn-outline-success button-border mx-2">수정</button>
    <div v-if="flag">
      <form @submit.prevent="updateCommunityComment">
        <label for="content">내용</label>
        <textarea type="text" id="content" v-model="content"></textarea>
        <input type="submit">
      </form>
    </div>
    <button v-if="isUser" @click.prevent="deleteCommunityComment" class="btn btn-outline-success button-border mx-2">삭제</button>
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
  computed:{
    isUser(){
      if(this.$store.state.userName === this.comment.username){
        return true
      }else{
        return false
      }
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
span {
  color: #e0e0e0;
}
</style>
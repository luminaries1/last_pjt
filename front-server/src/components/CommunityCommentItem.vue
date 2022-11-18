<template>
  <div>
    <p>{{ comment?.title }}</p>
    <p>{{ comment?.content }}</p>
    <button @click="flagChange">수정</button>
    <form @submit.prevent="updateCommunityComment"> </form>
    <button @click.prevent="deleteCommunityComment">삭제</button>
    <hr>
  </div>
</template>

<script>
// import axios from 'axios'
// const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'CommunityCommentItem',
  data(){
    return{
      flag: false
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
    }
  }
}
</script>

<style>

</style>
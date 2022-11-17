<template>
  <div>
    <h1>Detail</h1>
    <p>제목: {{ community?.title }}</p>
    <p>내용: {{ community?.content }}</p>
    <button @click="deleteCommunity">Delete</button>
    <button @click="updateCommunity">Update</button>
    <br>
    <hr>
    <br>
    <div>
      <h3>Comment</h3>
      <form @submit.prevent="createComment">
        <label for="content">내용</label>
        <textarea type="text" id="content" v-model="content"></textarea>
        <input type="submit">
      </form>
      <hr>
    </div>
    <CommunityCommentItem v-for="comment in comments"
    :key="comment.id"
    :comment="comment"
    />
  </div>
</template>
<script>
import CommunityCommentItem from '@/components/CommunityCommentItem.vue'
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'DetailCommunityView',
  components:{
    CommunityCommentItem
  },
  data(){
    return {
      community: null,
      comments: null,
      content: null,
    }
  } ,
  created(){
    this.getCommunityDetail()
    
  },
  methods:{
    getCommunityDetail() {
      axios({
        method: 'get',
        url: `${API_URL}/community/${this.$route.params.id}`
      })
        .then((res) => {
          this.community = res.data
          this.getCommunityComment()
        })
        .catch((err) => {
          console.log(err)
        })
    },

    deleteCommunity() {
      axios({
        method: 'delete',
        url: `${API_URL}/community/${ this.community.id }/`,
        headers: {
            Authorization : `Token ${this.$store.state.token}`
          },
      })
        .then(() => {
          // console.log('성공')
          this.$router.push({ name: 'CommunityView' })
        })
    },
    updateCommunity() {
      this.$router.push({
        name : 'UpdateCommunityView', 
        params: {id: this.community.id},
      })
    },
    getCommunityComment() {
      axios({
        method: 'get',
        url: `${API_URL}/community/${this.community.id}/comments/`,
        headers: {
            Authorization : `Token ${this.$store.state.token}`
          },
      })
        .then((res) => {
          this.comments = res.data
        })
        .catch((err) => {
          console.log(err)
        })
      },
      createComment() {
        const content = this.content
        axios({
          method: 'POST',
          url:`${API_URL}/community/${this.community.id}/comments/`,
          headers: {
            Authorization : `Token ${this.$store.state.token}`
          },
          data: {
            content: content
          }
        })
          .then(() => {
            this.getCommunityComment()
            this.content = null
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
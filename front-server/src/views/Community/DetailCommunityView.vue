<template>
  <div>
    <h1>Detail</h1>
    <p>제목: {{ community?.title }}</p>
    <p>내용: {{ community?.content }}</p>
    <button @click="deleteCommunity">Delete</button>
    <button @click="updateCommunity">Update</button>
    <button @click="returnCommunityView">Back</button>
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
    <CommunityCommentItem 
    :community="community"
    v-for="comment in getComment()"
    :key="comment.id"
    :comment="comment"
    @delete-comment = "deleteComment"
    />
  </div>
</template>
<script>
import CommunityCommentItem from '@/components/Community/CommunityCommentItem.vue'
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
  },
  computed:{

  },
  created(){
    this.getCommunityDetail()
    // this.getComment()
    
  },
  methods:{
    getCommunityDetail() {
      axios({
        method: 'get',
        url: `${API_URL}/community/${this.$route.params.id}`
      })
        .then((res) => {
          this.community = res.data
          // this.getCommunityComment()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getComment(){
      console.log(this.community.id)
      return this.$store.getters.getComment(this.community.id)
    },
    deleteCommunity() {
      this.$store.commit('DELETE_COMMUNITY', this.community.id)
      axios({
        method: 'delete',
        url: `${API_URL}/community/${ this.community.id }/`,
        headers: {
            Authorization : `Token ${this.$store.state.token}`
          },
      })
        .then(() => {
          this.$router.push({ name: 'CommunityView' })
        })
    },
    updateCommunity() {
      this.$router.push({
        name : 'UpdateCommunityView', 
        params: {id: this.community.id},
      })
    },
    // getCommunityComment() {
    //   axios({
    //     method: 'get',
    //     url: `${API_URL}/community/${this.community.id}/comments/`,
    //     headers: {
    //         Authorization : `Token ${this.$store.state.token}`
    //       },
    //   })
    //     .then((res) => {
    //       this.comments = res.data
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // },
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
            // this.getCommunityComment()
            this.getComment()
            this.content = null
          })
          .catch((err) => {
            console.log(err)
          })
      },
      returnCommunityView(){
        this.$router.push({ name: 'CommunityView' })
      },
      deleteComment(commentId){
        axios({
          method: 'delete',
          url: `${API_URL}/community/comments/${ commentId }/`,
          headers: {
              Authorization : `Token ${this.$store.state.token}`
          },
        })
          .then(() => {
            this.getCommunityComment()
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
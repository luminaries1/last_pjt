<template>
  <div class="container">
    <h1>Detail</h1>
    <p>제목: {{ community?.title }}</p>
    <p>내용: {{ community?.content }}</p>
    <button v-if="isUser" @click="deleteCommunity" class="btn btn-outline-success button-border mx-2">Delete</button>
    <button v-if="isUser" @click="updateCommunity" class="btn btn-outline-success button-border mx-2">Update</button>
    <button @click="returnCommunityView" class="btn btn-outline-success button-border mx-2">Back</button>
    <br>
    <hr>
    <br>
    <div>
      <h3>Comment</h3>
      <form @submit.prevent="createComment">
        <label for="content">내용</label>
        <textarea type="text" id="content" v-model="content"></textarea>
        <input type="submit" class="btn btn-outline-success button-border ms-3">
      </form>
      <hr>
    </div>
    <CommunityCommentItem 
    v-for="comment in comments"
    :key="comment.id"
    :comment="comment"
    :community="community"
    @delete-comment = "deleteComment"
    @get-comment = "getCommunityComment"
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
    getComments() {
      return this.$store.state.comments
    },
    isUser(){
      if(this.$store.state.userName === this.community.username){
        return true
      }else{
        return false
      }
    }
  },
  created(){
    this.getCommunityDetail()
    this.getCommunityComment()
  },
  methods:{
    getCommunityDetail() {
      axios({
        method: 'get',
        url: `${API_URL}/community/${this.$route.params.id}`
      })
        .then((res) => {
          this.community = res.data
        })
        .catch((err) => {
          console.log(err)
        })
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
      if(this.$store.state.userName === this.community.username){
        this.$router.push({
        name : 'UpdateCommunityView', 
        params: {id: this.community.id},
      })
      }else{
        alert('사용자가 다릅니다.')
      }

    },

    getCommunityComment() {
      // const id = this.$route.params.id
      // const payload = {
      //   id
      // }
      // this.$store.dispatch('getComments', payload)

      axios({
        method: 'get',
        url: `${API_URL}/community/${this.$route.params.id}/comments/`,
        headers: {
            Authorization : `Token ${this.$store.state.token}`
          },
      })
        .then((res) => {
          // console.log(res.data)
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
.container {
  min-height : 55em;
}

p {
  color: #e0e0e0;
}

h3 {
  color: #e0e0e0;
}

hr {
  border: 1px solid #129b79;
}


</style>
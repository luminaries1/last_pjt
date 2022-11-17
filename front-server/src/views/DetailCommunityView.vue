<template>
  <div>
    <h1>Detail</h1>
    <p>제목: {{ community?.title }}</p>
    <p>내용: {{ community?.content }}</p>
    <button @click="deleteCommunity">Delete</button>
    <button @click="updateCommunity">Update</button>
  </div>
</template>
<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'DetailCommunityView',
  data(){
    return {
      community: null,
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
        params: {id: this.community.id, title: this.community.title, content: this.community.content},
      })
    },
  }
}
</script>

<style>

</style>
<template>
  <div>
    <h1>UpdateCommunity</h1>
    <form @submit.prevent="updateCommunity">
      <label for="title">제목  </label>
      <input type="text" id="title" v-model.trim="title"><br>
      <label for="content">내용  </label>
      <textarea type="text" id="content" v-model="content"></textarea>
      <input type="submit">
    </form> 
  </div>
</template>
<!-- <router-link :to="{ name: 'DetailMovie', params: {id: movie.id} }">[Detail]</router-link> -->
<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'UpdateCommunityView',
  data() {
    return {
      id: null,
      title: null,
      content: null,
    }
  },
  created(){
    this.getCommuityDetail()
  },
  methods:{
    getCommuityDetail() {
      axios({
        method: 'get',
        url: `${API_URL}/community/${this.$route.params.id}/`,
        headers: {
            Authorization : `Token ${this.$store.state.token}`
          },
      })
        .then((res) => {
          this.id = res.data.id
          this.title = res.data.title
          this.content = res.data.content
        })
        .catch((err) => {
          console.log(err)
        })
    },
    updateCommunity() {
      const id = this.id
      const title = this.title
      const content = this.content

      const payload = {
        id,
        title,
        content
      }
      this.$store.dispatch('updateCommunity', payload)
      this.$router.push({ name: 'CommunityView' })
    }
  }
}
</script>

<style>

</style>
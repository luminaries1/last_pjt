<template>
  <div>
    <form @submit.prevent="createCommunity">
      <label for="title">title  </label>
      <input type="text" id="title" v-model.trim="title"><br>
      <label for="content">content  </label>
      <textarea type="text" id="content" v-model="content"></textarea>
      <input type="submit">
    </form> 
  </div>
</template>

<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

export default {
	name: 'CreateCommunityView',
  data() {
    return{
      title: null,
      content: null,
    }
  },
  methods: {
    createCommunity() {
      const title = this.title
      const content = this.content

      if(!title && !content){
        alert('Please fill the Blank')
        return
      }

      axios({
        method: 'POST',
        url: `${API_URL}/community/community-list/`,
        data: {
          title: title,
          content: content
        },
        headers: {
            Authorization : `Token ${this.$store.state.token}`
          },
      })
        .then((res) => {
          console.log(res)
          this.$router.push({name : 'CommunityView'})
        })
        .catch((err) => {
          console.log('안됨안됨')
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
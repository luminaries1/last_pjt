<template>
  <div>
    <form @submit.prevent="createCommunity">
      <label for="title">제목  </label>
      <input type="text" id="title" v-model.trim="title"><br>
      <label for="content">내용  </label>
      <textarea type="text" id="content" v-model="content"></textarea>
      <input type="submit">
    </form> 
    <button @click="returnCommunityView" class="btn btn-outline-success button-border mx-2">Back</button>
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
  computed : {
    isLogin() {
      return this.$store.getters.isLogin
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
        .then(() => {
          // console.log(res)
          this.$router.push({name : 'CommunityView'})
        })
        .catch((err) => {
          // console.log('안됨안됨')
          console.log(err)
        })
    },
    
    returnCommunityView(){
      this.$router.push({ name: 'CommunityView' })
    },

  }
}
</script>

<style>

</style>
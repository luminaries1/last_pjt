<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="community-box ">
      <form @submit.prevent>
        <div class="m-4 d-flex bd-highlight row">
          <span class="d-flex flex-row">
            <label for="title" class="form-label mb-3 d-flex text-start fs-2">Title</label>
            <button @click="returnCommunityView" class="btn btn-outline-success button-border ms-auto mb-4">Back</button>
          </span>
            <input type="text" id="title" class="input-height form-fontrol px-3 py-1" v-model.trim="title"><br>
        </div>
        <hr class="hr-width my-3">
        <div class="m-4 d-flex bd-highlight row">
          <div></div>
          <label for="content" class="form-label mb-3 text-start fs-2">Content</label>
          <textarea class="form-control px-3 py-2" type="text" id="content" rows="11" style="border-radius: 1em;" v-model="content"></textarea>
          <span class="d-flex row m-0 p-0" style="text-align:center">
            <button type="submit" @click="updateCommunity" class="btn btn-outline-success button-border mt-4">Submit</button>
          </span>
        </div>
      </form> 
    </div>
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
      this.$router.go(-1)
    },
    returnCommunityView(){
      this.$router.go(-1)
    },
  }
}
</script>

<style>

</style>
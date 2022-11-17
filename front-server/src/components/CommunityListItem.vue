<template>
  <div>
    <h5>{{ community.id }}</h5>
    <p>제목: {{ community.title }}</p>
    <p>내용: {{ community.title }}</p>
    <button @click="deleteCommunity">Delete</button>
    <hr>
  </div>
</template>
<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'CommunityListItem',
  props:{
    community: Object
  },
  data(){
    return{
      community_pk: this.community.id
    }
  },
  // ------------------------------------여기 만들다 끝남---------------------
  methods: {
    deleteCommunity() {
      axios({
        method: 'DELETE',
        url: `${API_URL}/community/${ this.community.id }/`,
        headers: {
            Authorization : `Token ${this.$store.state.token}`
          },
      })
        .then(() => {
          // console.log('성공')
          this.$store.dispatch('getCommunitys')
        })
    }
  }
}
</script>

<style>

</style>
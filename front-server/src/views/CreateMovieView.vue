
<template>
    <div>
      <h1>게시글 작성</h1>
      <form @submit.prevent="createMovie">
        <label for="title">title : </label>
        <input type="text" id="title" v-model.trim="title"><br>
        <label for="content">description : </label>
        <textarea id="content" cols="30" rows="10" v-model="description"></textarea><br>
        <label for="content">genre : </label>
        <textarea id="content" cols="30" rows="10" v-model="genre"></textarea><br>
        <label for="content">audience : </label>
        <textarea id="content" cols="30" rows="10" v-model="audience"></textarea><br>
        <label for="content">poster_url : </label>
        <textarea id="content" cols="30" rows="10" v-model="poster_url"></textarea><br>
        <label for="content">score : </label>
        <textarea id="content" cols="30" rows="10" v-model="score"></textarea><br>
        <label for="content">release_date : </label>
        <textarea id="content" cols="30" rows="10" v-model="release_date"></textarea><br>
        <input type="submit" id="submit">
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  const API_URL = 'http://127.0.0.1:8000'
  
  export default {
    name: 'CreateMovieView',
    data() {
      return {
        title : null,
        release_date : null,
        audience : null,
        genre : null,
        score : null,
        description : null
      }
    },
    methods: {
      createMovie() {
        const title = this.title
        const release_date = this.release_date
        const audience = this.audience
        const genre = this.genre
        const score = this.score
        const description = this.description

        if(!title && !release_date && !audience && !genre && !score && !description){
          alert('Please fill the Blank')
          return
        }
        
        axios({
          method : 'post',
          url : `${API_URL}/api/v1/movies/`,
          data : {title, release_date, audience, genre, score, description},
          headers: {
            Authorization : `Token ${this.$store.state.token}`
          },
        })
          .then(() => {
            this.$router.push({name : 'MovieView' })
          })
          .catch((err) =>{
            console.log(err)
          })
      }
    }
  }
  </script>
  
  <style>
  
  </style>
  
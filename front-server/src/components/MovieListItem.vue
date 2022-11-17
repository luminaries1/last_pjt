<template>
    <div>
      <p>{{ movie.id }}</p>
      <div class="card" style="width: 18rem;" @click="clickCard">
        <img :src="moviePosterUrl" class="card-img-top" alt="movies_image">
        <div class="card-body">
            <h5 class="card-title">{{ movie?.title }}</h5>
            <p class="card-text"></p>
            <!-- <form @submit.prevent="updateMovie">
                <p> <a href="" class="btn btn-primary">update</a> <input class="btn btn-danger" type="submit"
                value="delete"></p>
            </form> -->
        </div>
      </div>
      <hr>

    </div>
  </template>
  
  <script>
  export default {
    name: 'MovieListItem',
    props : {
      movie : Object,
    },
    data () {
      return {
        moviePosterUrl : null,
      }
    },
    created () {
      this.moviePosterUrl = 'https://image.tmdb.org/t/p/original' +  this.movie.poster_url
    },
    methods : {
      clickCard () {
        this.$router.push({name: 'DetailMovie', params: { id: this.movie.id }})
      }
    }
  }
  </script>
  
  <style>
  
  </style>
  
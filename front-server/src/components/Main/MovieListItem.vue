<template>
    <div class="d-flex-row justify-content-center align-items-center">
      <div class="card" style="width: 18rem; height: 33rem;" @click="clickCard">
        <img :src="moviePosterUrl" class="card-img-top" style="height : 27rem" alt="movies_image">
        <div class="card-body">
            <h5 class="card-title">{{ movie?.title }}</h5>
            <p class="card-text"></p>
        </div>
      </div>
      <hr class="border border-success border-1 opacity-75" style="width: 18rem;">
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
  
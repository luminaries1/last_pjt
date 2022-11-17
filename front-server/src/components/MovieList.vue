<template>
    <div class="article-list">
      <h3>Movie List</h3>
      <div class="row">
        <MovieListItem 
        v-for="movie in movies.slice(0,3)"
        :key="movie.id"
        :movie ="movie" 
        class="col-3 mx-4"/> 
      </div>
      <div class="row">
        <MovieListItem 
        v-for="movie in movies.slice(3,6)"
        :key="movie.id"
        :movie ="movie" 
        class="col-3 mx-4"/> 
      </div>
      
    </div>
  </template>
  
  <script>
  import MovieListItem from '@/components/MovieListItem.vue';
  export default {
    name: 'MovieList',
    components: {
      MovieListItem
    },
    props : {
      pageNum : Number
    },
    computed: {
      movies () {
        return this.$store.getters.getPartOfMovies(this.pageNum)
      }
    }
  }
  </script>
  
  <style>
  .article-list {
    text-align: start;
  }
  </style>
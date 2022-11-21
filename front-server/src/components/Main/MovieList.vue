<template>
    <div>
      <div class="row mx-0 px-0">
        <MovieListItem 
        v-for="movie in movies.slice(0,3)"
        :key="movie.id"
        :movie ="movie" 
        class="col-3 mx-4"/> 
      </div>
      <div class="row mx-0 px-0">
        <MovieListItem 
        v-for="movie in movies.slice(3,6)"
        :key="movie.id"
        :movie ="movie" 
        class="col-3 mx-4"/> 
      </div>
      
    </div>
  </template>
  
  <script>
  import MovieListItem from '@/components/Main/MovieListItem.vue';
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
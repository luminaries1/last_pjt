<template>
    <div>
      <h1>Movie Page</h1>
      <router-link :to="{ name : 'CreateMovieView' }">[CREATE]</router-link>
      <MovieList />
      <hr>
    </div>
  </template>
  
  <script>
  import MovieList from '@/components/MovieList.vue';

  export default {
    name: 'MovieView',
    components: {
      MovieList
    },
    computed:{
      isLogin() {
        return this.$store.getters.isLogin
      }
    },
    created() {
      this.getMovies()
    },
    methods: {
      getMovies() {
        if(this.isLogin)
        {
          this.$store.dispatch('getMovies')
        }
        else 
        {
          alert('Please Login')
          this.$router.push({name: 'LogInView'})
        }
      }
    }
  }
  </script>
  <style>
  </style>
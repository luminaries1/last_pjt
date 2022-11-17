<template>
    <div>
      <h1>Movie Page</h1>
      <!-- <router-link :to="{ name : 'CreateMovieView' }">[CREATE]</router-link> -->

      <div class="row">
        <SideBar class="col-2"/>
        <MovieList class="col-10" :pageNum="pageNum"/>
      </div>
      <hr>
      <div class="row">
        <div class="col-2"></div>
        <div class="row col-10">
        <button v-for="(index, num) in pageArr" :key="num" class="btn btn-secondary col-1 mx-3" @click="changePage(index)">{{ index }}</button>
        </div>
      </div>

      
    </div>
  </template>
  
  <script>
  import MovieList from '@/components/MovieList.vue';
  import SideBar from '@/components/SideBar.vue';
  import _ from "lodash";

  export default {
    name: 'MovieView',
    data () {
      return {
        pageNum : 1,
        pageArr : []
      }
    },
    components: {
      MovieList,
      SideBar
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
          this.pageArr = _.range(1,7)
        }
        else 
        {
          alert('Please Login')
          this.$router.push({name: 'LogInView'})
        }
      },
      changePage(index) {
        this.pageNum = index
      }
      
    }
  }
  </script>
  <style>
  </style>
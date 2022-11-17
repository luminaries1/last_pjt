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
        <button v-for="(num, index) in pageArr" :key="index" class="btn btn-secondary col-1 mx-1" @click="changePage(num)">{{ num }}</button>
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
        pageArr : [],
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
          const maxPage = this.$store.getters.getMoviesLength
          const maxShowPage = Math.min(this.pageNum +10 , maxPage)
          this.pageArr = _.range(this.pageNum,maxShowPage)
        }
        else 
        {
          alert('Please Login')
          this.$router.push({name: 'LogInView'})
        }
      },
      changePage(num) {
        this.pageNum = num
        const maxPage = this.$store.getters.getMoviesLength
        const maxShowPage = Math.min(this.pageNum +10 , maxPage)
        if (num == 1){

          this.pageArr = _.range(this.pageNum,maxShowPage)
        }else{
          this.pageArr = _.range(this.pageNum-1,maxShowPage-1)

        }
      }
      
    }
  }
  </script>
  <style>
  </style>
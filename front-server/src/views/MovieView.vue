<template>
    <div class="movieview mt-5 mx-0 px-0">
      <div class="row mx-0">
        <SideBar class="col-2"/>
        <MovieList class="col-10" :pageNum="pageNum"/>
      </div>
      <hr>
      <div class="row pb-4">
        <div class="col-2 mx-4 ps-4"></div>
        <div class="row col-8">
        <button v-for="(num, index) in pageArr" :key="index" class="btn btn-outline-primary col-1 mx-1" data-bs-toggle="button" aria-pressed="true" @click="changePage(num)">{{ num }}</button>
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
   .movieview{
    width: 99%;
   }
  </style>
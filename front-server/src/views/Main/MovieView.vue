<template>
    <div class="movieview mt-5 mx-0 px-0">
      <div class="row mx-0">
        <SideBar class="col-2"/>
        <MovieList class="col-10" :pageNum="pageNum"/>
      </div>
      <hr>
      <div class="row pb-4">
        <div class="col-2 mx-4 ps-4"></div>
        <div class="row col-8 ms-3">
        <button v-for="(num, index) in pageArr" :key="index" class="btn btn-outline-success button-border col-1 mx-1" :class="{ active : isChecked(num) }" @click="changePage(num)">{{ num }}</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import MovieList from '@/components/Main/MovieList.vue';
  import SideBar from '@/components/Main/SideBar.vue';
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
      },
      Movies(){
        return this.$store.state.movies
      }      
    },
    created() {
      if(this.$route.params.isSearch == 10)
      {
        this.changePage(1)
      }
      else{
        this.getMovies()
      }
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
        const maxShowPage = Math.min(this.pageNum +5, maxPage)

        const minMaxPage = Math.max(1, maxPage - 9)

        if (num < 7){
          if (maxPage >= 10){
            this.pageArr = _.range(1,11)
          }
          else{
            this.pageArr = _.range(1,maxPage)
          }
        }else if(num >=7 && num <= minMaxPage +4){
          this.pageArr = _.range(this.pageNum-5,maxShowPage)
        }
        else{
          this.pageArr = _.range(minMaxPage,maxPage+1)
        }
      },
      isChecked(index) {
        return index == this.pageNum
      }
      
    },
    watch: {
      Movies() {
        // console.log(val)
        this.changePage(1)
      }
    }
  }
  </script>
 
  <style>
   .movieview{
    width: 99%;
   }
   .button-border{
    border-radius: 2em;
   }
  </style>
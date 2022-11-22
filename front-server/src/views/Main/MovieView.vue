<template>
    <div class="movieview mt-5 mx-0 px-0">
      <div class="night">
        <div>

        <div v-for="num in arr" :key="num" class="shooting_star" @click="getShootingStar" style="cursor: pointer;"></div>
        </div>
      </div>
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
        arr : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
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
      },
      getShootingStar(){
        console.log('111')
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
 
<style lang="scss">
   .movieview{
    width: 99%;
    height: 97%;
    overflow-x:hidden;
    overflow-y:hidden;

   }
   .button-border{
    border-radius: 2em;
   }

   $shooting-time: 3000ms;

     .night {
       position: relative;
       width: 100%;
       height: 100%;  
       transform: rotateZ(45deg);
       // animation: sky 200000ms linear infinite;
     }
  
     .shooting_star {
       position: absolute;
       left: 0%;
       top: 0%;
       // width: 100px;
       height: 2px;
       background: linear-gradient(-45deg, rgba(95, 145, 255, 1), rgba(0, 0, 255, 0));
       border-radius: 999px;
       filter: drop-shadow(0 0 6px rgba(105, 155, 255, 1));
       animation:
         tail $shooting-time ease-in-out infinite,
         shooting $shooting-time ease-in-out infinite;
  
       &::before {
         content: '';
         position: absolute;
         top: calc(50% - 1px);
         right: 0;
         // width: 30px;
         height: 2px;
         background: linear-gradient(-45deg, rgba(0, 0, 255, 0), rgba(95, 145, 255, 1), rgba(0, 0, 255, 0));
         transform: translateX(50%) rotateZ(45deg);
         border-radius: 100%;
         animation: shining $shooting-time ease-in-out infinite;
       }
  
       &::after {
         // CodePen Error
         // @extend .shooting_star::before;
  
         content: '';
         position: absolute;
         top: calc(50% - 1px);
         right: 0;
         // width: 30px;
         height: 2px;
         background: linear-gradient(-45deg, rgba(0, 0, 255, 0), rgba(95, 145, 255, 1), rgba(0, 0, 255, 0));
         transform: translateX(50%) rotateZ(45deg);
         border-radius: 100%;
         animation: shining $shooting-time ease-in-out infinite;
         transform: translateX(50%) rotateZ(-45deg);
       }
  
       @for $i from 1 through 20 {
         &:nth-child(#{$i}) {
           $delay: random(9999)+0ms;
           top: calc(50% - #{random(4000) - 1500px});
           left: calc(50% - #{random(1000) + 0px});
           animation-delay: $delay;
           // opacity: random(50) / 100 + 0.5;
  
           &::before,
           &::after {
             animation-delay: $delay;
           }
         }
       }
     }
  
     @keyframes tail {
       0% {
         width: 0;
       }
  
       30% {
         width: 100px;
       }
  
       100% {
         width: 0;
       }
     }
  
     @keyframes shining {
       0% {
         width: 0;
       }
  
       50% {
         width: 30px;
       }
  
       100% {
         width: 0;
       }
     }
  
     @keyframes shooting {
       0% {
         transform: translateX(0);
       }
  
       100% { 
         transform: translateX(1500px);
       }
     }
  
     @keyframes sky {
       0% {
         transform: rotate(45deg);
       }
  
       100% {
         transform: rotate(45 + 360deg);
       }
     }
</style>
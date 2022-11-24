<template>
  <div class="movieview mt-5 mx-0 px-0">
    <div class="night">
      <div v-for="num in arr" :key="num" class="shooting_star" @click="getShootingStar" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#exampleModal"></div>
    </div>
    <div class="row mx-0">
      <SideBar class="col-2" />
      <MovieList class="col-10" :pageNum="pageNum" />
    </div>
    <hr>
    <div class="row pb-4">
      <div class="col-2 mx-4 ps-4"></div>
      <div class="row col-8 ms-3">
        <button v-for="(num, index) in pageArr" :key="index" class="btn btn-outline-success button-border col-1 mx-1"
          :class="{ active: isChecked(num) }" @click="changePage(num)">{{ num }}</button>
      </div>
    </div>
    
    <div>
      
    </div>
    <div class="modal modal-lg modal-box" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title" id="exampleModalLabel">THAT WAS A STROKE OF LUCK</h3>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" id="close"></button>
          </div>
          <div class="modal-body">
            <div>
            <div class="cards" id="modalCard">
              <div class="card">
                <img :src="relatedPosterUrl[0]" class="card-img-top" alt="movies_image" @click="clickCard(0)">
              </div>
              <div class="card">
                <img :src="relatedPosterUrl[1]" class="card-img-top" alt="movies_image" @click="clickCard(1)">
              </div>
              <div class="card">
                <img :src="relatedPosterUrl[2]" class="card-img-top" alt="movies_image" @click="clickCard(2)">
              </div>
              <div class="card">
                <img :src="relatedPosterUrl[3]" class="card-img-top" alt="movies_image" @click="clickCard(3)">
              </div>
              <div class="card">
                <img :src="relatedPosterUrl[4]" class="card-img-top" alt="movies_image" @click="clickCard(4)">
              </div>
            </div>
        </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-success button-border" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
  import MovieList from '@/components/Main/MovieList.vue';
  import SideBar from '@/components/Main/SideBar.vue';
  import _ from "lodash";
  import axios from 'axios'
  const API_URL = 'http://127.0.0.1:8000'


  export default {
    name: 'MovieView',
    data () {
      return {
        pageNum : 1,
        pageArr : [],
        arr : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
        relatedPosterUrl : [],
        relatedMoviesId : [],
      }
    },
    components: {
      MovieList,
      SideBar,
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
        this.getRandomMovie()
        console.log('111')
      },
      getRandomMovie() {
        this.relatedPosterUrl = []
        this.relatedMoviesId = []

        axios({
            method: 'get',
            url : `${API_URL}/api/v1/movies/randomMovie/`,
        })
        .then((res) => {
          console.log(res)
            for (let i=0 ; i <5 ; i++)
            {
            this.relatedPosterUrl.push('https://image.tmdb.org/t/p/original' +res.data[i].poster_url)
            this.relatedMoviesId.push(res.data[i].id)
            }
        })
        },
        clickCard (index) {
        document.getElementById('close').click();
        this.$router.push({name: 'DetailMovie', params: { id: this.relatedMoviesId[index] }})
        this.getMovieDetail()
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



     // card 관련

     .cards {
    display: flex;
    width: 798px;
    height: 400px;
    // padding-top: 50px;
    /* center the cards container (horizontally & vertically) */
    /* position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto; */
    /* center the items of flex (horizontally & vertically) */
}

#modalCard {
  width: 798px;
  opacity: 0;     
    -webkit-transition-property: opacity;        
    -webkit-transition-duration: 2s;      
    -webkit-transition-delay: 1s;    
    -webkit-transition-timing-function: ease;
}

#modalCard:hover {
  opacity: 1;  
}

.cards .card {
    width: 160px;
    height: 240px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    box-sizing: border-box;
    border-radius: 15px;
    /* overlap cards */
    margin: 0 -40px;
    /* if not hovered : dark */
    filter: brightness(50%);
    z-index: 0;
    transition: 
    transform .4s,
    filter .4s,
    z-index .2s;
}

.cards .card:hover {
    /* if hovered : light, move up(set on each item), stack on the top */
    filter: brightness(100%);
    box-shadow: 0 15px 20px 10px rgba(0, 0, 0, .15);
    z-index: 1;
}

.cards .card:nth-child(1) {
    background-color: #090a0f;
    /* rotate each card properly */
    transform: rotate(-30deg);
}

.cards .card:nth-child(1):hover {
    /* if hovered, move up a little bit */
    transform: rotate(-30deg) translateY(-30px);
}

.cards .card:nth-child(2) { 
    background-color: #090a0f;
    transform: rotate(-15deg) translateY(-60px);
}

.cards .card:nth-child(2):hover { 
    transform: rotate(-15deg) translateY(-90px);
}

.cards .card:nth-child(3) {
    background-color: #090a0f;
    transform: rotate(0deg) translateY(-90px);
}

.cards .card:nth-child(3):hover {
    transform: rotate(0deg) translateY(-120px);
}

.cards .card:nth-child(4) {
    background-color: #090a0f;
    transform: rotate(15deg) translateY(-60px);
}

.cards .card:nth-child(4):hover {
    transform: rotate(15deg) translateY(-90px);
}

.cards .card:nth-child(5) {
    background-color: #090a0f;
    transform: rotate(30deg);
}

.cards .card:nth-child(5):hover {
    transform: rotate(30deg) translateY(-30px);
}

.card_text {
    color :  #e0e0e0;
}

.modal {
  background-color :#090a0f;
  color : #e0e0e0;
  width: 70em;
  height: 50em;
  border: 2px solid #129b79;
}

.modal-body {
  background-color :#090a0f;
  color : #e0e0e0;
  // width: 900px;
}

.modal-footer {
  background-color :#090a0f;
  color : #e0e0e0;
  // width: 900px;
}

.modal-header {
  background-color :#090a0f;
  color : #e0e0e0;
  // width: 900px;
}

.modal-content{
  background-color :#090a0f;
  color : #e0e0e0;
  // width: 900px;
}

.modal-dialog {
  background-color :#090a0f;
  color : #e0e0e0;
  // width: 900px;
}
.button-border{
  border-radius: 2em;
}

.modal-box {
  width: 800px;
  height: 700px;
  position: fixed;
  top: 15vh;
  left: 30vw;
}
</style>
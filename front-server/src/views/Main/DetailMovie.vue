<template>
<div>
    <hr class="hr-border">
    <div class="d-flex detail-box justify-content-evenly mt-5">
      <div class="ms-5" style="width: 30rem; height: 20rem">
          <img :src="moviePosterUrl" class="card-img-top" alt="movies_image">
      </div>
      <div class="body-box me-5">
        
        <div class="related-box">
            <h3>Related recommend Movies</h3>
            <div class="cards">
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
        <hr class="hr-border">
        <h5 class="card-title">{{ movie?.title }}</h5>
        <p class="card-text">Audience: {{ movie?.audience }}</p>
        <p class="card-text">Release Date: {{ movie?.release_date }} </p>
        <p class="card-text">Genre: {{ movie?.genre }} </p>
        <p class="card-text">Score: {{ movie?.score }} </p>
        <p class="card-text"> {{ movie?.description }} </p>
        <p class="card-text"></p>
      </div>
    </div>
    <router-link :to="{ name: 'MovieView' }" class="btn btn-outline-success button-border m-4 position-absolute bottom-0 end-0">BACK</router-link>
</div>

</template>
  
<script>
  import axios from 'axios'
  const API_URL = 'http://127.0.0.1:8000'
  
  
  export default {
    name: 'DetailMovie',
    data() {
      return {
        movie : null,
        moviePosterUrl : null,
        relatedPosterUrl : [],
        relatedMoviesId : [],
      }
    },
    created() {
      this.getMovieDetail()
      // this.getRelatedMovie()
    },
    methods: {
      getMovieDetail() {
        axios({
          method : 'get',
          url : `${API_URL}/api/v1/movies/${this.$route.params.id}/`
        })
        .then((res)=>{
          this.movie = res.data
          this.moviePosterUrl = 'https://image.tmdb.org/t/p/original' +  this.movie.poster_url
        })
        .catch((err)=>{
          console.log(err)
        })
      },
      getRelatedMovie() {
        this.relatedPosterUrl = []
        this.relatedMoviesId = []

        axios({
          method: 'get',
          url : `${API_URL}/api/v1/movies/${this.$route.params.id}/related/`
        })
        .then((res) => {
          for (let i=0 ; i <5 ; i++)
          {
           this.relatedPosterUrl.push('https://image.tmdb.org/t/p/original' +res.data[i].poster_url)
           this.relatedMoviesId.push(res.data[i].id)
          }
        })
      },
      clickCard (index) {
        this.$router.push({name: 'DetailMovie', params: { id: this.relatedMoviesId[index] }})
        this.getMovieDetail()
      }
    },
    watch : {
      'moviePosterUrl' : 'getRelatedMovie'
    }
  }
  </script>

<style>
  .detail-box {
    height: 53em;
  }

  .card-text{
    color: #e0e0e0;
  }

  .card-title{
    color: #e0e0e0;
  }

  .body-box {
    width : 60rem;
  }
  .related-box {
    width : 60rem;
    height : 25rem;
  }

  .hr-border {
    border: 1px solid #129b79;
  }

  /* Card 부채꼴 모양 관련 스타일 */
  .cards {
  display: flex;
  width: 900px;
  height: 400px;
  padding-top: 50px;
  /* center the cards container (horizontally & vertically) */
  /* position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto; */
  /* center the items of flex (horizontally & vertically) */
  justify-content: center;
  align-items: center;
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
  background-color: #FF9999;
  /* rotate each card properly */
  transform: rotate(-30deg);
}

.cards .card:nth-child(1):hover {
  /* if hovered, move up a little bit */
  transform: rotate(-30deg) translateY(-30px);
}

.cards .card:nth-child(2) { 
  background-color: #FFB266;
  transform: rotate(-15deg) translateY(-60px);
}

.cards .card:nth-child(2):hover { 
  transform: rotate(-15deg) translateY(-90px);
}

.cards .card:nth-child(3) {
  background-color: #F9E95B;
  transform: rotate(0deg) translateY(-90px);
}

.cards .card:nth-child(3):hover {
  transform: rotate(0deg) translateY(-120px);
}

.cards .card:nth-child(4) {
  background-color: #79BCFF;
  transform: rotate(15deg) translateY(-60px);
}

.cards .card:nth-child(4):hover {
  transform: rotate(15deg) translateY(-90px);
}

.cards .card:nth-child(5) {
  background-color: #D894FF;
  transform: rotate(30deg);
}

.cards .card:nth-child(5):hover {
  transform: rotate(30deg) translateY(-30px);
}


  </style>
  
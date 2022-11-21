<template>
<div>
    <hr class="hr-border">
    <div class="d-flex detail-box justify-content-evenly mt-5">
      <div class="ms-5" style="width: 30rem; height: 20rem">
          <img :src="moviePosterUrl" class="card-img-top" alt="movies_image">
      </div>
      <div class="body-box me-5">
        
        <div class="related-box">

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
    

    <!-- <div> -->
        <!-- <form @submit.prevent=""> -->
            <!-- {{ comment_form.as_p }} -->
            <!-- commentview 를 새로 만들어야 할듯 하다 -->
            <!-- <input class="btn btn-warning" type="submit" value="댓글작성">
        </form>
        <hr>
        <ul>
            <CommentView v-for="comment in comments" :key="comment.id" />
        </ul>
    </div>
    <p><a class="btn btn-warning" href="">BACK</a></p> -->
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
        moviePosterUrl : null
      }
    },
    created() {
      this.getMovieDetail()
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
      updateMovie() {

      }
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
  </style>
  
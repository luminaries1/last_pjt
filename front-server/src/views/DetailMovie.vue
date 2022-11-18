<template>
<div>
    <hr>
    <div class="card" style="width: 50rem;">
        <img :src="moviePosterUrl" class="card-img-top" alt="movies_image">
        <div class="card-body">
            <h5 class="card-title">{{ movie?.title }}</h5>
            <p class="card-text">Audience: {{ movie?.audience }}</p>
            <p class="card-text">Release Date: {{ movie?.release_date }} </p>
            <p class="card-text">Genre: {{ movie?.genre }} </p>
            <p class="card-text">Score: {{ movie?.score }} </p>
            <p class="card-text"> {{ movie?.description }} </p>
            <p class="card-text"></p>
            <!-- <form @submit.prevent="updateMovie">
                <p> <a href="" class="btn btn-primary">update</a> <input class="btn btn-danger" type="submit"
                value="delete"></p>
            </form> -->
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
  
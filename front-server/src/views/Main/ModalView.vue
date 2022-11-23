<template>
    <div>
    
    <b-modal id="modal-1" size="lg"  title="THAT WAS STROKE OF LUCK" hide-footer hide-header header-bg-variant="dark"  body-class="modal_body_class" content-class="modal-body-class">
      <div class="related-box">
                <h3 class="card_text text-center">THAT WAS STROKE OF LUCK</h3>
                <div class="cards">
                  <div class="card">
                    <!-- <img src="" class="card-img-top" alt="movies_image"> -->
                    <img :src="relatedPosterUrl[0]" class="card-img-top" alt="movies_image" @click="clickCard(0)">
                  </div>
                  <div class="card">
                    <!-- <img src="" class="card-img-top" alt="movies_image"> -->
                    <img :src="relatedPosterUrl[1]" class="card-img-top" alt="movies_image" @click="clickCard(1)">
                  </div>
                  <div class="card">
                    <!-- <img src="" class="card-img-top" alt="movies_image"> -->
                    <img :src="relatedPosterUrl[2]" class="card-img-top" alt="movies_image" @click="clickCard(2)">
                  </div>
                  <div class="card">
                    <!-- <img src="" class="card-img-top" alt="movies_image"> -->
                    <img :src="relatedPosterUrl[3]" class="card-img-top" alt="movies_image" @click="clickCard(3)">
                  </div>
                  <div class="card">
                    <!-- <img src="" class="card-img-top" alt="movies_image"> -->
                    <img :src="relatedPosterUrl[4]" class="card-img-top" alt="movies_image" @click="clickCard(4)">
                  </div>
                </div>
            </div>
    </b-modal>
    </div>
    
    
    
</template>
    
<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

export default {
    name: 'ModalView',
    data () {
    return {
        relatedPosterUrl : [],
        relatedMOviesId : [],

    }
    },
    methods : {
    getRelatedMovie() {
        this.relatedPosterUrl = []
        this.relatedMoviesId = []

        axios({
            method: 'get',
            url : `${API_URL}/api/v1/movies/1/related/`
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
    created () {
    this.getRelatedMovie()
    } 

}
</script>
    
<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}


body {
    background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
    height: 100vh;
    overflow: hidden;
    display: flex;
    font-family: 'Anton', sans-serif;
    justify-content: center;
    align-items: center;
}

.cards {
    display: flex;
    width: 798px;
    height: 400px;
    padding-top: 50px;
    opacity: 0;     
    -webkit-transition-property: opacity;        
    -webkit-transition-duration: 2s;      
    -webkit-transition-delay: 1s;    
    -webkit-transition-timing-function: ease;
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

.cards:hover{
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

.modal_body_class {
    background-color: #090a0f;
    border: 2px solid #129b79;
}

.modal_content_class {
    background-color: #090a0f;
    border: 2px solid #129b79;
}

</style>
    
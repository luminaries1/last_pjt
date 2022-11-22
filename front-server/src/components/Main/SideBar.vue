<template>
  <div>
    <!-- <button class="btn btn-outline-success button-border my-2">Button</button>
    <br>
    <button class="btn btn-outline-success button-border my-2">Button</button>
    <br>
    <button class="btn btn-outline-success button-border my-2">Button</button>
    <br>
    <button class="btn btn-outline-success button-border my-2">Button</button>
    <br>
    <button class="btn btn-outline-success button-border my-2">Button</button>
    <br>
    <button class="btn btn-outline-success button-border my-2">Button</button> -->
    <div class="dropdown">
      <button type="button" class="btn btn-outline-success button-border my-2 mx-3 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" id="dropdownMenu1">
        Genre
      </button>
      
      <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
        <li><a class="dropdown-item" href="#" @click="clickGenre(0)">all</a></li>
        <li v-for="(genre, index) in genreArr" :key="index"><a class="dropdown-item" href="#" @click="clickGenre(genre)">{{ genre }}</a></li>
      </ul>

      <button type="button" class="btn btn-outline-success button-border my-2 mx-3 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" id="dropdownMenu2">
        Years
      </button>

      <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
        <li><a class="dropdown-item" href="#" @click="clickYears(0)">all</a></li>
        <li><a class="dropdown-item" href="#" @click="clickYears(1)">1960~2000</a></li>
        <li><a class="dropdown-item" href="#" @click="clickYears(2)">2000~2005</a></li>
        <li><a class="dropdown-item" href="#" @click="clickYears(3)">2005~2010</a></li>
        <!-- <li><hr class="dropdown-divider"></li> -->
        <li><a class="dropdown-item" href="#" @click="clickYears(4)">2010~2015</a></li>
        <li><a class="dropdown-item" href="#" @click="clickYears(5)">2015~2020</a></li>
        <li><a class="dropdown-item" href="#" @click="clickYears(6)">2020~2023</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
    name : 'SideBar',
    data () {
      return {
        genreArr : ['Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Romance', 'Science Fiction', 'TV Movie', 'Thriller', 'War', 'Western'],
        years : 0,
        genre : null,
      }
    },
    methods : {
      clickYears(yearIndex) {
        switch(yearIndex){
          case 1:
            this.years = yearIndex
            break
          case 2:
            this.years = yearIndex
            break
          case 3:
            this.years = yearIndex
            break
          case 4:
            this.years = yearIndex
            break
          case 5:
            this.years = yearIndex
            break
          case 6:
            this.years = yearIndex
            break
          default:
            this.years = 0
            break
        }
        this.$store.commit('UPDATE_YEAR', this.years)
        this.$store.dispatch('getMovies')
      },
      clickGenre(genre){
        if (genre == 0){
          this.genre = ''
        }else
        {
          this.genre = genre
        }
        this.$store.commit('UPDATE_GENRE', this.genre)
        this.$store.dispatch('getMovies')
      }
    }


}
</script>

<style>
 .button-border{
    border-radius: 2em;
  }

  .dropdown-menu {
    background-color:  #1b2735;
    border: 2px solid #129b79;;
    /* color: #e0e0e0; */
  }

  .dropdown-item {
    color: #e0e0e0;
  }
</style>
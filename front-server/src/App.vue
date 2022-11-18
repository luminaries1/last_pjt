<template>
  <div id="app">
    <nav class="navbar bg-light sticky-top">
      <div class="row container-fluid d-flex justify-content-between">
        <div class="col-6 d-flex justify-content-start">
          <h5 class = "mx-3">{{ getUserName }} </h5>
          <form class="d-flex">
            <input class="mx-3" type="search" placeholder="검색" aria-label="Search" v-model="searchContent">
            <button class="btn btn-outline-success" @click.prevent="clickSearch">검색</button>
          </form> 

        </div>
        <div class="col-6 d-flex justify-content-end">
          <router-link :to="{ name: 'MovieView' }" class="mx-3">Movies</router-link>  
          <router-link v-if="isLogin" :to="{ name: 'SignUpView' }" class="mx-3">SignUpPage </router-link>  
          <router-link v-if="isLogin" :to="{ name: 'LogInView' }" class="mx-3">LogInPage </router-link>
          <a href="" @click.prevent="clickOut" v-if="!isLogin" class="mx-3">LogOut  </a>     
          <router-link :to="{ name: 'CommunityView' }" class="mx-3">Community</router-link>
        </div>
      </div>
    </nav>
    <router-view ref="MovieView" />
  </div>
</template>

<script>
  export default {
    name: 'App',
    data () {
      return {
        searchContent : null,
      }
    },
    computed : {
      getUserName() {
        return  this.$store.getters.getUserName
      },
      isLogin() {
        return this.$store.state.token ? false : true
      }
    },
    methods : {
      clickOut() {
        this.$store.dispatch('logOut')
      },
      clickSearch() {
        if (this.searchContent){
          this.$refs.MovieView.changePage(1)
          this.$store.dispatch('getKeywordMovies', this.searchContent)
        }
        else{
          this.$store.dispatch('getMovies')
        }
      }
    } 
   
  }
  </script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

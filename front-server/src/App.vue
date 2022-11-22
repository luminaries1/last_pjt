<template>
  <div id="app">
    <nav class="navbar navbar-border sticky-top text-bg-primary mx-0 px-0">
      <div class="row container-fluid d-flex justify-content-between">
        <div class="col-6 d-flex justify-content-start">
          <h5 class = "mx-3 mt-2 fw-bold">{{ getUserName }} </h5>
          <form class="d-flex">
            <input class="mx-3 border-radius" type="search" placeholder="검색" aria-label="Search" v-model="searchContent">
            <button class="btn btn-outline-success" @click.prevent="clickSearch"><i class="fa-solid fa-magnifying-glass"></i></button>
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
    <transition name="slide-fade" mode="out-in">
      <router-view ref="MovieView" />
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data () {
      return {
        searchContent : null,
        arr : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
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
          this.$store.dispatch('getKeywordMovies', this.searchContent)
        }
        else{
          this.$refs.MovieView.getMovies()
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
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  
}

nav {
  padding: 30px;
  background-color: #ffffff;
}

input::-webkit-input-placeholder{
  background-image: url(https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-256.png) ;
  background-size: contain;
  background-position:  1px center;
  background-repeat: no-repeat;
  text-align: center;
  text-indent: 0;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration-line: none;
  background-color: transparent;
  color: #e0e0e0;
}

nav a.router-link-exact-active {
  color: #42b983;
  text-decoration-line: none;
}


.modal {
  width: 250px;
  height: 200px;
  padding: 10px;
  margin: 0 auto;
  margin-top: 20px;
  border-radius: 2%;
  background-color: #e0e0e0;
}
.navbar-border {
  border: 2px solid #129b79;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  border-radius: 2em;
}

.border-radius {
  border-radius: 2em;
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}

.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter {
  transform: translateX(10px);
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}
</style>

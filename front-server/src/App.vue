<template>
  <div id="app">
    <nav>
      <!-- <router-link :to="{ name: 'ArticleView' }">Articles</router-link> |  -->
      <span>{{ getUserName }}  </span> |
      <router-link :to="{ name: 'MovieView' }">Movies</router-link> | 
      <router-link v-if="isLogin" :to="{ name: 'SignUpView' }">SignUpPage |</router-link>  
      <router-link v-if="isLogin" :to="{ name: 'LogInView' }">LogInPage |</router-link>
      <a href="" @click.prevent="clickOut" v-if="!isLogin">LogOut  |</a>     
      <router-link :to="{ name: 'CommunityView' }">Community</router-link>

    </nav>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
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

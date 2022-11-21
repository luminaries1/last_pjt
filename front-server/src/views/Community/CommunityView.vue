<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="community-box position-relative">
      <h1 class="text-dark my-4">COMMUNITY</h1>
      <CommunityList />
      <router-link :to="{ name: 'CreateCommunityView' }" class="btn btn-outline-success button-border position-absolute bottom-0 end-0 m-4">Create</router-link>
    </div>
  </div>
</template>

<script>
import CommunityList from '@/components/Community/CommunityList.vue';


export default {
	name: 'CommunityView',
  components: {
    CommunityList
  },
  computed : {
    isLogin() {
      return this.$store.getters.isLogin
    }
  },
  created() {
    this.getCommunitys()
    this.getCommentAll()
  },
  methods: {
    getCommunitys() {
      // if(this.isLogin)
      // {
        this.$store.dispatch('getCommunitys')
      // }else{
      //   alert('Please Login')
      //   this.$router.push({name: 'LogInView'})
      // }
    },
    getCommentAll() {
      this.$store.dispatch('getCommentAll')
    }
  }
}
</script>

<style>
.container {
  height : 55em;
}

.community-box {
  height: 40em;
  width: 55em;
  background-color: #e0e0e0;;
  border: 2px solid #129b79;
  border-radius: 1em ;
}
</style>
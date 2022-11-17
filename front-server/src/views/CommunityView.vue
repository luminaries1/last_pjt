<template>
  <div>
		<h1>Community</h1>
    <router-link :to="{ name: 'CreateCommunityView' }">[Create]</router-link>
    <CommunityList />
	</div>
</template>

<script>
import CommunityList from '@/components/CommunityList.vue';


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
    }
  }
}
</script>

<style>

</style>
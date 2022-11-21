<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="community-box">
      <h1 class="text-dark my-4">COMMUNITY</h1>
      <CommunityList :pageNum="pageNum" />
      <button v-for="(num, index) in pageArr" :key="index" class="btn btn-outline-success button-border col-1 mx-1" :class="{ active : isChecked(num) }" @click="changePage(num)">{{ num }}</button>
      <router-link :to="{ name: 'CreateCommunityView' }" class="btn btn-outline-success button-border">Create</router-link>
    </div>
  </div>
</template>

<script>
import CommunityList from '@/components/Community/CommunityList.vue';
import _ from "lodash"

export default {
	name: 'CommunityView',
  data(){
    return{
      pageNum : 1,
      pageArr : []
    }
  },
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
    // this.getCommentAll()
  },
  methods: {
    getCommunitys() {
        this.$store.dispatch('getCommunitys')
        const maxPage = this.$store.getters.getCommunitysLength
        const maxShowPage = Math.min(this.pageNum+6, maxPage)
        console.log(maxPage, maxShowPage)
        this.pageArr = _.range(this.pageNum,maxShowPage+1)
        console.log(this.pageArr)
    },
    changePage(num) {
        this.pageNum = num
        const maxPage = this.$store.getters.getCommunitysLength
        const maxShowPage = Math.min(this.pageNum+6, maxPage)
        if (num == 1){
          this.pageArr = _.range(this.pageNum,maxShowPage+1)
        }else if(num+5 > maxPage){
          this.pageArr = _.range(this.pageNum-1, maxShowPage+1)
        }else{
          this.pageArr = _.range(this.pageNum-1, maxShowPage-1)
        }
    },
    isChecked(index) {
      return index == this.pageNum
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
<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="community-box">
      <span class="mx-4 mt-4 mb-3 d-flex flex-row">
        <h1 class="d-flex text-start ms-3 fs-2">COMMUNITY</h1>
        <p class="ms-auto" style="text-align:center"><router-link :to="{ name: 'CreateCommunityView' }" class="btn btn-outline-success button-border">Create</router-link></p>
      </span>
      <CommunityList :pageNum="pageNum"/>
      <button v-for="(num, index) in pageArr" :key="index" class="mt-2 btn btn-outline-success button-border col-1 mx-1" :class="{ active : isChecked(num) }" @click="changePage(num)">{{ num }}</button>
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
      pageArr : [],
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

h1 {
  color: #e0e0e0;
}


.community-box {
  height: 40em;
  width: 55em;
  background-color: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  border: 4px solid #129b79;
  border-radius: 1em ;
}


</style>
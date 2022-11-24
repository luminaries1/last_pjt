<template>
  <div class="big-container">
    <div>
      <div class="night">
          <div v-for="num in arr" :key="num" class="shooting_star" style="cursor: pointer;"></div>
      </div>
    </div>
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
      arr : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
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
        console.log(maxPage, this.pageNum)
        if(num-3 <= 1) {
          if (maxPage > 7){
            this.pageArr = _.range(1,8)
          }else{
            this.pageArr = _.range(1,maxPage+1)
          }
        }else if (this.pageNum+2 >= maxPage){
          if (maxPage < 7){
            this.pageArr = _.range(1,maxPage+1)
          }else{
            this.pageArr = _.range(maxPage-6,maxPage+1)

          }
        }else if (num-3 >1 && num+2 < maxPage){
          this.pageArr = _.range(this.pageNum-3, this.pageNum+4)
        }

    },
    isChecked(index) {
      return index == this.pageNum
    }
  }
}
</script>

<style lang="scss">
.big-container{
  height : 55em;
  
  z-index: 0;
  overflow-x: hidden;
  overflow-y: hidden ;
}

.container {
  height : 55em;
  
  z-index: 0;
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
  z-index: 10;
}

$shooting-time: 3000ms;

     .night {
       position: relative;
       width: 100%;
       height: 100%;  
       transform: rotateZ(45deg);
       z-index: 0;
       // animation: sky 200000ms linear infinite;
     }
  
     .shooting_star {
       position: absolute;
       left: 0%;
       top: 0%;
       // width: 100px;
       height: 2px;
       background: linear-gradient(-45deg, rgba(95, 145, 255, 1), rgba(0, 0, 255, 0));
       border-radius: 999px;
       filter: drop-shadow(0 0 6px rgba(105, 155, 255, 1));
       animation:
         tail $shooting-time ease-in-out infinite,
         shooting $shooting-time ease-in-out infinite;
  
       &::before {
         content: '';
         position: absolute;
         top: calc(50% - 1px);
         right: 0;
         // width: 30px;
         height: 2px;
         background: linear-gradient(-45deg, rgba(0, 0, 255, 0), rgba(95, 145, 255, 1), rgba(0, 0, 255, 0));
         transform: translateX(50%) rotateZ(45deg);
         border-radius: 100%;
         animation: shining $shooting-time ease-in-out infinite;
       }
  
       &::after {
         // CodePen Error
         // @extend .shooting_star::before;
  
         content: '';
         position: absolute;
         top: calc(50% - 1px);
         right: 0;
         // width: 30px;
         height: 2px;
         background: linear-gradient(-45deg, rgba(0, 0, 255, 0), rgba(95, 145, 255, 1), rgba(0, 0, 255, 0));
         transform: translateX(50%) rotateZ(45deg);
         border-radius: 100%;
         animation: shining $shooting-time ease-in-out infinite;
         transform: translateX(50%) rotateZ(-45deg);
       }
  
       @for $i from 1 through 20 {
         &:nth-child(#{$i}) {
           $delay: random(9999)+0ms;
           top: calc(50% - #{random(4000) - 1500px});
           left: calc(50% - #{random(1000) + 0px});
           animation-delay: $delay;
           // opacity: random(50) / 100 + 0.5;
  
           &::before,
           &::after {
             animation-delay: $delay;
           }
         }
       }
     }
  
     @keyframes tail {
       0% {
         width: 0;
       }
  
       30% {
         width: 100px;
       }
  
       100% {
         width: 0;
       }
     }
  
     @keyframes shining {
       0% {
         width: 0;
       }
  
       50% {
         width: 30px;
       }
  
       100% {
         width: 0;
       }
     }
  
     @keyframes shooting {
       0% {
         transform: translateX(0);
       }
  
       100% { 
         transform: translateX(1500px);
       }
     }
  
     @keyframes sky {
       0% {
         transform: rotate(45deg);
       }
  
       100% {
         transform: rotate(45 + 360deg);
       }
     }


</style>
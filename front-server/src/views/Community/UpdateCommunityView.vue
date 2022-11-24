<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div>
      <div class="night">
          <div v-for="num in arr" :key="num" class="shooting_star" style="cursor: pointer;"></div>
      </div>
    </div>
    <div class="community-box ">
      <form @submit.prevent>
        <div class="m-4 d-flex bd-highlight row">
          <span class="d-flex flex-row">
            <label for="title" class="form-label mb-3 d-flex text-start fs-2">Title</label>
            <button @click="returnCommunityView" class="btn btn-outline-success button-border ms-auto mb-4">Back</button>
          </span>
            <input type="text" id="title" class="input-height form-fontrol px-3 py-1" v-model.trim="title" maxlength="24"><br>
        </div>
        <hr class="hr-width my-3">
        <div class="m-4 d-flex bd-highlight row">
          <div></div>
          <label for="content" class="form-label mb-3 text-start fs-2">Content</label>
          <textarea class="form-control px-3 py-2" type="text" id="content" rows="11" style="border-radius: 1em;" v-model="content" maxlength="200"></textarea>
          <span class="d-flex row m-0 p-0" style="text-align:center">
            <button type="submit" @click="updateCommunity" class="btn btn-outline-success button-border mt-4">Submit</button>
          </span>
        </div>
      </form> 
    </div>
  </div>
</template>
<!-- <router-link :to="{ name: 'DetailMovie', params: {id: movie.id} }">[Detail]</router-link> -->
<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'UpdateCommunityView',
  data() {
    return {
      id: null,
      title: null,
      content: null,
      arr : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    }
  },
  created(){
    this.getCommuityDetail()
  },
  methods:{
    getCommuityDetail() {
      axios({
        method: 'get',
        url: `${API_URL}/community/${this.$route.params.id}/`,
        headers: {
            Authorization : `Token ${this.$store.state.token}`
          },
      })
        .then((res) => {
          this.id = res.data.id
          this.title = res.data.title
          this.content = res.data.content
        })
        .catch((err) => {
          console.log(err)
        })
    },
    updateCommunity() {
      const id = this.id
      const title = this.title
      const content = this.content

      const payload = {
        id,
        title,
        content
      }
      this.$store.dispatch('updateCommunity', payload)
      this.$router.go(-1)
    },
    returnCommunityView(){
      this.$router.go(-1)
    },
  }
}
</script>

<style lang="scss">

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
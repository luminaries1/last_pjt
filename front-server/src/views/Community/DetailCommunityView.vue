<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div>
      <div class="night">
          <div v-for="num in arr" :key="num" class="shooting_star" style="cursor: pointer;"></div>
      </div>
    </div>

    <div class="community-box p-2">
      <div>
        <div class="ms-3 me-3 mt-2 mb-1 d-flex justify-content-end" style="color:white">
          <span class="d-flex fs-4 pt-1 me-auto" >{{ community?.title }}</span>
          <button v-if="isUser" @click="deleteCommunity" class="btn btn-outline-success button-border ">Delete</button>
          <button v-if="isUser" @click="updateCommunity" class="btn btn-outline-success button-border mx-2" >Update</button>
          <button @click="returnCommunityView" class="btn btn-outline-success button-border ms-3">Back</button>
        </div>
      </div>
      <hr class="hr-width mt-3 my-2">
      <div>
        <div>
          <p class="text-start"><span class="d-flex mx-4 fs-5" style="height:9em;">{{ community?.content }}</span></p>
        </div>
      </div>
      <hr class="hr-width my-2">
      <div class="d-flex justify-content-end p-0">
        <form @submit.prevent="createComment" class="mt-2" >
          <div class="d-flex pb-1">
            <textarea class="form-label px-3 pt-1 mb-0" placeholder="Please write a comment here" maxlength="34" type="text" v-model="content" style="border-radius: 1em; width:30em; height:2em; resize:none;" ></textarea>
            <button type="submit" class="btn btn-outline-success button-border mx-2 p-1" style="height:2em;">Submit</button>
          </div>
        </form>
      </div>
      <hr id="comment-hr">
      <CommunityCommentItem 
      v-for="comment in getComments"
      :key="comment.id"
      :comment="comment"
      :community="community"
      @delete-comment = "deleteComment"
      @get-comment = "getCommunityComment"
      />
      <button v-for="(num,index) in pageArr" :key="index" class="btn btn-outline-success button-border col-1 mx-1" :class="{ active : isChecked(num) }" @click="changePage(num)">{{ num }}</button>
    </div>
  </div>
</template>
<script>
import CommunityCommentItem from '@/components/Community/CommunityCommentItem.vue'
import axios from 'axios'
import _ from "lodash"

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'DetailCommunityView',
  components:{
    CommunityCommentItem
  },
  data(){
    return {
      community: null,
      comments: null,
      content: null,
      pageNum: 1,
      pageArr: [],
      arr : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    }
  },
  computed:{
    getComments() {
      return this.$store.getters.getPartOfComments(this.pageNum)
    },
    getAllComment(){
      return this.$store.state.comments
    },
    isUser(){
      if(this.community)
      {
        if(this.$store.state.userName === this.community.username){
          return true
        }else{
          return false
        }
      }
      else{
        return false
      }
    }
  },
  created(){
    this.getCommunityDetail()
    this.getCommunityComment()
  },
  watch:{
    getAllComment (){
      this.changePage(1)
    }
  },
  methods:{
    getCommunityDetail() {
      axios({
        method: 'get',
        url: `${API_URL}/community/${this.$route.params.id}`
      })
      .then((res) => {
        this.community = res.data
      })
      .catch((err) => {
        console.log(err)
      })
    },
    
    deleteCommunity() {
      this.$store.commit('DELETE_COMMUNITY', this.community.id)
      axios({
        method: 'delete',
        url: `${API_URL}/community/${ this.community.id }/`,
        headers: {
          Authorization : `Token ${this.$store.state.token}`
        },
      })
        .then(() => {
          this.$router.push({ name: 'CommunityView' })
        })
      },
      
      updateCommunity() {
        if(this.$store.state.userName === this.community.username){
          this.$router.push({
            name : 'UpdateCommunityView', 
            params: {id: this.community.id},
          })
        }else{
          alert('사용자가 다릅니다.')
        }
        
      },
      
      getCommunityComment() {
        this.$store.dispatch('getComments', this.$route.params.id)
        const maxPage = this.$store.getters.getCommentsLength
        const maxShowPage = Math.min(this.pageNum+6, maxPage)
        this.pageArr = _.range(this.pageNum,maxShowPage+1)
      },

      isChecked(index){ 
        return index == this.pageNum
      },
      
      changePage(num) {
        this.pageNum = num
        const maxPage = this.$store.getters.getCommentsLength
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
      this.comments=this.$store.getters.getPartOfComments(this.pageNum)
    },
    createComment() {
      const content = this.content
      axios({
        method: 'POST',
        url:`${API_URL}/community/${this.community.id}/comments/`,
        headers: {
          Authorization : `Token ${this.$store.state.token}`
        },
        data: {
          content: content
        }
      })
        .then(() => {
          this.getCommunityComment()
          this.content = null
        })
        .catch((err) => {
          console.log(err)
        })
    },

    returnCommunityView(){
      this.pageArr=[]
      this.$router.push({ name: 'CommunityView' })
    },

    deleteComment(commentId){
      axios({
        method: 'delete',
        url: `${API_URL}/community/comments/${ commentId }/`,
        headers: {
            Authorization : `Token ${this.$store.state.token}`
        },
      })
        .then(() => {
          this.getCommunityComment()
        })
        .catch((err) => {
          console.log(err)
        })
      }
    }
  }

</script>

<style lang="scss">
.container {
  min-height : 55em;
}

p {
  color: #e0e0e0;
}

h3 {
  color: #e0e0e0;
}


.hr-width{
  width: 52em;
  margin-left : auto;
  margin-right : auto;
  border: 1px solid #129b79;
}

.container {
  height : 55em;
}

.community-box {
  height: 40em;
  width: 55em;
  background-color: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  border: 4px solid #129b79;
  border-radius: 1em ;
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
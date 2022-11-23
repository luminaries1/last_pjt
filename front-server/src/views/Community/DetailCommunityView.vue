<template>
  <div class="container d-flex justify-content-center align-items-center">
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
            <textarea class="form-label px-3 pt-1 mb-0" placeholder="Please write a comment here" type="text" v-model="content" style="border-radius: 1em; width:30em; height:2em; resize:none;" ></textarea>
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
      pageArr: []
    }
  },
  computed:{
    getComments() {
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
  methods:{
    getCommunityDetail() {
      axios({
        method: 'get',
        url: `${API_URL}/community/${this.$route.params.id}`
      })
        .then((res) => {
          console.log('성공')
          this.community = res.data
        })
        .catch((err) => {
          console.log('실패')
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
      const maxShowPage = Math.min(this.PageNum+6, maxPage)
      console.log(maxPage,maxShowPage)
      this.pageArr = _.range(this.pageNum,maxShowPage+1)
      console.log(this.pageArr)
      // const id = this.$route.params.id
      // const payload = {
      //   id
      // }
      // this.$store.dispatch('getComments', payload)

      // axios({
      //   method: 'get',
      //   url: `${API_URL}/community/${this.$route.params.id}/comments/`,
      //   headers: {
      //       Authorization : `Token ${this.$store.state.token}`
      //     },
      // })
      //   .then((res) => {
      //     // console.log(res.data)
      //     this.comments = res.data
      //   })
      //   .catch((err) => {
      //     console.log(err)
      //   })
    },
// -------------------------여기까지 만들었음-----------------------------
    isChecked(index){ 
      return index == this.pageNum
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

<style>
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


</style>
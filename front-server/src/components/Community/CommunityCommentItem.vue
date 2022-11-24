<template>
  <div>
  <div class="d-flex mb-2">
    <span v-if="!flag" class="ms-3 me-auto">{{ comment?.content }}</span>
    <div v-show="flag" class="ms-3 me-auto">
        <input type="text" class="ps-2" v-model="content" style="width: 35em; border-radius:1em;" maxlength="34">
        <button v-if="isUser" @click="updateCommunityComment" class="btn btn-outline-success button-border mx-2 btn-sm">submit</button>
    </div>
    <div>
      <button v-if="isUser"  @click="flagChange" class="btn btn-outline-success button-border mx-2 btn-sm">Update</button>
      <button v-if="isUser" @click.prevent="deleteCommunityComment" class="btn btn-outline-success button-border mx-2 btn-sm">Delete</button> 
    </div>
  </div>
  <hr id="comment-hr">
  </div>
</template>

<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'CommunityCommentItem',
  data(){
    return{
      flag: false,
      content: this.comment.content
    }
  },
  computed:{
    isUser(){
      if(this.$store.state.userName === this.comment.username){
        return true
      }else{
        return false
      }
    }
  },
  props:{
    comment: Object,
    community: Object,
  },
  methods:{
    flagChange() {
      this.flag = !this.flag
    },

    deleteCommunityComment() {
      this.$emit('delete-comment', this.comment.id)
    },
    updateCommunityComment() {
      axios({
        method: 'put',
        url: `${API_URL}/community/comments/${ this.comment.id }/`,
        data:{
          community_pk : this.community.id,
          content : this.content
        },
        headers: {
            Authorization : `Token ${this.$store.state.token}`
        },
      })
        .then(() => {
          this.flagChange()
          this.$emit('get-comment', this.comment.id)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
span {
  color: #e0e0e0;
}

#comment-hr {
  margin: 0.5em;
}

</style>
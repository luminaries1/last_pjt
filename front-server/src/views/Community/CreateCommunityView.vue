<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="community-box ">
      <form @submit.prevent>
        <div class="m-4 d-flex bd-highlight row">
          <span class="d-flex flex-row">
            <label for="title" class="form-label mb-3 d-flex text-start fs-2">Title</label>
            <button @click="returnCommunityView" class="btn btn-outline-success button-border ms-auto mb-4">Back</button>
          </span>
            <input type="text" id="title" class="input-height form-fontrol" v-model.trim="title"><br>
        </div>
        <hr class="hr-width my-3">
        <div class="m-4 d-flex bd-highlight row">
          <div></div>
          <label for="content" class="form-label mb-3 text-start fs-2">Content</label>
          <textarea class="form-control" type="text" id="content" rows="11" style="border-radius: 1em;" v-model="content"></textarea>
          <span class="d-flex row m-0 p-0" style="text-align:center">
            <button type="submit" @click="createCommunity" class="btn btn-outline-success button-border mt-4">Submit</button>
          </span>
        </div>
      </form> 
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

export default {
	name: 'CreateCommunityView',
  data() {
    return{
      title: null,
      content: null,
    }
  },
  computed : {
    isLogin() {
      return this.$store.getters.isLogin
    }
  },
  methods: {
    createCommunity() {
      const title = this.title
      const content = this.content

      if(!title && !content){
        alert('Please Fill the Blank')
        return
      }

      axios({
        method: 'POST',
        url: `${API_URL}/community/community-list/`,
        data: {
          title: title,
          content: content
        },
        headers: {
            Authorization : `Token ${this.$store.state.token}`
          },
      })
        .then(() => {
          // console.log(res)
          this.$router.push({name : 'CommunityView'})
        })
        .catch((err) => {
          // console.log('안됨안됨')
          console.log(err)
        })
    },
    
    returnCommunityView(){
      this.$router.go(-1)
    },

  }
}
</script>

<style>
.hr-width{
  width: 50em;
  margin-left : auto;
  margin-right : auto;
}

.input-height{
  height: 3em;
  border-radius: 1em;
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
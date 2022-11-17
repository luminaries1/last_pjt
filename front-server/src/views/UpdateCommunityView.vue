<template>
  <div>
    <h1>UpdateCommunity</h1>
    <form @submit.prevent="updateCommunity">
      <label for="title">제목  </label>
      <input type="text" id="title" v-model.trim="title"><br>
      <label for="content">내용  </label>
      <textarea type="text" id="content" v-model="content"></textarea>
      <input type="submit">
    </form> 
  </div>
</template>
<!-- <router-link :to="{ name: 'DetailMovie', params: {id: movie.id} }">[Detail]</router-link> -->
<script>
export default {
  name: 'UpdateCommunityView',
  data() {
    return {
      id: this.$route.params.id,
      title: this.$route.params.title,
      content: this.$route.params.content,
    }
  },
  methods:{
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
      this.$router.push({ name: 'CommunityView' })
    }
  }
}
</script>

<style>

</style>
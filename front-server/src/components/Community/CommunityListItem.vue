<template>
  <tr >
    <td>{{ community.id }}</td>
    <td @click="detailCommunityView">{{ community.title }}</td>
    <td>{{ community.content }}</td>
  </tr>
</template>
<!-- <router-link :to="{ name: 'DetailMovie', params: {id: movie.id} }">[Detail]</router-link> -->
<script>

export default {
  name: 'CommunityListItem',
  props:{
    community: Object
  },
  data(){
    return{
    }
  },
  // ------------------------------------여기 만들다 끝남---------------------
  methods: {
    detailCommunityView() {
      this.$router.push({name: 'DetailCommunityView', params: {id: this.community.id}})
    },
  }
}
</script>

<style>
/* table tr {
  height: 2rem;
  text-align: center;
  border-bottom: 1px solid #505050;
}

table tr td {
  padding: 1rem 0;
  font-size: 1.1rem;
} */
</style>
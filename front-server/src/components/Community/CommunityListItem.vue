<template>
  <tr>
    <td >{{ community.username }}</td>
    <td @click="detailCommunityView" style="cursor:pointer">{{ community.title }}</td>
    <td>{{ communityTime }}</td>
  </tr>
</template>
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
  methods: {
    detailCommunityView() {
      this.$router.push({name: 'DetailCommunityView', params: {id: this.community.id }})
    },
  },
  computed:{
    communityTime(){
      return this.community.created_at.substr(0,10)
    }
  }
}
</script>

<style>
table tr {
  color:white;
}
</style>
<template>
  <div>
    <h1>CommunityList</h1>
    <CommunityListItem 
    v-for="community in communitys"
    :key="community.id"
    :community="community"
    />
  </div>
</template>

<script>
import CommunityListItem from './CommunityListItem.vue';

export default {
  name: 'CommunityList',
  components: {
    CommunityListItem
  },
  computed:{
    communitys() {
      return this.$store.state.communitys
    }
  }
}
</script>

<style>

</style>
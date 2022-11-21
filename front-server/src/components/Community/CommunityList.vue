<template>
  <div>
    <table>
      <tr>
        <th>NO</th>
        <th>제목</th>
        <th>내용</th>
        <!-- <th>detail</th> -->
      </tr>
        <CommunityListItem 
        v-for="community in communitys"
        :key="community.id"
        :community="community"
        />
    </table>  
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
table {
  width: 100%;
  border-collapse: collapse;
}

table tr {
  height: 2rem;
  text-align: center;
  border-bottom: 1px solid #505050;
}

table tr td {
  padding: 1rem 0;
  font-size: 1.1rem;
}
</style>
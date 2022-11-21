<template>
  <div>
    <table class="table table-bordered black-border">
      <thead>
        <tr>
          <th>NO</th>
          <th>제목</th>
          <th>내용</th>
          <!-- <th>detail</th> -->
        </tr>
      </thead>
      <tbody>
        <CommunityListItem 
          v-for="community in communitys"
          :key="community.id"
          :community="community"
        />
      </tbody>
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
  props:{
    pageNum: Number
  },
  computed:{
    communitys() {
      return this.$store.getters.getPartOfCommunitys(this.pageNum)
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
  border-bottom: 1px solid #129b79;
}

table tr td {
  padding: 1rem 0;
  font-size: 1.1rem;
}

.black-border{
  border : 1px solid #129b79;
}
</style>
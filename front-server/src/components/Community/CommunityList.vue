<template>
  <div class="table-responsive">
    <table class="table table-bordered black-border table-hover" style="table-layout: fixed">
      <thead>
        <tr>
          <th class="writer">Writer</th>
          <th class="title">Title</th>
          <th class="content">Content</th>
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

.table-hover tbody tr:hover td{
  background-color: #129b79;
}

th.writer {
  width: 100px;
}
th.title {
  width: 500px;
}
th.content {
  width: 250px;
}

.black-border{
  border : 1px solid #129b79;
}
</style>
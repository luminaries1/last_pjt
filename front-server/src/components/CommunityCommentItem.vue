<template>
  <div>
    <p>{{ comment?.title }}</p>
    <p>{{ comment?.content }}</p>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'CommunityCommentItem',
  props:{
    comment: Object
  }
}
</script>

<style>

</style>
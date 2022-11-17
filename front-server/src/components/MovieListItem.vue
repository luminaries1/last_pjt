<template>
    <div>
      <h5>{{ movie.id }}</h5>
      <p>{{ movie.title }}</p>
      <p>{{ movie.description }}</p>
      <p>Author : {{ movie.username }}</p>
      <router-link :to="{ name: 'DetailMovie', params: {id: movie.id} }">[Detail]</router-link>
      <hr>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MovieListItem',
    props : {
      movie : Object,
    }
  }
  </script>
  
  <style>
  
  </style>
  
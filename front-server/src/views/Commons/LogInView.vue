<template>
  <div class="login-box d-flex justify-content-center align-items-center">
    <div>
      <h1>Login Page</h1>
      <form @submit.prevent="login" class="position-relative">
        <div class="my-3">
          <label for="username" class="fw-bold mx-4">username : </label>
          <input type="text" id="username" v-model="username" class="button-input"><br>
        </div>

        <div class="position-relative end-0 my-3">
          <label for="password" class="fw-bold mx-4"> password : </label>
          <input type="password" id="password" v-model="password" class="button-input">
        </div>

        <input type="submit" value="logIn" class="btn btn-outline-success button-border">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogInView',
  data() {
    return {
      username : null,
      password : null,
    }
  },
  methods: {
    login() {
      const username = this.username
      const password = this.password

      const payload = {
        username,
        password,
      }
      this.$store.dispatch('logIn', payload)
    }
  }
}
</script>


<style>
.login-box {
  height: 55em;
}

form {
  color: #e0e0e0;
}

h1 {
  color: #e0e0e0;
}

.button-border{
    border-radius: 2em;
}

.button-input {
  border-radius: 2em;
}

</style>

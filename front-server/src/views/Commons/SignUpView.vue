<template>
  <div class="login-box d-flex justify-content-center align-items-center">
    <div>
      <h1>Sign Up Page</h1>
      <form @submit.prevent="signUp" class="position-relative">
        <div class="position-relative end-0 my-3">
          <label for="username" class="fw-bold mx-4">username : </label>
          <input type="text" id="username" v-model="username" class="button-input"><br>
        </div>


        <div class="position-relative end-0 my-3">
          <label for="password1" class="fw-bold mx-4"> password : </label>
          <input type="password" id="password1" v-model="password1" class="button-input"><br>
        </div>

        <div class="position-relative end-0 my-3">
          <label for="password2" class="fw-bold mx-4"> password confirmation : </label>
          <input type="password" id="password2" v-model="password2" class="button-input">
        </div>
        
        <input type="submit" value="SignUp" class="btn btn-outline-success button-border">
      </form>

    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUpView',
  data() {
    return {
      username : null,
      password1 : null,
      password2 : null,
    }
  },
  methods: {
    signUp() {
      const username = this.username
      const password1 = this.password1
      const password2 = this.password2

      const payload = {
        username, password1, password2
      }
      this.$store.dispatch('signUp', payload)
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

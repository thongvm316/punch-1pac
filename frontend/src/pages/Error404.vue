<template>
  <main-layout>
    <div class="container grid-xl">
      <div class="columns mt-10">
        <div class="column col-4 col-ml-auto col-mr-auto">
          <img height="170" width="400" src="../assets/404.png">
        </div>
      </div>
      <h1 class="text-center mt-10">Whoop! Look like something is missing</h1>
      <p class="text-center mb-0">Sorry, the page you are looking for doesn’t exist.</p>
      <p class="text-center">Press the button below to get back to previous page.</p>
      <div class="form-group text-center mt-10">
        <router-link to="/dashboard" class="btn btn-primary" tag="button">Go Home</router-link>
      </div>
      </div>
    </div>
  </main-layout>
</template>
<script>
import MainLayout from '../layouts/Main'
export default {
  components: {
    MainLayout
  }
}
</script>

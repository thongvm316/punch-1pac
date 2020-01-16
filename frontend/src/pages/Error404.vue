<template>
  <main-layout>
    <div class="container grid-xl">
      <div class="columns mt-10">
        <div class="column col-4 col-ml-auto col-mr-auto">
          <img height="170" width="400" src="../assets/404.png">
        </div>
      </div>
      <h1 class="text-center mt-10">{{ $t('page404.title') }}</h1>
      <p class="text-center mb-0">{{ $t('page404.content') }}</p>
      <p class="text-center">{{ $t('page404.instruction') }}</p>
      <div class="form-group text-center mt-10">
        <router-link to="/dashboard" class="btn btn-primary" tag="button">{{ $t('button.common.goHome') }}</router-link>
      </div>
    </div>
  </main-layout>
</template>

<script>
const MainLayout = () => import('../layouts/Main')

export default {
  components: {
    MainLayout
  }
}
</script>

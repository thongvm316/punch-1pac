<template>
  <div id="app">
    <app-header></app-header>
    <div class="app-container">
      <app-sidebar></app-sidebar>
      <router-view/>
    </div>
  </div>
</template>

<script>
  import AppHeader from './components/AppHeader.vue'
  import AppSidebar from './components/AppSidebar.vue'

  export default {
    components: {
      appSidebar: AppSidebar,
      appHeader: AppHeader
    }
  }
</script>

<style lang="scss">
  .app-container {
    display: flex;
    justify-content: flex-start;
  }
</style>

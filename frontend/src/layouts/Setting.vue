<template>
  <div>
    <app-header></app-header>
    <div class="app-container">
      <app-sidebar></app-sidebar>
      <div class="main">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import AppHeader from '../components/AppHeader.vue'
  import AppSidebar from '../components/AppSidebar.vue'

  export default {
    name: 'setting-layout',
    components: {
      appSidebar: AppSidebar,
      appHeader: AppHeader
    }
  }
</script>

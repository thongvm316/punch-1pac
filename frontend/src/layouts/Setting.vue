<template>
  <div>
    <app-header></app-header>
    <main>
      <div class="container grid-xl py-4">
        <slot></slot>
      </div>
    </main>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import AppHeader from '../components/AppHeader.vue'
  import AppSidebar from '../components/AppSidebar.vue'
  import AppFooter from '../components/AppFooter.vue'

  export default {
    name: 'setting-layout',
    components: {
      appSidebar: AppSidebar,
      appHeader: AppHeader,
      appFooter: AppFooter
    }
  }
</script>

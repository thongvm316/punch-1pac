<template>
  <div>
    <app-header></app-header>
    <main>
      <div class="container grid-xl">
        <h1 class="title">{{ title }}</h1>
        <slot></slot>
      </div>
    </main>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'

export default {
  name: 'main-layout',
  props: ['title'],
  components: {
    appHeader: AppHeader,
    appFooter: AppFooter
  }
}
</script>

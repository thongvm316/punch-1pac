<template>
  <div>
    <app-header></app-header>
    <announcements v-if="isOpenAnnouncement"/>
    <main>
      <div class="container grid-xl">
        <h1 class="title">{{ title }}</h1>
        <slot></slot>
      </div>
    </main>
    <app-footer></app-footer>
    <flash/>
  </div>
</template>

<script>
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import Flash from '../components/Flash.vue'
import Announcements from '../components/Announcements.vue'

export default {
  name: 'main-layout',
  props: ['title', 'isOpenAnnouncement'],
  components: {
    AppHeader,
    AppFooter,
    Flash,
    Announcements
  }
}
</script>

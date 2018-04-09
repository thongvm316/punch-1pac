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
    <popup-change-password/>
  </div>
</template>

<script>
import AppHeader from '../components/AppHeader'
import AppFooter from '../components/AppFooter'
import Flash from '../components/Flash'
import Announcements from '../components/Announcements'
import PopupChangePassword from '../components/PopupChangePassword'

export default {
  name: 'main-layout',
  props: ['title', 'isOpenAnnouncement'],
  components: {
    AppHeader,
    AppFooter,
    Flash,
    Announcements,
    PopupChangePassword
  }
}
</script>

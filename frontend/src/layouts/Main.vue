<template>
  <div>
    <app-header></app-header>
    <main>
      <div class="container grid-xl">
        <announcements/>
        <remind-punch-in/>
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
import RemindPunchIn from '../components/RemindPunchIn'
import PopupChangePassword from '../components/PopupChangePassword'

export default {
  name: 'main-layout',
  props: ['title', 'isOpenAnnouncement'],
  components: {
    AppHeader,
    AppFooter,
    Flash,
    Announcements,
    PopupChangePassword,
    RemindPunchIn
  }
}
</script>

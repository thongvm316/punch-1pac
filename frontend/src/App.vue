<template>
  <div id="app">
    <app-header />
    <router-view />
    <app-footer />
    <flash />
    <popup-change-password />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import {
  INITIAL_STATES_SET_USER,
  INITIAL_STATES_SET_COMPANY,
  INITIAL_STATES_SET_META,
  RECEIVE_HEADER_ANNOUNCEMENTS } from './store/mutation-types'
const AppHeader = () => import('./components/AppHeader')
const AppFooter = () => import('./components/AppFooter')
const Flash = () => import('./components/Flash')
const PopupChangePassword = () => import('./components/PopupChangePassword')

export default {
  name: 'App',

  components: {
    AppHeader,
    AppFooter,
    Flash,
    PopupChangePassword
  },

  created() {
    this[INITIAL_STATES_SET_USER](window.initialStates().user)
    this[INITIAL_STATES_SET_COMPANY](window.initialStates().company)
    this[RECEIVE_HEADER_ANNOUNCEMENTS](window.initialStates())
    this[INITIAL_STATES_SET_META](window.initialStates().meta)
  },

  methods: {
    ...mapMutations('initialStates', [INITIAL_STATES_SET_USER, INITIAL_STATES_SET_COMPANY, INITIAL_STATES_SET_META]),

    ...mapMutations('announcements', [RECEIVE_HEADER_ANNOUNCEMENTS])
  }
}
</script>

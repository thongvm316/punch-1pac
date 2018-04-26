<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import { RECEIVE_HEADER_ANNOUNCEMENTS } from './store/mutation-types'

export default {
  name: 'app',

  methods: {
    ...mapActions('initialStates', [
      'setCurrentUser',
      'setCurrentCompany',
      'setAnnouncements',
      'setMeta'
    ]),

    ...mapMutations('announcements', [
      RECEIVE_HEADER_ANNOUNCEMENTS
    ])
  },

  created () {
    this.setCurrentUser(window.initialStates())
    this.setCurrentCompany(window.initialStates())
    this[RECEIVE_HEADER_ANNOUNCEMENTS](window.initialStates())
    this.setMeta(window.initialStates())
  }
}
</script>

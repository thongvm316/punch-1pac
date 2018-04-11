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
    this.setCurrentUser(window.INITIAL_STATE)
    this.setCurrentCompany(window.INITIAL_STATE)
    this[RECEIVE_HEADER_ANNOUNCEMENTS](window.INITIAL_STATE)
    this.setMeta(window.INITIAL_STATE)
  }
}
</script>

<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'app',

  methods: {
    ...mapActions('initialStates', [
      'setCurrentUser',
      'setCurrentCompany'
    ])
  },

  created () {
    this.setCurrentUser(window.INITIAL_STATE)
    this.setCurrentCompany(window.INITIAL_STATE)
  }
}
</script>

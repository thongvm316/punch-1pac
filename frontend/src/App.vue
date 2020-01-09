<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { INITIAL_STATES_SET_USER, INITIAL_STATES_SET_COMPANY, INITIAL_STATES_SET_META, RECEIVE_HEADER_ANNOUNCEMENTS } from './store/mutation-types'

export default {
  name: 'app',

  methods: {
    ...mapMutations('initialStates', [INITIAL_STATES_SET_USER, INITIAL_STATES_SET_COMPANY, INITIAL_STATES_SET_META]),

    ...mapMutations('announcements', [RECEIVE_HEADER_ANNOUNCEMENTS])
  },

  created() {
    this[INITIAL_STATES_SET_USER](window.initialStates().user)
    this[INITIAL_STATES_SET_COMPANY](window.initialStates().company)
    this[RECEIVE_HEADER_ANNOUNCEMENTS](window.initialStates())
    this[INITIAL_STATES_SET_META](window.initialStates().meta)
  }
}
</script>

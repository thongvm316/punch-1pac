<template>
  <div class="punch">
    <span v-show="attendedAt">In: {{ attendedAt }}</span>
    <span class="mx-2" v-show="attendedAt">-</span>
    <span class="mr-5" v-if="leftAt">Out: {{ leftAt }}</span>
    <span class="mr-5" v-else>{{ currentTime }}</span>
    <button class="btn btn-primary mr-5" @click="punchIn" v-show="!attendedAt">Punch In</button>
    <button class="btn btn-primary mr-5" @click="punchOut" v-show="attendedAt && !leftAt">Punch Out</button>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'punch',

  data () {
    return {
      currentTime: null
    }
  },

  methods: {
    updateCurrentTime () {
      this.currentTime = moment().format('HH:mm:ss')
    },

    ...mapActions('punch', [
      'punchIn',
      'punchOut'
    ])
  },

  computed: {
    ...mapState('punch', [
      'attendedAt',
      'leftAt'
    ])
  },

  created () {
    this.updateCurrentTime()
    setInterval(this.updateCurrentTime, 1 * 1000)
  }
}
</script>

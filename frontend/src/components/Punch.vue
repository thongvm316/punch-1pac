<template>
  <div class="punch">
    <span v-show="attendance.attended_at">{{ $t('punch.in') }}: {{ attendance.attended_at }}</span>
    <span class="mx-2" v-show="attendance.attended_at">-</span>
    <span class="mr-5" v-if="attendance.left_at">{{ $t('punch.out') }}: {{ attendance.left_at }}</span>
    <span class="mr-5" v-else>{{ currentTime }}</span>
    <button class="btn btn-primary mr-5" @click="punchIn" v-show="!attendance.attended_at">Punch In</button>
    <button class="btn btn-primary mr-5" @click="punchOut" v-show="attendance.attended_at && !attendance.left_at">Punch Out</button>
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
      'punchOut',
      'initAttendance'
    ])
  },

  computed: {
    ...mapState('punch', [
      'attendance'
    ])
  },

  created () {
    this.initAttendance(window.INITIAL_STATE.attendance)
    this.updateCurrentTime()
    setInterval(this.updateCurrentTime, 1 * 1000)

    window.addEventListener('keypress', (e) => {
      if (e.keyCode === 13 && !this.attendedAt) this.punchIn()
    })

    window.addEventListener('keypress', (e) => {
      if (e.keyCode === 13 && this.attendedAt && !this.leftAt) this.punchOut()
    })
  }
}
</script>

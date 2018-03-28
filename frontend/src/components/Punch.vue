<template>
  <div class="punch">
    <span v-show="attendance.attended_at">{{ $t('header.in') }}: {{ attendance.attended_at }}</span>
    <span class="mx-2" v-show="attendance.attended_at">-</span>
    <span class="mr-5" v-if="attendance.left_at">{{ $t('header.out') }}: {{ attendance.left_at }}</span>
    <span class="mr-5" v-else>{{ currentTime }}</span>
    <button class="btn btn-primary mr-5" @click="punchIn" v-show="!attendance.attended_at">{{ $t('header.punchIn') }}</button>
    <button class="btn btn-primary mr-5" @click="punchOut" v-show="attendance.attended_at && !attendance.left_at">{{ $t('header.punchOut') }}</button>
  </div>
</template>

<script>
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
      this.currentTime = this.$moment().format('HH:mm:ss')
    },

    ...mapActions('punch', [
      'punchIn',
      'punchOut',
      'initAttendance'
    ])
  },

  computed: {
    ...mapState('punch', [
      'isInited',
      'attendance'
    ])
  },

  created () {
    if (!this.isInited) this.initAttendance(window.INITIAL_STATE.attendance)
    this.updateCurrentTime()
    setInterval(this.updateCurrentTime, 1 * 1000)

    window.addEventListener('keypress', (e) => {
      if (e.keyCode === 13 && !this.attendance.attended_at) this.punchIn()
    })

    window.addEventListener('keypress', (e) => {
      if (e.keyCode === 13 && this.attendance.attended_at && !this.attendance.left_at) this.punchOut()
    })
  }
}
</script>

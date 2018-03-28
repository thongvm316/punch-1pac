<template>
  <div class="punch">
    <span v-show="attendance.attended_at">{{ $t('header.in') }}: {{ attendance.attended_at }}</span>
    <span class="mx-2" v-show="attendance.attended_at">-</span>
    <span class="mr-5" v-if="attendance.left_at">{{ $t('header.out') }}: {{ attendance.left_at }}</span>
    <span class="mr-5" v-else>{{ currentTime }}</span>
    <button class="btn btn-primary mr-5" @click="debouncePunchIn" v-show="!attendance.attended_at">{{ $t('header.punchIn') }}</button>
    <button class="btn btn-primary mr-5" @click="debouncePunchOut" v-show="attendance.attended_at && !attendance.left_at">{{ $t('header.punchOut') }}</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import debounce from 'lodash.debounce'

const DEBOUNCE_TIME = 1500

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
    ]),

    debouncePunchIn: debounce(function () { this.punchIn() }, DEBOUNCE_TIME),

    debouncePunchOut: debounce(function () { this.punchOut() }, DEBOUNCE_TIME)
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

    window.addEventListener('keypress', debounce((e) => {
      if (e.keyCode === 13 && !this.attendance.attended_at) this.punchIn()
    }, DEBOUNCE_TIME))

    window.addEventListener('keypress', debounce((e) => {
      if (e.keyCode === 13 && this.attendance.attended_at && !this.attendance.left_at) this.punchOut()
    }, DEBOUNCE_TIME))
  }
}
</script>

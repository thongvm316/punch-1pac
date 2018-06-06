<template>
  <div>
    <div class="punch">
      <span v-show="attendance.attended_at">{{ $t('header.in') }}: {{ attendance.attended_at }}</span>
      <span class="mx-2" v-show="attendance.attended_at">-</span>
      <span class="mr-5" v-if="attendance.left_at">{{ $t('header.out') }}: {{ attendance.left_at }}</span>
      <span class="mr-5" v-else>{{ currentTime }}</span>
      <button class="btn btn-primary mr-5" @click="debouncePunchIn()" v-show="!attendance.attended_at">{{ $t('header.punchIn') }}</button>
      <button class="btn btn-primary mr-5" @click="openConfirmDialog()" v-show="attendance.attended_at && !attendance.left_at">{{ $t('header.punchOut') }}</button>
    </div>
    <confirm-dialog :title="$t('header.punchOutTitle')" :deleteObject="debouncePunchOut" :modal-open.sync="isOpenConfirmDialog">
      <p>{{ $t('header.punchOutConfirm', { at: $moment().format('HH:mm') }) }}</p>
    </confirm-dialog>
  </div>
</template>

<script>
import confirmDialog from '../mixins/confirm-dialog'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'punch',

  mixins: [confirmDialog],

  data() {
    return {
      isPunching: false,
      currentTime: null,
      timer: null
    }
  },

  methods: {
    updateCurrentTime() {
      this.currentTime = this.$moment().format('HH:mm:ss')
    },

    ...mapActions('punch', ['punchIn', 'punchOut', 'initAttendance']),

    ...mapActions('flash', ['setFlashMsg']),

    debouncePunchIn() {
      if (this.isPunching) return
      this.isPunching = true
      this.punchIn(this.currentUser.id).then(response => {
        this.isPunching = false
        if (response.data) this.setFlashMsg({ message: this.$t('header.punchInSuccess', { at: response.data.attended_at }) })
      })
    },

    debouncePunchOut(attendance = {}) {
      if (this.isPunching) return
      this.isPunching = true
      this.punchOut(this.currentUser.id).then(response => {
        this.isPunching = false
        this.isOpenConfirmDialog = false
        this.setFlashMsg({ message: this.$t('header.punchOutSuccess', { at: response.data.left_at }) })
      })
    }
  },

  computed: {
    ...mapState('punch', ['isInited', 'attendance'])
  },

  created() {
    if (!this.isInited) this.initAttendance(window.initialStates().attendance)
    this.updateCurrentTime()
    this.timer = setInterval(this.updateCurrentTime, 1 * 1000)
  },

  destroyed() {
    clearInterval(this.timer)
  }
}
</script>

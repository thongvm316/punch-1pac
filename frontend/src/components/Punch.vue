<template>
  <div>
    <div class="punch">
      <span v-if="attendance.attended_at">{{ $t('header.in') }}: {{ attendance.attended_at }}</span>
      <span
        v-if="attendance.attended_at"
        class="mx-2"
      >-</span>
      <span
        v-if="attendance.left_at"
        class="mr-5"
      >{{ $t('header.out') }}: {{ attendance.left_at }}</span>
      <span
        v-else
        class="mr-5"
      >{{ currentTime }}</span>
      <button
        v-if="!attendance.attended_at"
        ref="btnPunchIn"
        class="btn btn-primary mr-5"
        @click="debouncePunchIn()"
      >
        {{ $t('button.common.punchIn') }}
      </button>
      <button
        v-if="attendance.attended_at && !attendance.left_at"
        ref="btnPunchOut"
        class="btn btn-primary mr-5"
        @click="openConfirmDialog()"
      >
        {{ $t('button.common.punchOut') }}
      </button>
    </div>
    <confirm-dialog
      v-if="!attendance.left_at"
      :title="$t('header.punchOutTitle')"
      :delete-object="debouncePunchOut"
      :modal-open.sync="isOpenConfirmDialog"
    >
      <p>{{ $t('header.punchOutConfirm', { at: $moment().format('HH:mm') }) }}</p>
    </confirm-dialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import confirmDialog from '@/mixins/confirm-dialog'
import { PUNCH_INIT_ATTENDANCE, SET_FLASH_MESSAGE } from '@/store/mutation-types'

export default {
  name: 'Punch',

  mixins: [confirmDialog],

  data() {
    return {
      isPunching: false,
      currentTime: null,
      timer: null
    }
  },

  computed: {
    ...mapState('punch', ['isInited', 'attendance'])
  },

  created() {
    if (!this.isInited) this[PUNCH_INIT_ATTENDANCE](window.initialStates().attendance)
    this.updateCurrentTime()
    this.timer = setInterval(this.updateCurrentTime, 1 * 1000)
  },

  destroyed() {
    clearInterval(this.timer)
  },

  methods: {
    updateCurrentTime() {
      this.currentTime = this.$moment().format('HH:mm:ss')
    },

    ...mapMutations('punch', [PUNCH_INIT_ATTENDANCE]),

    ...mapMutations('flash', [SET_FLASH_MESSAGE]),

    ...mapActions('punch', ['punchIn', 'punchOut']),

    debouncePunchIn() {
      if (this.isPunching) return
      this.isPunching = true
      this.punchIn(this.currentUser.id).then(response => {
        this.isPunching = false
        if (response.data) this[SET_FLASH_MESSAGE]({ message: this.$t('header.punchInSuccess', { at: response.data.attended_at }) })
      })
    },

    debouncePunchOut(attendance = {}) {
      if (this.isPunching) return
      this.isPunching = true
      this.punchOut(this.currentUser.id).then(response => {
        this.isPunching = false
        this.isOpenConfirmDialog = false
        this[SET_FLASH_MESSAGE]({ message: this.$t('header.punchOutSuccess', { at: response.data.left_at }) })
      })
    }
  }
}
</script>

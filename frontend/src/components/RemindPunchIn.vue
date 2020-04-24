<template>
  <div
    v-if="currentUser.forgot_punch_in_days_in_month.length > 0 && open"
    class="toast toast-error text-center mt-2"
  >
    <button
      ref="btnCloseToast"
      class="btn btn-clear float-right"
      @click="close"
    />
    {{ $t('remind.message', { days: formatDays }) }}
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { UPDATE_REMIND_PUNCH_IN } from '@/store/mutation-types'

export default {
  name: 'RemindPunchIn',

  computed: {
    ...mapState('remindPunchIn', ['open']),

    formatDays() {
      let forgotDays = this.currentUser.forgot_punch_in_days_in_month
      return forgotDays.length ? forgotDays.map(day => this.$moment(day).format('L')).join(' , ') : null
    }
  },

  methods: {
    ...mapMutations('remindPunchIn', [UPDATE_REMIND_PUNCH_IN]),

    close() {
      this[UPDATE_REMIND_PUNCH_IN](false)
    }
  }
}
</script>

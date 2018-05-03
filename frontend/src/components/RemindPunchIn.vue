<template>
  <div class="toast toast-error text-center mt-2" v-if="currentUser.forgot_punch_in_days_in_month.length > 0 && open">
    <button class="btn btn-clear float-right" @click="open = false"></button>
    {{ $t('remind.message', { days: formatDays }) }}
  </div>
</template>

<script>
export default {
  name: 'remind-punch-in',

  data () {
    return {
      open: true
    }
  },

  computed: {
    formatDays () {
      if (this.currentUser.forgot_punch_in_days_in_month.length > 0) {
        return this.currentUser.forgot_punch_in_days_in_month.map(day => this.$moment(day).format('L')).join(' , ')
      }
    }
  }
}
</script>

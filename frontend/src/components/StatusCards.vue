<template>
  <div class="status-cards mt-5">
    <datepicker
      v-model="month"
      :language="$i18n.locale"
      format="MMMM yyyy"
      :minimum-view="'month'"
      :maximum-view="'month'"
      :input-class="'datepicker-input form-input'"
      :calendar-class="'datepicker-calendar'"
      :wrapper-class="'datepicker'"
      @input="onInputDatepicker"
    />
    <div class="columns">
      <div
        v-for="(status, key) in i18nStatuses"
        :key="key"
        class="column col-4"
      >
        <div class="box mt-5">
          <p>{{ $t(`meta.attendance_statuses.${status}`) }}</p>
          <h3>{{ $tc('statusCards.dayNum', statuses[status], { num: statuses[status], companyTotalDays: meta.company_total_working_days_in_month }) }}</h3>
        </div>
      </div>
      <div
        v-if="statuses['working_hours']"
        class="column col-4"
      >
        <div class="box mt-5">
          <p>{{ $t('meta.attendance_statuses.working_hours') }}</p>
          <h3>{{ $t('statusCards.workingHours', { hours: statuses['working_hours'].hours, mins: statuses['working_hours'].mins, companyTotalHours: meta.company_total_working_hours_on_month }) }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
const Datepicker = () => import('vuejs-datepicker')

export default {
  name: 'StatusCards',

  components: {
    Datepicker
  },

  data() {
    return {
      month: this.$moment()
        .locale('en')
        .format('LL')
    }
  },

  computed: {
    ...mapState('statusCards', ['statuses', 'meta']),

    i18nStatuses() {
      return Object.keys(this.statuses).filter(status => !['working_hours', 'minutes_attend_late', 'minutes_leave_early'].includes(status))
    }
  },

  methods: {
    ...mapActions('statusCards', ['getStatuses']),

    onInputDatepicker() {
      this.month = this.$moment(this.month).format('YYYY-MM-DD')
    }
  },

  watch: {
    month: function() {
      this.getStatuses(this.month)
    }
  },

  created() {
    this.getStatuses(this.month)
  }
}
</script>

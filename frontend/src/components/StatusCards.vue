<template>
  <div class="status-cards mt-5">
    <datepicker
      :language="currentUser.language"
      :format="function (date) { return $moment(date).format('LLL') }"
      :minimumView="'month'"
      :maximumView="'month'"
      :input-class="'datepicker-input form-input'"
      :calendar-class="'datepicker-calendar'"
      :wrapper-class="'datepicker'"
      @input="onInputDatepicker"
      v-model="month"/>
    <div class="columns">
      <div class="column col-4" v-for="(status, key) in i18nStatuses" :key="key">
        <div class="box mt-5">
          <p>{{ $t(`meta.attendance_statuses.${status}`) }}</p>
          <h3>{{ $tc('statusCards.dayNum', statuses[status], { num: statuses[status], companyTotalDays: meta.company_total_working_days_in_month }) }}</h3>
        </div>
      </div>
      <div class="column col-4" v-if="statuses['working_hours']">
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
  name: 'status-cards',

  data() {
    return {
      month: this.$moment()
        .locale('en')
        .format('LL')
    }
  },

  components: {
    Datepicker
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

  created() {
    this.getStatuses(this.month)
  },

  watch: {
    month: function() {
      this.getStatuses(this.month)
    }
  }
}
</script>

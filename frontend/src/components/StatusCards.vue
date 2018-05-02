<template>
  <div class="status-cards mt-5">
    <datepicker
      :language="currentUser.language"
      :format="function (date) { return $moment(date).format('MMM YYYY') }"
      :minimumView="'month'"
      :maximumView="'month'"
      :input-class="'datepicker-input form-input'"
      :calendar-class="'datepicker-calendar'"
      :wrapper-class="'datepicker'"
      @input="onInputDatepicker"
      v-model="month"/>
    <div class="columns">
      <div class="column col-4">
        <div class="box mt-5">
          <p>{{ $t('meta.attendance_statuses.attend_ok') }}</p>
          <h3>{{ $t('statusCards.attendOk', { num: statuses['attend_ok'], companyTotalDays: meta.company_total_working_days_in_month }) }}</h3>
        </div>
      </div>
      <div class="column col-4" v-for="status in Object.keys(statuses).filter(status => !['attend_ok', 'working_hours'].includes(status))">
        <div class="box mt-5">
          <p>{{ $t(`meta.attendance_statuses.${status}`) }}</p>
          <h3>{{ $tc('statusCards.dayNum', statuses[status], { num: statuses[status] }) }}</h3>
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
import Datepicker from 'vuejs-datepicker'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'status-cards',

  data () {
    return {
      month: this.$moment().locale('en').format('LL')
    }
  },

  components: {
    Datepicker
  },

  computed: {
    ...mapState('statusCards', [
      'statuses',
      'meta'
    ])
  },

  methods: {
    ...mapActions('statusCards', [
      'getStatuses'
    ]),

    onInputDatepicker () {
      this.month = this.$moment(this.month).format('YYYY-MM-DD')
    }
  },

  created () {
    this.getStatuses(this.month)
  },

  watch: {
    month: function () {
      this.getStatuses(this.month)
    }
  }
}
</script>

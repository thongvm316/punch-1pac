<template>
  <div class="calendar-date current-month" :class="{'disabled': isWeekend}">
    <button class="date-item" :class="{ 'date-today': localAttendance.day === today.format('YYYY-MM-DD') }">
      {{ localAttendance.day.split('-')[2] }}
    </button>
    <div class="calendar-events">
      <span class="calendar-event bg-success text-success text-center" v-if="localAttendance.attending_status === 'attend_ok'">
        {{ $t(`meta.attendance_statuses.${localAttendance.attending_status}`) }}
      </span>
      <span class="calendar-event bg-warning text-warning text-center" v-if="localAttendance.attending_status === 'attend_late'">
        {{ $t(`meta.attendance_statuses.${localAttendance.attending_status}`) }}
      </span>
      <span href="#" class="calendar-event bg-success text-success text-center" v-if="localAttendance.leaving_status === 'leave_ok'">
        {{ $t(`meta.attendance_statuses.${localAttendance.leaving_status}`) }}
      </span>
      <span href="#" class="calendar-event bg-error text-error text-center" v-if="localAttendance.leaving_status === 'leave_early'">
        {{ $t(`meta.attendance_statuses.${localAttendance.leaving_status}`) }}
      </span>
      <span href="#" class="calendar-event bg-info text-info text-center" v-if="localAttendance.off_status">
        {{ $t(`meta.attendance_statuses.${localAttendance.off_status}`) }}
      </span>
      <span href="#" class="calendar-event bg-gray text-gray text-center" v-if="localAttendance.holiday">
        {{ localAttendance.holiday.name }}
      </span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'calendar-date',

  data () {
    return {
      localAttendance: this.calendarAttendance
    }
  },

  props: ['calendarAttendance', 'today'],

  computed: {
    ...mapState('punch', [
      'attendance'
    ]),

    ...mapState('initialStates', [
      'currentCompany',
      'meta'
    ]),

    isWeekend () {
      return this.currentCompany.breakdays.includes(this.$moment(this.localAttendance.day).format('dddd').toLowerCase())
    }
  },

  watch: {
    attendance: {
      handler: function (newAttendance) {
        if (newAttendance.day === this.localAttendance.day) this.localAttendance = newAttendance
      },
      deep: true
    }
  }
}
</script>

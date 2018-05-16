<template>
  <div class="calendar-date current-month" :data-tooltip="tooltip" :class="{'disabled': isWeekend, 'tooltip': tooltip}">
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
      <span href="#" class="calendar-event bg-notice text-notice text-center" v-if="localAttendance.off_status">
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
      return this.currentCompany.breakdays.includes(this.$moment(this.localAttendance.day).locale('en').format('dddd').toLowerCase())
    },

    tooltip () {
      if (this.localAttendance.holiday) {
        return this.localAttendance.holiday.name
      } else {
        let text = ''
        if (this.localAttendance.attending_status) text += this.$t('header.in') + ': ' + this.localAttendance.attended_at
        if (this.localAttendance.leaving_status) text += ' - ' + this.$t('header.out') + ': ' + this.localAttendance.left_at
        return text
      }
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

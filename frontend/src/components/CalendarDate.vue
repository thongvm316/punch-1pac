<template>
  <div class="calendar-date current-month">
    <button class="date-item" :class="{ 'date-today': localAttendance.day === today.format('YYYY-MM-DD') }">
      {{ localAttendance.day.split('-')[2] }}
    </button>
    <div class="calendar-events">
      <span class="calendar-event bg-primary text-light" v-if="localAttendance.attending_status">
        {{ $t(`meta.attendance_statuses.${localAttendance.attending_status}`) }}
      </span>
      <span href="#" class="calendar-event bg-error text-light" v-if="localAttendance.leaving_status">
        {{ $t(`meta.attendance_statuses.${localAttendance.leaving_status}`) }}
      </span>
      <span href="#" class="calendar-event bg-warning text-light" v-if="localAttendance.off_status">
        {{ $t(`meta.attendance_statuses.${localAttendance.off_status}`) }}
      </span>
      <span href="#" class="calendar-event bg-success text-light" v-if="localAttendance.holiday">
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
    ])
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

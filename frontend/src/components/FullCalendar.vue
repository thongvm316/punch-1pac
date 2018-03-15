<template>
  <div>
    <div class="calendar calendar-lg mt-4 bg-light">
      <div class="calendar-nav navbar">
        <button class="btn btn-action btn-link btn-lg" @click="lastMonth">
          <
        </button>
        <div class="navbar-primary">{{ month }} {{ year }}</div>
        <button class="btn btn-action btn-link btn-lg" @click="nextMonth">
          >
        </button>
      </div>
      <div class="calendar-container">
        <div class="calendar-header">
          <div class="calendar-date" v-for="day in days">{{ day }}</div>
        </div>
        <div class="calendar-body">
          <div class="calendar-date prev-month disabled" v-for="date in lastDaysPreviousMonth">
            <button class="date-item">{{ date }}</button>
          </div>
          <div class="calendar-date current-month" v-for="attendance in getFormattedAttendances">
            <button class="date-item" :class="{ 'date-today': attendance.day === today.format('YYYY-MM-DD') }">{{ attendance.day.split('-')[2] }}</button>
            <div class="calendar-events">
              <a href="#" class="calendar-event bg-primary text-light" v-if="attendance.attending_status">{{ attendance.attending_status }}</a>
              <a href="#" class="calendar-event bg-error text-light" v-if="attendance.leaving_status">{{ attendance.leaving_status }}</a>
              <a href="#" class="calendar-event bg-warning text-light" v-if="attendance.off_status">{{ attendance.off_status }}</a>
            </div>
          </div>
          <div class="calendar-date next-month disabled" v-for="date in firstDaysNextMonth">
            <button class="date-item">{{ date }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'full-calendar',

  data () {
    return {
      today: this.$moment(),
      dateContext: this.$moment(),
      days: this.$moment.weekdaysShort()
    }
  },

  computed: {
    year () {
      return this.dateContext.format('YYYY')
    },

    month () {
      return this.dateContext.format('MMMM')
    },

    initialDate () {
      return this.today.get('date')
    },

    initialMonth () {
      return this.today.format('MMMM')
    },

    initialYear () {
      return this.today.format('YYYY')
    },

    daysInMonth () {
      return this.dateContext.daysInMonth()
    },

    daysInNextMonth () {
      const previousMonth = this.$moment(this.dateContext).add(1, 'month')
      return previousMonth.daysInMonth()
    },

    daysInPreviousMonth () {
      const nextMonth = this.$moment(this.dateContext).subtract(1, 'month')
      return nextMonth.daysInMonth()
    },

    firstDayOfMonth () {
      const startDate = this.dateContext.clone().startOf('month')
      return startDate.day()
    },

    currentDate () {
      return this.dateContext.get('date')
    },

    lastDaysPreviousMonth () {
      const start = this.firstDayOfMonth
      const previousDaysInMonth = this.daysInPreviousMonth
      let previousDays = []
      for (let i = 1; i <= previousDaysInMonth; i++) {
        previousDays.push(i)
      }
      previousDays.splice(0, previousDays.length - start)
      return previousDays
    },

    firstDaysNextMonth () {
      const start = this.firstDayOfMonth
      const daysNow = this.daysInMonth
      const nextDaysInMonth = this.daysInNextMonth
      let daysNextMonth
      let nextDays = []
      for (let i = 1; i <= nextDaysInMonth; i++) {
        nextDays.push(i)
      }
      if ((start < 5 || daysNow < 30) || (start === 5 && daysNow === 30)) {
        daysNextMonth = 35 - daysNow - start
      } else {
        daysNextMonth = 42 - daysNow - start
      }
      nextDays.splice(daysNextMonth)
      return nextDays
    },

    ...mapState('calendar', [
      'attendances'
    ]),

    ...mapGetters('calendar', [
      'getFormattedAttendances'
    ])
  },

  methods: {
    nextMonth () {
      this.dateContext = this.$moment(this.dateContext).add(1, 'month')
      this.getCalendarAttendances(this.dateContext.format('YYYY-MM-DD'))
    },

    lastMonth () {
      this.dateContext = this.$moment(this.dateContext).subtract(1, 'month')
      this.getCalendarAttendances(this.dateContext.format('YYYY-MM-DD'))
    },

    ...mapActions('calendar', [
      'getCalendarAttendances'
    ])
  },

  created () {
    this.getCalendarAttendances()
  }
}
</script>

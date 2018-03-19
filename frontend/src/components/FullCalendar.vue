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
          <div class="calendar-date current-month" v-for="attendance in attendances">
            <button class="date-item" :class="{ 'date-today': attendance.day === today.format('YYYY-MM-DD') }">{{ attendance.day.split('-')[2] }}</button>
            <div class="calendar-events">
              <a href="#" class="calendar-event bg-primary text-light" v-if="attendance.attending_status">{{ $t(`meta.attendance_statuses.${attendance.attending_status}`) }}</a>
              <a href="#" class="calendar-event bg-error text-light" v-if="attendance.leaving_status">{{ $t(`meta.attendance_statuses.${attendance.leaving_status}`) }}</a>
              <a href="#" class="calendar-event bg-warning text-light" v-if="attendance.off_status">{{ $t(`meta.attendance_statuses.${attendance.off_status}`) }}</a>
              <a href="#" class="calendar-event bg-success text-light" v-if="attendance.holiday">{{ attendance.holiday.name }}</a>
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
import { mapState, mapActions } from 'vuex'

export default {
  name: 'full-calendar',

  data () {
    return {
      today: this.$moment(),
      dateContext: this.$moment(),
      days: this.$moment.weekdaysShort(),
      attendances: []
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

    ...mapState('initialStates', [
      'currentUser',
      'currentCompany'
    ])
  },

  methods: {
    nextMonth () {
      this.dateContext = this.$moment(this.dateContext).add(1, 'month')
      this.getCalendarAttendances(this.dateContext.format('YYYY-MM-DD')).then(response => this.formatAttendances(response))
    },

    lastMonth () {
      this.dateContext = this.$moment(this.dateContext).subtract(1, 'month')
      this.getCalendarAttendances(this.dateContext.format('YYYY-MM-DD')).then(response => this.formatAttendances(response))
    },

    formatAttendances (response) {
      this.attendances = []
      let attendances = []
      const date = response.data.attendances[0] ? this.$moment(response.data.attendances[0].day) : this.$moment()
      const userJoinDate = this.$moment(this.currentUser.created_at)
      const findHolidayByDay = function (currentDay) {
        return response.data.holidays.find(holiday => {
          return this.$moment(currentDay).isBetween(holiday.started_at, holiday.ended_at)
        })
      }

      // Loop render day in month
      for (let day = 1; day <= date.daysInMonth(); day++) {
        const currentDay = this.$moment(`${date.year()}-${date.format('MM')}-${day}`, 'YYYY-MM-D')
        let attendance = { id: null, day: currentDay.format('YYYY-MM-DD'), attended_at: '', left_at: '', attending_status: '', leaving_status: '', off_status: '', holiday: null }
        let holiday = null

        // Check if current rendering day is a holiday
        if (response.data.holidays) holiday = findHolidayByDay.call(this, currentDay)

        // If currentDay is a holiday, set holiday object into attendance object
        if (holiday) attendance = Object.assign({}, attendance, { holiday: holiday })

        // A valid day is a day before today and after current user's join date
        if (this.$moment().isAfter(currentDay) && this.$moment(currentDay).isAfter(userJoinDate)) {
          const tmpAttendance = response.data.attendances.find(item => currentDay.format('YYYY-MM-DD') === item.day)

          // If current user already attended on current day then set attendance information
          // Else if current user did not attend on current day then check if current day is weekend or unpaid leave day
          if (tmpAttendance) {
            attendance = tmpAttendance
          } else if (!holiday) {
            attendance = Object.assign({}, attendance, {
              off_status: this.currentCompany.breakdays.includes(currentDay.format('dddd').toLowerCase()) ? '' : 'unpaid_leave'
            })
          }
        }

        attendances.push(attendance)
      }

      this.attendances = attendances
    },

    ...mapActions('calendar', [
      'getCalendarAttendances'
    ])
  },

  created () {
    this.getCalendarAttendances().then(response => this.formatAttendances(response))
  }
}
</script>

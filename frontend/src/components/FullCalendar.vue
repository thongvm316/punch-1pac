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
          <div class="calendar-date current-month" v-for="event in events">
            <button class="date-item" :class="{'date-today': event.day == initialDate && month == initialMonth && year == initialYear}">{{ event.day }}</button>
            <a href="#calendars" class="calendar-event bg-primary text-light">{{ event.attend_event }}</a>
            <a href="#calendars" class="calendar-event bg-error text-light">{{ event.leave_event }}</a>
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
import moment from 'moment'

export default {
  name: 'full-calendar',

  data () {
    return {
      today: moment(),
      dateContext: moment(),
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      events: [
        {
          day: 1,
          attend_event: 'Arrive on time',
          leave_event: 'Leave early'
        },
        {
          day: 2,
          attend_event: 'Arrive late',
          leave_event: 'Leave early'
        },
        {
          day: 3,
          attend_event: 'Arrive on time',
          leave_event: 'Leave early'
        },
        {
          day: 4,
          attend_event: 'Arrive late',
          leave_event: 'Leave on time'
        },
        {
          day: 5,
          attend_event: 'Arrive on time',
          leave_event: 'Leave on time'
        },
        {
          day: 6,
          attend_event: 'Arrive on time',
          leave_event: 'Leave early'
        },
        {
          day: 7,
          attend_event: 'Arrive on time',
          leave_event: 'Leave on time'
        },
        {
          day: 8,
          attend_event: 'Arrive late',
          leave_event: 'Leave early'
        },
        {
          day: 9,
          attend_event: 'Arrive on time',
          leave_event: 'Leave on time'
        },
        {
          day: 10,
          attend_event: 'Arrive late',
          leave_event: 'Leave early'
        },
        {
          day: 11,
          attend_event: 'Arrive on time',
          leave_event: 'Leave early'
        },
        {
          day: 12,
          attend_event: 'Arrive late',
          leave_event: 'Leave early'
        },
        {
          day: 13,
          attend_event: 'Arrive on time',
          leave_event: 'Leave on time'
        },
        {
          day: 14,
          attend_event: 'Arrive on time',
          leave_event: 'Leave on time'
        },
        {
          day: 15,
          attend_event: 'Arrive late',
          leave_event: 'Leave on time'
        },
        {
          day: 16,
          attend_event: 'Arrive on time',
          leave_event: 'Leave on time'
        },
        {
          day: 17,
          attend_event: 'Arrive on time',
          leave_event: 'Leave early'
        },
        {
          day: 18,
          attend_event: 'Arrive on time',
          leave_event: 'Leave on time'
        },
        {
          day: 19,
          attend_event: 'Arrive on time',
          leave_event: 'Leave on time'
        },
        {
          day: 20,
          attend_event: 'Arrive on time',
          leave_event: 'Leave on time'
        },
        {
          day: 21,
          attend_event: 'Arrive late',
          leave_event: 'Leave on time'
        },
        {
          day: 22,
          attend_event: 'Arrive on time',
          leave_event: 'Leave on time'
        },
        {
          day: 23,
          attend_event: 'Arrive on time',
          leave_event: 'Leave on time'
        },
        {
          day: 24,
          attend_event: 'Arrive late',
          leave_event: 'Leave on time'
        },
        {
          day: 25,
          attend_event: 'Arrive on time',
          leave_event: 'Leave on time'
        },
        {
          day: 26,
          attend_event: 'Arrive late',
          leave_event: 'Leave on time'
        },
        {
          day: 27,
          attend_event: 'Arrive on time',
          leave_event: 'Leave on time'
        },
        {
          day: 28,
          attend_event: 'Arrive on time',
          leave_event: 'Leave on time'
        },
        {
          day: 29,
          attend_event: 'Arrive late',
          leave_event: 'Leave on time'
        },
        {
          day: 30,
          attend_event: 'Arrive on time',
          leave_event: 'Leave on time'
        },
        {
          day: 31,
          attend_event: 'Arrive on time',
          leave_event: 'Leave on time'
        }
      ]
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
      var previousMonth = moment(this.dateContext).add(1, 'month')
      return previousMonth.daysInMonth()
    },

    daysInPreviousMonth () {
      var nextMonth = moment(this.dateContext).subtract(1, 'month')
      return nextMonth.daysInMonth()
    },

    firstDayOfMonth () {
      var startDate = this.dateContext.clone().startOf('month')
      return startDate.day()
    },

    currentDate () {
      return this.dateContext.get('date')
    },

    lastDaysPreviousMonth () {
      var start = this.firstDayOfMonth
      var previousDaysInMonth = this.daysInPreviousMonth
      var previousDays = []
      for (var i = 1; i <= previousDaysInMonth; i++) {
        previousDays.push(i)
      }
      previousDays.splice(0, previousDays.length - start)
      return previousDays
    },

    firstDaysNextMonth () {
      var start = this.firstDayOfMonth
      var daysNow = this.daysInMonth
      var nextDaysInMonth = this.daysInNextMonth
      var daysNextMonth
      var nextDays = []
      for (var i = 1; i <= nextDaysInMonth; i++) {
        nextDays.push(i)
      }
      if ((start < 5 || daysNow < 30) || (start === 5 && daysNow === 30)) {
        daysNextMonth = 35 - daysNow - start
      } else {
        daysNextMonth = 42 - daysNow - start
      }
      nextDays.splice(daysNextMonth)
      return nextDays
    }
  },

  methods: {
    nextMonth () {
      this.dateContext = moment(this.dateContext).add(1, 'month')
    },

    lastMonth () {
      this.dateContext = moment(this.dateContext).subtract(1, 'month')
    }
  }
}
</script>

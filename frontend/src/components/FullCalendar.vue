<template>
  <div>
    <div class="calendar calendar-lg">
      <div class="calendar-nav">
        <div class="calendar-nav-section">
          <h3 class="m-0">{{ dateContext.locale(currentUser.language) | moment_lll }}</h3>
        </div>
        <div class="calendar-nav-section">
          <button class="btn btn-secondary btn-action" @click="lastMonth">
            <svg width="14px" height="24px" viewBox="0 0 14 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor" fill-rule="evenodd">
              <path d="M.72223,12.85657l10.8297,10.78914a1.22274,1.22274,0,0,0,1.7215,0,1.2062,1.2062,0,0,0,0-1.712L3.30272,
              12.0006l9.9695-9.93308a1.20763,1.20763,0,0,0,0-1.71323,1.22274,1.22274,0,0,0-1.7215,0L.721,11.14343A1.21956,1.21956,0,0,0,.72223,12.85657Z"/>
            </svg>
          </button>
          <button class="btn btn-secondary" @click="currentMonth">
            {{ $t('dashboard.calendarToday') }}
          </button>
          <button class="btn btn-secondary btn-action" @click="nextMonth">
            <svg width="14px" height="24px" viewBox="0 0 14 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor" fill-rule="evenodd">
              <path d="M18.2777749,11.1434337 L7.44807493,0.354286569 C6.97287493,-0.118095523 6.20297493,-0.118095523 5.72657493,0.354286569 C5.25137493,0.82666866 5.25137493,1.59394075 5.72657493,2.06632284 L15.6972749,11.999402 L5.72777493,21.9324813 C5.25257493,22.4048633 5.25257493,23.1721354 5.72777493,23.6457134 C6.20297493,24.1180955 6.97407493,24.1180955 7.44927493,23.6457134 L18.2789749,12.8565663 C18.7469749,12.3890674 18.7469749,11.6097367 18.2777749,11.1434337 Z"></path>
            </svg>
          </button>
        </div>
      </div>

      <div class="calendar-container">
        <div class="calendar-header">
          <div class="calendar-date h5 text-dark" v-for="day in days">{{ day }}</div>
        </div>
        <div class="calendar-body">
          <div class="calendar-date prev-month disabled" v-for="date in lastDaysPreviousMonth">
            <button class="date-item">{{ date }}</button>
          </div>
          <calendar-date :calendar-attendance="attendance" :today="today" v-for="attendance in attendances" :key="attendance.day" @click.native="toggleConfirmModal(attendance)"/>
          <div class="calendar-date next-month disabled" v-for="date in firstDaysNextMonth">
            <button class="date-item">{{ date }}</button>
          </div>
        </div>
      </div>
    </div>

    <modal :title="titleModal" :modal-open.sync="isRequestModalOpen">
      <div class="form-group">
        <label class="form-label">{{ $t('dashboard.request.label') }}</label>
        <select class="form-select" v-model="selectedRequestKind" @change="changeTitleConfirmModal">
          <option value=""></option>
          <option :value="kind" v-for="kind in ['attendance', 'annual_leave']">{{ $t(`dashboard.request.kind.${kind}`) }}</option>}
        </select>
      </div>
      <request-form v-if="this.selectedRequestKind === 'attendance'" :attendance="attendance" @afterModify="isRequestModalOpen = false"></request-form>
      <annual-leave-form v-if="this.selectedRequestKind === 'annual_leave'" :annual-day="annualLeaveDay" @finishRequest="isRequestModalOpen = false"/></annual-leave-form>
    </modal>

    <modal :title="$t('attendances.modal.addTitle')" :modal-open.sync="isEditModalOpen">
      <request-form v-if="isEditModalOpen" :attendance="attendance" @afterModify="isEditModalOpen = false"></request-form>
    </modal>

    <modal :title="$t('annualLeave.title')" :modal-open.sync="isAddModalOpen">
      <annual-leave-form v-if="isAddModalOpen" :annual-day="annualLeaveDay" @finishRequest="isAddModalOpen = false"/></annual-leave-form>
    </modal>
  </div>
</template>

<script>
import CalendarDate from '../components/CalendarDate.vue'
import RequestForm from '../components/RequestForm'
import AnnualLeaveForm from '../components/AnnualLeaveForm'
import { mapState, mapActions } from 'vuex'
import modal from '../mixins/modal'

export default {
  name: 'full-calendar',

  mixins: [modal],

  data() {
    return {
      attendance: {},
      today: this.$moment(),
      dateContext: this.$moment().locale('en'),
      days: this.$moment.weekdaysShort(),
      attendances: [],
      annualLeaveDay: '',
      titleModal: this.$t('dashboard.request.title'),
      selectedRequestKind: {},
      isRequestModalOpen: false
    }
  },

  components: {
    CalendarDate,
    RequestForm,
    AnnualLeaveForm
  },

  computed: {
    year() {
      return this.dateContext.format('YYYY')
    },

    month() {
      return this.dateContext.format('MMMM')
    },

    initialDate() {
      return this.today.get('date')
    },

    initialMonth() {
      return this.today.format('MMMM')
    },

    initialYear() {
      return this.today.format('YYYY')
    },

    daysInMonth() {
      return this.dateContext.daysInMonth()
    },

    daysInNextMonth() {
      const previousMonth = this.$moment(this.dateContext).add(1, 'month')
      return previousMonth.daysInMonth()
    },

    daysInPreviousMonth() {
      const nextMonth = this.$moment(this.dateContext).subtract(1, 'month')
      return nextMonth.daysInMonth()
    },

    firstDayOfMonth() {
      const startDate = this.dateContext.clone().startOf('month')
      return startDate.day()
    },

    currentDate() {
      return this.dateContext.get('date')
    },

    lastDaysPreviousMonth() {
      const start = this.firstDayOfMonth
      const previousDaysInMonth = this.daysInPreviousMonth
      let previousDays = []
      for (let i = 1; i <= previousDaysInMonth; i++) {
        previousDays.push(i)
      }
      previousDays.splice(0, previousDays.length - start)
      return previousDays
    },

    firstDaysNextMonth() {
      const start = this.firstDayOfMonth
      const daysNow = this.daysInMonth
      const nextDaysInMonth = this.daysInNextMonth
      let daysNextMonth
      let nextDays = []
      for (let i = 1; i <= nextDaysInMonth; i++) {
        nextDays.push(i)
      }
      if (start < 5 || daysNow < 30 || (start === 5 && daysNow === 30)) {
        daysNextMonth = 35 - daysNow - start
      } else {
        daysNextMonth = 42 - daysNow - start
      }
      nextDays.splice(daysNextMonth)
      return nextDays
    },

    ...mapState('initialStates', ['currentCompany'])
  },

  methods: {
    nextMonth() {
      this.dateContext = this.$moment(this.dateContext).add(1, 'month')
      this.getCalendarAttendances(this.dateContext.locale('en').format('YYYY-MM-DD')).then(response => this.formatAttendances(response.data))
    },

    lastMonth() {
      this.dateContext = this.$moment(this.dateContext).subtract(1, 'month')
      this.getCalendarAttendances(this.dateContext.locale('en').format('YYYY-MM-DD')).then(response => this.formatAttendances(response.data))
    },

    currentMonth() {
      this.dateContext = this.$moment(this.today)
      this.getCalendarAttendances(this.dateContext.locale('en').format('YYYY-MM-DD')).then(response => this.formatAttendances(response.data))
    },

    formatAttendances(response) {
      this.attendances = []
      let attendances = []
      const date = response.attendances[0] ? this.$moment(response.attendances[0].day).locale('en') : this.dateContext
      const userJoinDate = this.$moment(this.currentUser.created_at)
      const findHolidayByDay = function(currentDay) {
        return response.holidays.find(holiday => {
          return currentDay.isBetween(holiday.started_at, holiday.ended_at, null, '[]')
        })
      }

      // Loop render day in month
      for (let day = 1; day <= date.daysInMonth(); day++) {
        const currentDay = this.$moment(`${date.year()}-${date.format('MM')}-${day}`, 'YYYY-MM-D').locale('en')
        let attendance = { id: null, day: currentDay.format('YYYY-MM-DD'), attended_at: '', left_at: '', attending_status: '', leaving_status: '', off_status: '', holiday: null }
        let holiday = null
        const tmpAttendance = response.attendances.find(item => currentDay.format('YYYY-MM-DD') === item.day)

        // Check if current rendering day is a holiday
        if (response.holidays) holiday = findHolidayByDay.call(this, currentDay)

        // If currentDay is a holiday, set holiday object into attendance object
        if (holiday) attendance = Object.assign({}, attendance, { holiday: holiday })

        if (!this.isInDeactivatedTime(currentDay)) {
          // If currentDay is an annual leave day
          if (tmpAttendance && tmpAttendance.off_status === 'annual_leave') attendance = Object.assign({}, attendance, tmpAttendance)

          // A valid day is a day before today and after current user's join date
          if (this.today.isSameOrAfter(currentDay, 'day') && currentDay.isSameOrAfter(userJoinDate, 'day')) {
            // If current user already attended on current day then set attendance information
            // Else if current user did not attend on current day then check if current day is weekend or unpaid leave day
            if (tmpAttendance) {
              attendance = tmpAttendance
            } else if (!holiday) {
              attendance = Object.assign({}, attendance, {
                off_status: this.currentCompany.breakdays.includes(currentDay.format('dddd').toLowerCase()) ? '' : 'leave'
              })
            }
          }
        }

        attendances.push(attendance)
      }

      this.attendances = attendances
    },

    isInDeactivatedTime(currentDay) {
      if (currentDay.isBetween(this.currentUser.deactivated_at, this.currentUser.activated_at, null, '[]')) return true
      if (!this.currentUser.activated && currentDay.isSameOrAfter(this.currentUser.deactivated_at, 'day')) return true
      return false
    },

    ...mapActions('calendar', ['getCalendarAttendances']),

    toggleConfirmModal(data) {
      this.selectedRequestKind = ''
      this.titleModal = this.$t('dashboard.request.title')
      this.annualLeaveDay = data.day
      this.attendance = data

      if (this.today.isSameOrAfter(data.day)) {
        data.attended_at === '' ? (this.isRequestModalOpen = !this.isRequestModalOpen) : (this.isEditModalOpen = !this.isEditModalOpen)
      } else {
        this.isAddModalOpen = !this.isAddModalOpen
      }
    },

    changeTitleConfirmModal() {
      if (this.selectedRequestKind === '') {
        this.titleModal = this.$t('dashboard.request.title')
      } else {
        this.selectedRequestKind === 'attendance' ? (this.titleModal = this.$t('attendances.modal.addTitle')) : (this.titleModal = this.$t('annualLeave.title'))
      }
    }
  },

  created() {
    this.getCalendarAttendances().then(response => this.formatAttendances(response.data))
  }
}
</script>

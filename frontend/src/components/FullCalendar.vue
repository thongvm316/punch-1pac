<template>
  <div>
    <div class="calendar calendar-lg">
      <div class="calendar-nav">
        <div class="calendar-nav-section">
          <h3 class="m-0">
            {{ dateContext.locale(currentUser.language) | moment_lll }}
          </h3>
        </div>
        <div class="calendar-nav-section">
          <button
            ref="lastMonthBtn"
            class="btn btn-secondary btn-action"
            @click="lastMonth"
          >
            <p-ico-prev-arrow />
          </button>
          <button
            ref="currentMonthBtn"
            class="btn btn-secondary"
            @click="currentMonth"
          >
            {{ $t('dashboard.calendarToday') }}
          </button>
          <button
            ref="nextMonthBtn"
            class="btn btn-secondary btn-action"
            @click="nextMonth"
          >
            <p-ico-next-arrow />
          </button>
        </div>
      </div>

      <div class="calendar-container">
        <div class="calendar-header">
          <div
            v-for="day in days"
            :key="day"
            class="calendar-date h5 text-dark"
          >
            {{ day }}
          </div>
        </div>
        <div class="calendar-body">
          <div
            v-for="date in lastDaysPreviousMonth"
            :key="date"
            class="calendar-date prev-month disabled"
          >
            <button class="date-item">
              {{ date }}
            </button>
          </div>
          <calendar-date
            v-for="attendanceItem in attendances"
            :key="attendanceItem.day"
            ref="calendarDate"
            :calendar-attendance="attendanceItem"
            :today="today"
            @click.native="toggleConfirmModal(attendanceItem)"
          />
          <div
            v-for="date in firstDaysNextMonth"
            :key="date"
            class="calendar-date next-month disabled"
          >
            <button class="date-item">
              {{ date }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <modal
      ref="requestModal"
      :title="titleModal"
      :modal-open.sync="isRequestModalOpen"
    >
      <div class="form-group">
        <label class="form-label">{{ $t('label.kind') }}</label>
        <select
          v-model="selectedRequestKind"
          class="form-select"
          @change="changeTitleConfirmModal"
        >
          <option value="" />
          <option
            v-for="kind in ['attendance', 'annual_leave']"
            :key="kind"
            :value="kind"
          >
            {{ $t(`modal.request.kind.${kind}`) }}
          </option>}
        </select>
      </div>
      <request-form
        v-if="selectedRequestKind === 'attendance'"
        :attendance="attendance"
        @afterModify="isRequestModalOpen = false"
      />
      <annual-leave-form
        v-if="selectedRequestKind === 'annual_leave'"
        :annual-day="annualLeaveDay"
        @finishRequest="isRequestModalOpen = false"
      />
    </modal>

    <modal
      ref="editModal"
      :title="$t('modal.request.addTitle')"
      :modal-open.sync="isEditModalOpen"
    >
      <request-form
        v-if="isEditModalOpen"
        :attendance="attendance"
        @afterModify="isEditModalOpen = false"
      />
    </modal>

    <modal
      ref="addModal"
      :title="$t('modal.annualLeave.title')"
      :modal-open.sync="isAddModalOpen"
    >
      <annual-leave-form
        v-if="isAddModalOpen"
        :annual-day="annualLeaveDay"
        @finishRequest="isAddModalOpen = false"
      />
    </modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import modal from '@/mixins/modal'
const PIcoPrevArrow = () => import('@/punch-ui/punch-icons/PIcoPrevArrow')
const PIcoNextArrow = () => import('@/punch-ui/punch-icons/PIcoNextArrow')
const CalendarDate = () => import('@/components/CalendarDate.vue')
const RequestForm = () => import('@/components/RequestForm')
const AnnualLeaveForm = () => import('@/components/AnnualLeaveForm')

export default {
  name: 'FullCalendar',

  components: {
    CalendarDate,
    RequestForm,
    AnnualLeaveForm,
    PIcoPrevArrow,
    PIcoNextArrow
  },

  mixins: [modal],

  data() {
    return {
      attendance: {},
      today: this.$moment(),
      dateContext: this.$moment().locale('en'),
      days: this.$moment.weekdaysShort(),
      attendances: [],
      annualLeaveDay: '',
      titleModal: this.$t('modal.request.title'),
      selectedRequestKind: {},
      isRequestModalOpen: false
    }
  },

  computed: {
    ...mapState('initialStates', ['currentCompany']),

    formattedDateContext() {
      return this.dateContext.format('YYYY-MM-DD')
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
    }
  },

  watch: {
    dateContext(newValue) {
      this.getCalendarAttendances(newValue.format('YYYY-MM-DD')).then(response => this.formatAttendances(response.data))
    }
  },

  created() {
    this.getCalendarAttendances(this.formattedDateContext).then(response => this.formatAttendances(response.data))
  },

  methods: {
    ...mapActions('calendar', ['getCalendarAttendances']),

    nextMonth() {
      this.dateContext = this.$moment(this.dateContext).add(1, 'month')
    },

    lastMonth() {
      this.dateContext = this.$moment(this.dateContext).subtract(1, 'month')
    },

    currentMonth() {
      this.dateContext = this.$moment(this.today)
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
          if (this.today.isSameOrAfter(currentDay, 'day')) {
            // If current user already attended on current day then set attendance information
            // Else if current user did not attend on current day then check if current day is weekend or unpaid leave day
            // Only display when currentDay is same or after user created date
            if (tmpAttendance) {
              attendance = tmpAttendance
            } else if (!holiday && currentDay.isSameOrAfter(userJoinDate, 'day')) {
              attendance = Object.assign({}, attendance, {
                off_status: this.today.isAfter(currentDay, 'day') && !this.currentCompany.breakdays.includes(currentDay.format('dddd').toLowerCase()) ? 'leave' : ''
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

    toggleConfirmModal(data) {
      this.selectedRequestKind = ''
      this.titleModal = this.$t('modal.request.title')
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
        this.titleModal = this.$t('modal.request.title')
      } else {
        this.selectedRequestKind === 'attendance' ? (this.titleModal = this.$t('modal.request.addTitle')) : (this.titleModal = this.$t('modal.annualLeave.title'))
      }
    }
  }
}
</script>

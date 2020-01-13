<template>
  <main-layout :title="$t('attendances.groupTitle', { name: group.name })">
    <group-tab :group-id="$route.params.id"/>

    <div class="toolbar z-index-10 mt-5 clearfix">
      <month-year-picker v-model="dateData"/>
      <select class="form-select" v-model="userId">
        <option v-for="user in usersInGroup" :key="user.id" :value="user.id">{{ user.email }}</option>
      </select>

      <button v-if="isValidTime" class="btn btn-success float-right" @click="exportFile($event, { type: 'csv', requestPath: `/groups/${$route.params.id}/users/${$route.params.user_id}/report`, fileName: fileExportedName })">{{ $t('groups.btn.exportCSVGroupReport') }}</button>
    </div>

    <table v-if="isValidTime" class="table table-bordered has-fixed-head bg-light mt-5">
      <thead>
        <th>{{ $t('groups.report.date') }}</th>
        <th>{{ $t('groups.report.check_in') }}</th>
        <th>{{ $t('groups.report.check_out') }}</th>
        <th>{{ $t('groups.report.late') }}</th>
        <th>{{ $t('groups.report.leave_early') }}</th>
        <th>{{ $t('groups.report.day_off') }}</th>
        <th>{{ $t('groups.report.working_hours') }}</th>
      </thead>
      <tbody>
        <tr v-for="attendance in attendances" :key="attendance.id" :class="{'is-holiday': attendance.holiday, 'is-breakday': isBreakday(attendance)}">
          <td>{{ getFormatedDate(attendance.day) }}</td>
          <td><span :class="{'label label-warning w-full text-bold-700': attendance.attending_status === 'attend_late'}">{{ attendance.attended_at ? attendance.attended_at : handleEmptyData(attendance) }}</span></td>
          <td><span :class="{'label label-error w-full text-bold-700': attendance.leaving_status === 'leave_early'}">{{ attendance.left_at ? attendance.left_at : handleEmptyData(attendance) }}</span></td>
          <td>{{ attendance.attending_status === 'attend_late' ? $t('groups.report.attend_late') : handleEmptyData(attendance) }}</td>
          <td>{{ attendance.leaving_status === 'leave_early' ? $t('groups.report.leave_early') : handleEmptyData(attendance) }}</td>
          <td :class="{'is-overflow tooltip': getDayOffStatus(attendance).length > 1}" :data-tooltip="getDayOffStatus(attendance)"><span :class="{'text-notice text-bold-700' : attendance.off_status || attendance.holiday}">{{ getDayOffStatus(attendance) }}</span></td>
          <td>{{ getFormatedWorkingHours(attendance) }}</td>
        </tr>
        <tr>
          <td>{{ $t('groups.report.total') }}</td>
          <td>{{ personalReport.report.attend_ok }}/{{ personalReport.totalWorkingDays }}</td>
          <td>{{ personalReport.report.leave_ok }}/{{ personalReport.totalWorkingDays }}</td>
          <td>{{ personalReport.report.attend_late }}/{{ personalReport.totalWorkingDays }}</td>
          <td>{{ personalReport.report.leave_early }}/{{ personalReport.totalWorkingDays }}</td>
          <td>{{ personalReport.report.leave }}/{{ personalReport.totalWorkingDays }}</td>
          <td>{{ totalWorkingHours }}/{{ `${personalReport.totalWorkingHours}h` }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else class="mt-5">{{ $t('groups.report.no_data') }}</p>
  </main-layout>
</template>

<script>
import MonthYearPicker from '../components/MonthYearPicker'
import MainLayout from '../layouts/Main'
import GroupTab from '../components/GroupTab'
import exportFile from '../mixins/export-file'
import { mapState, mapActions } from 'vuex'

export default {
  mixins: [exportFile],

  data() {
    return {
      attendances: [],
      dateData: {
        date: this.$moment().format('YYYY-MM-DD'),
        type: 'month'
      },
      userId: this.$route.params.user_id,
      dateContext: this.$moment().locale('en'),
      today: this.$moment()
    }
  },

  components: {
    MainLayout,
    GroupTab,
    MonthYearPicker
  },

  computed: {
    ...mapState('group', ['group', 'usersInGroup']),

    ...mapState('initialStates', ['meta', 'currentCompany']),

    ...mapState('groupReport', ['personalReport']),

    validDaysOfMonth() {
      const startDateOfMonth = this.dateContext.startOf('month')
      if (this.today.format('MM-YYY') === startDateOfMonth.format('MM-YYYY')) return this.today.diff(startDateOfMonth, 'days') + 1
      return startDateOfMonth.daysInMonth()
    },

    totalWorkingHours() {
      const totalWorkingMinutes = this.personalReport.report.working_hours / 60
      return `${Math.trunc(totalWorkingMinutes / 60)}h${Math.trunc(totalWorkingMinutes % 60)}m`
    },

    fileExportedName() {
      const targetUserExportedName = this.usersInGroup.find(user => user.id === parseInt(this.userId)).name.replace(/\s/g, '')
      const dateExported = this.$moment(this.dateData.date).format('YYYY-MM')

      return `report_${targetUserExportedName}_${dateExported}`
    },

    isValidTime() {
      return this.$moment(this.dateData.date).isBetween(this.currentUser.created_at, this.today, 'month', [])
    }
  },

  methods: {
    ...mapActions('group', ['getGroup', 'getUsersInGroup']),

    ...mapActions('groupReport', ['getPersonalReport']),

    ...mapActions('calendar', ['getCalendarAttendances']),

    isInDeactivatedTime(currentDay) {
      if (currentDay.isBetween(this.currentUser.deactivated_at, this.currentUser.activated_at, null, '[]')) return true
      if (!this.currentUser.activated && currentDay.isSameOrAfter(this.currentUser.deactivated_at, 'day')) return true
      return false
    },

    isBreakday(date) {
      return this.currentCompany.breakdays.includes(this.getDayOfWeek(date.day))
    },

    handleEmptyData(attendance) {
      return attendance.holiday || this.isBreakday(attendance) ? '' : '-'
    },

    formatAttendances(response) {
      let attendances = []
      const date = response.attendances[0] ? this.$moment(response.attendances[0].day).locale('en') : this.dateContext
      const userJoinDate = this.$moment(this.currentUser.created_at)
      const findHolidayByDay = currentDay => response.holidays.find(holiday => currentDay.isBetween(holiday.started_at, holiday.ended_at, null, '[]'))

      // Loop render day in month
      for (let day = 1; day <= this.validDaysOfMonth; day++) {
        const currentDay = this.$moment(`${date.year()}-${date.format('MM')}-${day}`, 'YYYY-MM-D').locale('en')

        // A valid day is a day before today and after current user's join date
        if (this.today.isSameOrAfter(currentDay, 'day')) {
          const tmpAttendance = response.attendances.find(item => currentDay.format('YYYY-MM-DD') === item.day)
          let attendance = { id: null, day: currentDay.format('YYYY-MM-DD'), attended_at: '', left_at: '', attending_status: '', leaving_status: '', off_status: '', holiday: null }

          // Check if current rendering day is a holiday
          const holiday = findHolidayByDay(currentDay)

          // If currentDay is a holiday, set holiday object into attendance object
          if (holiday) attendance = { ...attendance, holiday }

          if (!this.isInDeactivatedTime(currentDay)) {
            // If currentDay is an annual leave day
            if (tmpAttendance && tmpAttendance.off_status === 'annual_leave') attendance = { ...attendance, ...tmpAttendance }

            // If current user already attended on current day then set attendance information
            // Else if current user did not attend on current day then check if current day is weekend or unpaid leave day
            // Only display when currentDay is same or after user created date
            if (tmpAttendance) {
              attendance = tmpAttendance
            } else if (!holiday && currentDay.isSameOrAfter(userJoinDate, 'day')) {
              attendance = {
                ...attendance,
                off_status: this.today.isAfter(currentDay, 'day') && !this.currentCompany.breakdays.includes(currentDay.format('dddd').toLowerCase()) ? 'leave' : ''
              }
            }
          }

          attendances.push(attendance)
        }
      }

      this.attendances = attendances
    },

    getDayOfWeek(date) {
      return this.$moment(date)
        .format('dddd')
        .toLowerCase()
    },

    getFormatedDate(date) {
      return this.$moment(date).format('dddd ( D/MM )')
    },

    getFormatedWorkingHours(date) {
      if (!date.working_hours) {
        if (date.holiday || this.isBreakday(date)) return ''
        return '-'
      }

      const formatedWorkingHour = {
        hours: `${date.working_hours.hours}h`,
        mins: date.working_hours.mins ? `${date.working_hours.mins}m` : ''
      }
      return `${formatedWorkingHour.hours}${formatedWorkingHour.mins}`
    },

    getDayOffStatus(date) {
      if (date.holiday) return date.holiday.name
      if (date.off_status) return this.$t('groups.report.day_off')
      if (this.isBreakday(date)) return ''
      return '-'
    }
  },

  created() {
    this.getPersonalReport({ group_id: this.$route.params.id, user_id: this.userId, ...this.dateData }).then(response => {
      this.formatAttendances(response.data)
    })
    this.getUsersInGroup(this.$route.params.id)
    if (!this.group) this.getGroup(this.$route.params.id)
  },

  watch: {
    dateData: {
      handler: function() {
        this.getPersonalReport({ group_id: this.$route.params.id, user_id: this.userId, ...this.dateData }).then(response => {
          this.formatAttendances(response.data)
        })
        this.dateContext = this.$moment(this.dateData.date)
      },
      deep: true
    },

    userId() {
      this.$router.push({ params: { user_id: this.userId } })
      this.getPersonalReport({ group_id: this.$route.params.id, user_id: this.userId, ...this.dateData }).then(response => {
        this.formatAttendances(response.data)
      })
    }
  }
}
</script>

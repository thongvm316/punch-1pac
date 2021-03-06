<template>
  <main-layout :title="$t('attendances.groupTitle', { name: group.name })">
    <group-tab :group-id="$route.params.id" />

    <div class="toolbar z-index-10 mt-5 clearfix">
      <flat-pickr
        :config="{mode: 'range', locale: flatpickrLocaleMapper[pickrLocale]}"
        class="form-input daterange-picker"
        :value="formatDateRange(params)"
        @on-close="onCloseFlatpickr"
      />
      <select
        v-model="userId"
        class="form-select email-select"
      >
        <option
          v-for="user in usersInGroup"
          :key="user.id"
          :value="user.id"
        >
          {{ user.email }}
        </option>
      </select>

      <button
        v-if="isValidTime"
        class="btn btn-success float-right"
        @click="exportFile($event, { type: 'csv', requestPath: `/groups/${$route.params.id}/users/${$route.params.user_id}/report`, fileName: fileExportedName })"
      >
        {{ $t('button.group.exportCSVGroupReport') }}
      </button>
    </div>

    <table
      v-if="isValidTime"
      class="table table-bordered has-fixed-head bg-light mt-5"
    >
      <thead>
        <th>{{ $t('tableHeader.date') }}</th>
        <th>{{ $t('tableHeader.check_in') }}</th>
        <th>{{ $t('tableHeader.check_out') }}</th>
        <th>{{ $t('tableHeader.late') }}</th>
        <th>{{ $t('tableHeader.leave_early') }}</th>
        <th>{{ $t('tableHeader.day_off') }}</th>
        <th>{{ $t('tableHeader.working_hours') }}</th>
      </thead>
      <tbody>
        <tr
          v-for="attendance in attendances"
          :key="attendance.id"
          :class="{'is-holiday': attendance.holiday, 'is-breakday': isBreakday(attendance)}"
        >
          <td>{{ getFormattedDate(attendance.day) }}</td>
          <td><span :class="{'label label-warning w-full text-bold-700': attendance.attending_status === 'attend_late'}">{{ attendance.attended_at ? attendance.attended_at : handleEmptyData(attendance) }}</span></td>
          <td><span :class="{'label label-error w-full text-bold-700': attendance.leaving_status === 'leave_early'}">{{ attendance.left_at ? attendance.left_at : handleEmptyData(attendance) }}</span></td>
          <td>{{ attendance.attending_status === 'attend_late' ? getFormattedHours(attendance.attend_late) : handleEmptyData(attendance) }}</td>
          <td>{{ attendance.leaving_status === 'leave_early' ? getFormattedHours(attendance.leave_early) : handleEmptyData(attendance) }}</td>
          <td
            :class="{'is-overflow tooltip': getDayOffStatus(attendance).length > 1}"
            :data-tooltip="getDayOffStatus(attendance)"
          >
            <span :class="{'text-notice text-bold-700' : attendance.off_status || attendance.holiday}">{{ getDayOffStatus(attendance) }}</span>
          </td>
          <td>{{ attendance.working_hours ? getFormattedHours(attendance.working_hours) : handleEmptyData(attendance) }}</td>
        </tr>
        <tr>
          <td>{{ $t('groups.report.total') }}</td>
          <td>{{ personalReport.report.attend_days }} / {{ personalReport.totalWorkingDays }}</td>
          <td>{{ personalReport.report.left_days }} / {{ personalReport.totalWorkingDays }}</td>
          <td>{{ getFormattedHours(personalReport.report.minutes_attend_late) }} / {{ `${personalReport.totalWorkingHours}h` }}</td>
          <td>{{ getFormattedHours(personalReport.report.minutes_leave_early) }} / {{ `${personalReport.totalWorkingHours}h` }}</td>
          <td>{{ personalReport.report.leave }} / {{ personalReport.totalWorkingDays }}</td>
          <td>{{ getFormattedHours(personalReport.report.working_hours) }} / {{ `${personalReport.totalWorkingHours}h` }}</td>
        </tr>
      </tbody>
    </table>
    <p
      v-else
      class="mt-5"
    >
      {{ $t('groups.report.no_data') }}
    </p>
  </main-layout>
</template>

<script>
import flatpickrLocale from '../mixins/flatpickr-locale'
import dateRangePicker from '../mixins/date-range-picker'
import exportCsv from '../mixins/export-csv'
import { mapState, mapActions } from 'vuex'
const MainLayout = () => import('../layouts/Main')
const GroupTab = () => import('../components/GroupTab')
const flatPickr = () => import('vue-flatpickr-component')

export default {

  components: {
    MainLayout,
    GroupTab,
    flatPickr
  },
  mixins: [flatpickrLocale, dateRangePicker, exportCsv],

  data() {
    return {
      attendances: [],
      params: {
        from_date: '',
        to_date: ''
      },
      userId: this.$route.params.user_id,
      dateContext: this.$moment().locale('en'),
      today: this.$moment()
    }
  },

  computed: {
    ...mapState('group', ['group', 'usersInGroup']),

    ...mapState('initialStates', ['meta', 'currentCompany']),

    ...mapState('groupReport', ['personalReport']),

    fileExportedName() {
      const targetUserExportedName = this.usersInGroup.find(user => user.id === parseInt(this.userId)).name.replace(/\s/g, '')
      const dateExported = `${this.$moment(this.params.from_date).format('YYYY-MM-DD')}-${this.$moment(this.params.to_date).format('YYYY-MM-DD')}`

      return `report_${targetUserExportedName}_${dateExported}`
    },

    isValidTime() {
      return this.$moment(this.params.to_date).isBetween(this.currentUser.created_at, this.today, 'month', [])
    }
  },

  watch: {
    params: {
      handler: function() {
        this.getPersonalReport({ group_id: this.$route.params.id, user_id: this.userId, ...this.params, type: 'range' }).then(response => {
          this.formatAttendances(response.data, this.params)
        })
        this.dateContext = this.$moment(this.params.date)
      },
      deep: true
    },

    userId() {
      this.$router.push({ params: { user_id: this.userId } })
      this.getPersonalReport({ group_id: this.$route.params.id, user_id: this.userId, ...this.params, type: 'range' }).then(response => {
        this.formatAttendances(response.data, this.params)
      })
    }
  },

  created() {
    this.params = this.initDateRange(this.currentCompany.monthly_report)
    this.getUsersInGroup(this.$route.params.id)
    if (!this.group) this.getGroup(this.$route.params.id)
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

    formatAttendances(responseData, dateRange) {
      let attendances = []
      const userJoinDate = this.$moment(this.currentUser.created_at)
      const findHolidayByDay = currentDay => responseData.holidays.find(holiday => currentDay.isBetween(holiday.started_at, holiday.ended_at, null, '[]'))

      for (let date = this.$moment(dateRange.from_date); date.diff(this.$moment(dateRange.to_date), 'days') <= 0; date.add(1, 'days')) {
        if (this.today.isSameOrAfter(date, 'day')) {
          const tmpAttendance = responseData.attendances.find(item => date.format('YYYY-MM-DD') === item.day)
          let attendance = { id: null, day: date.format('YYYY-MM-DD'), attended_at: '', left_at: '', attending_status: '', leaving_status: '', off_status: '', holiday: null }

          const holiday = findHolidayByDay(date)

          if (holiday) attendance = { ...attendance, holiday }

          if (!this.isInDeactivatedTime(date)) {
            if (tmpAttendance && tmpAttendance.off_status === 'annual_leave') attendance = { ...attendance, ...tmpAttendance }

            if (tmpAttendance) {
              attendance = tmpAttendance
            } else if (!holiday && date.isSameOrAfter(userJoinDate, 'day')) {
              attendance = {
                ...attendance,
                off_status: this.today.isAfter(date, 'day') && !this.currentCompany.breakdays.includes(date.format('dddd').toLowerCase()) ? 'leave' : ''
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
        .locale('en')
        .format('dddd')
        .toLowerCase()
    },

    getFormattedDate(date) {
      return this.$moment(date).locale(this.$i18n.locale).format('dddd ( D/MM )')
    },

    getFormattedHours(data) {
      if (!data) return
      const formattedWorkingHours = {
        hours: `${data.hours}h`,
        mins: data.mins ? `${data.mins}m` : ''
      }
      return `${formattedWorkingHours.hours}${formattedWorkingHours.mins}`
    },

    getDayOffStatus(date) {
      if (date.holiday) return date.holiday.name
      if (date.off_status) return this.$t('groups.report.day_off')
      if (this.isBreakday(date)) return ''
      return '-'
    }
  }
}
</script>

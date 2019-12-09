<template>
  <main-layout :title="$t('attendances.groupTitle', { name: group.name })">
    <group-tab :group-id="$route.params.id"/>

    <div class="toolbar mt-5 clearfix">
      <month-year-picker v-model="dateData"/>
      <select class="form-select" :selected="$route.params.user_id" @change="onChangeUser">
        <option v-for="user in usersInGroup" :key="user.id" :value="user.id">{{ user.email }}</option>
      </select>

      <button class="btn btn-success float-right" @click="exportCsvFile" :disabled="isDisable">{{ $t('groups.btn.exportCSVGroupReport') }}</button>
    </div>

    <table class="table bg-light mt-5">
      <thead>
        <th>Date</th>
        <th>Check in</th>
        <th>Check out</th>
        <th>Late</th>
        <th>Leave early</th>
        <th>Day off</th>
        <th>Working hours</th>
      </thead>
      <tbody>
        <tr v-for="date in attendances">
          <td>{{ date.day }}</td>
          <td>{{ date.attended_at ? date.attended_at : '-' }}</td>
          <td>{{ date.left_at ? date.left_at : '-' }}</td>
          <td>{{ date.attending_status === 'attend_late' ? '1' : '-' }}</td>
          <td>{{ date.leaving_status === 'leave_early' ? '1' : '-' }}</td>
          <td>{{ date.off_status ? '1' : '-' }}</td>
          <td>{{ !date.off_status ? 0 : date.working_hours }}</td>
        </tr>
      </tbody>
    </table>
  </main-layout>
</template>

<script>
import MonthYearPicker from '../components/MonthYearPicker'
import MainLayout from '../layouts/Main'
import GroupTab from '../components/GroupTab'
import { mapState, mapActions } from 'vuex'
import axios from 'axios'

export default {
  data() {
    return {
      isDisable: false,
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

    // ...mapState('groupReport', ['singleReport']),

    ...mapState('initialStates', ['meta']),

    daysInMonth() {
      return this.dateContext.daysInMonth()
    }
  },

  methods: {
    ...mapActions('group', ['getGroup', 'getUsersInGroup']),

    ...mapActions('groupReport', ['getPersonalReport']),

    ...mapActions('calendar', ['getCalendarAttendances']),

    onChangeUser(e) {
      this.$router.push({ params: { user_id: e.target.value } })
      this.userId = this.$route.params.user_id
    },

    isInDeactivatedTime(currentDay) {
      if (currentDay.isBetween(this.currentUser.deactivated_at, this.currentUser.activated_at, null, '[]')) return true
      if (!this.currentUser.activated && currentDay.isSameOrAfter(this.currentUser.deactivated_at, 'day')) return true
      return false
    },

    exportCsvFile() {
      this.isDisable = true
      axios
        .get(`/groups/${this.$route.params.id}/report.csv`, {
          headers: { Accept: 'application/csv' },
          params: { date: this.dateData.date, date_type: this.dateData.type },
          responseType: 'blob'
        })
        .then(response => {
          const downloadLink = document.createElement('a')
          downloadLink.href = window.URL.createObjectURL(new Blob([response.data]))
          downloadLink.setAttribute('download', 'report.csv')
          document.body.appendChild(downloadLink)
          downloadLink.click()
          this.isDisable = false
        })
        .catch(error => {
          this.isDisable = false
          throw error
        })
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
    }
  },

  created() {
    // this.getPersonalReport({ group_id: this.$route.params.id, user_id: this.userId, ...this.dateData })
    //   .then(response => {
    //     this.formatAttendances(response.data.attendances)
    //   })
    this.getCalendarAttendances().then(response => this.formatAttendances(response.data))
    this.getUsersInGroup(this.$route.params.id)
    if (!this.group) this.getGroup(this.$route.params.id)
  },

  watch: {
    dateData: {
      handler: function() {
        this.getPersonalReport({ group_id: this.$route.params.id, user_id: this.userId, ...this.dateData })
        this.dateContext = this.$moment(this.dateData.date)
      },
      deep: true
    },

    userId() {
      this.getPersonalReport({ group_id: this.$route.params.id, user_id: this.userId, ...this.dateData })
    }
  }
}
</script>

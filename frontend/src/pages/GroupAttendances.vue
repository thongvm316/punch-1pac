<template>
  <main-layout :title="$t('attendances.groupTitle', { name: group.name })">
    <group-tab :group-id="$route.params.id"/>

    <div class="toolbar mt-5">
      <flat-pickr
        :config="{mode: 'range', locale: flatpickrLocaleMapper[currentUser.language]}"
        class="form-input daterange-picker"
        v-model="dateRange"/>
      <attendance-status-select v-model="params.status">
        <option slot="placeholder" value="">{{ $t('attendances.placeholder.filterByStatus') }}</option>
      </attendance-status-select>

      <filter-user-box :queryParams="{ group_id: this.$route.params.id, type: 'users_in_group', per_page: 1000 }" :placeholder="$t('attendances.placeholder.filterByUser')" :user.sync="selectedUser"/>
    </div>

    <table class="table bg-light mt-5">
      <thead>
        <th>{{ $t('attendances.tableHeader.name') }}</th>
        <th>{{ $t('attendances.tableHeader.email') }}</th>
        <th>{{ $t('attendances.tableHeader.date') }}</th>
        <th>{{ $t('attendances.tableHeader.attendedAt') }}</th>
        <th>{{ $t('attendances.tableHeader.leftAt') }}</th>
        <th>{{ $t('attendances.tableHeader.status') }}</th>
      </thead>
      <tbody>
        <tr v-for="attendance in attendances">
          <td>
            <div class="tile tile-centered">
              <div class="tile-icon">
                <img :src="attendance.user.avatar_url" class="avatar avatar-md" :alt="attendance.user.name">
              </div>
              <div class="tile-content">{{ attendance.user.name }}</div>
            </div>
          </td>
          <td>{{ attendance.user.email }}</td>
          <td>{{ attendance.day | moment_l }}</td>
          <td :class="{ 'text-warning': attendance.attending_status === 'attend_late', 'text-success': attendance.attending_status === 'attend_ok'}">{{ attendance.attended_at }}</td>
          <td :class="{ 'text-error': attendance.leaving_status === 'leave_early', 'text-success': attendance.leaving_status === 'leave_ok'}">{{ attendance.left_at }}</td>
          <td>
            <span class="label" :class="{ 'label-warning': attendance.attending_status === 'attend_late', 'label-success': attendance.attending_status === 'attend_ok'}" v-if="attendance.attending_status">{{ $t(`meta.attendance_statuses.${attendance.attending_status}`) }}</span>
            <span class="label" :class="{ 'label-error': attendance.leaving_status === 'leave_early', 'label-success': attendance.leaving_status === 'leave_ok'}" v-if="attendance.leaving_status">{{ $t(`meta.attendance_statuses.${attendance.leaving_status}`) }}</span>
            <span class="label" :class="{ 'label-info': attendance.off_status === 'annual_leave' }" v-if="attendance.off_status">{{ $t(`meta.attendance_statuses.${attendance.off_status}`) }}</span>
          </td>
        </tr>
      </tbody>
    </table>

    <pagination action="getAttendances" namespace="groupAttendances" v-if="pager.total_pages > 1"/>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main'
import Pagination from '../components/Pagination'
import GroupTab from '../components/GroupTab'
import FilterUserBox from '../components/FilterUserBox'
import AttendanceStatusSelect from '../components/AttendanceStatusSelect'
import flatPickr from 'vue-flatpickr-component'
import flatpickrLocale from '../mixins/flatpickr-locale'
import { mapState, mapActions } from 'vuex'

export default {
  mixins: [flatpickrLocale],

  data () {
    return {
      selectedUser: null,
      dateRange: [this.$moment().format('YYYY-MM-DD'), this.$moment().format('YYYY-MM-DD')],
      params: {
        self: null,
        user_id: '',
        from_date: this.$moment().format('YYYY-MM-DD'),
        to_date: this.$moment().format('YYYY-MM-DD'),
        group_id: this.$route.params.id,
        status: ''
      }
    }
  },

  components: {
    FilterUserBox,
    MainLayout,
    GroupTab,
    AttendanceStatusSelect,
    Pagination,
    flatPickr
  },

  computed: {
    ...mapState('groupAttendances', [
      'pager',
      'attendances',
      'usersInGroup'
    ]),

    ...mapState('group', [
      'group'
    ])
  },

  methods: {
    ...mapActions('groupAttendances', [
      'getAttendances',
      'getUsersInGroup'
    ]),

    ...mapActions('group', [
      'getGroup'
    ])
  },

  created () {
    if (!this.group) this.getGroup(this.$route.params.id)
    this.getAttendances(this.params)
  },

  watch: {
    params: {
      handler: function (after, before) {
        this.getAttendances(Object.assign({ page: 1 }, this.params))
      },
      deep: true
    },

    dateRange: function () {
      const dates = this.dateRange.split(' ')
      this.params.from_date = dates[0]
      this.params.to_date = dates[2]
    },

    selectedUser: function () {
      this.params.user_id = this.selectedUser ? this.selectedUser.id : ''
    }
  }
}
</script>

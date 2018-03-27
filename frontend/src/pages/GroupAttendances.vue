<template>
  <main-layout :title="$t('attendances.title')">
    <attendances-tab/>

    <div class="toolbar mt-5">
      <v-select multiple label="email" :placeholder="$t('attendances.placeholder.filterByUser')" v-model="selectedUsers" :options="usersInGroup">
        <template slot="option" slot-scope="option">
          <div class="tile tile-centered">
            <div class="tile-icon">
              <img :src="option.avatar_url" class="avatar avatar-md">
            </div>
            <div class="tile-content">{{ option.name }} ( {{ option.email }} )</div>
          </div>
        </template>
      </v-select>
    </div>

    <div class="toolbar mt-5">
      <datepicker
        :placeholder="$t('attendances.placeholder.fromDate')"
        :format="'MMM dd yyyy'"
        :minimumView="'day'"
        :maximumView="'day'"
        :input-class="'datepicker-input form-input'"
        :calendar-class="'datepicker-calendar'"
        :wrapper-class="'datepicker'"
        v-model="params.from_date"/>
      <datepicker
        :placeholder="$t('attendances.placeholder.toDate')"
        :format="'MMM dd yyyy'"
        :minimumView="'day'"
        :maximumView="'day'"
        :input-class="'datepicker-input form-input'"
        :calendar-class="'datepicker-calendar'"
        :wrapper-class="'datepicker'"
        v-model="params.to_date"/>

      <attendance-status-select v-model="params.status">
        <option slot="placeholder" value="">{{ $t('attendances.placeholder.filterByStatus') }}</option>
      </attendance-status-select>
      <group-select v-model="params.group_id">
        <option slot="placeholder" value="">{{ $t('attendances.placeholder.filterByGroup') }}</option>
      </group-select>
    </div>

    <table class="table table-hover bg-light mt-5">
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
          <td>{{ attendance.day | datetime_mmdd }}</td>
          <td>{{ attendance.attended_at }}</td>
          <td>{{ attendance.left_at }}</td>
          <td>
            <span class="label label-rounded" v-if="attendance.attending_status">{{ $t(`meta.attendance_statuses.${attendance.attending_status}`) }}</span>
            <span class="label label-rounded" v-if="attendance.leaving_status">{{ $t(`meta.attendance_statuses.${attendance.leaving_status}`) }}</span>
          </td>
        </tr>
      </tbody>
    </table>

    <pagination action="getAttendances" namespace="attendances" v-if="pager.total_pages > 1"/>
  </main-layout>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import MainLayout from '../layouts/Main.vue'
import Pagination from '../components/Pagination.vue'
import AttendancesTab from '../components/AttendancesTab.vue'
import GroupSelect from '../components/GroupSelect.vue'
import AttendanceStatusSelect from '../components/AttendanceStatusSelect.vue'
import vSelect from 'vue-select'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      selectedUsers: null,
      params: {
        self: null,
        user_id: '',
        from_date: this.$moment().locale('en').startOf('month').format('LL'),
        to_date: this.$moment().locale('en').endOf('month').format('LL'),
        status: '',
        group_id: ''
      }
    }
  },

  components: {
    vSelect,
    Datepicker,
    MainLayout,
    AttendancesTab,
    GroupSelect,
    AttendanceStatusSelect,
    Pagination
  },

  computed: {
    ...mapState('attendances', [
      'pager',
      'attendances',
      'usersInGroup'
    ])
  },

  methods: {
    ...mapActions('attendances', [
      'getAttendances',
      'getUsersInGroup'
    ])
  },

  created () {
    this.getAttendances(this.params)
    this.getUsersInGroup(this.params.group_id)
  },

  watch: {
    params: {
      handler: function (after, before) {
        this.getAttendances(Object.assign({ page: 1 }, this.params))
        if (after.group_id !== before.group_id) {
          this.getUsersInGroup(this.params.group_id)
        }
      },
      deep: true
    },

    selectedUsers: function () {
      this.params.user_id = this.selectedUsers ? this.selectedUsers.map(user => user.id) : ''
    }
  }
}
</script>

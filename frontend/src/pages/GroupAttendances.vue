<template>
  <main-layout :title="$t('attendances.title')">
    <attendances-tab/>

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

      <select class="form-select" v-model="params.status">
        <option value="">{{ $t('attendances.placeholder.filterByStatus') }}</option>
        <option :value="status" v-for="status in meta.attendanceStatuses">{{ $t(`meta.attendanceStatuses.${status}`) }}</option>
      </select>
      <select class="form-select" v-model="params.group_id">
        <option value="">{{ $t('attendances.placeholder.filterByGroup') }}</option>
        <option :value="group.id" v-for="group in meta.groups">{{ group.name }}</option>
      </select>
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
            <span class="label label-rounded label-secondary">{{ attendance.attending_status }}</span>
            <span class="label label-rounded label-success">{{ attendance.leaving_status }}</span>
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
import moment from 'moment'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      params: {
        self: null,
        from_date: moment().startOf('month').format('MMM DD YYYY'),
        to_date: moment().endOf('month').format('MMM DD YYYY'),
        status: '',
        group_id: ''
      }
    }
  },

  components: {
    Datepicker,
    MainLayout,
    AttendancesTab,
    Pagination
  },

  computed: {
    ...mapState('initialStates', [
      'meta'
    ]),

    ...mapState('attendances', [
      'pager',
      'attendances'
    ])
  },

  methods: {
    ...mapActions('attendances', [
      'getAttendances'
    ])
  },

  created () {
    this.getAttendances(this.params)
  },

  watch: {
    params: {
      handler: function () {
        this.getAttendances(Object.assign({ page: 1 }, this.params))
      },
      deep: true
    }
  }
}
</script>

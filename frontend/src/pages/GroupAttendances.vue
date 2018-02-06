<template>
  <main-layout :title="$t('title.attendances')">
    <ul class="tab mt-4">
      <router-link tag="li" class="tab-item" to="/attendances/my"><a href="#">{{ $t('attendance.myAttendances') }}</a></router-link>
      <router-link tag="li" class="tab-item" to="/attendances/groups"><a href="#">{{ $t('attendance.groupAttendances') }}</a></router-link>
    </ul>

    <div class="toolbar mt-5">
      <datepicker
        :placeholder="$t('placeholder.fromDate')"
        :format="'MMM dd yyyy'"
        :minimumView="'day'"
        :maximumView="'day'"
        :input-class="'datepicker-input form-input'"
        :calendar-class="'datepicker-calendar'"
        :wrapper-class="'datepicker'"
        v-model="params.from_date"/>
      <datepicker
        :placeholder="$t('placeholder.toDate')"
        :format="'MMM dd yyyy'"
        :minimumView="'day'"
        :maximumView="'day'"
        :input-class="'datepicker-input form-input'"
        :calendar-class="'datepicker-calendar'"
        :wrapper-class="'datepicker'"
        v-model="params.to_date"/>
      <select class="form-select" v-model="params.status">
        <option value="">{{ $t('placeholder.filterByStatus') }}</option>
        <option value="attend_ok">{{ $t('status.arriveOnTime') }}</option>
        <option value="leave_ok">{{ $t('status.leaveOnTime') }}</option>
        <option value="attend_late">{{ $t('status.arriveLate') }}</option>
        <option value="leave_early">{{ $t('status.leaveEarly') }}</option>
        <option value="holiday">{{ $t('status.holiday') }}</option>
        <option value="annual_leave">{{ $t('status.annualLeave') }}</option>
      </select>
      <select class="form-select" v-model="params.group_id">
        <option value="">{{ $t('placeholder.filterByGroup') }}</option>
        <option value="1">{{ $t('group.accountant') }}</option>
        <option value="2">{{ $t('group.developers') }}</option>
        <option value="3">{{ $t('group.marketing') }}</option>
        <option value="5">{{ $t('group.hr') }}</option>
      </select>
    </div>

    <table class="table table-hover bg-light mt-5">
      <thead>
        <th>{{ $t('tableHeader.name') }}</th>
        <th>{{ $t('tableHeader.email') }}</th>
        <th>{{ $t('tableHeader.date') }}</th>
        <th>{{ $t('tableHeader.attendedAt') }}</th>
        <th>{{ $t('tableHeader.leftAt') }}</th>
        <th>{{ $t('tableHeader.status') }}</th>
      </thead>
      <tbody>
        <tr v-for="attendance in attendances">
          <td>{{ attendance.user.name }}</td>
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
import moment from 'moment'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      params: {
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
    Pagination
  },

  computed: {
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

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
        <option value="arrive_ok">{{ $t('status.arriveOnTime') }}</option>
        <option value="leave_ok">{{ $t('status.leaveOnTime') }}</option>
        <option value="arrive_late">{{ $t('status.arriveLate') }}</option>
        <option value="leave_early">{{ $t('status.leaveEarly') }}</option>
        <option value="holiday">{{ $t('status.holiday') }}</option>
        <option value="annual_leave">{{ $t('status.annualLeave') }}</option>
      </select>
    </div>

    <table class="table table-hover bg-light mt-5">
      <thead>
        <th>{{ $t('tableHeader.date') }}</th>
        <th>{{ $t('tableHeader.attendedAt') }}</th>
        <th>{{ $t('tableHeader.leftAt') }}</th>
        <th>{{ $t('tableHeader.status') }}</th>
        <th>{{ $t('tableHeader.actions') }}</th>
      </thead>
      <tbody>
        <tr v-for="attendance in attendances">
          <td>{{ attendance.day | datetime_mmdd }}</td>
          <td>{{ attendance.attended_at }}</td>
          <td>{{ attendance.left_at }}</td>
          <td>
            <span class="label label-rounded">{{ attendance.attending_status }}</span>
            <span class="label label-rounded">{{ attendance.leaving_status }}</span>
          </td>
          <td>
            <button class="btn btn-action btn-link" @click="toggleAddModal(attendance)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 16" fill="currentColor">
                <path fill-rule="evenodd" d="M0 12v3h3l8-8-3-3-8 8zm3 2H1v-2h1v1h1v1zm10.3-9.3L12 6 9 3l1.3-1.3a.996.996 0 0 1 1.41 0l1.59 1.59c.39.39.39 1.02 0 1.41z"/>
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <pagination action="getAttendances" namespace="attendances" v-if="pager.total_pages > 1"/>

    <modal title="Add Request" :modal-open.sync="isAddModalOpen">
      <div class="form-group">
        <label class="form-label">{{ $t('label.date') }}</label>
        <datepicker
        :minimumView="'day'"
        :maximumView="'day'"
        :input-class="'datepicker-input form-input'"
        :calendar-class="'datepicker-calendar'"
        :wrapper-class="'datepicker datepicker-full-width'"
        :disabled-picker="true"
        :value="day"/>
      </div>
      <div class="form-group" :class="{ 'has-error': errors.attended_at }">
        <label class="form-label">{{ $t('label.attendedAt') }}</label>
        <input class="form-input" v-model="createRequestParams.attended_at">
        <p class="form-input-hint" v-if="errors.attended_at">{{ errors.attended_at[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': errors.left_at }">
        <label class="form-label">{{ $t('label.leftAt') }}</label>
        <input class="form-input" v-model="createRequestParams.left_at">
        <p class="form-input-hint" v-if="errors.left_at">{{ errors.left_at[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': errors.reason }">
        <label class="form-label">{{ $t('label.reason') }}</label>
        <textarea class="form-input" v-model="createRequestParams.reason"></textarea>
        <p class="form-input-hint" v-if="errors.reason">{{ errors.reason[0] }}</p>
      </div>
      <div class="form-group">
        <button type="button" class="btn" @click="saveEditModal(createRequestParams, addRequest)">{{ $t('button.save') }}</button>
      </div>
    </modal>
  </main-layout>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import MainLayout from '../layouts/Main.vue'
import Pagination from '../components/Pagination.vue'
import modal from '../mixins/modal'
import moment from 'moment'
import { mapState, mapActions } from 'vuex'

export default {
  mixins: [modal],

  data () {
    return {
      day: '',
      params: {
        self: true,
        from_date: moment().startOf('month').format('MMM DD YYYY'),
        to_date: moment().endOf('month').format('MMM DD YYYY'),
        status: ''
      },
      createRequestParams: {
        attendance_id: '',
        attended_at: '',
        left_at: '',
        reason: ''
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
    ]),

    ...mapState('requests', [
      'errors'
    ])
  },

  methods: {
    ...mapActions('attendances', [
      'getAttendances'
    ]),

    ...mapActions('requests', [
      'addRequest',
      'clearRequestErrors'
    ]),

    toggleAddModal (attendance) {
      this.clearRequestErrors()
      this.isAddModalOpen = !this.isAddModalOpen
      this.day = attendance.day
      this.createRequestParams.attendance_id = attendance.id
      const statuses = ['attended_at', 'left_at']
      statuses.forEach(v => { this.createRequestParams[v] = attendance[v] })
    }
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

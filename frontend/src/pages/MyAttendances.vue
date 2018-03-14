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
    </div>

    <table class="table table-hover bg-light mt-5">
      <thead>
        <tr>
          <th>{{ $t('attendances.tableHeader.date') }}</th>
          <th>{{ $t('attendances.tableHeader.attendedAt') }}</th>
          <th>{{ $t('attendances.tableHeader.leftAt') }}</th>
          <th>{{ $t('attendances.tableHeader.status') }}</th>
          <th>{{ $t('attendances.tableHeader.actions') }}</th>
        </tr>
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

    <modal :title="$t('attendances.modal.addTitle')" :modal-open.sync="isAddModalOpen">
      <div class="form-group">
        <label class="form-label">{{ $t('attendances.labels.date') }}</label>
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
        <label class="form-label">{{ $t('attendances.labels.attendedAt') }}</label>
        <input class="form-input" v-model="createRequestParams.attended_at">
        <p class="form-input-hint" v-if="errors.attended_at">{{ errors.attended_at[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': errors.left_at }">
        <label class="form-label">{{ $t('attendances.labels.leftAt') }}</label>
        <input class="form-input" v-model="createRequestParams.left_at">
        <p class="form-input-hint" v-if="errors.left_at">{{ errors.left_at[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': errors.reason }">
        <label class="form-label">{{ $t('attendances.labels.reason') }}</label>
        <textarea class="form-input" v-model="createRequestParams.reason"></textarea>
        <p class="form-input-hint" v-if="errors.reason">{{ errors.reason[0] }}</p>
      </div>
      <div class="form-group">
        <button type="button" class="btn" @click="submitAddModal(createRequestParams, addRequest)">{{ $t('attendances.btn.save') }}</button>
      </div>
    </modal>
  </main-layout>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import MainLayout from '../layouts/Main.vue'
import Pagination from '../components/Pagination.vue'
import AttendancesTab from '../components/AttendancesTab.vue'
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

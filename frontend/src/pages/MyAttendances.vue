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

      <attendance-status-select v-model="params.status">
        <option slot="placeholder" value="">{{ $t('attendances.placeholder.filterByStatus') }}</option>
      </attendance-status-select>
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
          <td :class="{ 'text-error': attendance.attending_status === 'attend_late'}">{{ attendance.attended_at }}</td>
          <td :class="{ 'text-warning': attendance.leaving_status === 'leave_early'}">{{ attendance.left_at }}</td>
          <td>
            <span class="label label-rounded" :class="{ 'label-error': attendance.attending_status === 'attend_late'}" v-if="attendance.attending_status">{{ $t(`meta.attendance_statuses.${attendance.attending_status}`) }}</span>
            <span class="label label-rounded" :class="{ 'label-warning': attendance.leaving_status === 'leave_early'}" v-if="attendance.leaving_status">{{ $t(`meta.attendance_statuses.${attendance.leaving_status}`) }}</span>
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
        <input type="time" step="60" class="form-input" v-model="createRequestParams.attended_at">
        <p class="form-input-hint" v-if="errors.attended_at">{{ $t('attendances.labels.attendedAt') }} {{ errors.attended_at[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': errors.left_at }">
        <label class="form-label">{{ $t('attendances.labels.leftAt') }}</label>
        <input type="time" step="60" class="form-input" v-model="createRequestParams.left_at">
        <p class="form-input-hint" v-if="errors.left_at">{{ $t('attendances.labels.leftAt') }} {{ errors.left_at[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': errors.reason }">
        <label class="form-label">{{ $t('attendances.labels.reason') }}</label>
        <textarea class="form-input" v-model="createRequestParams.reason"></textarea>
        <p class="form-input-hint" v-if="errors.reason">{{ $t('attendances.labels.reason') }} {{ errors.reason[0] }}</p>
      </div>
      <div class="form-group">
        <button type="button" class="btn" @click="submitAddModal(createRequestParams, addRequest, $t('messages.request.createSuccess'))">{{ $t('attendances.btn.add') }}</button>
      </div>
    </modal>
  </main-layout>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import MainLayout from '../layouts/Main.vue'
import Pagination from '../components/Pagination.vue'
import AttendancesTab from '../components/AttendancesTab.vue'
import AttendanceStatusSelect from '../components/AttendanceStatusSelect.vue'
import modal from '../mixins/modal'
import { mapState, mapActions } from 'vuex'

export default {
  mixins: [modal],

  data () {
    return {
      day: '',
      params: {
        self: true,
        from_date: this.$moment().locale('en').startOf('month').format('LL'),
        to_date: this.$moment().locale('en').endOf('month').format('LL'),
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
    Pagination,
    AttendanceStatusSelect
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
        this.getAttendances(Object.assign({ page: 1 }, this.params, {
          to_date: this.$moment(this.params.to_date).locale('en').format('LL'),
          from_date: this.$moment(this.params.from_date).locale('en').format('LL')
        }))
      },
      deep: true
    }
  }
}
</script>

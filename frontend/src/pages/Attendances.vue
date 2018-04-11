<template>
  <main-layout :title="$t('attendances.title')">
    <div class="toolbar mt-5">
      <flat-pickr
        :config="{mode: 'range', locale: flatpickrLocaleMapper[currentUser.language]}"
        class="form-input daterange-picker"
        v-model="dateRange"/>

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
          <td>{{ attendance.day | moment_l }}</td>
          <td :class="{ 'text-error': attendance.attending_status === 'attend_late', 'text-success': attendance.attending_status === 'attend_ok'}">{{ attendance.attended_at }}</td>
          <td :class="{ 'text-warning': attendance.leaving_status === 'leave_early', 'text-success': attendance.leaving_status === 'leave_ok'}">{{ attendance.left_at }}</td>
          <td>
            <span class="label label-rounded" :class="{ 'label-error': attendance.attending_status === 'attend_late', 'label-success': attendance.attending_status === 'attend_ok'}" v-if="attendance.attending_status">{{ $t(`meta.attendance_statuses.${attendance.attending_status}`) }}</span>
            <span class="label label-rounded" :class="{ 'label-warning': attendance.leaving_status === 'leave_early', 'label-success': attendance.leaving_status === 'leave_ok'}" v-if="attendance.leaving_status">{{ $t(`meta.attendance_statuses.${attendance.leaving_status}`) }}</span>
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
        <flat-pickr
          :config="{ enable: [day], locale: flatpickrLocaleMapper[currentUser.language] }"
          class="form-input daterange-picker"
          v-model="day"/>
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
import flatPickr from 'vue-flatpickr-component'
import MainLayout from '../layouts/Main'
import Pagination from '../components/Pagination'
import AttendanceStatusSelect from '../components/AttendanceStatusSelect'
import modal from '../mixins/modal'
import flatpickrLocale from '../mixins/flatpickr-locale'
import { mapState, mapActions } from 'vuex'

export default {
  mixins: [modal, flatpickrLocale],

  data () {
    return {
      day: '',
      dateRange: [this.$moment().locale('en').startOf('month').format('YYYY-MM-DD'), this.$moment().locale('en').endOf('month').format('YYYY-MM-DD')],
      params: {
        self: true,
        from_date: this.$moment().locale('en').startOf('month').format('YYYY-MM-DD'),
        to_date: this.$moment().locale('en').endOf('month').format('YYYY-MM-DD'),
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
    MainLayout,
    Pagination,
    AttendanceStatusSelect,
    flatPickr
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
        console.log('ccc')
        this.getAttendances(Object.assign({ page: 1 }, this.params))
      },
      deep: true
    },

    dateRange: function () {
      const dates = this.dateRange.split(' to ')
      this.params.from_date = dates[0]
      this.params.to_date = dates[1]
    }
  }
}
</script>

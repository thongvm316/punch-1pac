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
          <td>{{ attendance.attended_at }}</td>
          <td>{{ attendance.left_at }}</td>
          <td>
            <span class="label" :class="{ 'label-error': attendance.attending_status === 'attend_late', 'label-success': attendance.attending_status === 'attend_ok'}" v-if="attendance.attending_status">{{ $t(`meta.attendance_statuses.${attendance.attending_status}`) }}</span>
            <span class="label" :class="{ 'label-warning': attendance.leaving_status === 'leave_early', 'label-success': attendance.leaving_status === 'leave_ok'}" v-if="attendance.leaving_status">{{ $t(`meta.attendance_statuses.${attendance.leaving_status}`) }}</span>
          </td>
          <td>
            <button class="btn btn-action btn-link" @click="toggleAddModal(attendance)">
              <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor"><path d="M23.2530524,2.92025954 L21.0782401,0.745259708 C20.084537,-0.24844334 18.4678184,-0.248396465 17.4741154,0.745259708 C16.5385373,1.68093151 2.24841342,15.9721335 1.29342912,16.9271647 C1.19171037,17.0288834 1.12355413,17.1640709 1.09927288,17.2963053 L0.0118667154,23.1688048 C-0.0302739063,23.3964767 0.0422885881,23.6303361 0.20602295,23.7940704 C0.369944813,23.9579923 0.603851044,24.0304141 0.831241652,23.9882735 L6.70322557,22.9007267 C6.83892868,22.8754142 6.97233492,22.8066017 7.07236617,22.7065236 L23.2530524,6.52461863 C24.2490523,5.52861871 24.249193,3.91640009 23.2530524,2.92025954 Z M1.58077284,22.4191799 L2.23856967,18.8668052 L5.13291319,21.7613362 L1.58077284,22.4191799 Z M6.57520995,21.2149144 L2.78494462,17.4244147 L16.6229123,3.58536886 L20.4131776,7.37591544 L6.57520995,21.2149144 Z M22.2586931,5.53025934 L21.40749,6.38155614 L17.6172247,2.59100956 L18.4684278,1.73971276 C18.9137871,1.29430654 19.6384277,1.29425966 20.0838808,1.73971276 L22.2586931,3.91471259 C22.7051774,4.36119693 22.7051774,5.08372812 22.2586931,5.53025934 Z""/></svg>
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

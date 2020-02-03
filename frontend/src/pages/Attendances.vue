<template>
  <main-layout :title="$t('attendances.title')">
    <div class="toolbar mt-5">
      <datepicker
        v-model="params.date"
        :language="$i18n.locale"
        format="MMMM yyyy"
        :minimum-view="'month'"
        :maximum-view="'month'"
        :input-class="'datepicker-input form-input'"
        :calendar-class="'datepicker-calendar'"
        :wrapper-class="'datepicker'"
        @input="onInputDatepicker"
      />

      <attendance-status-select v-model="params.status">
        <option
          slot="placeholder"
          value=""
        >
          {{ $t('placeholder.filterByStatus') }}
        </option>
      </attendance-status-select>
    </div>

    <table class="table bg-light mt-5">
      <thead>
        <tr>
          <th>{{ $t('tableHeader.date') }}</th>
          <th>{{ $t('tableHeader.attendedAt') }}</th>
          <th>{{ $t('tableHeader.leftAt') }}</th>
          <th>{{ $t('tableHeader.status') }}</th>
          <th>{{ $t('tableHeader.actions') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="attendanceItem in formattedAttendances"
          :key="attendanceItem.id"
        >
          <td>{{ attendanceItem.day | moment_l }}</td>
          <td :class="{ 'text-warning': attendanceItem.attending_status === 'attend_late', 'text-success': attendanceItem.attending_status === 'attend_ok'}">
            {{ attendanceItem.attended_at }}
          </td>
          <td :class="{ 'text-error': attendanceItem.leaving_status === 'leave_early', 'text-success': attendanceItem.leaving_status === 'leave_ok'}">
            {{ attendanceItem.left_at }}
          </td>
          <td>
            <span
              v-if="attendanceItem.attending_status"
              class="label"
              :class="{ 'label-warning': attendanceItem.attending_status === 'attend_late', 'label-success': attendanceItem.attending_status === 'attend_ok'}"
            >{{ $t(`meta.attendance_statuses.${attendanceItem.attending_status}`) }}</span>
            <span
              v-if="attendanceItem.leaving_status"
              class="label"
              :class="{ 'label-error': attendanceItem.leaving_status === 'leave_early', 'label-success': attendanceItem.leaving_status === 'leave_ok'}"
            >{{ $t(`meta.attendance_statuses.${attendanceItem.leaving_status}`) }}</span>
            <span
              v-if="attendanceItem.off_status"
              class="label label-notice"
            >{{ $t(`meta.attendance_statuses.${attendanceItem.off_status}`) }}</span>
          </td>
          <td>
            <button
              class="btn btn-action btn-link tooltip"
              :data-tooltip="$t('tooltip.request.add')"
              @click="toggleAddModal(attendanceItem)"
            >
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                fill="currentColor"
              ><path d="M23.2530524,2.92025954 L21.0782401,0.745259708 C20.084537,-0.24844334 18.4678184,-0.248396465 17.4741154,0.745259708 C16.5385373,1.68093151 2.24841342,15.9721335 1.29342912,16.9271647 C1.19171037,17.0288834 1.12355413,17.1640709 1.09927288,17.2963053 L0.0118667154,23.1688048 C-0.0302739063,23.3964767 0.0422885881,23.6303361 0.20602295,23.7940704 C0.369944813,23.9579923 0.603851044,24.0304141 0.831241652,23.9882735 L6.70322557,22.9007267 C6.83892868,22.8754142 6.97233492,22.8066017 7.07236617,22.7065236 L23.2530524,6.52461863 C24.2490523,5.52861871 24.249193,3.91640009 23.2530524,2.92025954 Z M1.58077284,22.4191799 L2.23856967,18.8668052 L5.13291319,21.7613362 L1.58077284,22.4191799 Z M6.57520995,21.2149144 L2.78494462,17.4244147 L16.6229123,3.58536886 L20.4131776,7.37591544 L6.57520995,21.2149144 Z M22.2586931,5.53025934 L21.40749,6.38155614 L17.6172247,2.59100956 L18.4684278,1.73971276 C18.9137871,1.29430654 19.6384277,1.29425966 20.0838808,1.73971276 L22.2586931,3.91471259 C22.7051774,4.36119693 22.7051774,5.08372812 22.2586931,5.53025934 Z" /></svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <modal
      :title="$t('modal.request.addTitle')"
      :modal-open.sync="isAddModalOpen"
    >
      <request-form
        v-if="isAddModalOpen"
        :attendance="attendance"
        @afterModify="isAddModalOpen = false"
      />
    </modal>
  </main-layout>
</template>

<script>
import modal from '../mixins/modal'
import { mapGetters, mapActions } from 'vuex'
const Datepicker = () => import('vuejs-datepicker')
const MainLayout = () => import('../layouts/Main')
const AttendanceStatusSelect = () => import('../components/AttendanceStatusSelect')
const RequestForm = () => import('../components/RequestForm')

export default {

  components: {
    MainLayout,
    AttendanceStatusSelect,
    RequestForm,
    Datepicker
  },
  mixins: [modal],

  data() {
    return {
      attendance: {},
      params: {
        self: true,
        date: this.$moment().locale('en').format('LL'),
        status: ''
      }
    }
  },

  computed: {
    ...mapGetters('attendances', ['formattedAttendances'])
  },

  watch: {
    params: {
      handler: function() {
        this.getAttendances(Object.assign({ page: 1 }, this.params))
      },
      deep: true
    }
  },

  created() {
    this.getAttendances(this.params)
  },

  methods: {
    ...mapActions('attendances', ['getAttendances']),

    toggleAddModal(attendance) {
      this.isAddModalOpen = !this.isAddModalOpen
      this.attendance = attendance
    },

    onInputDatepicker() {
      this.params.date = this.$moment(this.params.date).format('YYYY-MM-DD')
    }
  }
}
</script>

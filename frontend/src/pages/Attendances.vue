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
              <p-ico-pencil />
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
import { mapState, mapGetters, mapActions } from 'vuex'
import PIcoPencil from '@/punch-ui/punch-icons/PIcoPencil'
const Datepicker = () => import('vuejs-datepicker')
const MainLayout = () => import('../layouts/Main')
const AttendanceStatusSelect = () => import('../components/AttendanceStatusSelect')
const RequestForm = () => import('../components/RequestForm')

export default {
  components: {
    MainLayout,
    AttendanceStatusSelect,
    RequestForm,
    Datepicker,
    PIcoPencil
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
    ...mapGetters('attendances', ['formattedAttendances']),

    ...mapState('attendances', ['attendances'])
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

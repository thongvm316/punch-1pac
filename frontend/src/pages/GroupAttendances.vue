<template>
  <main-layout :title="$t('attendances.groupTitle', { name: group.name })">
    <group-tab :group-id="$route.params.id" />

    <div class="toolbar mt-5">
      <flat-pickr
        :config="{ mode: 'range', locale: flatpickrLocaleMapper[pickrLocale] }"
        class="form-input daterange-picker"
        :value="getFormattedInitDateRange()"
        @on-close="onCloseFlatpickr"
      />
      <attendance-status-select
        v-model="params.status"
        :is-filter-disabled="!attendances.length"
      >
        <option
          slot="placeholder"
          value=""
        >
          {{ $t('placeholder.filterByStatus') }}
        </option>
      </attendance-status-select>

      <input
        v-model="params.name_or_email"
        type="search"
        class="form-input filter-input"
        :placeholder="$t('placeholder.filterByUser')"
      >
    </div>

    <table class="table bg-light mt-5">
      <thead>
        <th>{{ $t('tableHeader.name') }}</th>
        <th>{{ $t('tableHeader.email') }}</th>
        <th>{{ $t('tableHeader.date') }}</th>
        <th>{{ $t('tableHeader.attendedAt') }}</th>
        <th>{{ $t('tableHeader.leftAt') }}</th>
        <th>{{ $t('tableHeader.status') }}</th>
      </thead>
      <tbody>
        <tr
          v-for="attendance in attendances"
          :key="attendance.id"
        >
          <td>
            <div class="tile tile-centered">
              <div class="tile-icon">
                <img
                  :src="attendance.user.avatar_url"
                  class="avatar avatar-md"
                  :alt="attendance.user.name"
                >
              </div>
              <div class="tile-content">
                {{ attendance.user.name }}
              </div>
            </div>
          </td>
          <td>{{ attendance.user.email }}</td>
          <td>{{ attendance.day | moment_l }}</td>
          <td :class="{ 'text-warning': attendance.attending_status === 'attend_late', 'text-success': attendance.attending_status === 'attend_ok'}">
            {{ attendance.attended_at }}
          </td>
          <td :class="{ 'text-error': attendance.leaving_status === 'leave_early', 'text-success': attendance.leaving_status === 'leave_ok'}">
            {{ attendance.left_at }}
          </td>
          <td>
            <span
              v-if="attendance.attending_status"
              class="label"
              :class="{ 'label-warning': attendance.attending_status === 'attend_late', 'label-success': attendance.attending_status === 'attend_ok'}"
            >{{ $t(`meta.attendance_statuses.${attendance.attending_status}`) }}</span>
            <span
              v-if="attendance.leaving_status"
              class="label"
              :class="{ 'label-error': attendance.leaving_status === 'leave_early', 'label-success': attendance.leaving_status === 'leave_ok'}"
            >{{ $t(`meta.attendance_statuses.${attendance.leaving_status}`) }}</span>
            <span
              v-if="attendance.off_status"
              class="label"
              :class="{ 'label-info': attendance.off_status === 'annual_leave' }"
            >{{ $t(`meta.attendance_statuses.${attendance.off_status}`) }}</span>
          </td>
        </tr>
      </tbody>
    </table>

    <pagination
      v-if="pager.total_pages > 1"
      action="getAttendances"
      namespace="groupAttendances"
    />
  </main-layout>
</template>

<script>
import flatpickrLocale from '../mixins/flatpickr-locale'
import dateRangePicker from '../mixins/date-range-picker'
import { mapState, mapActions } from 'vuex'
import debounce from 'lodash.debounce'
const MainLayout = () => import('../layouts/Main')
const Pagination = () => import('../components/Pagination')
const GroupTab = () => import('../components/GroupTab')
const AttendanceStatusSelect = () => import('../components/AttendanceStatusSelect')
const flatPickr = () => import('vue-flatpickr-component')

export default {

  components: {
    MainLayout,
    GroupTab,
    AttendanceStatusSelect,
    Pagination,
    flatPickr
  },
  mixins: [flatpickrLocale, dateRangePicker],

  data() {
    return {
      params: {
        self: null,
        user_id: '',
        from_date: '',
        to_date: '',
        group_id: this.$route.params.id,
        name_or_email: '',
        status: ''
      }
    }
  },

  computed: {
    ...mapState('groupAttendances', ['pager', 'attendances']),

    ...mapState('group', ['group'])
  },

  watch: {
    params: {
      handler: function() {
        this.debouncedGetAttendances()
      },
      deep: true
    }
  },

  created() {
    this.params = {
      ...this.params,
      ...{
        from_date: this.$moment().format('YYYY-MM-DD'),
        to_date: this.$moment().format('YYYY-MM-DD')
      }
    }
    if (!this.group) this.getGroup(this.$route.params.id)
    this.getAttendances(this.params)
  },

  methods: {
    ...mapActions('groupAttendances', ['getAttendances']),

    ...mapActions('group', ['getGroup']),

    debouncedGetAttendances: debounce(function() {
      this.getAttendances({ ...this.params, page: 1 })
    }, 350)
  }
}
</script>

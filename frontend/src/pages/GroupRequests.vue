<template>
  <main-layout :title="$t('requests.groupTitle', { name: group.name })">
    <group-tab :group-id="$route.params.id" />

    <div class="toolbar mt-5">
      <flat-pickr
        :config="{mode: 'range', locale: flatpickrLocaleMapper[pickrLocale]}"
        class="form-input daterange-picker"
        :value="formatDateRange(params)"
        @on-close="onCloseFlatpickr"
      />

      <select
        v-model="params.status"
        class="form-select"
      >
        <option value="">
          {{ $t('placeholder.filterByStatus') }}
        </option>
        <option
          v-for="(status, key) in meta.request_statuses"
          :key="key"
          :value="status"
        >
          {{ $t(`meta.request_statuses.${status}`) }}
        </option>
      </select>

      <select
        v-model="params.kind"
        class="form-select"
      >
        <option value="">
          {{ $t('placeholder.filterByKind') }}
        </option>
        <option
          v-for="(kind, key) in ['annual_leave', 'attendance']"
          :key="key"
          :value="kind"
        >
          {{ $t(`requests.kinds.${kind}`) }}
        </option>
      </select>

      <input
        v-model="params.name_or_email"
        type="search"
        class="form-input filter-input"
        :placeholder="$t('placeholder.filterByUser')"
      >
    </div>

    <table class="table bg-light mt-5">
      <thead>
        <tr>
          <th>{{ $t('tableHeader.name') }}</th>
          <th>{{ $t('tableHeader.date') }}</th>
          <th>{{ $t('tableHeader.attendedAt') }}</th>
          <th>{{ $t('tableHeader.leftAt') }}</th>
          <th>{{ $t('tableHeader.kind') }}</th>
          <th>{{ $t('tableHeader.reason') }}</th>
          <th>{{ $t('tableHeader.status') }}</th>
          <th>{{ $t('tableHeader.admin') }}</th>
          <th>{{ $t('tableHeader.rejectReason') }}</th>
          <th>{{ $t('tableHeader.actions') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="request in requests"
          :key="request.id"
        >
          <td class="w-cell-user">
            <div class="tile tile-centered">
              <div class="tile-icon">
                <img
                  class="avatar avatar-md"
                  :src="request.user.avatar_url"
                >
              </div>
              <div class="tile-content">
                {{ request.user.name }}
              </div>
            </div>
          </td>
          <td class="w-cell-date">
            {{ request.attendance_day | moment_l }}
          </td>
          <td>{{ request.attended_at }}</td>
          <td>{{ request.left_at }}</td>
          <td class="w-cell-kind">
            <span :class="{ 'text-primary': request.kind === 'attendance', 'text-info': request.kind === 'annual_leave' }">{{ $t(`requests.kinds.${request.kind}`) }}</span>
          </td>
          <td>{{ request.reason }}</td>
          <td class="w-cell-status">
            <span
              class="label"
              :class="getStatusClass(request.status)"
            >{{ $t(`meta.request_statuses.${request.status}`) }}</span>
          </td>
          <td class="w-cell-admin">
            <div
              v-if="request.admin"
              class="tile tile-centered"
            >
              <div class="tile-icon">
                <img
                  class="avatar avatar-md"
                  :src="request.admin.avatar_url"
                >
              </div>
              <div class="tile-content">
                {{ request.admin.name }}
              </div>
            </div>
            <span v-else />
          </td>
          <td class="w-cell-reason">
            {{ request.admin_reason }}
          </td>
          <td class="w-cell-action">
            <span
              v-if="request.status === 'pending'"
              class="d-flex"
            >
              <button
                class="btn btn-action btn-link tooltip"
                :data-tooltip="$t('tooltip.request.approve')"
                @click="approveRequest(request.id)"
              >
                <p-ico-approved />
              </button>
              <button
                class="btn btn-action btn-link tooltip"
                :data-tooltip="$t('tooltip.request.reject')"
                @click="toggleEditModal(request.id)"
              >
                <p-ico-rejected />
              </button>
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <pagination
      v-if="pager.total_pages > 1"
      namespace="groupRequests"
      action="getRequests"
      :params="{
        from_date: params.from_date,
        to_date: params.to_date,
      }"
    />

    <modal
      :title="$t('modal.request.editTitle')"
      :modal-open.sync="isEditModalOpen"
    >
      <div
        class="form-group"
        :class="{ 'has-error': errors.admin_reason }"
      >
        <label class="form-label">{{ $t('label.rejectReason') }}</label>
        <textarea
          v-model="requestParams.admin_reason"
          class="form-input"
        />
        <p
          v-if="errors.admin_reason"
          class="form-input-hint"
        >
          {{ $t('label.rejectReason') }} {{ errors.admin_reason[0] }}
        </p>
      </div>
      <div class="form-group">
        <button
          type="button"
          class="btn btn-error"
          @click="saveEditModal(requestParams, rejectRequest)"
        >
          {{ $t('button.common.reject') }}
        </button>
      </div>
    </modal>
  </main-layout>
</template>

<script>
import modal from '../mixins/modal'
import dateRangePicker from '../mixins/date-range-picker'
import flatpickrLocale from '../mixins/flatpickr-locale'
import { CLEAR_REJECT_GROUP_REQUEST_ERRORS } from '../store/mutation-types'
import { mapState, mapActions, mapMutations } from 'vuex'
import { isEmpty } from 'underscore'
import debounce from 'lodash.debounce'
import PIcoApproved from '@/punch-ui/punch-icons/PIcoApproved'
import PIcoRejected from '@/punch-ui/punch-icons/PIcoRejected'
const MainLayout = () => import('../layouts/Main')
const Pagination = () => import('../components/Pagination')
const GroupTab = () => import('../components/GroupTab')
const flatPickr = () => import('vue-flatpickr-component')

export default {
  name: 'GroupRequests',

  components: {
    MainLayout,
    Pagination,
    GroupTab,
    PIcoApproved,
    PIcoRejected,
    flatPickr
  },

  mixins: [modal, flatpickrLocale, dateRangePicker],

  data() {
    return {
      params: {
        self: null,
        status: this.$route.query.status || '',
        kind: '',
        group_id: this.$route.params.id,
        name_or_email: '',
        from_date: '',
        to_date: ''
      },
      requestParams: {
        admin: null,
        requestId: '',
        admin_reason: ''
      }
    }
  },

  computed: {
    ...mapState('initialStates', ['meta']),

    ...mapState('groupRequests', ['pager', 'requests', 'errors']),

    ...mapState('group', ['group'])
  },

  watch: {
    params: {
      handler: function() {
        this.debouncedGetRequests()
      },
      deep: true
    }
  },

  created() {
    this.params = {
      ...this.params,
      ...{
        from_date: this.$moment().startOf('month').format('YYYY-MM-DD'),
        to_date: this.$moment().endOf('month').format('YYYY-MM-DD')
      }
    }
    if (!this.group) this.getGroup(this.$route.params.id)
    this.getRequests(this.params)
  },

  methods: {
    getStatusClass(status) {
      switch (status) {
        case 'pending':
          return 'label-warning'
        case 'approved':
          return 'label-success'
        case 'rejected':
          return 'label-error'
      }
    },

    toggleEditModal(requestId) {
      if (!isEmpty(this.errors)) this[CLEAR_REJECT_GROUP_REQUEST_ERRORS]()
      this.requestParams.requestId = requestId
      this.requestParams.admin = this.currentUser
      this.requestParams.admin_reason = ''
      this.isEditModalOpen = !this.isEditModalOpen
    },

    ...mapActions('groupRequests', ['getRequests', 'approveRequest', 'rejectRequest']),

    ...mapMutations('groupRequests', [CLEAR_REJECT_GROUP_REQUEST_ERRORS]),

    ...mapActions('group', ['getGroup']),

    debouncedGetRequests: debounce(function() {
      this.getRequests(Object.assign({ page: 1 }, this.params))
    }, 350)
  }
}
</script>

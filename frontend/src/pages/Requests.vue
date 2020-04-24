<template>
  <main-layout :title="$t('requests.title')">
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
    </div>

    <table class="table bg-light mt-4">
      <thead>
        <tr>
          <th class="w-cell-date">
            {{ $t('tableHeader.date') }}
          </th>
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
            <button
              v-if="request.status === 'pending'"
              class="btn btn-action btn-link tooltip"
              :data-tooltip="$t('tooltip.request.edit')"
              @click="toggleEditModal(request)"
            >
              <p-ico-pencil />
            </button>
            <button
              v-if="request.status === 'pending'"
              class="btn btn-action btn-link tooltip"
              :data-tooltip="$t('tooltip.request.delete')"
              @click="openConfirmDialog(request)"
            >
              <p-ico-trash />
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <modal
      :title="$t('modal.request.editTitle')"
      :modal-open.sync="isEditModalOpen"
    >
      <div v-if="selectedRequest.kind === 'attendance'">
        <request-form
          v-if="isEditModalOpen"
          :request="selectedRequest"
          @afterModify="isEditModalOpen = false"
        />
      </div>
      <annual-leave-form
        v-if="selectedRequest.kind === 'annual_leave'"
        :request="selectedRequest"
        @finishRequest="isEditModalOpen = false"
      />
    </modal>

    <confirm-dialog
      :title="$t('requests.confirmDialog.deleteTitle')"
      :delete-object="deleteRequest"
      :object-id="selectedObject.id"
      :modal-open.sync="isOpenConfirmDialog"
    >
      <p>{{ $t('requests.confirmDialog.deleteMsg') }}</p>
    </confirm-dialog>
  </main-layout>
</template>

<script>
import confirmDialog from '../mixins/confirm-dialog'
import modal from '../mixins/modal'
import { mapState, mapActions } from 'vuex'
import PIcoPencil from '@/punch-ui/punch-icons/PIcoPencil'
import PIcoTrash from '@/punch-ui/punch-icons/PIcoTrash'
const MainLayout = () => import('../layouts/Main')
const Datepicker = () => import('vuejs-datepicker')
const AnnualLeaveForm = () => import('../components/AnnualLeaveForm')
const RequestForm = () => import('../components/RequestForm')

export default {
  name: 'Requests',

  components: {
    MainLayout,
    AnnualLeaveForm,
    RequestForm,
    Datepicker,
    PIcoPencil,
    PIcoTrash
  },

  mixins: [modal, confirmDialog],

  data() {
    return {
      modalTitle: '',
      selectedRequest: {},
      params: {
        self: true,
        kind: '',
        status: '',
        date: this.$moment()
          .endOf('month')
          .format('YYYY-MM-DD')
      }
    }
  },

  computed: {
    ...mapState('requests', ['pager', 'requests']),

    ...mapState('initialStates', ['meta'])
  },

  watch: {
    params: {
      handler: function() {
        this.getRequests(Object.assign({ page: 1 }, this.params))
      },
      deep: true
    }
  },

  created() {
    this.getRequests(this.params)
  },

  methods: {
    toggleEditModal(request) {
      this.selectedRequest = request
      this.isEditModalOpen = !this.isEditModalOpen
    },

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

    ...mapActions('requests', ['deleteRequest', 'getRequests']),

    onInputDatepicker() {
      this.params.date = this.$moment(this.params.date).format('YYYY-MM-DD')
    }
  }
}
</script>

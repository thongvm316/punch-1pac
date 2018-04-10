<template>
  <main-layout :title="$t('requests.title')">
    <div class="toolbar mt-5">
      <select class="form-select" v-model="params.status">
        <option value="">{{ $t('requests.placeholder.filterByStatus') }}</option>
        <option :value="status" v-for="status in meta.request_statuses">{{ $t(`meta.request_statuses.${status}`) }}</option>
      </select>
    </div>

    <table class="table table-hover bg-light mt-4">
      <thead>
        <tr>
          <th>{{ $t('requests.tableHeader.date') }}</th>
          <th>{{ $t('requests.tableHeader.attendedAt') }}</th>
          <th>{{ $t('requests.tableHeader.leftAt') }}</th>
          <th style="width: 600px">{{ $t('requests.tableHeader.reason') }}</th>
          <th>{{ $t('requests.tableHeader.status') }}</th>
          <th>{{ $t('requests.tableHeader.actions') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="request in requests">
          <td>{{ request.day | moment_l }}</td>
          <td>{{ request.attended_at }}</td>
          <td>{{ request.left_at }}</td>
          <td>{{ request.reason }}</td>
          <td><span class="label label-rounded" :class="getStatusClass(request.status)">{{ $t(`meta.request_statuses.${request.status}`) }}</span></td>
          <td>
            <button class="btn btn-action btn-link" @click="toggleEditModal(request)" v-if="request.status === 'pending'">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 16" fill="currentColor">
                <path fill-rule="evenodd" d="M0 12v3h3l8-8-3-3-8 8zm3 2H1v-2h1v1h1v1zm10.3-9.3L12 6 9 3l1.3-1.3a.996.996 0 0 1 1.41 0l1.59 1.59c.39.39.39 1.02 0 1.41z"/>
              </svg>
            </button>
            <button class="btn btn-action btn-link" @click="openConfirmDialog(request)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 24" fill="currentColor">
                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <pagination action="getRequests" namespace="requests" v-if="pager.total_pages > 1"/>

    <modal :title="$t('requests.modal.editTitle')" :modal-open.sync="isEditModalOpen">
      <div class="form-group">
        <label class="form-label">{{ $t('requests.labels.date') }}</label>
      <flat-pickr
        :config="{enable: [updateParams.day], locale: flatpickrLocaleMapper[currentUser.language]}"
        class="form-input daterange-picker"
        v-model="updateParams.day"/>
      </div>
      <div class="form-group" :class="{ 'has-error': errors.attended_at }">
        <label class="form-label">{{ $t('requests.labels.attendedAt') }}</label>
        <input type="time" step="60" class="form-input" v-model="updateParams.attended_at">
        <p class="form-input-hint" v-if="errors.attended_at">{{ $t('requests.errors.bothAttendedLeft', { msg: errors.attended_at[0] }) }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': errors.left_at }">
        <label class="form-label">{{ $t('requests.labels.leftAt') }}</label>
        <input type="time" step="60" class="form-input" v-model="updateParams.left_at">
        <p class="form-input-hint" v-if="errors.left_at">{{ $t('requests.errors.bothAttendedLeft', { msg: errors.left_at[0] }) }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': errors.reason }">
        <label class="form-label">{{ $t('requests.labels.reason') }}</label>
        <textarea class="form-input" v-model="updateParams.reason"></textarea>
        <p class="form-input-hint" v-if="errors.reason">{{ errors.reason[0] }}</p>
      </div>
      <div class="form-group">
        <button type="button" class="btn" @click="saveEditModal({id: currentId, params: updateParams}, updateRequest, $t('messages.request.updateSuccess'))">{{ $t('requests.btn.save') }}</button>
      </div>
    </modal>

    <confirm-dialog :title="$t('requests.confirmDialog.deleteTitle')" :deleteObject="deleteRequest" :objectId="selectedObject.id" :modal-open.sync="isOpenConfirmDialog">
      <p>{{ $t('requests.confirmDialog.deleteMsg') }}</p>
    </confirm-dialog>
  </main-layout>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import MainLayout from '../layouts/Main'
import confirmDialog from '../mixins/confirm-dialog'
import modal from '../mixins/modal'
import flatpickrLocale from '../mixins/flatpickr-locale'
import Pagination from '../components/Pagination'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'requests',

  mixins: [modal, confirmDialog, flatpickrLocale],

  data () {
    return {
      currentId: '',
      params: {
        self: true,
        status: ''
      },
      updateParams: {
        day: '',
        attended_at: '',
        left_at: '',
        reason: ''
      }
    }
  },

  components: {
    MainLayout,
    flatPickr,
    Pagination
  },

  computed: {
    ...mapState('requests', [
      'errors',
      'pager',
      'requests'
    ]),

    ...mapState('initialStates', [
      'meta'
    ])
  },

  methods: {
    toggleEditModal (request) {
      this.clearRequestErrors()
      this.isEditModalOpen = !this.isEditModalOpen
      this.currentId = request.id
      const statuses = ['day', 'attended_at', 'left_at', 'reason']
      statuses.forEach(v => { this.updateParams[v] = request[v] })
    },

    getStatusClass (status) {
      switch (status) {
        case 'pending':
          return 'label-warning'
        case 'approved':
          return 'label-success'
        case 'rejected':
          return 'label-error'
      }
    },

    ...mapActions('requests', [
      'clearRequestErrors',
      'deleteRequest',
      'updateRequest',
      'getRequests'
    ])
  },

  created () {
    this.getRequests(this.params)
  },

  watch: {
    params: {
      handler: function () {
        this.getRequests(Object.assign({ page: 1 }, this.params))
      },
      deep: true
    }
  }
}
</script>

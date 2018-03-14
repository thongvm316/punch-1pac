<template>
  <main-layout :title="$t('requests.title')">
    <requests-tab/>

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
          <td>{{ request.day | datetime_mmdd }}</td>
          <td>{{ request.attended_at }}</td>
          <td>{{ request.left_at }}</td>
          <td>{{ request.reason }}</td>
          <td><span class="label label-rounded" :class="getStatusClass(request.status)">{{ request.status }}</span></td>
          <td>
            <button class="btn btn-action btn-link" @click="toggleEditModal(request)" v-if="request.status === 'pending'">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 16" fill="currentColor">
                <path fill-rule="evenodd" d="M0 12v3h3l8-8-3-3-8 8zm3 2H1v-2h1v1h1v1zm10.3-9.3L12 6 9 3l1.3-1.3a.996.996 0 0 1 1.41 0l1.59 1.59c.39.39.39 1.02 0 1.41z"/>
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
        <datepicker
        :minimumView="'day'"
        :maximumView="'day'"
        :input-class="'datepicker-input form-input'"
        :calendar-class="'datepicker-calendar'"
        :wrapper-class="'datepicker datepicker-full-width'"
        :disabled-picker="true"
        :value="updateParams.day"/>
      </div>
      <div class="form-group" :class="{ 'has-error': errors.attended_at }">
        <label class="form-label">{{ $t('requests.labels.attendedAt') }}</label>
        <input class="form-input" v-model="updateParams.attended_at">
        <p class="form-input-hint" v-if="errors.attended_at">{{ errors.attended_at[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': errors.left_at }">
        <label class="form-label">{{ $t('requests.labels.leftAt') }}</label>
        <input class="form-input" v-model="updateParams.left_at">
        <p class="form-input-hint" v-if="errors.left_at">{{ errors.left_at[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': errors.reason }">
        <label class="form-label">{{ $t('requests.labels.reason') }}</label>
        <textarea class="form-input" v-model="updateParams.reason"></textarea>
        <p class="form-input-hint" v-if="errors.reason">{{ errors.reason[0] }}</p>
      </div>
      <div class="form-group">
        <button type="button" class="btn" @click="saveEditModal({id: currentId, params: updateParams}, updateRequest)">{{ $t('requests.btn.save') }}</button>
      </div>
    </modal>
  </main-layout>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import MainLayout from '../layouts/Main.vue'
import modal from '../mixins/modal'
import Pagination from '../components/Pagination.vue'
import RequestsTab from '../components/RequestsTab.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'my-requests',

  mixins: [modal],

  data () {
    return {
      currentId: '',
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
    Datepicker,
    Pagination,
    RequestsTab
  },

  computed: {
    ...mapState('requests', [
      'errors',
      'pager',
      'requests'
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
      'updateRequest',
      'getRequests'
    ])
  },

  created () {
    this.getRequests({ self: true })
  }
}
</script>

<template>
  <main-layout :title="$t('title.requests')">
    <ul class="tab mt-4">
      <router-link tag="li" class="tab-item" to="/requests/my"><a href="#">{{ $t('request.myRequests') }}</a></router-link>
      <router-link tag="li" class="tab-item" to="/requests/groups"><a href="#">{{ $t('request.groupRequests') }}</a></router-link>
    </ul>

    <table class="table table-hover bg-light mt-4">
      <thead>
        <tr>
          <th>{{ $t('tableHeader.date') }}</th>
          <th>{{ $t('tableHeader.attendedAt') }}</th>
          <th>{{ $t('tableHeader.leftAt') }}</th>
          <th style="width: 600px">{{ $t('tableHeader.reason') }}</th>
          <th>{{ $t('tableHeader.status') }}</th>
          <th>{{ $t('tableHeader.actions') }}</th>
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

    <modal title="Edit Request" :modal-open.sync="isEditModalOpen">
      <div class="form-group">
        <label class="form-label">{{ $t('label.date') }}</label>
        <datepicker
        :minimumView="'day'"
        :maximumView="'day'"
        :input-class="'datepicker-input form-input'"
        :calendar-class="'datepicker-calendar'"
        :wrapper-class="'datepicker datepicker-full-width'"
        :disabled-picker="true"
        :value="updateParams.day"/>
      </div>
      <div class="form-group">
        <label class="form-label">{{ $t('label.attendedAt') }}</label>
        <input class="form-input" v-model="updateParams.attended_at">
      </div>
      <div class="form-group">
        <label class="form-label">{{ $t('label.leftAt') }}</label>
        <input class="form-input" v-model="updateParams.left_at">
      </div>
      <div class="form-group" :class="{ 'has-error': errors.reason }">
        <label class="form-label">{{ $t('label.reason') }}</label>
        <textarea class="form-input" v-model="updateParams.reason"></textarea>
        <p class="form-input-hint" v-if="errors.reason">{{ errors.reason[0] }}</p>
      </div>
      <div class="form-group">
        <button type="button" class="btn" @click="updateRequest({id: currentId, params: updateParams})">{{ $t('button.save') }}</button>
      </div>
    </modal>
  </main-layout>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import MainLayout from '../layouts/Main.vue'
import modal from '../mixins/modal'
import Pagination from '../components/Pagination.vue'
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
    Pagination
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

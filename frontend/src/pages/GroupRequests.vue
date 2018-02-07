<template>
  <main-layout :title="$t('title.requests')">
    <ul class="tab mt-4">
      <router-link tag="li" class="tab-item" to="/requests/my"><a href="#">{{ $t('request.myRequests') }}</a></router-link>
      <router-link tag="li" class="tab-item" to="/requests/groups"><a href="#">{{ $t('request.groupRequests') }}</a></router-link>
    </ul>

    <div class="toolbar mt-5">
      <select class="form-select" v-model="params.group_id">
        <option value="">{{ $t('placeholder.filterByGroup') }}</option>
        <option value="1">{{ $t('group.accountant') }}</option>
        <option value="2">{{ $t('group.developers') }}</option>
        <option value="3">{{ $t('group.marketing') }}</option>
        <option value="5">{{ $t('group.hr') }}</option>
      </select>
      <select class="form-select" v-model="params.status">
        <option value="">{{ $t('placeholder.filterByStatus') }}</option>
        <option value="approved">{{ $t('status.approved') }}</option>
        <option value="pending">{{ $t('status.pending') }}</option>
        <option value="rejected">{{ $t('status.rejected') }}</option>
      </select>
    </div>

    <table class="table table-hover bg-light mt-4">
      <thead>
        <tr>
          <th>{{ $t('tableHeader.name') }}</th>
          <th>{{ $t('tableHeader.email') }}</th>
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
          <td>{{ request.user.name }}</td>
          <td>{{ request.user.email }}</td>
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

    <pagination namespace="requests" action="getRequests" v-if="pager.total_pages > 1"/>
  </main-layout>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import MainLayout from '../layouts/Main.vue'
import modal from '../mixins/modal'
import Pagination from '../components/Pagination.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'group-requests',

  mixins: [modal],

  data () {
    return {
      params: {
        self: null,
        status: '',
        group_id: ''
      },
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

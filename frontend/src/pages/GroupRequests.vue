<template>
  <main-layout :title="$t('requests.title')">
    <requests-tab/>

    <div class="toolbar mt-5">
      <group-select v-model="params.group_id">
        <option slot="placeholder" value="">{{ $t('requests.placeholder.filterByGroup') }}</option>
      </group-select>
      <select class="form-select" v-model="params.status">
        <option value="">{{ $t('requests.placeholder.filterByStatus') }}</option>
        <option :value="status" v-for="status in meta.requestStatuses">{{ $t(`meta.requestStatuses.${status}`) }}</option>
      </select>
    </div>

    <table class="table table-hover bg-light mt-4">
      <thead>
        <tr>
          <th>{{ $t('requests.tableHeader.name') }}</th>
          <th>{{ $t('requests.tableHeader.email') }}</th>
          <th>{{ $t('requests.tableHeader.date') }}</th>
          <th>{{ $t('requests.tableHeader.attendedAt') }}</th>
          <th>{{ $t('requests.tableHeader.leftAt') }}</th>
          <th style="width: 500px">{{ $t('requests.tableHeader.reason') }}</th>
          <th>{{ $t('requests.tableHeader.status') }}</th>
          <th>{{ $t('requests.tableHeader.actions') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="request in requests">
          <td>
            <div class="tile tile-centered">
              <div class="tile-icon">
                <img class="avatar avatar-md" :src="request.user.avatar_url">
              </div>
              <div class="tile-content">
                {{ request.user.name }}
              </div>
            </div>
          </td>
          <td>{{ request.user.email }}</td>
          <td>{{ request.day | datetime_mmdd }}</td>
          <td>{{ request.attended_at }}</td>
          <td>{{ request.left_at }}</td>
          <td>{{ request.reason }}</td>
          <td><span class="label label-rounded" :class="getStatusClass(request.status)">{{ request.status }}</span></td>
          <td>
            <span v-if="request.status === 'pending'">
              <button class="btn btn-action btn-link" @click="approveRequest(request.id)">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 23" fill="currentColor">
                  <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/>
                </svg>
              </button>
              <button class="btn btn-action btn-link" @click="rejectRequest(request.id)">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 24" fill="currentColor">
                  <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
                </svg>
              </button>
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <pagination namespace="requests" action="getRequests" v-if="pager.total_pages > 1"/>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'
import Pagination from '../components/Pagination.vue'
import RequestsTab from '../components/RequestsTab.vue'
import GroupSelect from '../components/GroupSelect.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'group-requests',

  data () {
    return {
      params: {
        self: null,
        status: '',
        group_id: ''
      }
    }
  },

  components: {
    MainLayout,
    Pagination,
    RequestsTab,
    GroupSelect
  },

  computed: {
    ...mapState('initialStates', [
      'meta'
    ]),

    ...mapState('requests', [
      'pager',
      'requests'
    ])
  },

  methods: {
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
      'getRequests',
      'approveRequest',
      'rejectRequest'
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

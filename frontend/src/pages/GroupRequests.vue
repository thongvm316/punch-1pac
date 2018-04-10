<template>
  <main-layout :title="$t('requests.groupTitle', { name: group.name })">
    <group-tab :group-id="$route.params.id"/>

    <div class="toolbar mt-5">
      <select class="form-select" v-model="params.status">
        <option value="">{{ $t('requests.placeholder.filterByStatus') }}</option>
        <option :value="status" v-for="status in meta.request_statuses">{{ $t(`meta.request_statuses.${status}`) }}</option>
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
          <td>{{ request.day | moment_l }}</td>
          <td>{{ request.attended_at }}</td>
          <td>{{ request.left_at }}</td>
          <td>{{ request.reason }}</td>
          <td><span class="label label-rounded" :class="getStatusClass(request.status)">{{ $t(`meta.request_statuses.${request.status}`) }}</span></td>
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
import MainLayout from '../layouts/Main'
import Pagination from '../components/Pagination'
import GroupTab from '../components/GroupTab'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'group-requests',

  data () {
    return {
      params: {
        self: null,
        status: '',
        group_id: this.$route.params.id
      }
    }
  },

  components: {
    MainLayout,
    Pagination,
    GroupTab
  },

  computed: {
    ...mapState('initialStates', [
      'meta'
    ]),

    ...mapState('groupRequests', [
      'pager',
      'requests'
    ]),

    ...mapState('group', [
      'group'
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

    ...mapActions('groupRequests', [
      'getRequests',
      'approveRequest',
      'rejectRequest'
    ]),

    ...mapActions('group', [
      'getGroup'
    ])
  },

  created () {
    this.getGroup(this.$route.params.id)
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

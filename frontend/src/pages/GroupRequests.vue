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
          <td><span class="label" :class="getStatusClass(request.status)">{{ $t(`meta.request_statuses.${request.status}`) }}</span></td>
          <td>
            <span v-if="request.status === 'pending'">
              <button class="btn btn-action btn-link tooltip" :data-tooltip="$t('requests.tooltip.approve')" @click="approveRequest(request.id)">
                <svg class="text-success" width="24px" height="24px" viewBox="0 0 24 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor" ><path d="M23.6485258,3.53890722 C23.179917,3.07025097 22.4201679,3.07025097 21.9514654,3.53890722 L7.57473294,17.9157978 L2.04855219,12.3896103 C1.57994338,11.9209541 0.820194311,11.921001 0.351491758,12.3896103 C-0.117163919,12.8582197 -0.117163919,13.6179697 0.351491758,14.086626 L6.72620273,20.461251 C7.1946709,20.9298603 7.95498248,20.9295322 8.42326316,20.461251 L23.6485258,5.23596972 C24.1171815,4.76736035 24.1171346,4.00756347 23.6485258,3.53890722 Z"/></svg>
              </button>
              <button class="btn btn-action btn-link tooltip" :data-tooltip="$t('requests.tooltip.reject')" @click="rejectRequest(request.id)">
                <svg width="22px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor"><path d="M12.0001458,0 C5.38331856,0 0.000145753119,5.38339892 0.000145753119,12.000583 C0.000801642152,18.6171112 5.38397444,24 12.0001458,24 C18.6168272,24 23.9998542,18.6170383 23.9998542,12.0004373 C23.9998542,5.38339892 18.6168272,0 12.0001458,0 Z M12.0001458,2.18627022 C14.3128105,2.18627022 16.4407331,2.99096342 18.1199548,4.33442647 L4.33440624,18.1196619 C2.99121837,16.4406063 2.18666116,14.3128553 2.18644253,12.0005101 C2.18644253,6.58890832 6.5888426,2.18627022 12.0001458,2.18627022 Z M12.0001458,21.8137298 C9.6875539,21.8137298 7.55948549,21.0090366 5.88019094,19.6655735 L19.6658853,5.88041102 C21.0090731,7.55968518 21.8136303,9.68772774 21.8136303,12.0004373 C21.8135575,17.4115289 17.4113032,21.8137298 12.0001458,21.8137298 Z"></path></svg>
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

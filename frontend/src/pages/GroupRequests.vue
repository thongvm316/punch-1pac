<template>
  <main-layout :title="$t('requests.groupTitle', { name: group.name })">
    <group-tab :group-id="$route.params.id"/>

    <div class="toolbar mt-5">
      <flat-pickr
        :config="{mode: 'range', locale: flatpickrLocaleMapper[pickrLocale]}"
        class="form-input daterange-picker"
        @on-close="onCloseFlatpickr"
        :value="getFormattedInitDateRange()"/>
      <select class="form-select" v-model="params.status">
        <option value="">{{ $t('placeholder.filterByStatus') }}</option>
        <option :value="status" v-for="(status, key) in meta.request_statuses" :key="key">{{ $t(`meta.request_statuses.${status}`) }}</option>
      </select>
      <select class="form-select" v-model="params.kind">
        <option value="">{{ $t('placeholder.filterByKind') }}</option>
        <option :value="kind" v-for="(kind, key) in ['annual_leave', 'attendance']" :key="key">{{ $t(`requests.kinds.${kind}`) }}</option>
      </select>

      <input type="search" class="form-input filter-input" :placeholder="$t('placeholder.filterByUser')" v-model="params.name_or_email">
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
        <tr v-for="request in requests" :key="request.id">
          <td class="w-cell-user">
            <div class="tile tile-centered">
              <div class="tile-icon">
                <img class="avatar avatar-md" :src="request.user.avatar_url">
              </div>
              <div class="tile-content">
                {{ request.user.name }}
              </div>
            </div>
          </td>
          <td class="w-cell-date">{{ request.attendance_day | moment_l }}</td>
          <td>{{ request.attended_at }}</td>
          <td>{{ request.left_at }}</td>
          <td class="w-cell-kind"><span :class="{ 'text-primary': request.kind === 'attendance', 'text-info': request.kind === 'annual_leave' }">{{ $t(`requests.kinds.${request.kind}`) }}</span></td>
          <td>{{ request.reason }}</td>
          <td class="w-cell-status"><span class="label" :class="getStatusClass(request.status)">{{ $t(`meta.request_statuses.${request.status}`) }}</span></td>
          <td class="w-cell-admin">
            <div class="tile tile-centered" v-if="request.admin">
              <div class="tile-icon">
                <img class="avatar avatar-md" :src="request.admin.avatar_url">
              </div>
              <div class="tile-content">
                {{ request.admin.name }}
              </div>
            </div>
            <span v-else></span>
          </td>
          <td class="w-cell-reason">{{ request.admin_reason }}</td>
          <td class="w-cell-action">
            <span class="d-flex" v-if="request.status === 'pending'">
              <button class="btn btn-action btn-link tooltip" :data-tooltip="$t('tooltip.request.approve')" @click="approveRequest(request.id)">
                <svg width="24px" height="24px" viewBox="0 0 24 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#10b742" ><path d="M23.6485258,3.53890722 C23.179917,3.07025097 22.4201679,3.07025097 21.9514654,3.53890722 L7.57473294,17.9157978 L2.04855219,12.3896103 C1.57994338,11.9209541 0.820194311,11.921001 0.351491758,12.3896103 C-0.117163919,12.8582197 -0.117163919,13.6179697 0.351491758,14.086626 L6.72620273,20.461251 C7.1946709,20.9298603 7.95498248,20.9295322 8.42326316,20.461251 L23.6485258,5.23596972 C24.1171815,4.76736035 24.1171346,4.00756347 23.6485258,3.53890722 Z"/></svg>
              </button>
              <button class="btn btn-action btn-link tooltip" :data-tooltip="$t('tooltip.request.reject')" @click="toggleEditModal(request.id)">
                <svg width="22px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#fc4e5c"><path d="M12.0001458,0 C5.38331856,0 0.000145753119,5.38339892 0.000145753119,12.000583 C0.000801642152,18.6171112 5.38397444,24 12.0001458,24 C18.6168272,24 23.9998542,18.6170383 23.9998542,12.0004373 C23.9998542,5.38339892 18.6168272,0 12.0001458,0 Z M12.0001458,2.18627022 C14.3128105,2.18627022 16.4407331,2.99096342 18.1199548,4.33442647 L4.33440624,18.1196619 C2.99121837,16.4406063 2.18666116,14.3128553 2.18644253,12.0005101 C2.18644253,6.58890832 6.5888426,2.18627022 12.0001458,2.18627022 Z M12.0001458,21.8137298 C9.6875539,21.8137298 7.55948549,21.0090366 5.88019094,19.6655735 L19.6658853,5.88041102 C21.0090731,7.55968518 21.8136303,9.68772774 21.8136303,12.0004373 C21.8135575,17.4115289 17.4113032,21.8137298 12.0001458,21.8137298 Z"/></svg>
              </button>
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <pagination namespace="groupRequests" action="getRequests" v-if="pager.total_pages > 1"/>

    <modal :title="$t('modal.request.editTitle')" :modal-open.sync="isEditModalOpen">
      <div class="form-group" :class="{ 'has-error': errors.admin_reason }">
        <label class="form-label">{{ $t('label.rejectReason') }}</label>
        <textarea class="form-input" v-model="requestParams.admin_reason"></textarea>
        <p class="form-input-hint" v-if="errors.admin_reason">{{ $t('label.rejectReason') }} {{ errors.admin_reason[0] }}</p>
      </div>
      <div class="form-group">
        <button type="button" class="btn btn-error" @click="saveEditModal(requestParams, rejectRequest)">{{ $t('button.common.reject') }}</button>
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
const MainLayout = () => import('../layouts/Main')
const Pagination = () => import('../components/Pagination')
const GroupTab = () => import('../components/GroupTab')
const flatPickr = () => import('vue-flatpickr-component')

export default {
  name: 'group-requests',

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

  components: {
    MainLayout,
    Pagination,
    GroupTab,
    flatPickr
  },

  computed: {
    ...mapState('initialStates', ['meta']),

    ...mapState('groupRequests', ['pager', 'requests', 'errors']),

    ...mapState('group', ['group'])
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
    this.getRequests(this.params)
  },

  watch: {
    params: {
      handler: function() {
        this.debouncedGetRequests()
      },
      deep: true
    }
  }
}
</script>

<template>
  <setting-layout sidebar-type="company" :title="$t('company.title')" :subtitle="$t('company.allowedIPs.title')">
    <div class="toolbar clearfix mt-5">
      <button type="button" class="btn float-right" @click="toggleAddModal(clearIPErrors)">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
        {{ $t('company.allowedIPs.btn.add') }}
      </button>
    </div>

    <table class="table table-hover bg-light mt-5">
      <thead>
        <th>{{ $t('company.allowedIPs.tableHeader.ipAddress') }}</th>
        <th class="text-right">{{ $t('company.allowedIPs.tableHeader.createdAt') }}</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="ip in allowedIPs">
          <td>{{ ip.ip_address }}</td>
          <td class="text-right"></td> <td class="text-center"> <button class="btn btn-action btn-link" @click="toggleEditModal(ip.id, ip.ip_address)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 16" fill="currentColor">
                <path fill-rule="evenodd" d="M0 12v3h3l8-8-3-3-8 8zm3 2H1v-2h1v1h1v1zm10.3-9.3L12 6 9 3l1.3-1.3a.996.996 0 0 1 1.41 0l1.59 1.59c.39.39.39 1.02 0 1.41z"/>
              </svg>
            </button>
            <button class="btn btn-action btn-link" @click="deleteIP(ip.id)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <modal :title="$t('company.allowedIPs.modal.addTitle')" :modal-open.sync="isAddModalOpen">
      <div class="form-group" :class="{ 'has-error': errors.ip_address}">
        <label class="form-label">{{ $t('company.allowedIPs.labels.ipAddress') }}</label>
        <input class="form-input" type="text" v-model="newIp">
        <p class="form-input-hint" v-if="errors.ip_address">{{ $t('company.allowedIPs.labels.ipAddress') }} {{ errors.ip_address[0] }}</p>
      </div>
      <div class="form-group">
        <a class="btn" @click="submitAddModal({ ip_address: newIp }, createIP)">{{ $t('company.allowedIPs.btn.submit') }}</a>
      </div>
    </modal>

    <modal :title="$t('company.allowedIPs.modal.editTitle')" :modal-open.sync="isEditModalOpen">
      <div class="form-group" :class="{ 'has-error': errors.ip_address}">
        <label class="form-label">{{ $t('company.allowedIPs.labels.ipAddress') }}</label>
        <input class="form-input" type="text" v-model="editIp">
        <p class="form-input-hint" v-if="errors.ip_address">{{ $t('company.allowedIPs.labels.ipAddress') }} {{ errors.ip_address[0] }}</p>
      </div>
      <div class="form-group">
        <a class="btn" @click="saveEditModal({ id: currentId, ip_address: editIp }, updateIP)">{{ $t('company.allowedIPs.btn.save') }}</a>
      </div>
    </modal>
  </setting-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SettingLayout from '../layouts/Setting.vue'
import modal from '../mixins/modal'

export default {
  mixins: [modal],

  data () {
    return {
      currentId: '',
      newIp: '',
      editIp: ''
    }
  },

  components: {
    SettingLayout
  },

  methods: {
    ...mapActions('companyAllowedIPs', [
      'fetchIPs',
      'createIP',
      'updateIP',
      'deleteIP',
      'clearIPErrors'
    ]),

    toggleEditModal (id, ipAddress) {
      this.clearIPErrors()
      this.currentId = id
      this.editIp = ipAddress
      this.isEditModalOpen = !this.isEditModalOpen
    }
  },

  computed: {
    ...mapState('companyAllowedIPs', [
      'allowedIPs',
      'errors'
    ])
  },

  created () {
    this.fetchIPs()
  }
}
</script>

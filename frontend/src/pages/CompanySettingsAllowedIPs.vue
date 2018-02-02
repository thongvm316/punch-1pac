<template>
  <setting-layout sidebar-type="company" title="Company Settings" subtitle="Allowed IPs">
    <div class="toolbar clearfix mt-5">
      <button type="button" class="btn float-right" @click="toggleAddModal">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
        Add IP
      </button>
    </div>

    <table class="table table-hover bg-light mt-5">
      <thead>
        <th>IP Address</th>
        <th class="text-right">Created at</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="ip in allowedIPs">
          <td @click="toggleEditModal(ip.id, ip.ip_address)" >{{ ip.ip_address }}</td>
          <td class="text-right"></td>
          <td class="text-center"><button class="btn btn-error" @click="deleteIP(ip.id)">Delete</button></td>
        </tr>
      </tbody>
    </table>

    <modal title="Add IP" :modal-open.sync="isAddModalOpen">
      <div class="form-group">
        <label class="form-label">IP Address</label>
        <input class="form-input" type="text" v-model="newIp">
      </div>
      <div class="form-group">
        <a class="btn" @click="createIP(newIp)">Submit</a>
      </div>
    </modal>

    <modal title="Edit IP" :modal-open.sync="isEditModalOpen">
      <div class="form-group">
        <label class="form-label">IP Address</label>
        <input class="form-input" type="text" v-model="editIp">
      </div>
      <div class="form-group">
        <a class="btn" @click="updateIP({ id: currentID, ip_address: editIp })">Save</a>
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
      currentID: '',
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
      'deleteIP'
    ]),

    toggleEditModal (id, ipAddress) {
      this.currentID = id
      this.editIp = ipAddress
      this.isEditModalOpen = !this.isEditModalOpen
    }
  },

  computed: {
    ...mapState('companyAllowedIPs', [
      'allowedIPs'
    ])
  },

  created () {
    this.fetchIPs()
  }
}
</script>

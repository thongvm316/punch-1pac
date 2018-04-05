<template>
  <setting-layout sidebar-type="company" :title="$t('company.title')" :subtitle="$t('company.users.title')">
    <div class="toolbar mt-5 clearfix">
      <input type="text" class="form-input" :placeholder="$t('company.users.placeholder.filterByEmail')" v-model="email">
      <router-link to="/company/settings/users/add" tag="button" class="btn float-right">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"></path></svg>
        {{ $t('company.users.btn.add') }}
      </router-link> <router-link to="/company/settings/users/add-multi" tag="button" class="btn float-right mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"></path></svg>
        {{ $t('company.users.btn.addMulti') }}
      </router-link>
    </div>

    <table class="table table-hover bg-light mt-5">
      <thead>
        <th>{{ $t('company.users.tableHeader.name') }}</th>
        <th>{{ $t('company.users.tableHeader.email') }}</th>
        <th>{{ $t('company.users.tableHeader.position') }}</th>
        <th>{{ $t('company.users.tableHeader.role') }}</th> <th></th>
      </thead>
      <tbody>
        <tr v-for="user in filterByEmail(email)">
          <td>
            <div class="tile tile-centered">
              <div class="tile-icon">
                <img :src="user.avatar_url" class="avatar avatar-md" :alt="user.name">
              </div>
              <div class="tile-content">{{ user.name }}</div>
            </div>
          </td>
          <td>{{ user.email }}</td>
          <td>{{ user.position }}</td>
          <td>{{ $t(`meta.roles.${user.role}`) }}</td>
          <td>
            <button class="btn btn-action btn-link" @click="toggleEditModal(user)" v-if="$auth('User', currentUser, user).canEdit()">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 16" fill="currentColor">
                <path fill-rule="evenodd" d="M0 12v3h3l8-8-3-3-8 8zm3 2H1v-2h1v1h1v1zm10.3-9.3L12 6 9 3l1.3-1.3a.996.996 0 0 1 1.41 0l1.59 1.59c.39.39.39 1.02 0 1.41z"/>
              </svg>
            </button>
            <button class="btn btn-action btn-link" @click="openConfirmDialog(user)" v-if="$auth('User', currentUser, user).canDelete()">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <confirm-dialog :title="$t('company.users.confirmDialog.deleteUserTitle')" :deleteObject="deleteUser" :objectId="selectedObject.id" :modal-open.sync="isOpenConfirmDialog">
      <p v-html="$t('company.users.confirmDialog.deleteUserMsg', { name: selectedObject.name })"></p>
    </confirm-dialog>

    <modal :title="$t('company.users.modal.editTitle')" :modal-open.sync="isEditModalOpen">
      <user-profile :target-user="selectedUser" :self="false" v-if="selectedUser"/>
    </modal>
  </setting-layout>
</template>

<script>
import confirmDialog from '../mixins/confirm-dialog'
import SettingLayout from '../layouts/Setting'
import UserProfile from '../components/UserProfile'
import modal from '../mixins/modal'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      email: '',
      selectedUser: null
    }
  },

  mixins: [confirmDialog, modal],

  components: {
    SettingLayout,
    UserProfile
  },

  methods: {
    ...mapActions('companyUsers', [
      'deleteUser',
      'fetchUsers'
    ]),

    toggleAddModal (user) {
      this.selectedUser = user
      this.isEditModalOpen = !this.isEditModalOpen
    }
  },

  computed: {
    ...mapState('companyUsers', [
      'users'
    ]),

    ...mapGetters('companyUsers', [
      'filterByEmail'
    ])
  },

  created () {
    this.fetchUsers()
  }
}
</script>

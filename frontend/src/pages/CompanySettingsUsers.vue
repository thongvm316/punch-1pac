<template>
  <setting-layout sidebar-type="company" :title="$t('title.companySettings')" :subtitle="$t('subtitle.users')">
    <div class="toolbar mt-5 clearfix">
      <input type="text" class="form-input" placeholder="Filter user by email" @keyup="filterUsers">
      <router-link to="/company/settings/users/add" tag="button" class="btn float-right">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"></path></svg>
        {{ $t('button.addUsers') }}
      </router-link>
      <router-link to="/company/settings/users/add-multi" tag="button" class="btn float-right mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"></path></svg>
        {{ $t('button.addMultiUsers') }}
      </router-link>
    </div>

    <table class="table table-hover bg-light mt-5">
      <thead>
        <th>{{ $t('tableHeader.name') }}</th>
        <th>{{ $t('tableHeader.email') }}</th>
        <th>{{ $t('tableHeader.role') }}</th>
        <th>{{ $t('tableHeader.createdAt') }}</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="user in localUsers">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>Member</td>
          <td>20-01-2018</td>
          <td class="text-center">
            <button class="btn btn-action btn-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </setting-layout>
</template>

<script>
import SettingLayout from '../layouts/Setting.vue'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      localUsers: []
    }
  },

  components: {
    SettingLayout
  },

  methods: {
    ...mapActions('companyUsers', [
      'fetchUsers'
    ]),

    filterUsers (e) {
      this.localUsers = this.filterByEmail(e.target.value)
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
    this.fetchUsers().then(response => { this.localUsers = response.users })
  }
}
</script>

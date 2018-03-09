<template>
  <setting-layout sidebar-type="company" :title="$t('title.companySettings')" :subtitle="$t('subtitle.addUsers')">
    <p class="text-success mb-2" v-if="msgSuccess">{{ $t('users.successMsg') }}</p>
    <p class="mb-2">{{ $t('users.note') }}</p>
    <form class="setting-form">
      <div class="form-group" :class="{ 'has-error': errors.name }">
        <label class="form-label">{{ $t('label.name') }}</label>
        <input class="form-input" type="text" placeholder="Name" v-model="params.name">
        <p class="form-input-hint" v-if="errors.name">{{ errors.name[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': errors.email }">
        <label class="form-label">{{ $t('label.email') }}</label>
        <input class="form-input" type="text" placeholder="Email" v-model="params.email">
        <p class="form-input-hint" v-if="errors.email">{{ errors.email[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': errors.role }">
        <label class="form-label">{{ $t('label.role') }}</label>
        <select class="form-select" v-model="params.role">
          <option value="0">Member</option>
          <option value="1">Admin</option>
          <option value="2">SuperAdmin</option>
        </select>
        <p class="form-input-hint" v-if="errors.role">{{ errors.role[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': errors.group }">
        <label class="form-label">{{ $t('label.group') }}</label>
        <select class="form-select" v-model="params.group_id">
          <option value="1">Default</option>
          <option value="2">IT</option>
          <option value="3">HR</option>
        </select>
        <p class="form-input-hint" v-if="errors.group">{{ errors.group[0] }}</p>
      </div>
      <div class="form-group">
        <button type="button" class="btn" @click="create(params)">Submit</button>
      </div>
    </form>
  </setting-layout>
</template>

<script>
import SettingLayout from '../layouts/Setting.vue'
import axios from 'axios'

export default {
  data () {
    return {
      msgSuccess: false,
      errors: {},
      params: {
        name: '',
        email: '',
        role: 0,
        group_id: 1
      }
    }
  },

  components: {
    SettingLayout
  },

  methods: {
    create (params) {
      axios.post('/users', { user: params }, { headers: { 'Content-Type': 'application/json' } })
           .then(response => { this.msgSuccess = true })
           .catch(error => {
             if (error.response && error.response.status === 422) this.errors = error.response.data.errors
             else throw error
           })
    }
  }
}
</script>

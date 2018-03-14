<template>
  <setting-layout sidebar-type="company" :title="$t('company.title')" :subtitle="$t('company.users.add.title')">
    <p class="text-success mb-2" v-if="msgSuccess">{{ $t('company.users.add.successMsg') }}</p>
    <p class="mb-2">{{ $t('company.users.add.note') }}</p>
    <form class="setting-form">
      <div class="form-group" :class="{ 'has-error': errors.name }">
        <label class="form-label">{{ $t('company.users.add.labels.name') }}</label>
        <input class="form-input" type="text" :placeholder="$t('company.users.add.placeholder.name')" v-model="params.name">
        <p class="form-input-hint" v-if="errors.name">{{ errors.name[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': errors.email }">
        <label class="form-label">{{ $t('company.users.add.labels.email') }}</label>
        <input class="form-input" type="text" :placeholder="$t('company.users.add.placeholder.email')" v-model="params.email">
        <p class="form-input-hint" v-if="errors.email">{{ errors.email[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': errors.role }">
        <label class="form-label">{{ $t('company.users.add.labels.role') }}</label>
        <select class="form-select" v-model="params.role">
          <option :value="role" v-for="role in meta.roles">{{ $t(`meta.roles.${role}`) }}</option>
        </select>
        <p class="form-input-hint" v-if="errors.role">{{ errors.role[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': errors.group }">
        <label class="form-label">{{ $t('company.users.add.labels.group') }}</label>
        <select class="form-select" v-model="params.group_id">
          <option :value="group.id" v-for="group in meta.groups">{{ group.name }}</option>
        </select>
        <p class="form-input-hint" v-if="errors.group">{{ errors.group[0] }}</p>
      </div>
      <div class="form-group">
        <button type="button" class="btn" @click="create(params)">{{ $t('company.users.add.btn.submit') }}</button>
      </div>
    </form>
  </setting-layout>
</template>

<script>
import SettingLayout from '../layouts/Setting.vue'
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      msgSuccess: false,
      errors: {},
      params: {
        name: '',
        email: '',
        role: 'member',
        group_id: 1
      }
    }
  },

  computed: {
    ...mapState('initialStates', [
      'meta'
    ])
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

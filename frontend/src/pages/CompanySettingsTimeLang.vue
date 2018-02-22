<template>
  <setting-layout sidebar-type="company" title="Company Settings" subtitle="Timezone and Language">
    <p class="text-success mb-2" v-if="msgSuccess">Company's timezone and language are updated</p>
    <form class="setting-form">
      <div class="form-group" :class="{ 'has-error': errors.timezone }">
        <label class="form-label">Timezone</label>
        <select class="form-select" v-model="params.timezone">
          <option>Asia/Bangkok</option>
          <option>Asia/Tokyo</option>
          <option>Etc/UTC</option>
        </select>
        <p class="form-input-hint" v-if="errors.timezone">{{ errors.timezone[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': errors.language }">
        <label class="form-label">Language</label>
        <select class="form-select" v-model="params.language">
          <option value="en">English</option>
          <option value="vi">Vietnamese</option>
          <option value="ja">Japanese</option>
        </select>
        <p class="form-input-hint" v-if="errors.language">{{ errors.language[0] }}</p>
      </div>
      <div class="form-group">
        <button type="button" class="btn" @click="updateCompany(params)">Save</button>
      </div>
    </form>
  </setting-layout>
</template>

<script>
import SettingLayout from '../layouts/Setting.vue'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      msgSuccess: false,
      errors: {},
      params: {
        timezone: '',
        language: ''
      }
    }
  },

  components: {
    SettingLayout
  },

  computed: {
    ...mapState('initialStates', [
      'currentCompany'
    ])
  },

  methods: {
    ...mapActions('initialStates', [
      'updateCompany'
    ])
  },

  created () {
    this.params.timezone = this.currentCompany.timezone
    this.params.language = this.currentCompany.language
  }
}
</script>

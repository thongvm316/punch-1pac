<template>
  <setting-layout sidebar-type="company" :title="$t('company.title')" :subtitle="$t('company.timezoneAndLanguage.title')">
    <p class="text-success mb-2" v-if="msgSuccess">{{ $t('company.timezoneAndLanguage.msg.success') }}</p>
    <form class="setting-form">
      <div class="form-group" :class="{ 'has-error': companyErrors.timezone }">
        <label class="form-label">{{ $t('company.timezoneAndLanguage.labels.timezone') }}</label>
        <select class="form-select" v-model="params.timezone">
          <option :value="timezone" v-for="timezone in meta.timezones">{{ timezone }}</option>
        </select>
        <p class="form-input-hint" v-if="companyErrors.timezone">{{ $t('company.timezoneAndLanguage.labels.timezone') }} {{ companyErrors.timezone[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': companyErrors.language }">
        <label class="form-label">{{ $t('company.timezoneAndLanguage.labels.language') }}</label>
        <select class="form-select" v-model="params.language">
          <option :value="language" v-for="language in meta.languages">{{ $t(`meta.languages.${language}`) }}</option>
        </select>
        <p class="form-input-hint" v-if="companyErrors.language">{{ $t('company.timezoneAndLanguage.labels.language') }} {{ companyErrors.language[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': companyErrors.breaktime }">
        <label class="form-label">{{ $t('company.timezoneAndLanguage.labels.breaktime') }}</label>
        <input type="number" step="0.5" class="form-input" v-model="params.breaktime">
        <p class="form-input-hint" v-if="companyErrors.breaktime">{{ $t('company.timezoneAndLanguage.labels.breaktime') }} {{ companyErrors.breaktime[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': companyErrors.breakdays }">
        <label class="form-label">{{ $t('company.timezoneAndLanguage.labels.breakdays') }}</label>
        <div class="input-group">
          <label class="form-checkbox" v-for="weekday in meta.weekdays">
            <input type="checkbox" :value="weekday" v-model="params.breakdays">
            <i class="form-icon"></i> {{ $t(`meta.weekdays.${weekday}`) }}
          </label>
        </div>
        <p class="form-input-hint" v-if="companyErrors.breakdays">{{ $t('company.timezoneAndLanguage.labels.breakdays') }} {{ companyErrors.breakdays[0] }}</p>
      </div>
      <div class="form-group">
        <button type="button" class="btn" @click="updateCompany(params)">{{ $t('company.timezoneAndLanguage.btn.save') }}</button>
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
      params: {
        timezone: '',
        language: '',
        breaktime: 0,
        breakdays: []
      }
    }
  },

  components: {
    SettingLayout
  },

  computed: {
    ...mapState('initialStates', [
      'meta',
      'companyErrors',
      'currentCompany'
    ])
  },

  methods: {
    ...mapActions('initialStates', [
      'clearCompanyErrors',
      'updateCompany'
    ])
  },

  created () {
    this.clearCompanyErrors()
    this.params.timezone = this.currentCompany.timezone
    this.params.language = this.currentCompany.language
    this.params.breaktime = this.currentCompany.breaktime
    this.params.breakdays = this.currentCompany.breakdays
  }
}
</script>

<template>
  <setting-layout sidebar-type="company" :title="$t('company.title')" :subtitle="$t('company.timezoneAndLanguage.title')">
    <form class="setting-form">
      <div class="form-group" :class="{ 'has-error': companyErrors.timezone }">
        <label class="form-label">{{ $t('company.timezoneAndLanguage.labels.timezone') }}</label>
        <select class="form-select" v-model="params.timezone">
          <option :value="timezone" v-for="timezone in meta.timezones">{{ timezone }}</option>
        </select>
        <p class="form-input-hint" v-if="companyErrors.timezone">{{ $t('company.timezoneAndLanguage.labels.timezone') }} {{ companyErrors.timezone[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': companyErrors.breaktime }">
        <label class="form-label">{{ $t('company.timezoneAndLanguage.labels.breaktime') }}</label>
        <input type="number" step="0.5" class="form-input" v-model="params.breaktime">
        <p class="form-input-hint" v-if="companyErrors.breaktime">{{ $t('company.timezoneAndLanguage.labels.breaktime') }} {{ companyErrors.breaktime[0] }}</p>
      </div>
      <div class="form-group">
        <button type="button" class="btn" @click="localUpdateCompany">{{ $t('company.timezoneAndLanguage.btn.save') }}</button>
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
    ]),

    localUpdateCompany () {
      this.updateCompany(this.params).then(response => this.setFlashMsg(this.$t('messages.company.updateTimeSuccess')))
    }
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

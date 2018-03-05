<template>
  <setting-layout sidebar-type="company" :title="$t('title.companySettings')" :subtitle="$t('subtitle.timeLang')">
    <p class="text-success mb-2" v-if="msgSuccess">{{ $t('timeLang.successMsg') }}</p>
    <form class="setting-form">
      <div class="form-group" :class="{ 'has-error': companyErrors.timezone }">
        <label class="form-label">{{ $t('label.timezone') }}</label>
        <select class="form-select" v-model="params.timezone">
          <option>Asia/Bangkok</option>
          <option>Asia/Tokyo</option>
          <option>Etc/UTC</option>
        </select>
        <p class="form-input-hint" v-if="companyErrors.timezone">{{ companyErrors.timezone[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': companyErrors.language }">
        <label class="form-label">{{ $t('label.language') }}</label>
        <select class="form-select" v-model="params.language">
          <option value="en">English</option>
          <option value="vi">Vietnamese</option>
          <option value="ja">Japanese</option>
        </select>
        <p class="form-input-hint" v-if="companyErrors.language">{{ companyErrors.language[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': companyErrors.breaktime }">
        <label class="form-label">{{ $t('label.breaktime') }}</label>
        <input type="number" step="0.5" class="form-input" v-model="params.breaktime">
        <p class="form-input-hint" v-if="companyErrors.breaktime">{{ companyErrors.breaktime[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': companyErrors.breakdays }">
        <label class="form-label">{{ $t('label.breakdays') }}</label>
        <div class="input-group">
          <label class="form-checkbox" v-for="weekday in weekdays">
            <input type="checkbox" :value="weekday.toLowerCase()" v-model="params.breakdays">
            <i class="form-icon"></i> {{ weekday }}
          </label>
        </div>
        <p class="form-input-hint" v-if="companyErrors.breakdays">{{ companyErrors.breakdays[0] }}</p>
      </div>
      <div class="form-group">
        <button type="button" class="btn" @click="updateCompany(params)">{{ $t('button.save') }}</button>
      </div>
    </form>
  </setting-layout>
</template>

<script>
import SettingLayout from '../layouts/Setting.vue'
import { mapState, mapActions } from 'vuex'
import moment from 'moment'

export default {
  data () {
    return {
      weekdays: moment.weekdays(),
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

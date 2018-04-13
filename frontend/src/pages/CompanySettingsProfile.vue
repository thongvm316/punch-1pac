<template>
  <setting-layout sidebar-type="company" :title="$t('company.title')" :subtitle="$t('company.profile.title')">
    <form class="setting-form">
      <div class="form-group" :class="{ 'has-error': companyErrors.logo }">
        <label class="form-label">{{ $t('company.profile.labels.logo') }}</label>
        <img class="img-profile" :src="currentCompany.logo_url" :alt="currentCompany.name">
        <input class="form-input" type="file" @change="setLogoFile">
        <p class="form-input-hint" v-if="companyErrors.logo">{{ $t('company.profile.labels.logo') }} {{ companyErrors.logo[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': companyErrors.name }">
        <label class="form-label">{{ $t('company.profile.labels.name') }}</label>
        <input class="form-input" type="text" v-model="params.name">
        <p class="form-input-hint" v-if="companyErrors.name">{{ $t('company.profile.labels.name') }} {{ companyErrors.name[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': companyErrors.industry }">
        <label class="form-label">{{ $t('company.profile.labels.industry') }}</label>
        <select class="form-select" v-model="params.industry">
          <option :value="industry" v-for="industry in meta.industries">{{ $t(`meta.industries.${industry}`) }}</option>
        </select>
        <p class="form-input-hint" v-if="companyErrors.industry">{{ $t('company.profile.labels.industry') }} {{ companyErrors.industry[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': companyErrors.country }">
        <label class="form-label">{{ $t('company.profile.labels.country') }}</label>
        <input class="form-input" type="text" v-model="params.country">
        <p class="form-input-hint" v-if="companyErrors.country">{{ $t('company.profile.labels.country') }} {{ companyErrors.country[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': companyErrors.address }">
        <label class="form-label">{{ $t('company.profile.labels.address') }}</label>
        <input class="form-input" type="text" v-model="params.address">
        <p class="form-input-hint" v-if="companyErrors.address">{{ $t('company.profile.labels.address') }} {{ companyErrors.address[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': companyErrors.phone_number }">
        <label class="form-label">{{ $t('company.profile.labels.phoneNum') }}</label>
        <input class="form-input" type="text" v-model="params.phone_number">
        <p class="form-input-hint" v-if="companyErrors.phone_number">{{ $t('company.profile.labels.phoneNum') }} {{ companyErrors.phone_number[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': companyErrors.postal_code }">
        <label class="form-label">{{ $t('company.profile.labels.postalCode') }}</label>
        <input class="form-input" type="text" v-model="params.postal_code">
        <p class="form-input-hint" v-if="companyErrors.postal_code">{{ $t('company.profile.labels.postalCode') }} {{ companyErrors.postal_code[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': companyErrors.tax_code }">
        <label class="form-label">{{ $t('company.profile.labels.taxCode') }}</label>
        <input class="form-input" type="text" v-model="params.tax_code">
        <p class="form-input-hint" v-if="companyErrors.tax_code">{{ $t('company.profile.labels.taxCode') }} {{ companyErrors.tax_code[0] }}</p>
      </div>
      <div class="form-group">
        <button type="button" class="btn btn-success btn-submit" @click="localUpdateCompany">{{ $t('company.profile.btn.save') }}</button>
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
        logo: '',
        name: '',
        namespace: '',
        industry: '',
        country: '',
        address: '',
        phone_number: '',
        postal_code: '',
        tax_code: ''
      }
    }
  },

  components: {
    SettingLayout
  },

  computed: {
    ...mapState('initialStates', [
      'meta',
      'currentCompany',
      'companyErrors'
    ])
  },

  methods: {
    ...mapActions('flash', [
      'setFlashMsg'
    ]),

    ...mapActions('initialStates', [
      'clearCompanyErrors',
      'updateCompany'
    ]),

    setLogoFile (e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.params.logo = files[0]
    },

    localUpdateCompany () {
      this.updateCompany(this.params)
          .then(response => this.setFlashMsg(this.$t('messages.company.updateSuccess')))
    }
  },

  created () {
    this.clearCompanyErrors()
    Object.keys(this.params).forEach(key => { if (key !== 'logo') this.params[key] = this.currentCompany[key] })
  }
}
</script>

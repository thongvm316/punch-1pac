<template>
  <setting-layout sidebar-type="company" :title="$t('title.companySettings')" :subtitle="$t('subtitle.profile')">
    <form class="setting-form">
      <div class="form-group" :class="{ 'has-error': companyErrors.logo }">
        <label class="form-label">{{ $t('label.logo') }}</label>
        <img class="img-profile" :src="currentCompany.logo_url" :alt="currentCompany.name">
        <input class="form-input" type="file" @change="setLogoFile">
        <p class="form-input-hint" v-if="companyErrors.logo">{{ companyErrors.logo[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': companyErrors.name }">
        <label class="form-label">{{ $t('label.name') }}</label>
        <input class="form-input" type="text" v-model="params.name">
        <p class="form-input-hint" v-if="companyErrors.name">{{ companyErrors.name[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': companyErrors.industry }">
        <label class="form-label">{{ $t('label.industry') }}</label>
        <select class="form-select" v-model="params.industry">
          <option value="startup">Startup</option>
          <option value="ecomerce">Ecormerce</option>
          <option value="marketing">Marketing</option>
          <option value="banking">Banking</option>
        </select>
        <p class="form-input-hint" v-if="companyErrors.industry">{{ companyErrors.industry[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': companyErrors.country }">
        <label class="form-label">{{ $t('label.country') }}</label>
        <input class="form-input" type="text" v-model="params.country">
        <p class="form-input-hint" v-if="companyErrors.country">{{ companyErrors.country[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': companyErrors.address }">
        <label class="form-label">{{ $t('label.address') }}</label>
        <input class="form-input" type="text" v-model="params.address">
        <p class="form-input-hint" v-if="companyErrors.address">{{ companyErrors.address[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': companyErrors.phone_number }">
        <label class="form-label">{{ $t('label.phoneNum') }}</label>
        <input class="form-input" type="text" v-model="params.phone_number">
        <p class="form-input-hint" v-if="companyErrors.phone_number">{{ companyErrors.phone_number[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': companyErrors.postal_code }">
        <label class="form-label">{{ $t('label.postalCode') }}</label>
        <input class="form-input" type="text" v-model="params.postal_code">
        <p class="form-input-hint" v-if="companyErrors.postal_code">{{ companyErrors.postal_code[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': companyErrors.tax_code }">
        <label class="form-label">{{ $t('label.taxCode') }}</label>
        <input class="form-input" type="text" v-model="params.tax_code">
        <p class="form-input-hint" v-if="companyErrors.tax_code">{{ companyErrors.tax_code[0] }}</p>
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
      'currentCompany',
      'companyErrors'
    ])
  },

  methods: {
    ...mapActions('initialStates', [
      'clearCompanyErrors',
      'updateCompany'
    ]),

    setLogoFile (e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.params.logo = files[0]
    }
  },

  created () {
    this.clearCompanyErrors()
    Object.keys(this.params).forEach(key => { if (key !== 'logo') this.params[key] = this.currentCompany[key] })
  }
}
</script>

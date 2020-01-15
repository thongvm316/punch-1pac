<template>
  <setting-layout sidebar-type="company" :title="$t('company.title')" :subtitle="$t('company.profile.title')">
    <form class="setting-form">
      <div class="form-group" :class="{ 'has-error': companyErrors.logo }">
        <label class="form-label">{{ $t('company.profile.labels.logo') }}</label>
        <img class="img-profile" :src="currentCompany.logo_url" :alt="currentCompany.name">
        <input class="form-input" type="file" @change="setLogoFile">
        <p class="form-input-hint" v-if="companyErrors.logo">{{ $t('company.profile.labels.logo') }} {{ companyErrors.logo[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': $v.params.name.$error || companyErrors.name }">
        <label class="form-label">{{ $t('company.profile.labels.name') }}</label>
        <input class="form-input" type="text" v-model="$v.params.name.$model">
        <p class="form-input-hint" v-if="$v.params.name.$error && !companyErrors.name">
          {{ $t('validation.required', { name: $t('company.profile.labels.name') }) }}
        </p>
        <p class="form-input-hint" v-if="companyErrors.name">{{ $t('company.profile.labels.name') }} {{ companyErrors.name[0] }}</p>
      </div>
      <div class="form-group">
        <label class="form-label">{{ $t('company.profile.labels.industry') }}</label>
        <select class="form-select" v-model="params.industry">
          <option :value="industry" v-for="(industry, key) in meta.industries" :key="key">{{ $t(`meta.industries.${industry}`) }}</option>
        </select>
      </div>
      <div class="form-group" :class="{ 'has-error': $v.params.country.$error || companyErrors.country }">
        <label class="form-label">{{ $t('company.profile.labels.country') }}</label>
        <input class="form-input" type="text" v-model="$v.params.country.$model">
        <p class="form-input-hint" v-if="$v.params.country.$error && !companyErrors.country">
          {{ $t('validation.required', { name: $t('company.profile.labels.country') }) }}
        </p>
        <p class="form-input-hint" v-if="companyErrors.country">{{ $t('company.profile.labels.country') }} {{ companyErrors.country[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': $v.params.address.$error || companyErrors.address }">
        <label class="form-label">{{ $t('company.profile.labels.address') }}</label>
        <input class="form-input" type="text" v-model="$v.params.address.$model">
        <p class="form-input-hint" v-if="$v.params.address.$error && !companyErrors.address">
          {{ $t('validation.required', { name: $t('company.profile.labels.address') }) }}
        </p>
        <p class="form-input-hint" v-if="companyErrors.address">{{ $t('company.profile.labels.address') }} {{ companyErrors.address[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': $v.params.phone_number.$error || companyErrors.phone_number }">
        <label class="form-label">{{ $t('company.profile.labels.phoneNum') }}</label>
        <input class="form-input" type="text" v-model="$v.params.phone_number.$model">
        <p class="form-input-hint" v-if="$v.params.phone_number.$anyError && !companyErrors.phone_number">
          <span v-if="!$v.params.phone_number.required">{{ $t('validation.required', { name: $t('company.profile.labels.phoneNum') }) }}</span>
          <span v-else-if="!$v.params.phone_number.isValid">{{ $t('validation.invalid', { name: $t('company.profile.labels.phoneNum') }) }}</span>
        </p>
        <p class="form-input-hint" v-if="companyErrors.phone_number">{{ $t('company.profile.labels.phoneNum') }} {{ companyErrors.phone_number[0] }}</p>
      </div>
      <div class="form-group">
        <label class="form-label">{{ $t('company.profile.labels.postalCode') }}</label>
        <input class="form-input" type="text" v-model="params.postal_code">
      </div>
      <div class="form-group">
        <label class="form-label">{{ $t('company.profile.labels.taxCode') }}</label>
        <input class="form-input" type="text" v-model="params.tax_code">
      </div>
      <div class="form-group" :class="{ 'has-error': companyErrors.timezone }">
        <label class="form-label">{{ $t('company.timezoneAndLanguage.labels.timezone') }}</label>
        <select class="form-select" v-model="params.timezone">
          <option :value="timezone" v-for="(timezone, key) in meta.timezones" :key="key">{{ timezone }}</option>
        </select>
        <p class="form-input-hint" v-if="companyErrors.timezone">{{ $t('company.timezoneAndLanguage.labels.timezone') }} {{ companyErrors.timezone[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': companyErrors.punch_method }">
        <label class="form-label">{{ $t('company.profile.labels.punchMethod') }}</label>
        <label class="form-radio">
          <input type="radio" value="default" v-model="params.punch_method">
          <i class="form-icon"></i> {{ $t('company.punchMethod.default') }}
        </label>
        <label class="form-radio">
          <input type="radio" value="qrcode_scan" v-model="params.punch_method">
          <i class="form-icon"></i> {{ $t('company.punchMethod.qrcode') }}
        </label>
      </div>
      <div class="form-group">
        <button ref="btnSave" type="button" class="btn btn-success btn-submit" @click="localUpdateCompany" :disabled="isDisable">{{ $t('company.profile.btn.save') }}</button>
      </div>
    </form>
  </setting-layout>
</template>

<script>
import handleSuccess from '../mixins/handle-success'
import companyProfileValidate from '../validations/company-profile-validate'
import { INITIAL_STATES_CLEAR_COMPANY_ERRORS } from '../store/mutation-types'
import { mapState, mapActions, mapMutations } from 'vuex'
const SettingLayout = () => import('../layouts/Setting.vue')

export default {
  data() {
    return {
      isDisable: false,
      params: {
        logo: '',
        name: '',
        namespace: '',
        industry: '',
        country: '',
        address: '',
        phone_number: '',
        postal_code: '',
        tax_code: '',
        timezone: '',
        punch_method: 'default'
      }
    }
  },

  mixins: [handleSuccess, companyProfileValidate],

  components: {
    SettingLayout
  },

  computed: {
    ...mapState('initialStates', ['meta', 'currentCompany', 'companyErrors'])
  },

  methods: {
    ...mapActions('initialStates', ['updateCompany']),

    ...mapMutations('initialStates', [INITIAL_STATES_CLEAR_COMPANY_ERRORS]),

    setLogoFile(e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.params.logo = files[0]
    },

    localUpdateCompany() {
      this.isDisable = true
      this.updateCompany(this.params).then(response => {
        const message = this.$t('messages.company.updateSuccess')
        this.handleSuccess({ message })
      })
      .catch(() => { this.isDisable = false })
    }
  },

  created() {
    this[INITIAL_STATES_CLEAR_COMPANY_ERRORS]()

    Object.keys(this.params).forEach(key => {
      if (key !== 'logo') this.params[key] = this.currentCompany[key]
    })
  }
}
</script>

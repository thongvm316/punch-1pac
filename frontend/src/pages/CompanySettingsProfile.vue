<template>
  <div>
    <h2>{{ $t('company.profile.title') }}</h2>
    <form class="setting-form">
      <div
        class="form-group"
        :class="{ 'has-error': companyErrors.logo }"
      >
        <label class="form-label">{{ $t('label.logo') }}</label>
        <img
          class="img-profile"
          :src="currentCompany.logo_url"
          :alt="currentCompany.name"
        >
        <input
          class="form-input"
          type="file"
          @change="setLogoFile"
        >
        <p
          v-if="companyErrors.logo"
          class="form-input-hint"
        >
          {{ $t('label.logo') }} {{ companyErrors.logo[0] }}
        </p>
      </div>
      <div
        class="form-group"
        :class="{ 'has-error': $v.params.name.$error || companyErrors.name }"
      >
        <label class="form-label">{{ $t('label.name') }}</label>
        <input
          v-model="$v.params.name.$model"
          class="form-input"
          type="text"
        >
        <p
          v-if="$v.params.name.$error && !companyErrors.name"
          class="form-input-hint"
        >
          {{ $t('validation.required', { name: $t('label.name') }) }}
        </p>
        <p
          v-if="companyErrors.name"
          class="form-input-hint"
        >
          {{ $t('label.name') }} {{ companyErrors.name[0] }}
        </p>
      </div>
      <div class="form-group">
        <label class="form-label">{{ $t('label.industry') }}</label>
        <select
          v-model="params.industry"
          class="form-select"
        >
          <option
            v-for="(industry, key) in meta.industries"
            :key="key"
            :value="industry"
          >
            {{ $t(`meta.industries.${industry}`) }}
          </option>
        </select>
      </div>
      <div
        class="form-group"
        :class="{ 'has-error': $v.params.country.$error || companyErrors.country }"
      >
        <label class="form-label">{{ $t('label.country') }}</label>
        <input
          v-model="$v.params.country.$model"
          class="form-input"
          type="text"
        >
        <p
          v-if="$v.params.country.$error && !companyErrors.country"
          class="form-input-hint"
        >
          {{ $t('validation.required', { name: $t('label.country') }) }}
        </p>
        <p
          v-if="companyErrors.country"
          class="form-input-hint"
        >
          {{ $t('label.country') }} {{ companyErrors.country[0] }}
        </p>
      </div>
      <div
        class="form-group"
        :class="{ 'has-error': $v.params.address.$error || companyErrors.address }"
      >
        <label class="form-label">{{ $t('label.address') }}</label>
        <input
          v-model="$v.params.address.$model"
          class="form-input"
          type="text"
        >
        <p
          v-if="$v.params.address.$error && !companyErrors.address"
          class="form-input-hint"
        >
          {{ $t('validation.required', { name: $t('label.address') }) }}
        </p>
        <p
          v-if="companyErrors.address"
          class="form-input-hint"
        >
          {{ $t('label.address') }} {{ companyErrors.address[0] }}
        </p>
      </div>
      <div
        class="form-group"
        :class="{ 'has-error': $v.params.phone_number.$error || companyErrors.phone_number }"
      >
        <label class="form-label">{{ $t('label.phoneNum') }}</label>
        <input
          v-model="$v.params.phone_number.$model"
          class="form-input"
          type="text"
        >
        <p
          v-if="$v.params.phone_number.$anyError && !companyErrors.phone_number"
          class="form-input-hint"
        >
          <span v-if="!$v.params.phone_number.required">{{ $t('validation.required', { name: $t('label.phoneNum') }) }}</span>
          <span v-else-if="!$v.params.phone_number.isValid">{{ $t('validation.invalid', { name: $t('label.phoneNum') }) }}</span>
        </p>
        <p
          v-if="companyErrors.phone_number"
          class="form-input-hint"
        >
          {{ $t('label.phoneNum') }} {{ companyErrors.phone_number[0] }}
        </p>
      </div>
      <div class="form-group">
        <label class="form-label">{{ $t('label.postalCode') }}</label>
        <input
          v-model="params.postal_code"
          class="form-input"
          type="text"
        >
      </div>
      <div class="form-group">
        <label class="form-label">{{ $t('label.taxCode') }}</label>
        <input
          v-model="params.tax_code"
          class="form-input"
          type="text"
        >
      </div>
      <div
        class="form-group"
        :class="{ 'has-error': companyErrors.timezone }"
      >
        <label class="form-label">{{ $t('label.timezone') }}</label>
        <select
          v-model="params.timezone"
          class="form-select"
        >
          <option
            v-for="(timezone, key) in meta.timezones"
            :key="key"
            :value="timezone"
          >
            {{ timezone }}
          </option>
        </select>
        <p
          v-if="companyErrors.timezone"
          class="form-input-hint"
        >
          {{ $t('label.timezone') }} {{ companyErrors.timezone[0] }}
        </p>
      </div>
      <div
        class="form-group"
        :class="{ 'has-error': $v.params.monthly_report.$error || companyErrors.monthly_report }"
      >
        <label class="form-label">{{ $t('label.reportDay') }}</label>
        <input
          v-model="$v.params.monthly_report.$model"
          class="form-input"
          type="number"
        >
        <p
          v-if="$v.params.monthly_report.$error"
          class="form-input-hint"
        >
          {{ $t('validation.between', { name: $t('label.reportDay'), min: 1, max: 31 }) }}
        </p>
      </div>
      <div
        class="form-group"
        :class="{ 'has-error': companyErrors.punch_method }"
      >
        <label class="form-label">{{ $t('label.punchMethod') }}</label>
        <label class="form-radio">
          <input
            v-model="params.punch_method"
            type="radio"
            value="default"
          >
          <i class="form-icon" /> {{ $t('company.punchMethod.default') }}
        </label>
        <label class="form-radio">
          <input
            v-model="params.punch_method"
            type="radio"
            value="qrcode_scan"
          >
          <i class="form-icon" /> {{ $t('company.punchMethod.qrcode') }}
        </label>
      </div>
      <div class="form-group">
        <button
          ref="btnSave"
          type="button"
          class="btn btn-success btn-submit"
          :disabled="isDisable"
          @click="localUpdateCompany"
        >
          {{ $t('button.common.save') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import handleSuccess from '../mixins/handle-success'
import companyProfileValidate from '../validations/company-profile-validate'
import { INITIAL_STATES_CLEAR_COMPANY_ERRORS } from '../store/mutation-types'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {

  mixins: [handleSuccess, companyProfileValidate],
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
        punch_method: 'default',
        monthly_report: 1
      }
    }
  },

  computed: {
    ...mapState('initialStates', ['meta', 'currentCompany', 'companyErrors'])
  },

  created() {
    this[INITIAL_STATES_CLEAR_COMPANY_ERRORS]()

    Object.keys(this.params).forEach(key => {
      if (key !== 'logo') this.params[key] = this.currentCompany[key]
    })
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
        this.handleSuccess({ message: this.$t('messages.company.updateSuccess') })
      })
        .catch(() => { this.isDisable = false })
    }
  }
}
</script>

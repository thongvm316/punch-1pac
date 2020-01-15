<template>
  <div>
    <div class="form-group" :class="{ 'has-error': $v.params.attendance_day.$error || errors.attendance_day }">
      <label class="form-label">{{ $t('annualLeave.labels.annualLeaveDay') }}</label>
      <flat-pickr
        :config="{mode: 'single', locale: flatpickrLocaleMapper[currentUser.language]}"
        class="form-input daterange-picker"
        v-model="$v.params.attendance_day.$model"/>
      <p class="form-input-hint" v-if="$v.params.attendance_day.$error">
        {{ $t('validation.required', { name: $t('annualLeave.labels.annualLeaveDay') }) }}
      </p>
      <p class="form-input-hint" v-if="errors.attendance_day">{{ $t('annualLeave.labels.annualLeaveDay') }} {{ errors.attendance_day[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': $v.params.reason.$error || errors.reason }">
      <label class="form-label">{{ $t('annualLeave.labels.reason') }}</label>
      <textarea class="form-input" v-model="$v.params.reason.$model"></textarea>
      <p class="form-input-hint" v-if="$v.params.reason.$error">
        {{ $t('validation.required', { name: $t('annualLeave.labels.reason') }) }}
      </p>
      <p class="form-input-hint" v-if="errors.reason">{{ $t('annualLeave.labels.reason') }} {{ errors.reason[0] }}</p>
    </div>
    <div class="form-group">
      <button ref="createAnnualLeaveBtn" type="button" class="btn btn-success btn-submit" @click="create()" v-if="!request" :disabled="isDisable">
        {{ $t('annualLeave.submit') }}
      </button>
      <button ref="updateAnnualLeaveBtn" type="button" class="btn btn-success btn-submit" @click="update()" v-if="request" :disabled="isDisable">
        {{ $t('annualLeave.save') }}
      </button>
    </div>
  </div>
</template>

<script>
import flatpickrLocale from '../mixins/flatpickr-locale'
import handleSuccess from '../mixins/handle-success'
import axios from 'axios'
import { isEqual } from 'underscore'
import annualLeaveValidate from '../validations/annual-leave-validate'
const flatPickr = () => import('vue-flatpickr-component')

export default {
  name: 'annual-leave',

  data() {
    return {
      errors: {},
      params: {
        attendance_day: '',
        reason: ''
      },
      data: {
        emitType: 'finishRequest',
        message: ''
      }
    }
  },

  mixins: [flatpickrLocale, handleSuccess, annualLeaveValidate],

  props: {
    request: Object,
    type: String,
    annualDay: String
  },

  components: {
    flatPickr
  },

  computed: {
    isDisable() {
      if (this.$v.params.$anyError) return true

      let flag = false
      if (this.request) {
        flag = isEqual(this.params, this.request)
      } else {
        flag = isEqual(this.params, { attendance_day: '', reason: '' })
      }

      return flag
    }
  },

  methods: {
    create() {
      this.isDisable = true
      axios
        .post('/requests', Object.assign(this.params, { kind: 'annual_leave' }))
        .then(response => {
          this.data.message = this.$t('annualLeave.createSuccessMsg')
          this.handleSuccess(this.data)
        })
        .catch(error => {
          this.isDisable = false
          if (error.response && error.response.status === 422) this.errors = error.response.data.errors
        })
    },

    update() {
      this.isDisable = true
      axios
        .put(`/requests/${this.request.id}`, Object.assign(this.params, { kind: 'annual_leave' }))
        .then(response => {
          this.data.message = this.$t('annualLeave.updateSuccessMsg')
          this.handleSuccess(this.data)
        })
        .catch(error => {
          this.isDisable = false
          if (error.response && error.response.status === 422) this.errors = error.response.data.errors
        })
    }
  },

  created() {
    if (this.request) this.params = { ...this.request }
    if (this.annualDay) this.params.attendance_day = this.annualDay
  }
}
</script>

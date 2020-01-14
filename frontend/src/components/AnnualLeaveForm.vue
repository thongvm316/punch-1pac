<template>
  <div>
    <div class="form-group" :class="{ 'has-error': errors.attendance_day }">
      <label class="form-label">{{ $t('annualLeave.labels.annualLeaveDay') }}</label>
      <flat-pickr
        :config="{mode: 'single', locale: flatpickrLocaleMapper[currentUser.language]}"
        class="form-input daterange-picker"
        v-model="params.attendance_day"/>
      <p class="form-input-hint" v-if="errors.attendance_day">{{ $t('annualLeave.labels.annualLeaveDay') }} {{ errors.attendance_day[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': errors.reason }">
      <label class="form-label">{{ $t('annualLeave.labels.reason') }}</label>
      <textarea class="form-input" v-model="params.reason"></textarea>
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
const flatPickr = () => import('vue-flatpickr-component')

export default {
  name: 'annual-leave',

  data() {
    return {
      isDisable: false,
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

  mixins: [flatpickrLocale, handleSuccess],

  props: {
    request: Object,
    type: String,
    annualDay: String
  },

  components: {
    flatPickr
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

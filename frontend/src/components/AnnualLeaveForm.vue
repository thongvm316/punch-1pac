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
import flatPickr from 'vue-flatpickr-component'
import flatpickrLocale from '../mixins/flatpickr-locale'
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  name: 'annual-leave',

  data() {
    return {
      isDisable: false,
      errors: {},
      params: {
        attendance_day: '',
        reason: ''
      }
    }
  },

  props: {
    request: Object,
    type: String,
    annualDay: String
  },

  components: {
    flatPickr
  },

  methods: {
    ...mapActions('flash', ['setFlashMsg']),

    create() {
      this.isDisable = true
      axios
        .post('/requests', Object.assign(this.params, { kind: 'annual_leave' }))
        .then(response => {
          this.setFlashMsg({ message: this.$t('annualLeave.createSuccessMsg') })
          this.$emit('finishRequest')
          this.isDisable = false
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
          this.setFlashMsg({ message: this.$t('annualLeave.updateSuccessMsg') })
          this.$emit('finishRequest')
          this.isDisable = false
        })
        .catch(error => {
          this.isDisable = false
          if (error.response && error.response.status === 422) this.errors = error.response.data.errors
        })
    }
  },

  mixins: [flatpickrLocale],

  created() {
    if (this.request) {
      Object.keys(this.params).forEach(key => {
        this.params[key] = this.request[key]
      })
    }

    if (this.annualDay) {
      this.params.attendance_day = this.annualDay
    }
  }
}
</script>

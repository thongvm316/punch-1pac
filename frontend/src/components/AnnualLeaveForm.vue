<template>
  <div>
    <div class="form-group" :class="{ 'has-error': errors.annual_leave_day }">
      <label class="form-label">{{ $t('annualLeave.labels.annualLeaveDay') }}</label>
      <flat-pickr
        :config="{mode: 'single', locale: flatpickrLocaleMapper[currentUser.language]}"
        class="form-input daterange-picker"
        v-model="params.annual_leave_day"/>
      <p class="form-input-hint" v-if="errors.annual_leave_day">{{ $t('annualLeave.labels.annualLeaveDay') }} {{ errors.annual_leave_day[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': errors.reason }">
      <label class="form-label">{{ $t('annualLeave.labels.reason') }}</label>
      <textarea class="form-input" v-model="params.reason"></textarea>
      <p class="form-input-hint" v-if="errors.reason">{{ $t('annualLeave.labels.reason') }} {{ errors.reason[0] }}</p>
    </div>
    <div class="form-group">
      <button type="button" class="btn btn-success btn-submit" @click="create()" v-if="!request">
        {{ $t('annualLeave.submit') }}
      </button>
      <button type="button" class="btn btn-success btn-submit" @click="update()" v-if="request">
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

  data () {
    return {
      errors: {},
      params: {
        annual_leave_day: '',
        reason: ''
      }
    }
  },

  props: ['request', 'type'],

  components: {
    flatPickr
  },

  methods: {
    ...mapActions('flash', [
      'setFlashMsg'
    ]),

    create () {
      axios.post('/requests', Object.assign(this.params, { kind: 'annual_leave' }))
           .then(response => {
             this.setFlashMsg(this.$t('annualLeave.createSuccessMsg'))
             this.$emit('finishRequest')
           })
           .catch(error => {
             if (error.response && error.response.status === 422) this.errors = error.response.data.errors
           })
    },

    update () {
      axios.put(`/requests/${this.request.id}`, Object.assign(this.params, { kind: 'annual_leave' }))
           .then(response => {
             this.setFlashMsg(this.$t('annualLeave.updateSuccessMsg'))
             this.$emit('finishRequest')
           })
           .catch(error => {
             if (error.response && error.response.status === 422) this.errors = error.response.data.errors
           })
    }
  },

  mixins: [flatpickrLocale],

  created () {
    if (this.request) {
      Object.keys(this.params).forEach(key => { this.params[key] = this.request[key] })
    }
  }
}
</script>

<template>
  <div>
    <div class="form-group">
      <label class="form-label">{{ $t('attendances.labels.date') }}</label>
      <flat-pickr
        :config="{ enable: [day], locale: flatpickrLocaleMapper[currentUser.language] }"
        class="form-input daterange-picker"
        v-model="day"/>
    </div>
    <div class="form-group" :class="{ 'has-error': errors.attended_at }">
      <label class="form-label">{{ $t('attendances.labels.attendedAt') }}</label>
      <input type="time" step="60" class="form-input" v-model="params.attended_at">
      <p class="form-input-hint" v-if="errors.attended_at">{{ $t('attendances.labels.attendedAt') }} {{ errors.attended_at[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': errors.left_at }">
      <label class="form-label">{{ $t('attendances.labels.leftAt') }}</label>
      <input type="time" step="60" class="form-input" v-model="params.left_at">
      <p class="form-input-hint" v-if="errors.left_at">{{ $t('attendances.labels.leftAt') }} {{ errors.left_at[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': errors.reason }">
      <label class="form-label">{{ $t('attendances.labels.reason') }}</label>
      <textarea class="form-input" v-model="params.reason"></textarea>
      <p class="form-input-hint" v-if="errors.reason">{{ $t('attendances.labels.reason') }} {{ errors.reason[0] }}</p>
    </div>
    <div class="form-group">
      <button type="button" class="btn btn-success btn-submit" @click="localAddRequest" v-if="attendance">{{ $t('attendances.btn.add') }}</button>
      <button type="button" class="btn btn-success btn-submit" @click="localEditRequest" v-else>{{ $t('requests.btn.save') }}</button>
    </div>
  </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import flatpickrLocale from '../mixins/flatpickr-locale'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'request-form',

  mixins: [flatpickrLocale],

  props: ['attendance', 'request'],

  data() {
    return {
      day: '',
      params: {
        attendance_day: '',
        attended_at: '',
        left_at: '',
        reason: ''
      }
    }
  },

  components: {
    flatPickr
  },

  computed: {
    ...mapState('requests', ['errors'])
  },

  methods: {
    ...mapActions('requests', ['addRequest', 'updateRequest', 'clearRequestErrors']),

    ...mapActions('flash', ['setFlashMsg']),

    localAddRequest() {
      this.addRequest(this.params).then(response => {
        this.setFlashMsg({ message: this.$t('messages.request.createSuccess') })
        this.$emit('afterModify')
      })
    },

    localEditRequest() {
      this.updateRequest({ id: this.request.id, params: this.params }).then(response => {
        this.setFlashMsg({ message: this.$t('messages.request.updateSuccess') })
        this.$emit('afterModify')
      })
    }
  },

  created() {
    this.clearRequestErrors()
    if (this.attendance) {
      this.day = this.params.attendance_day = this.attendance.day
      const statuses = ['attended_at', 'left_at']
      statuses.forEach(key => {
        this.params[key] = this.attendance[key]
      })
    } else if (this.request) {
      this.day = this.request.attendance_day
      Object.keys(this.params).forEach(key => {
        this.params[key] = this.request[key]
      })
    }
  }
}
</script>

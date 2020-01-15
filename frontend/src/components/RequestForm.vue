<template>
  <div>
    <div class="form-group" :class="{ 'has-error': $v.day.$error }">
      <label class="form-label">{{ $t('attendances.labels.date') }}</label>
      <flat-pickr
        :config="{ enable: [day], locale: flatpickrLocaleMapper[currentUser.language] }"
        class="form-input daterange-picker"
        v-model="$v.day.$model"/>
      <p class="form-input-hint" v-if="$v.day.$error">
        {{ $t('validation.required', { name: $t('attendances.labels.date') }) }}
      </p>
    </div>
    <div class="form-group" :class="{ 'has-error': $v.params.attended_at.$error || errors.attended_at }">
      <label class="form-label">{{ $t('attendances.labels.attendedAt') }}</label>
      <input type="time" step="60" class="form-input" v-model="$v.params.attended_at.$model">
      <p class="form-input-hint" v-if="$v.params.attended_at.$error && !errors.attended_at">
        {{ $t('validation.required', { name: $t('attendances.labels.attendedAt') }) }}
      </p>
      <p class="form-input-hint" v-if="errors.attended_at">{{ $t('attendances.labels.attendedAt') }} {{ errors.attended_at[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': $v.params.left_at.$error || errors.left_at }">
      <label class="form-label">{{ $t('attendances.labels.leftAt') }}</label>
      <input type="time" step="60" class="form-input" v-model="$v.params.left_at.$model">
      <p class="form-input-hint" v-if="$v.params.left_at.$error && !errors.left_at">
        {{ $t('validation.required', { name: $t('attendances.labels.leftAt') }) }}
      </p>
      <p class="form-input-hint" v-if="errors.left_at">{{ $t('attendances.labels.leftAt') }} {{ errors.left_at[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': $v.params.reason.$error || errors.reason }">
      <label class="form-label">{{ $t('attendances.labels.reason') }}</label>
      <textarea class="form-input" v-model="$v.params.reason.$model"></textarea>
      <p class="form-input-hint" v-if="$v.params.reason.$error && !errors.reason">
        {{ $t('validation.required', { name: $t('attendances.labels.reason') }) }}
      </p>
      <p class="form-input-hint" v-if="errors.reason">{{ $t('attendances.labels.reason') }} {{ errors.reason[0] }}</p>
    </div>
    <div class="form-group">
      <button ref="localAddRequestButton" type="button" class="btn btn-success btn-submit" @click="localAddRequest" v-if="attendance" :disabled="isDisabled">{{ $t('attendances.btn.add') }}</button>
      <button ref="localEditRequestButton" type="button" class="btn btn-success btn-submit" @click="localEditRequest" v-else :disabled="isDisabled">{{ $t('requests.btn.save') }}</button>
    </div>
  </div>
</template>

<script>
import flatpickrLocale from '../mixins/flatpickr-locale'
import handleSuccess from '../mixins/handle-success'
import requestFormValidate from '../validations/request-form-valiate'
import { CLEAR_REQUEST_ERRORS } from '../store/mutation-types'
import { mapState, mapActions, mapMutations } from 'vuex'
import { isEmpty, isEqual } from 'underscore'
const flatPickr = () => import('vue-flatpickr-component')

export default {
  name: 'request-form',

  mixins: [flatpickrLocale, handleSuccess, requestFormValidate],

  props: {
    attendance: Object,
    request: Object
  },

  data() {
    return {
      day: '',
      params: {
        attendance_day: '',
        attended_at: '',
        left_at: '',
        reason: ''
      },
      data: {
        emitType: 'afterModify',
        message: ''
      }
    }
  },

  components: {
    flatPickr
  },

  computed: {
    ...mapState('requests', ['errors']),

    isDisabled() {
      if (this.$v.params.$anyError) return true

      let flag = false
      if (this.request) {
        flag = this.day === this.request.attendance_day && isEqual(this.params, this.request)
      } else if (this.attendance) {
        let emtyParams = {
          attendance_day: this.attendance.day,
          attended_at: '',
          left_at: '',
          reason: ''
        }

        flag = (this.day === '' || this.day === this.attendance.day) && isEqual(this.params, emtyParams)
      }

      return flag
    }
  },

  methods: {
    ...mapActions('requests', ['addRequest', 'updateRequest']),

    ...mapMutations('requests', [CLEAR_REQUEST_ERRORS]),

    localAddRequest() {
      this.addRequest(this.params).then(response => {
        this.data.message = this.$t('messages.request.createSuccess')
        this.handleSuccess(this.data)
      })
    },

    localEditRequest() {
      this.updateRequest({ id: this.request.id, params: this.params }).then(response => {
        this.data.message = this.$t('messages.request.updateSuccess')
        this.handleSuccess(this.data)
      })
    }
  },

  created() {
    if (!isEmpty(this.errors)) this[CLEAR_REQUEST_ERRORS]()

    if (this.attendance) {
      this.day = this.params.attendance_day = this.attendance.day
      const statuses = ['attended_at', 'left_at']
      statuses.forEach(key => {
        this.params[key] = this.attendance[key]
      })
    } else if (this.request) {
      this.day = this.request.attendance_day
      this.params = { ...this.request }
    }
  }
}
</script>

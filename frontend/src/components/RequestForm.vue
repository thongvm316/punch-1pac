<template>
  <div>
    <div
      class="form-group"
      :class="{ 'has-error': $v.day.$error }"
    >
      <label class="form-label">{{ $t('label.date') }}</label>
      <flat-pickr
        v-model="$v.day.$model"
        :config="{ enable: [day], locale: flatpickrLocaleMapper[pickrLocale] }"
        class="form-input daterange-picker"
      />
      <p
        v-if="$v.day.$error"
        class="form-input-hint"
      >
        {{ $t('validation.required', { name: $t('label.date') }) }}
      </p>
    </div>
    <div
      class="form-group"
      :class="{ 'has-error': $v.params.attended_at.$error || errors.attended_at }"
    >
      <label class="form-label">{{ $t('label.attendedAt') }}</label>
      <flatPickr
        v-model="$v.params.attended_at.$model"
        class="form-input time-picker"
        :config="{
          enableTime: true,
          noCalendar: true,
          dateFormat: 'H:i',
          time_24hr: true}"
      />
      <p
        v-if="$v.params.attended_at.$error && !errors.attended_at"
        class="form-input-hint"
      >
        {{ $t('validation.required', { name: $t('label.attendedAt') }) }}
      </p>
      <p
        v-if="errors.attended_at"
        class="form-input-hint"
      >
        {{ $t('label.attendedAt') }} {{ errors.attended_at[0] }}
      </p>
    </div>
    <div
      class="form-group"
      :class="{ 'has-error': $v.params.left_at.$error || errors.left_at }"
    >
      <label class="form-label">{{ $t('label.leftAt') }}</label>
      <flatPickr
        v-model="$v.params.left_at.$model"
        class="form-input time-picker"
        :config="{
          enableTime: true,
          noCalendar: true,
          dateFormat: 'H:i',
          time_24hr: true}"
      />
      <p
        v-if="$v.params.left_at.$error && !errors.left_at"
        class="form-input-hint"
      >
        {{ $t('validation.required', { name: $t('label.leftAt') }) }}
      </p>
      <p
        v-if="errors.left_at"
        class="form-input-hint"
      >
        {{ $t('label.leftAt') }} {{ errors.left_at[0] }}
      </p>
    </div>
    <div
      class="form-group"
      :class="{ 'has-error': $v.params.reason.$error || errors.reason }"
    >
      <label class="form-label">{{ $t('label.reason') }}</label>
      <textarea
        v-model="$v.params.reason.$model"
        class="form-input"
      />
      <p
        v-if="$v.params.reason.$error && !errors.reason"
        class="form-input-hint"
      >
        {{ $t('validation.required', { name: $t('label.reason') }) }}
      </p>
      <p
        v-if="errors.reason"
        class="form-input-hint"
      >
        {{ $t('label.reason') }} {{ errors.reason[0] }}
      </p>
    </div>
    <div class="form-group">
      <button
        v-if="attendance"
        ref="localAddRequestButton"
        type="button"
        class="btn btn-success btn-submit"
        :disabled="isDisabled"
        @click="localAddRequest"
      >
        {{ $t('button.common.add') }}
      </button>
      <button
        v-else
        ref="localEditRequestButton"
        type="button"
        class="btn btn-success btn-submit"
        :disabled="isDisabled"
        @click="localEditRequest"
      >
        {{ $t('button.common.save') }}
      </button>
    </div>
  </div>
</template>

<script>
import flatpickrLocale from '../mixins/flatpickr-locale'
import handleSuccess from '../mixins/handle-success'
import requestFormValidate from '../validations/request-form-valiate'
import { CLEAR_REQUEST_ERRORS } from '../store/mutation-types'
import { mapState, mapActions, mapMutations } from 'vuex'
import { isEmpty } from 'underscore'
const flatPickr = () => import('vue-flatpickr-component')

export default {
  name: 'RequestForm',

  components: {
    flatPickr
  },

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
      }
    }
  },

  computed: {
    ...mapState('requests', ['errors'])
  },

  methods: {
    ...mapActions('requests', ['addRequest', 'updateRequest']),

    ...mapMutations('requests', [CLEAR_REQUEST_ERRORS]),

    localAddRequest() {
      this.addRequest(this.params).then(response => {
        this.handleSuccess({
          emitType: 'afterModify',
          message: this.$t('messages.request.createSuccess')
        })
      })
    },

    localEditRequest() {
      this.updateRequest({ id: this.request.id, params: this.params }).then(response => {
        this.handleSuccess({
          emitType: 'afterModify',
          message: this.$t('messages.request.updateSuccess')
        })
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

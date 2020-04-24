<template>
  <div>
    <div
      class="form-group"
      :class="{ 'has-error': $v.params.attendance_day.$error || errors.attendance_day }"
    >
      <label class="form-label">{{ $t('label.annualLeaveDay') }}</label>
      <flat-pickr
        v-model="$v.params.attendance_day.$model"
        :config="{mode: 'single', locale: flatpickrLocaleMapper[pickrLocale]}"
        class="form-input daterange-picker"
      />
      <p
        v-if="$v.params.attendance_day.$error"
        class="form-input-hint"
      >
        {{ $t('validation.required', { name: $t('label.annualLeaveDay') }) }}
      </p>
      <p
        v-if="errors.attendance_day"
        class="form-input-hint"
      >
        {{ $t('label.annualLeaveDay') }} {{ errors.attendance_day[0] }}
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
        v-if="$v.params.reason.$error"
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
        v-if="!request"
        ref="createAnnualLeaveBtn"
        type="button"
        class="btn btn-success btn-submit"
        :disabled="isDisable"
        @click="create()"
      >
        {{ $t('button.common.submit') }}
      </button>
      <button
        v-if="request"
        ref="updateAnnualLeaveBtn"
        type="button"
        class="btn btn-success btn-submit"
        :disabled="isDisable"
        @click="update()"
      >
        {{ $t('button.common.save') }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import flatpickrLocale from '@/mixins/flatpickr-locale'
import handleSuccess from '@/mixins/handle-success'
import annualLeaveValidate from '@/validations/annual-leave-validate'
import { CLEAR_REQUEST_ERRORS } from '@/store/mutation-types'
const flatPickr = () => import('vue-flatpickr-component')

export default {
  name: 'AnnualLeaveForm',

  components: {
    flatPickr
  },

  mixins: [flatpickrLocale, handleSuccess, annualLeaveValidate],

  props: {
    request: {
      type: Object,
      default: null
    },

    type: {
      type: String,
      default: ''
    },

    annualDay: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      params: {
        attendance_day: '',
        reason: ''
      }
    }
  },

  computed: {
    ...mapState('requests', ['errors']),

    dataRequest() {
      return Object.assign(this.params, { kind: 'annual_leave' })
    }
  },

  created() {
    if (this.request) this.params = { ...this.request }
    if (this.annualDay) this.params.attendance_day = this.annualDay
  },

  methods: {
    ...mapMutations('requests', ['CLEAR_REQUEST_ERRORS']),
    ...mapActions('requests', ['addRequest', 'updateRequest']),

    create() {
      this.addRequest(this.dataRequest)
        .then(response => {
          this.handleSuccess({
            emitType: 'finishRequest',
            message: this.$t('messages.request.createSuccess')
          })

          this[CLEAR_REQUEST_ERRORS]()
        })
    },

    update() {
      const request = {
        id: this.request.id,
        params: this.dataRequest
      }

      this.updateRequest(request)
        .then(response => {
          this.handleSuccess({
            emitType: 'finishRequest',
            message: this.$t('messages.request.updateSuccess')
          })

          this[CLEAR_REQUEST_ERRORS]()
        })
    }
  }
}
</script>

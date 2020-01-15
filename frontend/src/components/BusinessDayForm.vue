<template>
  <div>
    <div class="form-group" :class="{ 'has-error': $v.params.weekday.$error || errors.weekday }">
      <label class="form-label">{{ $t('company.businessDays.labels.weekday') }}</label>
      <select class="form-select" v-model="$v.params.weekday.$model">
        <option value="">{{ $t('company.businessDays.placeholder.chooseWeekday') }}</option>
        <option :value="weekday" v-for="(weekday, key) in meta.weekdays" :key="key">{{ $t(`meta.weekdays.${weekday}`) }}</option>
      </select>
      <p class="form-input-hint" v-if="$v.params.weekday.$error">
        {{ $t('validation.required', { name: $t('company.businessDays.labels.weekday') }) }}
      </p>
      <p class="form-input-hint" v-if="errors.weekday">{{ $t('company.businessDays.labels.weekday') }} {{ errors.weekday[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': $v.params.morning_started_at.$error || errors.morning_started_at }">
      <label class="form-label">{{ $t('company.businessDays.labels.morningStartAt') }}</label>
      <input class="form-input" type="time" step="300" v-model="$v.params.morning_started_at.$model">
      <p class="form-input-hint" v-if="$v.params.morning_started_at.$error">
        {{ $t('validation.required', { name: $t('company.businessDays.labels.morningStartAt') }) }}
      </p>
      <p class="form-input-hint" v-if="errors.morning_started_at">{{ $t('company.businessDays.labels.morningStartAt') }} {{ errors.morning_started_at[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': $v.params.morning_ended_at.$error || errors.morning_ended_at }">
      <label class="form-label">{{ $t('company.businessDays.labels.morningEndAt') }}</label>
      <input class="form-input" type="time" step="300" v-model="$v.params.morning_ended_at.$model">
      <p class="form-input-hint" v-if="$v.params.morning_ended_at.$error">
        {{ $t('validation.required', { name: $t('company.businessDays.labels.morningEndAt') }) }}
      </p>
      <p class="form-input-hint" v-if="errors.morning_ended_at">{{ $t('company.businessDays.labels.morningEndAt') }} {{ errors.morning_ended_at[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': $v.params.afternoon_started_at.$error || errors.afternoon_started_at }">
      <label class="form-label">{{ $t('company.businessDays.labels.afternoonStartAt') }}</label>
      <input class="form-input" type="time" step="300" v-model="$v.params.afternoon_started_at.$model">
      <p class="form-input-hint" v-if="$v.params.afternoon_started_at.$error">
        {{ $t('validation.required', { name: $t('company.businessDays.labels.afternoonStartAt') }) }}
      </p>
      <p class="form-input-hint" v-if="errors.afternoon_started_at">{{ $t('company.businessDays.labels.afternoonStartAt') }} {{ errors.afternoon_started_at[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': $v.params.afternoon_ended_at.$error || errors.afternoon_ended_at }">
      <label class="form-label">{{ $t('company.businessDays.labels.afternoonEndAt') }}</label>
      <input class="form-input" type="time" step="300" v-model="$v.params.afternoon_ended_at.$model">
      <p class="form-input-hint" v-if="$v.params.afternoon_ended_at.$error">
        {{ $t('validation.required', { name: $t('company.businessDays.labels.afternoonEndAt') }) }}
      </p>
      <p class="form-input-hint" v-if="errors.afternoon_ended_at">{{ $t('company.businessDays.labels.afternoonEndAt') }} {{ errors.afternoon_ended_at[0] }}</p>
    </div>
    <div class="form-group">
      <button
        ref="createBusinessDayButton"
        type="button"
        class="btn btn-success btn-submit"
        v-if="!targetBusinessDay"
        @click="localAddBusinessDay"
        :disabled="isDisabled">
        {{ $t('company.businessDays.btn.submit') }}
      </button>
      <button
        ref="editBusinessDayButton"
        type="button"
        class="btn btn-success btn-submit"
        v-if="targetBusinessDay"
        @click="localEditBusinessDay"
        :disabled="isDisabled">
        {{ $t('company.businessDays.btn.save') }}
      </button>
    </div>
  </div>
</template>

<script>
import { CLEAR_BUSINESS_DAY_ERRORS } from '../store/mutation-types'
import { mapState, mapActions, mapMutations } from 'vuex'
import { isEmpty, isEqual } from 'underscore'
import handleSuccess from '../mixins/handle-success'
import businessDayValidate from '../validations/business-day-validate'

export default {
  name: 'business-day-form',

  mixins: [handleSuccess, businessDayValidate],

  props: {
    targetBusinessDay: Object
  },

  data() {
    return {
      params: {
        weekday: '',
        morning_started_at: '',
        morning_ended_at: '',
        afternoon_started_at: '',
        afternoon_ended_at: ''
      },
      data: {
        emitType: 'afterModify',
        message: ''
      }
    }
  },

  methods: {
    ...mapActions('companyBusinessDays', ['addBusinessDay', 'updateBusinessDay']),

    ...mapMutations('companyBusinessDays', [CLEAR_BUSINESS_DAY_ERRORS]),

    localAddBusinessDay() {
      this.addBusinessDay(this.params).then(response => {
        this.data.message = this.$t('messages.businessDay.createSuccess')
        this.handleSuccess(this.data)
      })
    },

    localEditBusinessDay() {
      this.updateBusinessDay({ businessDayId: this.targetBusinessDay.id, updateParams: this.params }).then(response => {
        this.data.message = this.$t('messages.businessDay.updateSuccess')
        this.handleSuccess(this.data)
      })
    }
  },

  computed: {
    ...mapState('initialStates', ['meta']),

    ...mapState('companyBusinessDays', ['errors']),

    isDisabled() {
      if (this.$v.params.$anyError) return true

      let flag = false
      if (this.targetBusinessDay) {
        flag = isEqual(this.params, this.targetBusinessDay)
      } else {
        const emptyParams = {
          weekday: '',
          morning_started_at: '',
          morning_ended_at: '',
          afternoon_started_at: '',
          afternoon_ended_at: ''
        }

        flag = isEqual(this.params, emptyParams)
      }
      return flag
    }
  },

  created() {
    if (!isEmpty(this.errors)) this[CLEAR_BUSINESS_DAY_ERRORS]()
    if (this.targetBusinessDay) this.params = { ...this.targetBusinessDay }
  }
}
</script>

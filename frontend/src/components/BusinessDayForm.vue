<template>
  <div>
    <div class="form-group" :class="{ 'has-error': $v.params.weekday.$error || errors.weekday }">
      <label class="form-label">{{ $t('label.weekday') }}</label>
      <select class="form-select" v-model="$v.params.weekday.$model">
        <option value="">{{ $t('placeholder.chooseWeekday') }}</option>
        <option :value="weekday" v-for="(weekday, key) in meta.weekdays" :key="key">{{ $t(`meta.weekdays.${weekday}`) }}</option>
      </select>
      <p class="form-input-hint" v-if="$v.params.weekday.$error && !errors.weekday">
        {{ $t('validation.required', { name: $t('label.weekday') }) }}
      </p>
      <p class="form-input-hint" v-if="errors.weekday">{{ $t('label.weekday') }} {{ errors.weekday[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': $v.params.morning_started_at.$error || errors.morning_started_at }">
      <label class="form-label">{{ $t('label.morningStartAt') }}</label>
      <flatPickr
        v-model="$v.params.morning_started_at.$model"
        class="form-input time-picker"
        :config="{
          enableTime: true,
          noCalendar: true,
          dateFormat: 'H:i',
          time_24hr: true}" />
      <p class="form-input-hint" v-if="$v.params.morning_started_at.$error && !errors.morning_started_at">
        {{ $t('validation.required', { name: $t('label.morningStartAt') }) }}
      </p>
      <p class="form-input-hint" v-if="errors.morning_started_at">{{ $t('label.morningStartAt') }} {{ errors.morning_started_at[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': $v.params.morning_ended_at.$error || errors.morning_ended_at }">
      <label class="form-label">{{ $t('label.morningEndAt') }}</label>
      <flatPickr
        v-model="$v.params.morning_ended_at.$model"
        class="form-input time-picker"
        :config="{
          enableTime: true,
          noCalendar: true,
          dateFormat: 'H:i',
          time_24hr: true}" />
      <p class="form-input-hint" v-if="$v.params.morning_ended_at.$error && !errors.morning_ended_at">
        {{ $t('validation.required', { name: $t('label.morningEndAt') }) }}
      </p>
      <p class="form-input-hint" v-if="errors.morning_ended_at">{{ $t('label.morningEndAt') }} {{ errors.morning_ended_at[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': $v.params.afternoon_started_at.$error || errors.afternoon_started_at }">
      <label class="form-label">{{ $t('label.afternoonStartAt') }}</label>
      <flatPickr
        v-model="$v.params.afternoon_started_at.$model"
        class="form-input time-picker"
        :config="{
          enableTime: true,
          noCalendar: true,
          dateFormat: 'H:i',
          time_24hr: true}" />
      <p class="form-input-hint" v-if="$v.params.afternoon_started_at.$error && !errors.afternoon_started_at">
        {{ $t('validation.required', { name: $t('label.afternoonStartAt') }) }}
      </p>
      <p class="form-input-hint" v-if="errors.afternoon_started_at">{{ $t('label.afternoonStartAt') }} {{ errors.afternoon_started_at[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': $v.params.afternoon_ended_at.$error || errors.afternoon_ended_at }">
      <label class="form-label">{{ $t('label.afternoonEndAt') }}</label>
      <flatPickr
        v-model="$v.params.afternoon_ended_at.$model"
        class="form-input time-picker"
        :config="{
          enableTime: true,
          noCalendar: true,
          dateFormat: 'H:i',
          time_24hr: true}" />
      <p class="form-input-hint" v-if="$v.params.afternoon_ended_at.$error && !errors.afternoon_ended_at">
        {{ $t('validation.required', { name: $t('label.afternoonEndAt') }) }}
      </p>
      <p class="form-input-hint" v-if="errors.afternoon_ended_at">{{ $t('label.afternoonEndAt') }} {{ errors.afternoon_ended_at[0] }}</p>
    </div>
    <div class="form-group">
      <button
        ref="createBusinessDayButton"
        type="button"
        class="btn btn-success btn-submit"
        v-if="!targetBusinessDay"
        @click="localAddBusinessDay"
        :disabled="isDisabled">
        {{ $t('button.common.submit') }}
      </button>
      <button
        ref="editBusinessDayButton"
        type="button"
        class="btn btn-success btn-submit"
        v-if="targetBusinessDay"
        @click="localEditBusinessDay"
        :disabled="isDisabled">
        {{ $t('button.common.save') }}
      </button>
    </div>
  </div>
</template>

<script>
import { CLEAR_BUSINESS_DAY_ERRORS } from '../store/mutation-types'
import { mapState, mapActions, mapMutations } from 'vuex'
import { isEmpty } from 'underscore'
import handleSuccess from '../mixins/handle-success'
import businessDayValidate from '../validations/business-day-validate'
const flatPickr = () => import('vue-flatpickr-component')

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
        morning_started_at: '08:00',
        morning_ended_at: '12:00',
        afternoon_started_at: '13:30',
        afternoon_ended_at: '17:30'
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

    ...mapState('companyBusinessDays', ['errors'])
  },

  created() {
    if (!isEmpty(this.errors)) this[CLEAR_BUSINESS_DAY_ERRORS]()
    if (this.targetBusinessDay) this.params = { ...this.targetBusinessDay }
  }
}
</script>

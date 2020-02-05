<template>
  <div>
    <div
      class="form-group"
      :class="{ 'has-error': $v.params.weekday.$error || errors.weekday }"
    >
      <label class="form-label">{{ $t('label.weekday') }}</label>
      <select
        v-model="$v.params.weekday.$model"
        class="form-select"
      >
        <option value="">
          {{ $t('placeholder.chooseWeekday') }}
        </option>
        <option
          v-for="(weekday, key) in meta.weekdays"
          :key="key"
          :value="weekday"
        >
          {{ $t(`meta.weekdays.${weekday}`) }}
        </option>
      </select>
      <p
        v-if="$v.params.weekday.$error && !errors.weekday"
        class="form-input-hint"
      >
        {{ $t('validation.required', { name: $t('label.weekday') }) }}
      </p>
      <p
        v-if="errors.weekday"
        class="form-input-hint"
      >
        {{ $t('label.weekday') }} {{ errors.weekday[0] }}
      </p>
    </div>
    <div
      class="form-group"
      :class="{ 'has-error': $v.params.morning_started_at.$error || errors.morning_started_at }"
    >
      <label class="form-label">{{ $t('label.morningStartAt') }}</label>
      <flatPickr
        v-model="$v.params.morning_started_at.$model"
        class="form-input time-picker"
        :config="{
          enableTime: true,
          noCalendar: true,
          dateFormat: 'H:i',
          time_24hr: true}"
      />
      <p
        v-if="$v.params.morning_started_at.$error && !errors.morning_started_at"
        class="form-input-hint"
      >
        {{ $t('validation.required', { name: $t('label.morningStartAt') }) }}
      </p>
      <p
        v-if="errors.morning_started_at"
        class="form-input-hint"
      >
        {{ $t('label.morningStartAt') }} {{ errors.morning_started_at[0] }}
      </p>
    </div>
    <div
      class="form-group"
      :class="{ 'has-error': $v.params.morning_ended_at.$error || errors.morning_ended_at }"
    >
      <label class="form-label">{{ $t('label.morningEndAt') }}</label>
      <flatPickr
        v-model="$v.params.morning_ended_at.$model"
        class="form-input time-picker"
        :config="{
          enableTime: true,
          noCalendar: true,
          dateFormat: 'H:i',
          time_24hr: true}"
      />
      <p
        v-if="$v.params.morning_ended_at.$error && !errors.morning_ended_at"
        class="form-input-hint"
      >
        {{ $t('validation.required', { name: $t('label.morningEndAt') }) }}
      </p>
      <p
        v-if="errors.morning_ended_at"
        class="form-input-hint"
      >
        {{ $t('label.morningEndAt') }} {{ errors.morning_ended_at[0] }}
      </p>
    </div>
    <div
      class="form-group"
      :class="{ 'has-error': $v.params.afternoon_started_at.$error || errors.afternoon_started_at }"
    >
      <label class="form-label">{{ $t('label.afternoonStartAt') }}</label>
      <flatPickr
        v-model="$v.params.afternoon_started_at.$model"
        class="form-input time-picker"
        :config="{
          enableTime: true,
          noCalendar: true,
          dateFormat: 'H:i',
          time_24hr: true}"
      />
      <p
        v-if="$v.params.afternoon_started_at.$error && !errors.afternoon_started_at"
        class="form-input-hint"
      >
        {{ $t('validation.required', { name: $t('label.afternoonStartAt') }) }}
      </p>
      <p
        v-if="errors.afternoon_started_at"
        class="form-input-hint"
      >
        {{ $t('label.afternoonStartAt') }} {{ errors.afternoon_started_at[0] }}
      </p>
    </div>
    <div
      class="form-group"
      :class="{ 'has-error': $v.params.afternoon_ended_at.$error || errors.afternoon_ended_at }"
    >
      <label class="form-label">{{ $t('label.afternoonEndAt') }}</label>
      <flatPickr
        v-model="$v.params.afternoon_ended_at.$model"
        class="form-input time-picker"
        :config="{
          enableTime: true,
          noCalendar: true,
          dateFormat: 'H:i',
          time_24hr: true}"
      />
      <p
        v-if="$v.params.afternoon_ended_at.$error && !errors.afternoon_ended_at"
        class="form-input-hint"
      >
        {{ $t('validation.required', { name: $t('label.afternoonEndAt') }) }}
      </p>
      <p
        v-if="errors.afternoon_ended_at"
        class="form-input-hint"
      >
        {{ $t('label.afternoonEndAt') }} {{ errors.afternoon_ended_at[0] }}
      </p>
    </div>
    <div class="form-group">
      <button
        v-if="!targetBusinessDay"
        ref="createBusinessDayButton"
        type="button"
        class="btn btn-success btn-submit"
        :disabled="isDisabled"
        @click="localAddBusinessDay"
      >
        {{ $t('button.common.submit') }}
      </button>
      <button
        v-if="targetBusinessDay"
        ref="editBusinessDayButton"
        type="button"
        class="btn btn-success btn-submit"
        :disabled="isDisabled"
        @click="localEditBusinessDay"
      >
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
  name: 'BusinessDayForm',

  components: {
    flatPickr
  },

  mixins: [handleSuccess, businessDayValidate],

  props: {
    targetBusinessDay: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      params: {
        weekday: '',
        morning_started_at: '08:00',
        morning_ended_at: '12:00',
        afternoon_started_at: '13:30',
        afternoon_ended_at: '17:30'
      }
    }
  },

  computed: {
    ...mapState('initialStates', ['meta']),

    ...mapState('companyBusinessDays', ['errors'])
  },

  created() {
    if (!isEmpty(this.errors)) this[CLEAR_BUSINESS_DAY_ERRORS]()
    if (this.targetBusinessDay) this.params = { ...this.targetBusinessDay }
  },

  methods: {
    ...mapActions('companyBusinessDays', ['addBusinessDay', 'updateBusinessDay']),

    ...mapMutations('companyBusinessDays', [CLEAR_BUSINESS_DAY_ERRORS]),

    localAddBusinessDay() {
      this.addBusinessDay(this.params).then(response => {
        this.handleSuccess({
          emitType: 'afterModify',
          message: this.$t('messages.businessDay.createSuccess')
        })
      })
    },

    localEditBusinessDay() {
      this.updateBusinessDay({ businessDayId: this.targetBusinessDay.id, updateParams: this.params }).then(response => {
        this.handleSuccess({
          emitType: 'afterModify',
          message: this.$t('messages.businessDay.updateSuccess')
        })
      })
    }
  }
}
</script>

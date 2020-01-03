<template>
  <div>
    <div class="form-group" :class="{ 'has-error': errors.weekday }">
      <label class="form-label">{{ $t('company.businessDays.labels.weekday') }}</label>
      <select class="form-select" v-model="params.weekday">
        <option value="">{{ $t('company.businessDays.placeholder.chooseWeekday') }}</option>
        <option :value="weekday" v-for="(weekday, key) in meta.weekdays" :key="key">{{ $t(`meta.weekdays.${weekday}`) }}</option>
      </select>
      <p class="form-input-hint" v-if="errors.weekday">{{ $t('company.businessDays.labels.weekday') }} {{ errors.weekday[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': errors.morning_started_at }">
      <label class="form-label">{{ $t('company.businessDays.labels.morningStartAt') }}</label>
      <input class="form-input" type="time" step="300" v-model="params.morning_started_at">
      <p class="form-input-hint" v-if="errors.morning_started_at">{{ $t('company.businessDays.labels.morningStartAt') }} {{ errors.morning_started_at[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': errors.morning_ended_at }">
      <label class="form-label">{{ $t('company.businessDays.labels.morningEndAt') }}</label>
      <input class="form-input" type="time" step="300" v-model="params.morning_ended_at">
      <p class="form-input-hint" v-if="errors.morning_ended_at">{{ $t('company.businessDays.labels.morningEndAt') }} {{ errors.morning_ended_at[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': errors.afternoon_started_at }">
      <label class="form-label">{{ $t('company.businessDays.labels.afternoonStartAt') }}</label>
      <input class="form-input" type="time" step="300" v-model="params.afternoon_started_at">
      <p class="form-input-hint" v-if="errors.afternoon_started_at">{{ $t('company.businessDays.labels.afternoonStartAt') }} {{ errors.afternoon_started_at[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': errors.afternoon_ended_at }">
      <label class="form-label">{{ $t('company.businessDays.labels.afternoonEndAt') }}</label>
      <input class="form-input" type="time" step="300" v-model="params.afternoon_ended_at">
      <p class="form-input-hint" v-if="errors.afternoon_ended_at">{{ $t('company.businessDays.labels.afternoonEndAt') }} {{ errors.afternoon_ended_at[0] }}</p>
    </div>
    <div class="form-group">
      <button
        ref="createBusinessDayButton"
        type="button"
        class="btn btn-success btn-submit"
        v-if="!targetBusinessDay"
        @click="localAddBusinessDay"
        :disabled="isDisable">
        {{ $t('company.businessDays.btn.submit') }}
      </button>
      <button
        ref="editBusinessDayButton"
        type="button"
        class="btn btn-success btn-submit"
        v-if="targetBusinessDay"
        @click="localEditBusinessDay"
        :disabled="isDisable">
        {{ $t('company.businessDays.btn.save') }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'business-day-form',

  props: {
    targetBusinessDay: Object
  },

  data() {
    return {
      isDisable: false,
      params: {
        weekday: '',
        morning_started_at: '',
        morning_ended_at: '',
        afternoon_started_at: '',
        afternoon_ended_at: ''
      }
    }
  },

  methods: {
    ...mapActions('flash', ['setFlashMsg']),

    ...mapActions('companyBusinessDays', ['addBusinessDay', 'updateBusinessDay', 'clearBusinessDayErrors']),

    localAddBusinessDay() {
      this.isDisable = true
      this.addBusinessDay(this.params).then(response => {
        this.setFlashMsg({ message: this.$t('messages.businessDay.createSuccess') })
        this.$emit('afterModify')
        this.isDisable = false
      })
      .catch(() => { this.isDisable = false })
    },

    localEditBusinessDay() {
      this.isDisable = true
      this.updateBusinessDay({ businessDayId: this.targetBusinessDay.id, updateParams: this.params }).then(response => {
        this.setFlashMsg({ message: this.$t('messages.businessDay.updateSuccess') })
        this.$emit('afterModify')
        this.isDisable = false
      })
      .catch(() => { this.isDisable = false })
    }
  },

  computed: {
    ...mapState('initialStates', ['meta']),

    ...mapState('companyBusinessDays', ['errors'])
  },

  created() {
    this.clearBusinessDayErrors()
    if (this.targetBusinessDay) {
      Object.keys(this.params).forEach(key => {
        this.params[key] = this.targetBusinessDay[key]
      })
    }
  }
}
</script>

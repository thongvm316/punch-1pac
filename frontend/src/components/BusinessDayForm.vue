<template>
  <div>
    <div class="form-group" :class="{ 'has-error': errors.weekday }">
      <label class="form-label">{{ $t('company.businessDays.labels.weekday') }}</label>
      <select class="form-select" v-model="params.weekday">
        <option value="">{{ $t('company.businessDays.placeholder.chooseWeekday') }}</option>
        <option :value="weekday" v-for="weekday in meta.weekdays">{{ $t(`meta.weekdays.${weekday}`) }}</option>
      </select>
      <p class="form-input-hint" v-if="errors.weekday">{{ $t('company.businessDays.labels.weekday') }} {{ errors.weekday[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': errors.morning_started_at }">
      <label class="form-label">{{ $t('company.businessDays.labels.morningStartedAt') }}</label>
      <input class="form-input" type="time" step="300" v-model="params.morning_started_at">
      <p class="form-input-hint" v-if="errors.morning_started_at">{{ $t('company.businessDays.labels.morningStartedAt') }} {{ errors.morning_started_at[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': errors.morning_ended_at }">
      <label class="form-label">{{ $t('company.businessDays.labels.morningEndedAt') }}</label>
      <input class="form-input" type="time" step="300" v-model="params.morning_ended_at">
      <p class="form-input-hint" v-if="errors.morning_ended_at">{{ $t('company.businessDays.labels.morningEndedAt') }} {{ errors.morning_ended_at[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': errors.afternoon_started_at }">
      <label class="form-label">{{ $t('company.businessDays.labels.afternoonStartedAt') }}</label>
      <input class="form-input" type="time" step="300" v-model="params.afternoon_started_at">
      <p class="form-input-hint" v-if="errors.afternoon_started_at">{{ $t('company.businessDays.labels.afternoonStartedAt') }} {{ errors.afternoon_started_at[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': errors.afternoon_ended_at }">
      <label class="form-label">{{ $t('company.businessDays.labels.afternoonEndedAt') }}</label>
      <input class="form-input" type="time" step="300" v-model="params.afternoon_ended_at">
      <p class="form-input-hint" v-if="errors.afternoon_ended_at">{{ $t('company.businessDays.labels.afternoonEndedAt') }} {{ errors.afternoon_ended_at[0] }}</p>
    </div>
    <div class="form-group">
      <button
        type="button"
        class="btn btn-success btn-submit"
        v-if="!targetBusinessDay"
        @click="localAddBusinessDay">
        {{ $t('company.businessDays.btn.submit') }}
      </button>
      <button
        type="button"
        class="btn btn-success btn-submit"
        v-if="targetBusinessDay"
        @click="localEditBusinessDay">
        {{ $t('company.businessDays.btn.save') }}
      </button>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import modal from '../mixins/modal'

  export default {
    name: 'business-day-form',

    mixins: [modal],

    props: ['targetBusinessDay'],

    data () {
      return {
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
      ...mapActions('companyBusinessDays', [
        'addBusinessDay',
        'updateBusinessDay',
        'clearBusinessDayErrors'
      ]),

      localAddBusinessDay () {
        this.addBusinessDay(this.params)
            .then(response => {
              this.setFlashMsg(this.$t('messages.businessDay.createSuccess'))
              this.$emit('afterModify')
            })
      },

      localEditBusinessDay () {
        this.updateBusinessDay({ businessDayId: this.targetBusinessDay.id, updateParams: this.params })
            .then(response => {
              this.setFlashMsg(this.$t('messages.businessDay.updateSuccess'))
              this.$emit('afterModify')
            })
      }
    },

    computed: {
      ...mapState('initialStates', [
        'meta'
      ]),

      ...mapState('companyBusinessDays', [
        'errors'
      ])
    },

    created () {
      this.clearBusinessDayErrors()
      if (this.targetBusinessDay) {
        Object.keys(this.params).forEach(key => { this.params[key] = this.targetBusinessDay[key] })
        console.log(this.params)
      }
    }
  }
</script>

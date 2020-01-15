<template>
  <div>
    <div class="form-group" :class="{ 'has-error': $v.params.name.$error || errors.name }">
      <label class="form-label">{{ $t('company.holidays.labels.name') }}</label>
      <input class="form-input" type="text" v-model="$v.params.name.$model">
      <p class="form-input-hint" v-if="$v.params.name.$error">
        {{ $t('validation.required', { name: $t('company.holidays.labels.name') }) }}
      </p>
      <p class="form-input-hint" v-if="errors.name">{{ $t('company.holidays.labels.name') }} {{ errors.name[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': $v.params.started_at.$error || errors.started_at }">
      <label class="form-label">{{ $t('company.holidays.labels.startAt') }}</label>
      <flat-pickr
        :config="{ locale: flatpickrLocaleMapper[currentUser.language] }"
        class="form-input daterange-picker"
        v-model="$v.params.started_at.$model"/>
      <p class="form-input-hint" v-if="errors.started_at">{{ $t('company.holidays.labels.startAt') }} {{ errors.started_at[0] }}</p>
      <p class="form-input-hint" v-if="$v.params.started_at.$error">
        {{ $t('validation.required', { name: $t('company.holidays.labels.startAt') }) }}
      </p>
    </div>
    <div class="form-group" :class="{ 'has-error': $v.params.ended_at.$error || errors.ended_at }">
      <label class="form-label">{{ $t('company.holidays.labels.endAt') }}</label>
      <flat-pickr
        :config="{ locale: flatpickrLocaleMapper[currentUser.language] }"
        class="form-input daterange-picker"
        v-model="$v.params.ended_at.$model"/>
      <p class="form-input-hint" v-if="errors.ended_at">{{ $t('company.holidays.labels.endAt') }} {{ errors.ended_at[0] }}</p>
      <p class="form-input-hint" v-if="$v.params.ended_at.$error">
        {{ $t('validation.required', { name: $t('company.holidays.labels.endAt') }) }}
      </p>
    </div>
    <div class="form-group">
      <button
        class="btn btn-success btn-submit"
        ref="localAddHolidayBtn"
        @click="localAddHoliday"
        v-if="!targetHoliday"
        :disabled="isDisabled">
        {{ $t('company.holidays.btn.submit') }}
      </button>
      <button
        class="btn btn-success btn-submit"
        ref="localEditHolidayBtn"
        @click="localEditHoliday"
        v-if="targetHoliday"
        :disabled="isDisabled">
        {{ $t('company.holidays.btn.save') }}
      </button>
    </div>
  </div>
</template>

<script>
import flatpickrLocale from '../mixins/flatpickr-locale'
import handleSuccess from '../mixins/handle-success'
import holidayFormValidate from '../validations/holiday-form-validate'
import { CLEAR_HOLIDAY_ERRORS } from '../store/mutation-types'
import { mapState, mapActions, mapMutations } from 'vuex'
import { isEqual, isEmpty } from 'underscore'
const flatPickr = () => import('vue-flatpickr-component')

export default {
  name: 'holiday-form',

  mixins: [flatpickrLocale, handleSuccess, holidayFormValidate],

  components: {
    flatPickr
  },

  props: {
    targetHoliday: Object
  },

  data() {
    return {
      params: {
        name: '',
        started_at: '',
        ended_at: ''
      },
      data: {
        emitType: 'afterModify',
        message: ''
      }
    }
  },

  methods: {
    ...mapActions('companyHolidays', ['createHoliday', 'updateHoliday']),

    ...mapMutations('companyHolidays', [CLEAR_HOLIDAY_ERRORS]),

    localAddHoliday() {
      this.createHoliday(this.params).then(response => {
        Object.keys(this.params).forEach(key => {
          this.params[key] = ''
        })
        this.data.message = this.$t('messages.holiday.createSuccess')
        this.handleSuccess(this.data)
      })
    },

    localEditHoliday() {
      this.updateHoliday({ holidayID: this.targetHoliday.id, updateParams: this.params }).then(response => {
        this.data.message = this.$t('messages.holiday.updateSuccess')
        this.handleSuccess(this.data)
      })
    }
  },

  computed: {
    ...mapState('companyHolidays', ['errors']),

    isDisabled() {
      if (this.$v.params.$anyError) return true

      let flag = false
      if (this.targetHoliday) {
        flag = isEqual(this.params, this.targetHoliday)
      } else {
        let emtyParams = {
          name: '',
          started_at: '',
          ended_at: ''
        }

        flag = isEqual(this.params, emtyParams)
      }

      return flag
    }
  },

  created() {
    if (!isEmpty(this.errors)) this[CLEAR_HOLIDAY_ERRORS]()
    if (this.targetHoliday) this.params = { ...this.targetHoliday }
  }
}
</script>

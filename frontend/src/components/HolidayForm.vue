<template>
  <div>
    <div
      class="form-group"
      :class="{ 'has-error': $v.params.name.$error || errors.name }"
    >
      <label class="form-label">{{ $t('label.name') }}</label>
      <input
        v-model="$v.params.name.$model"
        class="form-input"
        type="text"
      >
      <p
        v-if="$v.params.name.$error && !errors.name"
        class="form-input-hint"
      >
        {{ $t('validation.required', { name: $t('label.name') }) }}
      </p>
      <p
        v-if="errors.name"
        class="form-input-hint"
      >
        {{ $t('label.name') }} {{ errors.name[0] }}
      </p>
    </div>
    <div
      class="form-group"
      :class="{ 'has-error': $v.params.started_at.$error || errors.started_at }"
    >
      <label class="form-label">{{ $t('label.startAt') }}</label>
      <flat-pickr
        v-model="$v.params.started_at.$model"
        :config="{ mode: 'single', locale: flatpickrLocaleMapper[pickrLocale] }"
        class="form-input daterange-picker"
      />
      <p
        v-if="errors.started_at"
        class="form-input-hint"
      >
        {{ $t('label.startAt') }} {{ errors.started_at[0] }}
      </p>
      <p
        v-if="$v.params.started_at.$error && !errors.started_at"
        class="form-input-hint"
      >
        {{ $t('validation.required', { name: $t('label.startAt') }) }}
      </p>
    </div>
    <div
      class="form-group"
      :class="{ 'has-error': $v.params.ended_at.$error || errors.ended_at }"
    >
      <label class="form-label">{{ $t('label.endAt') }}</label>
      <flat-pickr
        v-model="$v.params.ended_at.$model"
        :config="{ mode: 'single', locale: flatpickrLocaleMapper[pickrLocale] }"
        class="form-input daterange-picker"
      />
      <p
        v-if="errors.ended_at"
        class="form-input-hint"
      >
        {{ $t('label.endAt') }} {{ errors.ended_at[0] }}
      </p>
      <p
        v-if="$v.params.ended_at.$error && !errors.ended_at"
        class="form-input-hint"
      >
        {{ $t('validation.required', { name: $t('label.endAt') }) }}
      </p>
    </div>
    <div class="form-group">
      <button
        v-if="!targetHoliday"
        ref="localAddHolidayBtn"
        class="btn btn-success btn-submit"
        :disabled="isDisabled"
        @click="localAddHoliday"
      >
        {{ $t('button.common.submit') }}
      </button>
      <button
        v-if="targetHoliday"
        ref="localEditHolidayBtn"
        class="btn btn-success btn-submit"
        :disabled="isDisabled"
        @click="localEditHoliday"
      >
        {{ $t('button.common.save') }}
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
import { isEmpty } from 'underscore'
const flatPickr = () => import('vue-flatpickr-component')

export default {
  name: 'HolidayForm',

  components: {
    flatPickr
  },

  mixins: [flatpickrLocale, handleSuccess, holidayFormValidate],

  props: {
    targetHoliday: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      params: {
        name: '',
        started_at: '',
        ended_at: ''
      }
    }
  },

  computed: {
    ...mapState('companyHolidays', ['errors'])
  },

  created() {
    if (!isEmpty(this.errors)) this[CLEAR_HOLIDAY_ERRORS]()
    if (this.targetHoliday) this.params = { ...this.targetHoliday }
  },

  methods: {
    ...mapActions('companyHolidays', ['createHoliday', 'updateHoliday']),

    ...mapMutations('companyHolidays', [CLEAR_HOLIDAY_ERRORS]),

    localAddHoliday() {
      this.createHoliday(this.params).then(response => {
        Object.keys(this.params).forEach(key => {
          this.params[key] = ''
        })
        this.handleSuccess({
          emitType: 'afterModify',
          message: this.$t('messages.holiday.createSuccess')
        })
      })
    },

    localEditHoliday() {
      this.updateHoliday({ holidayID: this.targetHoliday.id, updateParams: this.params }).then(response => {
        this.handleSuccess({
          emitType: 'afterModify',
          message: this.$t('messages.holiday.updateSuccess')
        })
      })
    }
  }
}
</script>

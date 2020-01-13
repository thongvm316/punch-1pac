<template>
  <div>
    <div class="form-group" :class="{ 'has-error': errors.name }">
      <label class="form-label">{{ $t('company.holidays.labels.name') }}</label>
      <input class="form-input" type="text" v-model="params.name">
      <p class="form-input-hint" v-if="errors.name">{{ $t('company.holidays.labels.name') }} {{ errors.name[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': errors.started_at }">
      <label class="form-label">{{ $t('company.holidays.labels.startAt') }}</label>
      <flat-pickr
        :config="{ locale: flatpickrLocaleMapper[currentUser.language] }"
        class="form-input daterange-picker"
        v-model="params.started_at"/>
      <p class="form-input-hint" v-if="errors.started_at">{{ $t('company.holidays.labels.startAt') }} {{ errors.started_at[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': errors.ended_at }">
      <label class="form-label">{{ $t('company.holidays.labels.endAt') }}</label>
      <flat-pickr
        :config="{ locale: flatpickrLocaleMapper[currentUser.language] }"
        class="form-input daterange-picker"
        v-model="params.ended_at"/>
      <p class="form-input-hint" v-if="errors.ended_at">{{ $t('company.holidays.labels.endAt') }} {{ errors.ended_at[0] }}</p>
    </div>
    <div class="form-group">
      <button
        class="btn btn-success btn-submit"
        ref="localAddHolidayBtn"
        @click="localAddHoliday"
        v-if="!targetHoliday"
        :disabled="isDisable">
        {{ $t('company.holidays.btn.submit') }}
      </button>
      <button
        class="btn btn-success btn-submit"
        ref="localEditHolidayBtn"
        @click="localEditHoliday"
        v-if="targetHoliday"
        :disabled="isDisable">
        {{ $t('company.holidays.btn.save') }}
      </button>
    </div>
  </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import flatpickrLocale from '../mixins/flatpickr-locale'
import handleSuccess from '../mixins/handle-success'
import { CLEAR_HOLIDAY_ERRORS } from '../store/mutation-types'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'holiday-form',

  mixins: [flatpickrLocale, handleSuccess],

  components: {
    flatPickr
  },

  props: {
    targetHoliday: Object
  },

  data() {
    return {
      isDisable: false,
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
      this.isDisable = true
      this.createHoliday(this.params).then(response => {
        Object.keys(this.params).forEach(key => {
          this.params[key] = ''
        })
        this.data.message = this.$t('messages.holiday.createSuccess')
        this.handleSuccess(this.data)
      })
      .catch(() => { this.isDisable = false })
    },

    localEditHoliday() {
      this.isDisable = true
      this.updateHoliday({ holidayID: this.targetHoliday.id, updateParams: this.params }).then(response => {
        this.data.message = this.$t('messages.holiday.updateSuccess')
        this.handleSuccess(this.data)
      })
      .catch(() => { this.isDisable = false })
    }
  },

  computed: {
    ...mapState('companyHolidays', ['errors'])
  },

  created() {
    this[CLEAR_HOLIDAY_ERRORS]()
    if (this.targetHoliday) {
      Object.keys(this.params).forEach(k => {
        this.params[k] = this.targetHoliday[k]
      })
    }
  }
}
</script>

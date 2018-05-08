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
        @click="localAddHoliday"
        v-if="!targetHoliday">
        {{ $t('company.holidays.btn.submit') }}
      </button>
      <button
        class="btn btn-success btn-submit"
        @click="localEditHoliday"
        v-if="targetHoliday">
        {{ $t('company.holidays.btn.save') }}
      </button>
    </div>
  </div>
</template>

<script>
  import flatPickr from 'vue-flatpickr-component'
  import flatpickrLocale from '../mixins/flatpickr-locale'
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'holiday-form',

    mixins: [flatpickrLocale],

    components: {
      flatPickr
    },

    props: ['targetHoliday'],

    data () {
      return {
        params: {
          name: '',
          started_at: '',
          ended_at: ''
        }
      }
    },

    methods: {
      ...mapActions('flash', [
        'setFlashMsg'
      ]),

      ...mapActions('companyHolidays', [
        'createHoliday',
        'updateHoliday',
        'clearHolidayErrors'
      ]),

      localAddHoliday () {
        this.createHoliday(this.params)
            .then(response => {
              Object.keys(this.params).forEach(key => { this.params[key] = '' })
              this.setFlashMsg({ message: this.$t('messages.holiday.createSuccess') })
              this.$emit('afterModify')
            })
      },

      localEditHoliday () {
        this.updateHoliday({ holidayID: this.targetHoliday.id, updateParams: this.params })
            .then(response => {
              this.setFlashMsg({ message: this.$t('messages.holiday.updateSuccess') })
              this.$emit('afterModify')
            })
      }
    },

    computed: {
      ...mapState('companyHolidays', [
        'errors'
      ])
    },

    created () {
      this.clearHolidayErrors()
      if (this.targetHoliday) {
        Object.keys(this.params).forEach(k => { this.params[k] = this.targetHoliday[k] })
      }
    }
  }
</script>

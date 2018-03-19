<template>
  <setting-layout sidebar-type="company" :title="$t('company.title')" :subtitle="$t('company.holidays.title')">
    <div class="input-group mt-5">
      <select class="form-select" v-model="country">
        <option value="">{{ $t('company.holidays.placeholder.chooseCountry') }}</option>
        <option value="country" v-for="country in meta.holiday_countries">{{ $t(`meta.holiday_countries.${country}`) }}</option>
      </select>
      <button class="btn input-group-btn" @click="importNationalHolidays(country)">{{ $t('company.holidays.btn.import') }}</button>
    </div>
    <p class="form-input-hint text-dark">{{ $t('company.holidays.explain') }}</p>

    <div class="toolbar clearfix mt-5">
      <input type="text" class="form-input" :placeholder="$t('company.holidays.placeholder.filterByName')" v-model="name">
      <button type="button" class="btn float-right" @click="toggleAddModal(clearHolidayErrors)">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
        {{ $t('company.holidays.btn.add') }}
      </button>
    </div>

    <table class="table table-hover bg-light mt-5">
      <thead>
        <th>{{ $t('company.holidays.tableHeader.name') }}</th>
        <th>{{ $t('company.holidays.tableHeader.startAt') }}</th>
        <th>{{ $t('company.holidays.tableHeader.endAt') }}</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="holiday in filterHolidays(name)">
          <td>{{ holiday.name }}</td>
          <td>{{ holiday.started_at | datetime_mmdd }}</td>
          <td>{{ holiday.ended_at | datetime_mmdd }}</td>
          <td class="text-center">
            <button class="btn btn-action btn-link" @click="toggleUpdateModal(holiday)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 16" fill="currentColor">
                <path fill-rule="evenodd" d="M0 12v3h3l8-8-3-3-8 8zm3 2H1v-2h1v1h1v1zm10.3-9.3L12 6 9 3l1.3-1.3a.996.996 0 0 1 1.41 0l1.59 1.59c.39.39.39 1.02 0 1.41z"/>
              </svg>
            </button>
            <button class="btn btn-action btn-link" @click="deleteHoliday(holiday.id)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <modal :title="$t('company.holidays.modal.addTitle')" :modal-open.sync="isAddModalOpen">
      <div class="form-group" :class="{ 'has-error': errors.name }">
        <label class="form-label">{{ $t('company.holidays.labels.name') }}</label>
        <input class="form-input" type="text" v-model="createParams.name">
        <p class="form-input-hint" v-if="errors.name">{{ $t('company.holidays.labels.name') }} {{ errors.name[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': errors.started_at }">
        <label class="form-label">{{ $t('company.holidays.labels.startAt') }}</label>
        <datepicker
        :placeholder="$t('company.holidays.placeholder.fromDate')"
        :format="'MMM dd yyyy'"
        :minimumView="'day'"
        :maximumView="'day'"
        :input-class="'datepicker-input form-input'"
        :calendar-class="'datepicker-calendar'"
        :wrapper-class="'datepicker'"
        v-model="createParams.started_at"/>
        <p class="form-input-hint" v-if="errors.started_at">{{ $t('company.holidays.labels.startAt') }} {{ errors.started_at[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': errors.ended_at }">
        <label class="form-label">{{ $t('company.holidays.labels.endAt') }}</label>
        <datepicker
        :placeholder="$t('company.holidays.placeholder.toDate')"
        :format="'MMM dd yyyy'"
        :minimumView="'day'"
        :maximumView="'day'"
        :input-class="'datepicker-input form-input'"
        :calendar-class="'datepicker-calendar'"
        :wrapper-class="'datepicker'"
        v-model="createParams.ended_at"/>
        <p class="form-input-hint" v-if="errors.ended_at">{{ $t('company.holidays.labels.endAt') }} {{ errors.ended_at[0] }}</p>
      </div>
      <div class="form-group">
        <button type="button" class="btn" @click="submitAddModal(createParams, createHoliday)">{{ $t('company.holidays.btn.submit') }}</button>
      </div>
    </modal>

    <modal :title="$t('company.holidays.modal.editTitle')" :modal-open.sync="isEditModalOpen">
      <div class="form-group" :class="{ 'has-error': errors.name }">
        <label class="form-label">{{ $t('company.holidays.labels.name') }}</label>
        <input class="form-input" type="text" v-model="updateParams.name">
        <p class="form-input-hint" v-if="errors.name">{{ $t('company.holidays.labels.name') }} {{ errors.name[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': errors.started_at }">
        <label class="form-label">{{ $t('company.holidays.labels.startAt') }}</label>
        <datepicker
        :placeholder="$t('company.holidays.placeholder.fromDate')"
        :format="'MMM dd'"
        :minimumView="'day'"
        :maximumView="'day'"
        :input-class="'datepicker-input form-input'"
        :calendar-class="'datepicker-calendar'"
        :wrapper-class="'datepicker'"
        v-model="updateParams.started_at"/>
        <p class="form-input-hint" v-if="errors.started_at">{{ $t('company.holidays.labels.startAt') }} {{ errors.started_at[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': errors.ended_at }">
        <label class="form-label">{{ $t('company.holidays.labels.endAt') }}</label>
        <datepicker
        :placeholder="$t('company.holidays.placeholder.toDate')"
        :format="'MMM dd'"
        :minimumView="'day'"
        :maximumView="'day'"
        :input-class="'datepicker-input form-input'"
        :calendar-class="'datepicker-calendar'"
        :wrapper-class="'datepicker'"
        v-model="updateParams.ended_at"/>
        <p class="form-input-hint" v-if="errors.reason">{{ $t('company.holidays.labels.endAt') }} {{ errors.ended_at[0] }}</p>
      </div>
      <div class="form-group">
        <button type="button" class="btn" @click="saveEditModal({ holidayID: currentID, updateParams: updateParams }, updateHoliday)">{{ $t('company.holidays.btn.save') }}</button>
      </div>
    </modal>
  </setting-layout>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import { mapState, mapGetters, mapActions } from 'vuex'
import SettingLayout from '../layouts/Setting.vue'
import modal from '../mixins/modal'

export default {
  mixins: [modal],

  data () {
    return {
      name: '',
      createParams: {
        name: '',
        started_at: '',
        ended_at: ''
      },
      updateParams: {
        name: '',
        started_at: '',
        ended_at: ''
      },
      currentID: '',
      country: ''
    }
  },

  components: {
    SettingLayout,
    Datepicker
  },

  methods: {
    ...mapActions('companyHolidays', [
      'fetchHolidays',
      'createHoliday',
      'updateHoliday',
      'deleteHoliday',
      'clearHolidayErrors',
      'importNationalHolidays'
    ]),

    toggleUpdateModal (holiday) {
      this.clearHolidayErrors()
      this.isEditModalOpen = !this.isEditModalOpen
      this.currentID = holiday.id
      Object.keys(this.updateParams).forEach(k => { this.updateParams[k] = holiday[k] })
    }
  },

  computed: {
    ...mapState('initialStates', [
      'meta'
    ]),

    ...mapState('companyHolidays', [
      'holidays',
      'errors'
    ]),

    ...mapGetters('companyHolidays', [
      'filterHolidays'
    ])
  },

  created () {
    this.fetchHolidays()
  }
}
</script>

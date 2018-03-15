<template>
  <setting-layout sidebar-type="company" :title="$t('company.title')" :subtitle="$t('company.businessDays.title')">
    <div class="toolbar text-right mt-5">
      <button type="button" class="btn" @click="toggleAddModal(clearBusinessDayErrors)">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
        {{ $t('company.businessDays.btn.add') }}
      </button>
    </div>
    <table class="table table-hover bg-light mt-5">
      <thead>
        <th>{{ $t('company.businessDays.tableHeader.weekday') }}</th>
        <th>{{ $t('company.businessDays.tableHeader.startedAt') }}</th>
        <th>{{ $t('company.businessDays.tableHeader.endedAt') }}</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="businessDay in businessDays">
          <td>{{ $t(`meta.weekdays.${businessDay.weekday}`) }}</td>
          <td>{{ businessDay.started_at }}</td>
          <td>{{ businessDay.ended_at }}</td>
          <td class="text-center">
            <button class="btn btn-action btn-link" @click="toggleEditModal(businessDay)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 16" fill="currentColor">
                <path fill-rule="evenodd" d="M0 12v3h3l8-8-3-3-8 8zm3 2H1v-2h1v1h1v1zm10.3-9.3L12 6 9 3l1.3-1.3a.996.996 0 0 1 1.41 0l1.59 1.59c.39.39.39 1.02 0 1.41z"/>
              </svg>
            </button>
            <button class="btn btn-action btn-link" @click="deleteBusinessDay(businessDay.id)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <modal :title="$t('company.businessDays.modal.addTitle')" :modal-open.sync="isAddModalOpen">
      <div class="form-group" :class="{ 'has-error': errors.weekday }">
        <label class="form-label">{{ $t('company.businessDays.labels.weekday') }}</label>
        <select class="form-select" v-model="createParams.weekday">
          <option value="">{{ $t('company.businessDays.placeholder.chooseWeekday') }}</option>
          <option :value="weekday" v-for="weekday in meta.weekdays">{{ $t(`meta.weekdays.${weekday}`) }}</option>
        </select>
        <p class="form-input-hint" v-if="errors.weekday">{{ $t('company.businessDays.labels.weekday') }} {{ errors.weekday[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': errors.started_at }">
        <label class="form-label">{{ $t('company.businessDays.labels.startedAt') }}</label>
        <input class="form-input" type="time" step="300" v-model="createParams.started_at">
        <p class="form-input-hint" v-if="errors.started_at">{{ $t('company.businessDays.labels.startedAt') }} {{ errors.started_at[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': errors.ended_at }">
        <label class="form-label">{{ $t('company.businessDays.labels.endedAt') }}</label>
        <input class="form-input" type="time" step="300" v-model="createParams.ended_at">
        <p class="form-input-hint" v-if="errors.ended_at">{{ $t('company.businessDays.labels.endedAt') }} {{ errors.ended_at[0] }}</p>
      </div>
      <div class="form-group">
        <button type="button" class="btn" @click="submitAddModal(createParams, addBusinessDay)">
          {{ $t('company.businessDays.btn.submit') }}
        </button>
      </div>
    </modal>

    <modal :title="$t('company.businessDays.modal.editTitle')" :modal-open.sync="isEditModalOpen">
      <div class="form-group" :class="{ 'has-error': errors.weekday }">
        <label class="form-label">{{ $t('company.businessDays.labels.weekday') }}</label>
        <select class="form-select" v-model="updateParams.weekday">
          <option :value="weekday" v-for="weekday in meta.weekdays">{{ $t(`meta.weekdays.${weekday}`) }}</option>
        </select>
        <p class="form-input-hint" v-if="errors.weekday">{{ $t('company.businessDays.labels.weekday') }} {{ errors.weekday[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': errors.started_at }">
        <label class="form-label">{{ $t('company.businessDays.labels.startedAt') }}</label>
        <input class="form-input" type="time" step="300" v-model="updateParams.started_at">
        <p class="form-input-hint" v-if="errors.started_at">{{ $t('company.businessDays.labels.startedAt') }} {{ errors.started_at[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': errors.ended_at }">
        <label class="form-label">{{ $t('company.businessDays.labels.endedAt') }}</label>
        <input class="form-input" type="time" step="300" v-model="updateParams.ended_at">
        <p class="form-input-hint" v-if="errors.ended_at">{{ $t('company.businessDays.labels.endedAt') }} {{ errors.ended_at[0] }}</p>
      </div>
      <div class="form-group">
        <button type="button" class="btn" @click="saveEditModal({ updateParams: updateParams, businessDayId: currentId }, updateBusinessDay)">
          {{ $t('company.businessDays.btn.save') }}
        </button>
      </div>
    </modal>
  </setting-layout>
</template>

<script>
import SettingLayout from '../layouts/Setting.vue'
import modal from '../mixins/modal'
import { mapState, mapActions } from 'vuex'

export default {
  mixins: [modal],
  data () {
    return {
      createParams: {
        weekday: '',
        started_at: '',
        ended_at: ''
      },
      currentId: '',
      updateParams: {
        weekday: '',
        started_at: '',
        ended_at: ''
      }
    }
  },

  methods: {
    ...mapActions('companyBusinessDays', [
      'fetchBusinessDays',
      'clearBusinessDayErrors',
      'addBusinessDay',
      'deleteBusinessDay',
      'updateBusinessDay'
    ]),
    toggleEditModal (businessDay) {
      this.clearBusinessDayErrors()
      this.isEditModalOpen = !this.isEditModalOpen
      this.currentId = businessDay.id
      Object.keys(this.updateParams).forEach(k => { this.updateParams[k] = businessDay[k] })
    }
  },

  computed: {
    ...mapState('initialStates', [
      'meta'
    ]),

    ...mapState('companyBusinessDays', [
      'errors',
      'businessDays'
    ])
  },

  created () {
    this.fetchBusinessDays()
  },

  components: {
    SettingLayout
  }
}
</script>

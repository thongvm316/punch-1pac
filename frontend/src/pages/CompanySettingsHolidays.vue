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
      <button type="button" class="btn btn-success float-right" @click="toggleAddModal()">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" fill-rule="eventodd" viewBox="0 0 24 24"><path d="M13.26318,13.26319l9.47367,0a1.26316,1.26316,0,1,0,0-2.52632l-9.4737,0,0-9.4737a1.26315,1.26315,0,0,0-2.52629,0l0,9.47369H1.26315a1.26315,1.26315,0,0,0,0,2.52629h9.47369v9.47369a1.26317,1.26317,0,1,0,2.52633,0Z" transform="translate(0 0)"/></svg>
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
          <td>{{ holiday.started_at | moment_l }}</td>
          <td>{{ holiday.ended_at | moment_l }}</td>
          <td class="text-center">
            <button class="btn btn-action btn-link" @click="toggleUpdateModal(holiday)">
              <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor"><path d="M23.2530524,2.92025954 L21.0782401,0.745259708 C20.084537,-0.24844334 18.4678184,-0.248396465 17.4741154,0.745259708 C16.5385373,1.68093151 2.24841342,15.9721335 1.29342912,16.9271647 C1.19171037,17.0288834 1.12355413,17.1640709 1.09927288,17.2963053 L0.0118667154,23.1688048 C-0.0302739063,23.3964767 0.0422885881,23.6303361 0.20602295,23.7940704 C0.369944813,23.9579923 0.603851044,24.0304141 0.831241652,23.9882735 L6.70322557,22.9007267 C6.83892868,22.8754142 6.97233492,22.8066017 7.07236617,22.7065236 L23.2530524,6.52461863 C24.2490523,5.52861871 24.249193,3.91640009 23.2530524,2.92025954 Z M1.58077284,22.4191799 L2.23856967,18.8668052 L5.13291319,21.7613362 L1.58077284,22.4191799 Z M6.57520995,21.2149144 L2.78494462,17.4244147 L16.6229123,3.58536886 L20.4131776,7.37591544 L6.57520995,21.2149144 Z M22.2586931,5.53025934 L21.40749,6.38155614 L17.6172247,2.59100956 L18.4684278,1.73971276 C18.9137871,1.29430654 19.6384277,1.29425966 20.0838808,1.73971276 L22.2586931,3.91471259 C22.7051774,4.36119693 22.7051774,5.08372812 22.2586931,5.53025934 Z""/></svg>
            </button>
            <button class="btn btn-action btn-link" @click="deleteHoliday(holiday.id)">
              <svg width="22px" height="24px" viewBox="0 0 22 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor"><path d="M22.0148148,3.45394737 L17.017284,3.45394737 L17.017284,2.63980263 C17.017284,1.18421053 15.8320988,0 14.3753086,0 L9.62469136,0 C8.16790123,0 6.98271605,1.18421053 6.98271605,2.63980263 L6.98271605,3.45394737 L1.98518519,3.45394737 C1.61481481,3.45394737 1.31851852,3.75 1.31851852,4.12006579 C1.31851852,4.49013158 1.61481481,4.78618421 1.98518519,4.78618421 L3.19012346,4.78618421 L3.19012346,20.4375 C3.19012346,22.4013158 4.79012346,24 6.75555556,24 L17.2444444,24 C19.2098765,24 20.8098765,22.4013158 20.8098765,20.4375 L20.8098765,4.78618421 L22.0148148,4.78618421 C22.3851852,4.78618421 22.6814815,4.49013158 22.6814815,4.12006579 C22.6814815,3.75 22.3851852,3.45394737 22.0148148,3.45394737 Z M8.31604938,2.63980263 C8.31604938,1.91940789 8.9037037,1.33223684 9.62469136,1.33223684 L14.3753086,1.33223684 C15.0962963,1.33223684 15.6839506,1.91940789 15.6839506,2.63980263 L15.6839506,3.45394737 L8.31604938,3.45394737 L8.31604938,2.63980263 Z M19.4765432,20.4375 C19.4765432,21.6661184 18.4740741,22.6677632 17.2444444,22.6677632 L6.75555556,22.6677632 C5.52592593,22.6677632 4.52345679,21.6661184 4.52345679,20.4375 L4.52345679,4.78618421 L19.4814815,4.78618421 L19.4814815,20.4375 L19.4765432,20.4375 Z M12,20.2796053 C12.3703704,20.2796053 12.6666667,19.9835526 12.6666667,19.6134868 L12.6666667,7.84046053 C12.6666667,7.47039474 12.3703704,7.17434211 12,7.17434211 C11.6296296,7.17434211 11.3333333,7.47039474 11.3333333,7.84046053 L11.3333333,19.6085526 C11.3333333,19.9786184 11.6296296,20.2796053 12,20.2796053 Z M7.64938272,19.5444079 C8.01975309,19.5444079 8.31604938,19.2483553 8.31604938,18.8782895 L8.31604938,8.57072368 C8.31604938,8.20065789 8.01975309,7.90460526 7.64938272,7.90460526 C7.27901235,7.90460526 6.98271605,8.20065789 6.98271605,8.57072368 L6.98271605,18.8782895 C6.98271605,19.2483553 7.28395062,19.5444079 7.64938272,19.5444079 Z M16.3506173,19.5444079 C16.7209877,19.5444079 17.017284,19.2483553 17.017284,18.8782895 L17.017284,8.57072368 C17.017284,8.20065789 16.7209877,7.90460526 16.3506173,7.90460526 C15.9802469,7.90460526 15.6839506,8.20065789 15.6839506,8.57072368 L15.6839506,18.8782895 C15.6839506,19.2483553 15.9802469,19.5444079 16.3506173,19.5444079 Z" id="path-1"/></svg>
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
        <flat-pickr
          :config="{ locale: flatpickrLocaleMapper[currentUser.language] }"
          class="form-input daterange-picker"
          v-model="createParams.started_at"/>
        <p class="form-input-hint" v-if="errors.started_at">{{ $t('company.holidays.labels.startAt') }} {{ errors.started_at[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': errors.ended_at }">
        <label class="form-label">{{ $t('company.holidays.labels.endAt') }}</label>
        <flat-pickr
          :config="{ locale: flatpickrLocaleMapper[currentUser.language] }"
          class="form-input daterange-picker"
          v-model="createParams.ended_at"/>
        <p class="form-input-hint" v-if="errors.ended_at">{{ $t('company.holidays.labels.endAt') }} {{ errors.ended_at[0] }}</p>
      </div>
      <div class="form-group">
        <button
          type="button"
          class="btn btn-primary btn-form-submit"
          @click="submitAddModal(createParams, createHoliday, $t('messages.holiday.createSuccess'))">
          {{ $t('company.holidays.btn.submit') }}
        </button>
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
        <flat-pickr
          :config="{ locale: flatpickrLocaleMapper[currentUser.language] }"
          class="form-input daterange-picker"
          v-model="updateParams.started_at"/>
        <p class="form-input-hint" v-if="errors.started_at">{{ $t('company.holidays.labels.startAt') }} {{ errors.started_at[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': errors.ended_at }">
        <label class="form-label">{{ $t('company.holidays.labels.endAt') }}</label>
        <flat-pickr
          :config="{ locale: flatpickrLocaleMapper[currentUser.language] }"
          class="form-input daterange-picker"
          v-model="updateParams.ended_at"/>
        <p class="form-input-hint" v-if="errors.reason">{{ $t('company.holidays.labels.endAt') }} {{ errors.ended_at[0] }}</p>
      </div>
      <div class="form-group">
        <button type="button" class="btn btn-primary btn-form-submit" @click="saveEditModal({ holidayID: currentID, updateParams: updateParams }, updateHoliday, $t('messages.holiday.updateSuccess'))">
          {{ $t('company.holidays.btn.save') }}
        </button>
      </div>
    </modal>
  </setting-layout>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import { mapState, mapGetters, mapActions } from 'vuex'
import SettingLayout from '../layouts/Setting'
import modal from '../mixins/modal'
import flatpickrLocale from '../mixins/flatpickr-locale'

export default {
  mixins: [modal, flatpickrLocale],

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
    flatPickr
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

    toggleAddModal () {
      Object.keys(this.createParams).forEach(key => { this.createParams[key] = '' })
      this.clearHolidayErrors()
      this.isAddModalOpen = !this.isAddModalOpen
    },

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

<template>
  <div>
    <h2>{{ $t('company.holidays.title') }}</h2>
    <div class="input-group mt-5">
      <select
        v-model="country"
        class="form-select"
      >
        <option value="">
          {{ $t('placeholder.chooseCountry') }}
        </option>
        <option
          v-for="(holidayCountry, key) in meta.holiday_countries"
          :key="key"
          :value="holidayCountry"
        >
          {{ $t(`meta.holiday_countries.${holidayCountry}`) }}
        </option>
      </select>
      <button
        ref="importHolidayBtn"
        class="btn input-group-btn"
        @click="importHolidays()"
      >
        {{ $t('button.common.import') }}
      </button>
    </div>
    <p class="form-input-hint text-dark">
      {{ $t('company.holidays.explain') }}
    </p>

    <div class="toolbar clearfix mt-5">
      <datepicker
        v-model="year"
        :language="$i18n.locale"
        format="yyyy"
        :minimum-view="'year'"
        :maximum-view="'year'"
        :input-class="'datepicker-input form-input'"
        :calendar-class="'datepicker-calendar'"
        :wrapper-class="'datepicker'"
        @input="onInputDatepicker"
      />
      <input
        v-model="name"
        type="search"
        class="form-input"
        :placeholder="$t('placeholder.filterByName')"
      >
      <button
        ref="btnAddHoliday"
        type="button"
        class="btn btn-success float-right"
        @click="toggleAddModal()"
      >
        {{ $t('button.common.add') }}
      </button>
    </div>

    <table class="table bg-light mt-5">
      <thead>
        <th>{{ $t('tableHeader.name') }}</th>
        <th>{{ $t('tableHeader.startAt') }}</th>
        <th>{{ $t('tableHeader.endAt') }}</th>
        <th>{{ $t('tableHeader.actions') }}</th>
      </thead>
      <tbody>
        <tr
          v-for="holidayItem in filterHolidays(name)"
          :key="holidayItem.id"
        >
          <td>{{ holidayItem.name }}</td>
          <td>{{ holidayItem.started_at | moment_ll }}</td>
          <td>{{ holidayItem.ended_at | moment_ll }}</td>
          <td>
            <button
              class="btn btn-action btn-link tooltip"
              :data-tooltip="$t('tooltip.holiday.edit')"
              @click="toggleUpdateModal(holidayItem)"
            >
              <p-ico-pencil />
            </button>
            <button
              class="btn btn-action btn-link tooltip"
              :data-tooltip="$t('tooltip.holiday.delete')"
              @click="localDeleteHoliday(holidayItem)"
            >
              <p-ico-trash />
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <modal
      :title="$t('modal.holiday.addTitle')"
      :modal-open.sync="isAddModalOpen"
    >
      <holiday-form
        v-if="isAddModalOpen"
        @afterModify="isAddModalOpen = false"
      />
    </modal>

    <modal
      :title="$t('modal.holiday.editTitle')"
      :modal-open.sync="isEditModalOpen"
    >
      <holiday-form
        v-if="isEditModalOpen"
        :target-holiday="editHoliday"
        @afterModify="isEditModalOpen = false"
      />
    </modal>

    <confirm-dialog
      v-if="isOpenDeleteHolidayConfirmDialog"
      :title="$t('company.holidays.confirmDialog.title')"
      :modal-open.sync="isOpenDeleteHolidayConfirmDialog"
      :delete-object="deleteHoliday"
      :object-id="holiday.id"
    >
      <p>{{ $t('company.holidays.confirmDialog.msg', { name: holiday.name }) }}</p>
    </confirm-dialog>
  </div>
</template>

<script>
import { SET_FLASH_MESSAGE } from '../store/mutation-types'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import modal from '../mixins/modal'
import PIcoPencil from '@/punch-ui/punch-icons/PIcoPencil'
import PIcoTrash from '@/punch-ui/punch-icons/PIcoTrash'
const ConfirmDialog = () => import('../components/ConfirmDialog')
const HolidayForm = () => import('../components/HolidayForm.vue')
const Datepicker = () => import('vuejs-datepicker')

export default {

  components: {
    HolidayForm,
    Datepicker,
    ConfirmDialog,
    PIcoTrash,
    PIcoPencil
  },
  mixins: [modal],

  data() {
    return {
      isOpenDeleteHolidayConfirmDialog: false,
      name: '',
      editHoliday: '',
      holiday: {},
      country: '',
      year: this.$moment()
        .locale('en')
        .format('YYYY')
    }
  },

  computed: {
    ...mapState('initialStates', ['meta']),

    ...mapGetters('companyHolidays', ['filterHolidays'])
  },

  watch: {
    year: function() {
      this.fetchHolidays(this.year)
    }
  },

  created() {
    this.fetchHolidays(this.year)
  },

  methods: {
    ...mapActions('companyHolidays', ['fetchHolidays', 'deleteHoliday', 'importNationalHolidays']),

    ...mapMutations('flash', [SET_FLASH_MESSAGE]),

    importHolidays() {
      this.importNationalHolidays(this.country)
        .then(response => this[SET_FLASH_MESSAGE]({ message: this.$t('messages.holiday.importSuccess', { country: this.$t(`meta.holiday_countries.${this.country}`) }) }))
        .catch(error => {
          if (error.response && error.response.status === 422 && error.response.data.errors === 'blank_or_already_imported') {
            this[SET_FLASH_MESSAGE]({
              message: this.$t('messages.holiday.blankOrAlreadyImported', { country: this.$t(`meta.holiday_countries.${this.country}`) }),
              type: 'error',
              timeout: 6000
            })
          }
        })
    },

    toggleAddModal() {
      this.isAddModalOpen = !this.isAddModalOpen
    },

    toggleUpdateModal(holiday) {
      this.isEditModalOpen = !this.isEditModalOpen
      this.editHoliday = holiday
    },

    onInputDatepicker() {
      this.year = this.$moment(this.year).format('YYYY')
    },

    localDeleteHoliday(holiday) {
      this.holiday = holiday
      this.isOpenDeleteHolidayConfirmDialog = true
    }
  }
}
</script>

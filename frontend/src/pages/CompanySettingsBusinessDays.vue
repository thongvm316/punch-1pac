<template>
  <div>
    <h2>{{ $t('company.businessDays.title') }}</h2>
    <div class="toolbar text-right mt-5">
      <button
        ref="btnAddBusinessDay"
        type="button"
        class="btn btn-success"
        @click="toggleAddModal()"
      >
        {{ $t('button.common.add') }}
      </button>
    </div>

    <table class="table bg-light mt-5">
      <thead>
        <th>{{ $t('tableHeader.weekday') }}</th>
        <th>{{ $t('tableHeader.morningStartAt') }}</th>
        <th>{{ $t('tableHeader.morningEndAt') }}</th>
        <th>{{ $t('tableHeader.afternoonStartAt') }}</th>
        <th>{{ $t('tableHeader.afternoonEndAt') }}</th>
        <th>{{ $t('tableHeader.actions') }}</th>
      </thead>
      <tbody>
        <tr
          v-for="businessDay in businessDays"
          :key="businessDay.id"
        >
          <td>{{ $t(`meta.weekdays.${businessDay.weekday}`) }}</td>
          <td>{{ businessDay.morning_started_at }}</td>
          <td>{{ businessDay.morning_ended_at }}</td>
          <td>{{ businessDay.afternoon_started_at }}</td>
          <td>{{ businessDay.afternoon_ended_at }}</td>
          <td>
            <button
              class="btn btn-action btn-link tooltip"
              :data-tooltip="$t('tooltip.businessDays.edit')"
              @click="toggleEditModal(businessDay)"
            >
              <p-ico-pencil />
            </button>
            <button
              class="btn btn-action btn-link tooltip"
              :data-tooltip="$t('tooltip.businessDays.delete')"
              @click="localDeleteBusinessDay(businessDay)"
            >
              <p-ico-trash />
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <modal
      :title="$t('modal.businessDays.addTitle')"
      :modal-open.sync="isAddModalOpen"
    >
      <business-day-form
        v-if="isAddModalOpen"
        @afterModify="isAddModalOpen = false"
      />
    </modal>

    <modal
      :title="$t('modal.businessDays.editTitle')"
      :modal-open.sync="isEditModalOpen"
    >
      <business-day-form
        v-if="isEditModalOpen"
        :target-business-day="targetBusinessDay"
        @afterModify="isEditModalOpen = false"
      />
    </modal>

    <confirm-dialog
      v-if="isOpenDeleteBusinessDaysConfirmDialog"
      :title="$t('company.businessDays.confirmDialog.title')"
      :modal-open.sync="isOpenDeleteBusinessDaysConfirmDialog"
      :delete-object="deleteBusinessDay"
      :object-id="targetBusinessDay.id"
    >
      <p>{{ $t('company.businessDays.confirmDialog.msg') }}</p>
    </confirm-dialog>
  </div>
</template>

<script>
import modal from '../mixins/modal'
import { mapState, mapActions } from 'vuex'
import PIcoPencil from '@/punch-ui/punch-icons/PIcoPencil'
import PIcoTrash from '@/punch-ui/punch-icons/PIcoTrash'
const BusinessDayForm = () => import('../components/BusinessDayForm.vue')
const ConfirmDialog = () => import('../components/ConfirmDialog')

export default {
  components: {
    BusinessDayForm,
    ConfirmDialog,
    PIcoPencil,
    PIcoTrash
  },

  mixins: [modal],

  data() {
    return {
      isOpenDeleteBusinessDaysConfirmDialog: false,
      targetBusinessDay: null
    }
  },

  computed: {
    ...mapState('companyBusinessDays', ['businessDays'])
  },

  created() {
    this.fetchBusinessDays()
  },

  methods: {
    ...mapActions('companyBusinessDays', ['fetchBusinessDays', 'deleteBusinessDay']),

    toggleAddModal() {
      this.isAddModalOpen = !this.isAddModalOpen
    },

    toggleEditModal(businessDay) {
      this.targetBusinessDay = businessDay
      this.isEditModalOpen = !this.isEditModalOpen
    },

    localDeleteBusinessDay(businessDay) {
      this.isOpenDeleteBusinessDaysConfirmDialog = true
      this.targetBusinessDay = businessDay
    }
  }
}
</script>

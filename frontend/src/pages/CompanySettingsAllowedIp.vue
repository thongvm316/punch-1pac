<template>
  <div>
    <h2>{{ $t('company.allowedIPs.title') }}</h2>
    <div class="toolbar clearfix mt-5">
      <button
        ref="btnAddIpAddress"
        type="button"
        class="btn btn-success float-right"
        @click="toggleAddModal()"
      >
        {{ $t('button.common.add') }}
      </button>
    </div>

    <table class="table bg-light mt-5">
      <thead>
        <th>{{ $t('tableHeader.ipAddress') }}</th>
        <th>{{ $t('tableHeader.createdAt') }}</th>
        <th>{{ $t('tableHeader.actions') }}</th>
      </thead>
      <tbody>
        <tr
          v-for="ip in allowedIPs"
          :key="ip.id"
        >
          <td>{{ ip.ip_address }}</td>
          <td>{{ ip.created_at | moment_llll }}</td>
          <td>
            <button
              class="btn btn-action btn-link tooltip"
              :data-tooltip="$t('tooltip.allowedIPs.edit')"
              @click="toggleEditModal(ip)"
            >
              <p-ico-pencil />
            </button>
            <button
              class="btn btn-action btn-link tooltip"
              :data-tooltip="$t('tooltip.allowedIPs.delete')"
              @click="localDeleteIP(ip)"
            >
              <p-ico-trash />
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <modal
      :title="$t('modal.allowedIPs.addTitle')"
      :modal-open.sync="isAddModalOpen"
    >
      <allowed-ip-form
        v-if="isAddModalOpen"
        @afterModify="isAddModalOpen = false"
      />
    </modal>

    <modal
      :title="$t('modal.allowedIPs.editTitle')"
      :modal-open.sync="isEditModalOpen"
    >
      <allowed-ip-form
        v-if="isEditModalOpen"
        :target-ip="editIp"
        @afterModify="isEditModalOpen = false"
      />
    </modal>

    <confirm-dialog
      v-if="isOpenDeleteIPConfirmDialog"
      :title="$t('company.allowedIPs.confirmDialog.title')"
      :modal-open.sync="isOpenDeleteIPConfirmDialog"
      :delete-object="deleteIP"
      :object-id="targetIp.id"
    >
      <p>{{ $t('company.allowedIPs.confirmDialog.msg', { name: targetIp.ip_address }) }}</p>
    </confirm-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import modal from '@/mixins/modal'
import PIcoPencil from '@/punch-ui/punch-icons/PIcoPencil'
import PIcoTrash from '@/punch-ui/punch-icons/PIcoTrash'
const AllowedIpForm = () => import('@/components/AllowedIpForm.vue')
const ConfirmDialog = () => import('@/components/ConfirmDialog')

export default {
  components: {
    AllowedIpForm,
    ConfirmDialog,
    PIcoPencil,
    PIcoTrash
  },

  mixins: [modal],

  data() {
    return {
      editIp: '',
      targetIp: null,
      isOpenDeleteIPConfirmDialog: false
    }
  },

  computed: {
    ...mapState('companyAllowedIPs', ['allowedIPs'])
  },

  created() {
    this.fetchIPs()
  },

  methods: {
    ...mapActions('companyAllowedIPs', ['fetchIPs', 'deleteIP']),

    toggleAddModal() {
      this.isAddModalOpen = !this.isAddModalOpen
    },

    toggleEditModal(ip) {
      this.editIp = ip
      this.isEditModalOpen = !this.isEditModalOpen
    },

    localDeleteIP(ip) {
      this.isOpenDeleteIPConfirmDialog = true
      this.targetIp = ip
    }
  }
}
</script>

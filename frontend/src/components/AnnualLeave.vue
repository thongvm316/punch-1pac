<template>
  <div>
    <button type="button" class="btn btn-notice mr-5" @click="toggleAddModal">
      {{ $t('button.common.btnLeave') }}
    </button>

    <modal :title="$t('modal.annualLeave.title')" :modal-open.sync="isAddModalOpen">
      <annual-leave-form v-if="isAddModalOpen" @finishRequest="isAddModalOpen = false"/>
    </modal>
  </div>
</template>

<script>
import modal from '../mixins/modal'
const AnnualLeaveForm = () => import('../components/AnnualLeaveForm')

export default {
  name: 'annual-leave',

  components: {
    AnnualLeaveForm
  },

  mixins: [modal]
}
</script>

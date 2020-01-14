<template>
  <div>
    <div class="form-group" :class="{ 'has-error': errors.ip_address}">
      <label class="form-label">{{ $t('company.allowedIPs.labels.ipAddress') }}</label>
      <input class="form-input" type="text" v-model="params">
      <p class="form-input-hint" v-if="errors.ip_address">{{ $t('company.allowedIPs.labels.ipAddress') }} {{ errors.ip_address[0] }}</p>
    </div>
    <div class="form-group">
      <button
        ref="createAllowedIpButton"
        class="btn btn-success btn-submit"
        @click="localAddIp"
        v-if="!targetIp"
        :disabled="isDisable">{{ $t('company.allowedIPs.btn.submit') }}</button>
      <button
        ref="editAllowedIpButton"
        class="btn btn-success btn-submit"
        @click="localEditIp"
        v-if="targetIp"
        :disabled="isDisable">{{ $t('company.allowedIPs.btn.save') }}</button>
    </div>
  </div>
</template>

<script>
import { CLEAR_IP_ERRORS } from '../store/mutation-types'
import { mapState, mapActions, mapMutations } from 'vuex'
import handleSuccess from '../mixins/handle-success'

export default {
  name: 'allowed-ip-form',

  mixins: [handleSuccess],

  props: {
    targetIp: Object
  },

  data() {
    return {
      isDisable: false,
      data: {
        emitType: 'afterModify',
        message: ''
      },
      params: ''
    }
  },

  methods: {
    ...mapActions('companyAllowedIPs', ['createIP', 'updateIP']),

    ...mapMutations('companyAllowedIPs', [CLEAR_IP_ERRORS]),

    localAddIp() {
      this.isDisable = true
      this.createIP({ ip_address: this.params }).then(response => {
        this.data.message = this.$t('messages.ip.createSuccess')
        this.handleSuccess(this.data)
      })
      .catch(() => { this.isDisable = false })
    },

    localEditIp() {
      this.isDisable = true
      this.updateIP({ id: this.targetIp.id, ip_address: this.params }).then(response => {
        this.data.message = this.$t('messages.ip.updateSuccess')
        this.handleSuccess(this.data)
      })
      .catch(() => { this.isDisable = false })
    }
  },

  computed: {
    ...mapState('companyAllowedIPs', ['errors'])
  },

  created() {
    if (Object.keys(this.errors).length) this[CLEAR_IP_ERRORS]()

    if (this.targetIp) {
      this.params = this.targetIp.ip_address
    }
  }
}
</script>

<template>
  <div>
    <div class="form-group">
      <label class="form-label">{{ $t('company.allowedIPs.labels.ipAddress') }}</label>
      <input class="form-input" type="text" v-model.trim="$v.params.$model" :class="{ 'is-error': $v.params.$error }">
      <p class="form-input-hint text-error" v-if="$v.params.$error">
        <span v-if="!$v.params.required">{{ $t('validation.required', { name: $t('company.allowedIPs.labels.ipAddress') }) }}</span>
        <span v-else-if="!$v.params.isValid">{{ $t('validation.invalid', { name: $t('company.allowedIPs.labels.ipAddress') }) }}</span>
      </p>
    </div>
    <div class="form-group">
      <button
        ref="createAllowedIpButton"
        class="btn btn-success btn-submit"
        @click="localAddIp"
        v-if="!targetIp"
        :disabled="isDisabled">{{ $t('company.allowedIPs.btn.submit') }}</button>
      <button
        ref="editAllowedIpButton"
        class="btn btn-success btn-submit"
        @click="localEditIp"
        v-if="targetIp"
        :disabled="isDisabled">{{ $t('company.allowedIPs.btn.save') }}</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import handleSuccess from '../mixins/handle-success'
import allowedIpValidate from '../validations/allowed-ip-validate'

export default {
  name: 'allowed-ip-form',

  props: {
    targetIp: Object
  },

  mixins: [allowedIpValidate, handleSuccess],

  data() {
    return {
      data: {
        emitType: 'afterModify',
        message: ''
      },
      params: ''
    }
  },

  methods: {
    ...mapActions('companyAllowedIPs', ['createIP', 'updateIP']),

    localAddIp() {
      this.createIP({ ip_address: this.params }).then(response => {
        this.data.message = this.$t('messages.ip.createSuccess')
        this.handleSuccess(this.data)
      })
    },

    localEditIp() {
      this.updateIP({ id: this.targetIp.id, ip_address: this.params }).then(response => {
        this.data.message = this.$t('messages.ip.updateSuccess')
        this.handleSuccess(this.data)
      })
    }
  },

  computed: {
    isDisabled() {
      if (this.$v.params.$error) return true

      let flag = false
      if (this.targetIp) {
        flag = this.params === this.targetIp.ip_address
      } else {
        flag = this.params === ''
      }

      return flag
    }
  },

  created() {
    if (this.targetIp) this.params = this.targetIp.ip_address
  }
}
</script>

<template>
  <div>
    <div class="form-group">
      <label class="form-label">{{ $t('label.ipAddress') }}</label>
      <input
        v-model.trim="$v.params.$model"
        class="form-input"
        type="text"
        :class="{ 'is-error': $v.params.$error }"
      >
      <p
        v-if="$v.params.$error"
        class="form-input-hint text-error"
      >
        <span v-if="!$v.params.required">{{ $t('validation.required', { name: $t('label.ipAddress') }) }}</span>
        <span v-else-if="!$v.params.isValid">{{ $t('validation.invalid', { name: $t('label.ipAddress') }) }}</span>
      </p>
    </div>
    <div class="form-group">
      <button
        v-if="!targetIp"
        ref="createAllowedIpButton"
        class="btn btn-success btn-submit"
        :disabled="isDisabled"
        @click="localAddIp"
      >
        {{ $t('button.common.submit') }}
      </button>
      <button
        v-if="targetIp"
        ref="editAllowedIpButton"
        class="btn btn-success btn-submit"
        :disabled="isDisabled"
        @click="localEditIp"
      >
        {{ $t('button.common.save') }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import handleSuccess from '../mixins/handle-success'
import allowedIpValidate from '../validations/allowed-ip-validate'

export default {
  name: 'AllowedIpForm',

  mixins: [allowedIpValidate, handleSuccess],

  props: {
    targetIp: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      params: ''
    }
  },

  created() {
    if (this.targetIp) this.params = this.targetIp.ip_address
  },

  methods: {
    ...mapActions('companyAllowedIPs', ['createIP', 'updateIP']),

    localAddIp() {
      this.createIP({ ip_address: this.params }).then(response => {
        this.handleSuccess({
          emitType: 'afterModify',
          message: this.$t('messages.ip.createSuccess')
        })
      })
    },

    localEditIp() {
      this.updateIP({ id: this.targetIp.id, ip_address: this.params }).then(response => {
        this.handleSuccess({
          emitType: 'afterModify',
          message: this.$t('messages.ip.updateSuccess')
        })
      })
    }
  }
}
</script>

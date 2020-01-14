<template>
  <div>
    <div class="form-group" :class="{ 'has-error': errors.ip_address}">
      <label class="form-label">{{ $t('company.allowedIPs.labels.ipAddress') }}</label>
      <input class="form-input" type="text" v-model.trim="$v.params.$model" :class="{ 'is-error': $v.params.$error, 'is-success': $v.params.isValid }">
      <p class="form-input-hint text-error" v-if="$v.params.$error">
        {{ $t('company.allowedIPs.labels.ipAddress') }}
        <span v-if="!$v.params.required">{{ $t('company.allowedIPs.labels.blank') }}</span>
        <span v-else-if="!$v.params.isValid">{{ $t('company.allowedIPs.labels.invalid') }}</span>
      </p>
    </div>
    <div class="form-group">
      <button
        ref="createAllowedIpButton"
        class="btn btn-success btn-submit"
        @click="localAddIp"
        v-if="!targetIp"
        :disabled="!$v.params.isValid">{{ $t('company.allowedIPs.btn.submit') }}</button>
      <button
        ref="editAllowedIpButton"
        class="btn btn-success btn-submit"
        @click="localEditIp"
        v-if="targetIp"
        :disabled="!$v.params.isValid">{{ $t('company.allowedIPs.btn.save') }}</button>
    </div>
  </div>
</template>

<script>
import { CLEAR_IP_ERRORS } from '../store/mutation-types'
import { mapState, mapActions, mapMutations } from 'vuex'
import handleSuccess from '../mixins/handle-success'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'allowed-ip-form',

  props: {
    targetIp: Object
  },

  mixins: [validationMixin, handleSuccess],

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

  validations: {
    params: {
      required,
      isValid(params) {
        let ipRegex = /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/
        return ipRegex.test(params)
      }
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

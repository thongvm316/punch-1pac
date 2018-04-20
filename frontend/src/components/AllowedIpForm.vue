<template>
  <div>
    <div class="form-group" :class="{ 'has-error': errors.ip_address}">
      <label class="form-label">{{ $t('company.allowedIPs.labels.ipAddress') }}</label>
      <input class="form-input" type="text" v-model="params">
      <p class="form-input-hint" v-if="errors.ip_address">{{ $t('company.allowedIPs.labels.ipAddress') }} {{ errors.ip_address[0] }}</p>
    </div>
    <div class="form-group">
      <button
        class="btn btn-success btn-submit"
        @click="localAddIp"
        v-if="!targetIp">{{ $t('company.allowedIPs.btn.submit') }}</button>
      <button
        class="btn btn-success btn-submit"
        @click="localEditIp"
        v-if="targetIp">{{ $t('company.allowedIPs.btn.save') }}</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'allowed-ip-form',

  props: ['targetIp'],

  data () {
    return {
      params: ''
    }
  },

  methods: {
    ...mapActions('companyAllowedIPs', [
      'createIP',
      'updateIP',
      'clearIPErrors'
    ]),

    ...mapActions('flash', [
      'setFlashMsg'
    ]),

    localAddIp () {
      this.createIP({ ip_address: this.params })
          .then(response => {
            this.setFlashMsg(this.$t('messages.ip.createSuccess'))
            this.$emit('afterModify')
          })
    },

    localEditIp () {
      this.updateIP({ id: this.targetIp.id, ip_address: this.params })
          .then(response => {
            this.setFlashMsg(this.$t('messages.ip.updateSuccess'))
            this.$emit('afterModify')
          })
    }
  },

  computed: {
    ...mapState('companyAllowedIPs', [
      'errors'
    ])
  },

  created () {
    this.clearIPErrors()
    if (this.targetIp) { this.params = this.targetIp.ip_address }
  }
}
</script>

<template>
  <setting-layout sidebar-type="user" :title="$t('user.title', { name: currentUser.name })" :subtitle="$t('user.password.title')">
    <form class="setting-form">
      <div class="form-group" :class="{ 'has-error': errors.current_password }">
        <label class="form-label">{{ $t('user.password.labels.currentPassword') }}</label>
        <input class="form-input" type="password" v-model="updateParams.current_password">
        <p class="form-input-hint" v-if="errors.current_password">{{ $t('user.password.labels.currentPassword') }} {{ errors.current_password[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': errors.password }">
        <label class="form-label">{{ $t('user.password.labels.newPassword') }}</label>
        <input class="form-input" type="password" v-model="updateParams.password">
        <p class="form-input-hint" v-if="errors.password">{{ $t('user.password.labels.newPassword') }} {{ errors.password[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': errors.password_confirmation }">
        <label class="form-label">{{ $t('user.password.labels.confirmNewPassword') }}</label>
        <input class="form-input" type="password" v-model="updateParams.password_confirmation">
        <p class="form-input-hint" v-if="errors.password_confirmation">{{ $t('user.password.labels.confirmNewPassword') }} {{ errors.password_confirmation[0] }}</p>
      </div>
      <div class="form-group">
        <button type="button" class="btn btn-success btn-submit" @click="localUpdatePassword" :disabled="isDisable">{{ $t('user.password.btn.save') }}</button>
      </div>
    </form>
  </setting-layout>
</template>

<script>
import SettingLayout from '../layouts/Setting.vue'
import { mapState, mapActions } from 'vuex'
import handleSuccess from '../mixins/handle-success'

export default {
  data() {
    return {
      isDisable: false,
      updateParams: {
        current_password: '',
        password: '',
        password_confirmation: ''
      }
    }
  },

  mixins: [handleSuccess],

  methods: {
    ...mapActions('userPassword', ['updatePassword', 'clearUserPasswordErrors']),

    localUpdatePassword() {
      this.isDisable = true
      this.updatePassword(this.updateParams).then(response => {
        const message = this.$t('messages.user.updatePwdSuccess')
        this.handleSuccess({ message })
        this.updateParams = {
          current_password: '',
          password: '',
          password_confirmation: ''
        }
        this.clearUserPasswordErrors()
      })
      .catch(() => { this.isDisable = false })
    }
  },

  computed: {
    ...mapState('userPassword', ['errors'])
  },

  components: {
    SettingLayout
  },

  created() {
    this.clearUserPasswordErrors()
  }
}
</script>

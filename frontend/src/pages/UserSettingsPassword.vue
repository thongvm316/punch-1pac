<template>
  <div>
    <h2>{{ $t('user.password.title') }}</h2>
    <form class="setting-form">
      <div class="form-group" :class="{ 'has-error': $v.updateParams.current_password.$error || errors.current_password }">
        <label class="form-label">{{ $t('label.currentPassword') }}</label>
        <input class="form-input" type="password" v-model="$v.updateParams.current_password.$model">
        <p class="form-input-hint" v-if="$v.updateParams.current_password.$error && !errors.current_password">
          {{ $t('validation.required', { name: $t('label.currentPassword') }) }}
        </p>
        <p class="form-input-hint" v-if="errors.current_password">{{ $t('label.currentPassword') }} {{ errors.current_password[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': $v.updateParams.password.$anyError || errors.password }">
        <label class="form-label">{{ $t('label.newPassword') }}</label>
        <input class="form-input" type="password" v-model="$v.updateParams.password.$model">
        <p class="form-input-hint" v-if="$v.updateParams.password.$anyError && !errors.password">
          <span v-if="!$v.updateParams.password.required">{{ $t('validation.required', { name: $t('label.newPassword') }) }}</span>
          <span v-if="!$v.updateParams.password.minLength">{{ $t('validation.minLength', { name: $t('label.newPassword'), length: 6 }) }}</span>
          <span v-if="!$v.updateParams.password.maxLength">{{ $t('validation.maxLength', { name: $t('label.newPassword'), length: 32 }) }}</span>
        </p>
        <p class="form-input-hint" v-if="errors.password">{{ $t('label.newPassword') }} {{ errors.password[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': $v.updateParams.password_confirmation.$error || errors.password_confirmation }">
        <label class="form-label">{{ $t('label.confirmNewPassword') }}</label>
        <input class="form-input" type="password" v-model="$v.updateParams.password_confirmation.$model">
        <p class="form-input-hint" v-if="$v.updateParams.password_confirmation.$error && !errors.password_confirmation">
          {{ $t('validation.sameAs', { name: $t('label.confirmNewPassword') }) }}
        </p>
        <p class="form-input-hint" v-if="errors.password_confirmation">{{ $t('label.confirmNewPassword') }} {{ errors.password_confirmation[0] }}</p>
      </div>
      <div class="form-group">
        <button type="button" class="btn btn-success btn-submit" @click="localUpdatePassword" :disabled="isDisabled">{{ $t('button.common.save') }}</button>
      </div>
    </form>
  </div>
</template>

<script>
import { CLEAR_USER_PASSWORD_ERRORS } from '../store/mutation-types'
import { mapState, mapActions, mapMutations } from 'vuex'
import { isEmpty } from 'underscore'
import handleSuccess from '../mixins/handle-success'
import userPasswordValidate from '../validations/user-password-validate'

export default {
  data() {
    return {
      updateParams: {
        current_password: '',
        password: '',
        password_confirmation: ''
      }
    }
  },

  mixins: [handleSuccess, userPasswordValidate],

  methods: {
    ...mapActions('userPassword', ['updatePassword']),

    ...mapMutations('userPassword', [CLEAR_USER_PASSWORD_ERRORS]),

    localUpdatePassword() {
      this.updatePassword(this.updateParams).then(response => {
        this.handleSuccess({ message: this.$t('messages.user.updatePwdSuccess') })
        this.updateParams = {
          current_password: '',
          password: '',
          password_confirmation: ''
        }

        if (!isEmpty(this.errors)) this[CLEAR_USER_PASSWORD_ERRORS]()
      })
    }
  },

  computed: {
    ...mapState('userPassword', ['errors'])
  },

  created() {
    if (!isEmpty(this.errors)) this[CLEAR_USER_PASSWORD_ERRORS]()
  }
}
</script>

<template>
  <setting-layout sidebar-type="user" title="Settings for Troy Kozey" :subtitle="$t('subtitle.password')">
    <form class="setting-form">
      <div class="form-group" :class="{ 'has-error': errors.current_password }">
        <label class="form-label">{{ $t('label.currentPassword') }}</label>
        <input class="form-input" type="password" v-model="updateParams.current_password">
        <p class="form-input-hint" v-if="errors.current_password">{{ errors.current_password[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': errors.password }">
        <label class="form-label">{{ $t('label.newPassword') }}</label>
        <input class="form-input" type="password" v-model="updateParams.password">
        <p class="form-input-hint" v-if="errors.password">{{ errors.password[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': errors.password_confirmation }">
        <label class="form-label">{{ $t('label.newPasswordConfirm') }}</label>
        <input class="form-input" type="password" v-model="updateParams.password_confirmation">
        <p class="form-input-hint" v-if="errors.password_confirmation">{{ errors.password_confirmation[0] }}</p>
      </div>
      <div class="form-group">
        <button type="button" class="btn" @click="updatePassword(updateParams)">{{ $t('button.save') }}</button>
      </div>
    </form>
  </setting-layout>
</template>

<script>
import SettingLayout from '../layouts/Setting.vue'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      updateParams: {
        current_password: '',
        password: '',
        password_confirmation: ''
      }
    }
  },

  methods: {
    ...mapActions('userPassword', [
      'updatePassword'
    ])
  },

  computed: {
    ...mapState('userPassword', [
      'errors'
    ])
  },

  components: {
    SettingLayout
  }
}
</script>

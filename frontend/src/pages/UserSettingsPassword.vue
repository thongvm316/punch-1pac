<template>
  <setting-layout sidebar-type="user" title="Settings for Troy Kozey" subtitle="Password">
    <form class="setting-form">
      <div class="form-group">
        <label class="form-label" for="input-example-1">Current Password</label>
        <input class="form-input" type="password" id="input-example-1" v-model="updateParams.current_password">
        <p class="form-input-hint" v-if="errors.current_password">{{ errors.current_password[0] }}</p>
      </div>
      <div class="form-group">
        <label class="form-label" for="input-example-2">New Password</label>
        <input class="form-input" type="password" id="input-example-2" v-model="updateParams.password">
        <p class="form-input-hint" v-if="errors.password">{{ errors.password[0] }}</p>
      </div>
      <div class="form-group">
        <label class="form-label" for="input-example-3">New Password Confirmation</label>
        <input class="form-input" type="password" id="input-example-3" v-model="updateParams.password_confirmation">
        <p class="form-input-hint" v-if="errors.password_confirmation">{{ errors.password_confirmation[0] }}</p>
      </div>
      <div class="form-group">
        <button type="button" class="btn" @click="updatePassword(updateParams)">Save</button>
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

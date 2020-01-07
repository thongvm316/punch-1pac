<template>
  <div class="modal" :class="{ active: open }">
    <span class="modal-overlay" @click="remind"></span>
    <div class="modal-container">
      <div class="modal-header">
        <button ref="btnCloseModal" class="btn btn-clear float-right" @click="remind"></button>
        <h3 class="modal-title">{{ $t('popup.changePassword.title') }}</h3>
      </div>
      <div class="modal-body">
        <div class="content">{{ $t('popup.changePassword.description') }}</div>
      </div>
      <div class="modal-footer">
        <router-link ref="btnChangePassword" class="btn btn-success" to="/settings/password" @click.native="remind">{{ $t('popup.changePassword.btnChange') }}</router-link>
        <button ref="btnCancel" type="button" class="btn" @click="remind">{{ $t('popup.changePassword.btnRemind') }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { INITIAL_STATES_UPDATE_PASSWORD_CHANGED } from '../store/mutation-types.js'

export default {
  name: 'popup-change-password',

  data() {
    return {
      open: false
    }
  },

  methods: {
    ...mapMutations('initialStates', [INITIAL_STATES_UPDATE_PASSWORD_CHANGED]),

    remind() {
      this[INITIAL_STATES_UPDATE_PASSWORD_CHANGED](true)
      this.open = !this.currentUser.password_changed
    }
  },

  created() {
    this.open = !this.currentUser.password_changed
  }
}
</script>

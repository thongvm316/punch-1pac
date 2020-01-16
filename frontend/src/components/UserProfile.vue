<template>
  <form class="setting-form">
    <div class="form-group" :class="{ 'has-error': errors.avatar }">
      <label class="form-label">{{ $t('label.avatar') }}</label>
      <img class="img-profile" :src="targetUser.avatar_url" :alt="targetUser.name">
      <input class="form-input" type="file" @change="setAvatarFile">
      <p class="form-input-hint" v-if="errors.avatar">{{ $t('label.avatar') }} {{ errors.avatar[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': $v.params.email.$anyError || errors.email }">
      <label class="form-label">{{ $t('label.email') }}</label>
      <input class="form-input" type="text" v-model="$v.params.email.$model">
      <p class="form-input-hint" v-if="$v.params.email.$anyError && !errors.email">
        <span v-if="!$v.params.email.required">{{ $t('validation.required', { name: $t('label.email') }) }}</span>
        <span v-if="!$v.params.email.email">{{ $t('validation.invalid', { name: $t('label.email') }) }}</span>
      </p>
      <p class="form-input-hint" v-if="errors.email">{{ $t('label.email') }} {{ errors.email[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': $v.params.name.$error || errors.name }">
      <label class="form-label">{{ $t('label.name') }}</label>
      <input class="form-input" type="text" v-model="$v.params.name.$model">
      <p class="form-input-hint" v-if="$v.params.name.$error && !errors.name">
        {{ $t('validation.required', { name: $t('label.name') }) }}
      </p>
      <p class="form-input-hint" v-if="errors.name">{{ $t('label.name') }} {{ errors.name[0] }}</p>
    </div>
    <div class="form-group">
      <label class="form-label">{{ $t('label.gender') }}</label>
      <label class="form-radio">
        <input type="radio" value="male" v-model="params.gender">
        <i class="form-icon"></i> {{ $t('meta.gender.male') }}
      </label>
      <label class="form-radio">
        <input type="radio" value="female" v-model="params.gender">
        <i class="form-icon"></i> {{ $t('meta.gender.female') }}
      </label>
    </div>
    <div class="form-group">
      <label class="form-label">{{ $t('label.position') }}</label>
      <input class="form-input" type="text" v-model="params.position">
    </div>
    <div class="form-group">
      <label class="form-label">{{ $t('label.role') }}</label>
      <select class="form-select" v-model="params.role" :disabled="!$auth('User', currentUser, targetUser).canEditRole()">
        <option :value="role" v-for="(role, key) in meta.roles" :key="key">{{ $t(`meta.roles.${role}`) }}</option>
      </select>
    </div>
    <div class="form-group">
      <button type="button" class="btn btn-success btn-submit" @click="updateUser" :disabled="isDisabled">{{ $t('button.common.save') }}</button>
    </div>
  </form>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import handleSuccess from '../mixins/handle-success'
import userProfileValidate from '../validations/user-profile-validate'
import * as types from '../store/mutation-types'
import axios from 'axios'
import 'formdata-polyfill'
import { isEqual } from 'underscore'

export default {
  data() {
    return {
      params: {
        avatar: '',
        gender: '',
        name: '',
        position: '',
        email: '',
        role: ''
      },
      errors: {},
      data: {
        emitType: 'afterUserProfileUpdated',
        message: ''
      }
    }
  },

  mixins: [handleSuccess, userProfileValidate],

  props: {
    targetUser: {
      type: Object,
      required: true
    },
    objectType: String
  },

  computed: {
    ...mapState('initialStates', ['meta']),

    isDisabled() {
      if (this.$v.params.$anyError || isEqual(this.params, this.targetUser)) return true
      return false
    }
  },

  methods: {
    ...mapMutations('initialStates', [types.INITIAL_STATES_UPDATE_USER]),

    ...mapMutations('group', [types.UPDATE_GROUP_USER]),

    ...mapMutations('companyUsers', [types.UPDATE_USER]),

    updateUser() {
      let formData = new FormData()
      Object.keys(this.params).forEach(key => formData.set(`user[${key}]`, this.params[key] || ''))

      axios
        .put(`/users/${this.targetUser.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(response => {
          if (this.targetUser.id === this.currentUser.id) {
            this[types.INITIAL_STATES_UPDATE_USER](response.data)
          }
          if (this.objectType === 'company') this[types.UPDATE_USER](response.data)
          if (this.objectType === 'group') this[types.UPDATE_GROUP_USER](response.data)
          this.data.message = this.$t('messages.user.updateProfileSuccess')
          this.handleSuccess(this.data)
          this.errors = {}
        })
        .catch(error => {
          if (error.response && error.response.status === 422) this.errors = error.response.data.errors
        })
    },

    setAvatarFile(e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.params.avatar = files[0]
    }
  },

  created() {
    this.params = { ...this.targetUser }
  },

  watch: {
    targetUser: function() {
      this.params = { ...this.targetUser }
    }
  }
}
</script>

<template>
  <form class="setting-form">
    <div
      class="form-group"
      :class="{ 'has-error': errors.avatar }"
    >
      <label class="form-label">{{ $t('label.avatar') }}</label>
      <img
        class="img-profile"
        :src="targetUser.avatar_url"
        :alt="targetUser.name"
      >
      <input
        class="form-input"
        type="file"
        @change="setAvatarFile"
      >
      <p
        v-if="errors.avatar"
        class="form-input-hint"
      >
        {{ $t('label.avatar') }} {{ errors.avatar[0] }}
      </p>
    </div>
    <div
      class="form-group"
      :class="{ 'has-error': $v.params.email.$anyError || errors.email }"
    >
      <label class="form-label">{{ $t('label.email') }}</label>
      <input
        v-model="$v.params.email.$model"
        class="form-input"
        type="text"
      >
      <p
        v-if="$v.params.email.$anyError && !errors.email"
        class="form-input-hint"
      >
        <span v-if="!$v.params.email.required">{{ $t('validation.required', { name: $t('label.email') }) }}</span>
        <span v-if="!$v.params.email.email">{{ $t('validation.invalid', { name: $t('label.email') }) }}</span>
      </p>
      <p
        v-if="errors.email"
        class="form-input-hint"
      >
        {{ $t('label.email') }} {{ errors.email[0] }}
      </p>
    </div>
    <div
      class="form-group"
      :class="{ 'has-error': $v.params.name.$error || errors.name }"
    >
      <label class="form-label">{{ $t('label.name') }}</label>
      <input
        v-model="$v.params.name.$model"
        class="form-input"
        type="text"
      >
      <p
        v-if="$v.params.name.$error && !errors.name"
        class="form-input-hint"
      >
        {{ $t('validation.required', { name: $t('label.name') }) }}
      </p>
      <p
        v-if="errors.name"
        class="form-input-hint"
      >
        {{ $t('label.name') }} {{ errors.name[0] }}
      </p>
    </div>
    <div class="form-group">
      <label class="form-label">{{ $t('label.gender') }}</label>
      <label class="form-radio">
        <input
          v-model="params.gender"
          type="radio"
          value="male"
        >
        <i class="form-icon" /> {{ $t('meta.gender.male') }}
      </label>
      <label class="form-radio">
        <input
          v-model="params.gender"
          type="radio"
          value="female"
        >
        <i class="form-icon" /> {{ $t('meta.gender.female') }}
      </label>
    </div>
    <div class="form-group">
      <label class="form-label">{{ $t('label.position') }}</label>
      <input
        v-model="params.position"
        class="form-input"
        type="text"
      >
    </div>
    <div class="form-group">
      <label class="form-label">{{ $t('label.role') }}</label>
      <select
        v-model="params.role"
        class="form-select"
        :disabled="!$auth('User', currentUser, targetUser).canEditRole()"
      >
        <option
          v-for="(role, key) in meta.roles"
          :key="key"
          :value="role"
        >
          {{ $t(`meta.roles.${role}`) }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <button
        type="button"
        class="btn btn-success btn-submit"
        :disabled="isDisabled"
        @click="updateUser"
      >
        {{ $t('button.common.save') }}
      </button>
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

export default {

  mixins: [handleSuccess, userProfileValidate],

  props: {
    targetUser: {
      type: Object,
      required: true
    },
    objectType: {
      type: String,
      default: ''
    }
  },
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
      errors: {}
    }
  },

  computed: {
    ...mapState('initialStates', ['meta'])
  },

  watch: {
    targetUser: function() {
      this.params = { ...this.targetUser }
    }
  },

  created() {
    this.params = { ...this.targetUser }
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
          this.handleSuccess({
            emitType: 'afterUserProfileUpdated',
            message: this.$t('messages.user.updateProfileSuccess')
          })
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
  }
}
</script>

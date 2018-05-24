<template>
  <form class="setting-form">
    <div class="form-group" :class="{ 'has-error': errors.avatar }">
      <label class="form-label">{{ $t('user.profile.labels.avatar') }}</label>
      <img class="img-profile" :src="targetUser.avatar_url" :alt="targetUser.name">
      <input class="form-input" type="file" @change="setAvatarFile">
      <p class="form-input-hint" v-if="errors.avatar">{{ $t('user.profile.labels.avatar') }} {{ errors.avatar[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': errors.email }">
      <label class="form-label">{{ $t('user.profile.labels.email') }}</label>
      <input class="form-input" type="text" v-model="params.email">
      <p class="form-input-hint" v-if="errors.email">{{ $t('user.profile.labels.email') }} {{ errors.email[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': errors.name }">
      <label class="form-label">{{ $t('user.profile.labels.name') }}</label>
      <input class="form-input" type="text" v-model="params.name">
      <p class="form-input-hint" v-if="errors.name">{{ $t('user.profile.labels.name') }} {{ errors.name[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': errors.gender }">
      <label class="form-label">{{ $t('user.profile.labels.gender') }}</label>
      <label class="form-radio">
        <input type="radio" value="male" v-model="params.gender">
        <i class="form-icon"></i> {{ $t('meta.gender.male') }}
      </label>
      <label class="form-radio">
        <input type="radio" value="female" v-model="params.gender">
        <i class="form-icon"></i> {{ $t('meta.gender.female') }}
      </label>
      <p class="form-input-hint" v-if="errors.gender">{{ $t('user.profile.labels.gender') }} {{ errors.gender[0] }}</p>
    </div>
    <div class="form-group">
      <label class="form-label">{{ $t('user.profile.labels.position') }}</label>
      <input class="form-input" type="text" v-model="params.position">
    </div>
    <div class="form-group" :class="{ 'has-error': errors.role }">
      <label class="form-label">{{ $t('user.profile.labels.role') }}</label>
      <select class="form-select" v-model="params.role" :disabled="$auth('User', currentUser, targetUser).canEdit()">
        <option :value="role" v-for="role in meta.roles">{{ $t(`meta.roles.${role}`) }}</option>
      </select>
      <p class="form-input-hint" v-if="errors.role">{{ $t('user.profile.labels.role') }} {{ errors.role[0] }}</p>
    </div>
    <div class="form-group">
      <button type="button" class="btn btn-success btn-submit" @click="updateUser">{{ $t('user.profile.btn.save') }}</button>
    </div>
  </form>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import * as types from '../store/mutation-types'
import axios from 'axios'
import 'formdata-polyfill'

export default {
  data () {
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

  props: ['targetUser', 'self'],

  computed: {
    ...mapState('initialStates', [
      'meta'
    ])
  },

  methods: {
    ...mapActions('flash', [
      'setFlashMsg'
    ]),

    ...mapMutations('initialStates', [
      types.INITIAL_STATES_UPDATE_USER
    ]),

    ...mapMutations('companyUsers', [
      types.UPDATE_USER
    ]),

    updateUser () {
      let formData = new FormData()
      Object.keys(this.params).forEach(key => formData.set(`user[${key}]`, this.params[key] || ''))

      axios.put(`/users/${this.targetUser.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
           .then(response => {
             this.self ? this[types.INITIAL_STATES_UPDATE_USER](response.data) : this[types.UPDATE_USER](response.data)
             this.setFlashMsg({ message: this.$t('messages.user.updateProfileSuccess') })
           })
           .catch(error => { if (error.response && error.response.status === 422) this.errors = error.response.data })
    },

    setAvatarFile (e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.params.avatar = files[0]
    }
  },

  created () {
    Object.keys(this.params).forEach(key => { this.params[key] = this.targetUser[key] })
  },

  watch: {
    targetUser: function () {
      Object.keys(this.params).forEach(key => { this.params[key] = this.targetUser[key] })
    }
  }
}
</script>

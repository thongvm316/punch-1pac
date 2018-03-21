<template>
  <setting-layout sidebar-type="user" :title="$t('user.title', { name: currentUser.name })" :subtitle="$t('user.profile.title')">
    <form class="setting-form">
      <div class="form-group" :class="{ 'has-error': userErrors.avatar }">
        <label class="form-label">{{ $t('user.profile.labels.avatar') }}</label>
        <img class="img-profile" :src="currentUser.avatar_url" :alt="currentUser.name">
        <input class="form-input" type="file" @change="setAvatarFile">
        <p class="form-input-hint" v-if="userErrors.avatar">{{ $t('user.profile.labels.avatar') }} {{ userErrors.avatar[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': userErrors.email }">
        <label class="form-label">{{ $t('user.profile.labels.email') }}</label>
        <input class="form-input" type="text" v-model="params.email">
        <p class="form-input-hint" v-if="userErrors.email">{{ $t('user.profile.labels.email') }} {{ userErrors.email[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': userErrors.name }">
        <label class="form-label">{{ $t('user.profile.labels.name') }}</label>
        <input class="form-input" type="text" v-model="params.name">
        <p class="form-input-hint" v-if="userErrors.name">{{ $t('user.profile.labels.name') }} {{ userErrors.name[0] }}</p>
      </div>
      <div class="form-group" :class="{ 'has-error': userErrors.gender }">
        <label class="form-label">{{ $t('user.profile.labels.gender') }}</label>
        <label class="form-radio">
          <input type="radio" value="male" v-model="params.gender">
          <i class="form-icon"></i> {{ $t('meta.gender.male') }}
        </label>
        <label class="form-radio">
          <input type="radio" value="female" v-model="params.gender">
          <i class="form-icon"></i> {{ $t('meta.gender.female') }}
        </label>
        <p class="form-input-hint" v-if="userErrors.gender">{{ $t('user.profile.labels.gender') }} {{ userErrors.gender[0] }}</p>
      </div>
      <div class="form-group">
        <label class="form-label">{{ $t('user.profile.labels.position') }}</label>
        <input class="form-input" type="text" v-model="params.position">
      </div>
      <div class="form-group" :class="{ 'has-error': userErrors.name }">
        <label class="form-label">{{ $t('user.profile.labels.language') }}</label>
        <select class="form-select" v-model="params.language">
          <option :value="language" v-for="language in meta.languages">{{ $t(`meta.languages.${language}`) }}</option>
        </select>
        <p class="form-input-hint" v-if="userErrors.language">{{ $t('user.profile.labels.language') }} {{ userErrors.language[0] }}</p>
      </div>
      <div class="form-group">
        <button type="button" class="btn" @click="localUpdateUser">{{ $t('user.profile.btn.save') }}</button>
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
      params: {
        avatar: '',
        gender: '',
        name: '',
        position: '',
        email: '',
        language: ''
      }
    }
  },

  components: {
    SettingLayout
  },

  computed: {
    ...mapState('initialStates', [
      'meta',
      'userErrors',
      'currentUser'
    ])
  },

  methods: {
    ...mapActions('flash', [
      'setFlashMsg'
    ]),

    ...mapActions('initialStates', [
      'clearUserErrors',
      'updateUser'
    ]),

    localUpdateUser () {
      this.updateUser({ userId: this.currentUser.id, userParams: this.params })
          .then(response => {
            this.setFlashMsg(this.$t('messages.user.updateProfileSuccess'))
            this.$i18n.locale = this.params.language
          })
    },

    setAvatarFile (e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.params.avatar = files[0]
    }
  },

  created () {
    this.clearUserErrors()
    Object.keys(this.params).forEach(key => { this.params[key] = this.currentUser[key] })
  }
}
</script>

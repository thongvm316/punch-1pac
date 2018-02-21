<template>
  <setting-layout sidebar-type="user" title="Settings for Troy Kozey" subtitle="Profile">
    <form class="setting-form">
      <div class="form-group">
        <label class="form-label">Avatar</label>
        <img class="img-profile" :src="currentUser.avatar_url" :alt="currentUser.name">
        <input class="form-input" type="file" @change="setAvatarFile">
      </div>
      <div class="form-group">
        <label class="form-label">Name</label>
        <input class="form-input" type="text" v-model="params.name">
      </div>
      <div class="form-group">
        <label class="form-label">Gender</label>
        <label class="form-radio">
          <input type="radio" value="male" v-model="params.gender">
          <i class="form-icon"></i> Male
        </label>
        <label class="form-radio">
          <input type="radio" value="female" v-model="params.gender">
          <i class="form-icon"></i> Female
        </label>
      </div>
      <div class="form-group">
        <label class="form-label">Email</label>
        <input class="form-input" type="text" v-model="params.email">
      </div>
      <div class="form-group">
        <button type="button" class="btn" @click="updateUser({ userId: currentUser.id, userParams: params })">Save</button>
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
        avatar: null,
        gender: null,
        name: '',
        email: ''
      }
    }
  },

  components: {
    SettingLayout
  },

  computed: {
    ...mapState('initialStates', [
      'currentUser'
    ])
  },

  methods: {
    ...mapActions('initialStates', [
      'updateUser'
    ]),

    setAvatarFile (e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.params.avatar = files[0]
    }
  },

  created () {
    Object.keys(this.params).forEach(key => { this.params[key] = this.currentUser[key] })
  }
}
</script>

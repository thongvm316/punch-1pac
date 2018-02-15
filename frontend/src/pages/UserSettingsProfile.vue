<template>
  <setting-layout sidebar-type="user" title="Settings for Troy Kozey" subtitle="Profile">
    <form class="setting-form">
      <div class="form-group">
        <label class="form-label">Avatar</label>
        <img class="img-profile" :src="userAvatarUrl" :alt="userName">
        <input class="form-input" type="file" v-model="params.avatar">
      </div>
      <div class="form-group">
        <label class="form-label">Name</label>
        <input class="form-input" type="text" :value="userName" placeholder="Name" v-model="params.name">
      </div>
      <div class="form-group">
        <label class="form-label">Gender</label>
        <label class="form-radio">
          <input type="radio" v-model="params.gender">
          <i class="form-icon"></i> Male
        </label>
        <label class="form-radio">
          <input type="radio" v-model="params.gender">
          <i class="form-icon"></i> Female
        </label>
      </div>
      <div class="form-group">
        <label class="form-label">Email</label>
        <input class="form-input" type="text" :value="userEmail" placeholder="Email" v-model="params.email">
      </div>
      <div class="form-group">
        <button type="button" class="btn" @click="updateUser(params)">Save</button>
      </div>
    </form>
  </setting-layout>
</template>

<script>
import SettingLayout from '../layouts/Setting.vue'

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
    companyName () {
      return window.INITIAL_STATE.company.name
    },

    companyLogoUrl () {
      return window.INITIAL_STATE.company.logo_url
    },

    userName () {
      return window.INITIAL_STATE.user.name
    },

    userEmail () {
      return window.INITIAL_STATE.user.email
    },

    userAvatarUrl () {
      return window.INITIAL_STATE.user.avatar_url
    }
  }
}
</script>

<template>
  <setting-layout>
    <h1>Settings for Troy Kozey</h1>
    <div class="columns">
      <div class="column col-3">
        <user-settings-sidebar></user-settings-sidebar>
      </div>
      <div class="column col-9">
        <h2 class="border-bottom">Profile</h2>
        <form class="setting-form">
          <div class="form-group">
            <label class="form-label" for="input-example-16">Avatar</label>
            <img :src="userAvatarUrl" :alt="userName">
            <input class="form-input" type="file" id="input-example-16">
          </div>
          <div class="form-group">
            <label class="form-label" for="input-example-17">Name</label>
            <input class="form-input" type="text" id="input-example-17" :value="userName" placeholder="Name">
          </div>
          <div class="form-group">
            <label class="form-label" for="input-example-18">Gender</label>
            <select class="form-select">
              <option>Choose an option</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label" for="input-example-21">Email</label>
            <input class="form-input" type="text" id="input-example-21" :value="userEmail" placeholder="Email">
          </div>
          <div class="form-group">
            <button type="button" class="btn">Save</button>
          </div>
        </form>
      </div>
    </div>
  </setting-layout>
</template>

<script>
import SettingLayout from '../layouts/Setting.vue'
import UserSettingsSidebar from '../components/UserSettingsSidebar.vue'

export default {
  components: {
    SettingLayout,
    UserSettingsSidebar
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

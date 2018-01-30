<template>
  <setting-layout sidebar-type="user" title="Settings for Troy Kozey" subtitle="Profile">
    <form class="setting-form">
      <div class="form-group">
        <label class="form-label" for="input-example-16">Avatar</label>
        <img  class="img-profile" :src="userAvatarUrl" :alt="userName">
        <input class="form-input" type="file" id="input-example-16">
      </div>
      <div class="form-group">
        <label class="form-label" for="input-example-17">Name</label>
        <input class="form-input" type="text" id="input-example-17" :value="userName" placeholder="Name">
      </div>
      <div class="form-group">
        <label class="form-label" for="input-example-18">Gender</label>
        <label class="form-radio">
          <input type="radio" name="gender" checked>
          <i class="form-icon"></i> Male
        </label>
        <label class="form-radio">
          <input type="radio" name="gender">
          <i class="form-icon"></i> Female
        </label>
      </div>
      <div class="form-group">
        <label class="form-label" for="input-example-21">Email</label>
        <input class="form-input" type="text" id="input-example-21" :value="userEmail" placeholder="Email">
      </div>
      <div class="form-group">
        <button type="button" class="btn">Save</button>
      </div>
    </form>
  </setting-layout>
</template>

<script>
import SettingLayout from '../layouts/Setting.vue'

export default {
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

<template>
  <setting-layout>
    <h1>Settings for Troy Kozey</h1>
    <div class="columns">
      <div class="column col-3">
        <user-settings-sidebar></user-settings-sidebar>
      </div>
      <div class="column col-9">
        <h2 class="border-bottom">Password</h2>
        <form class="setting-form">
          <div class="form-group">
            <label class="form-label" for="input-example-17">Current Password</label>
            <input class="form-input" type="text" id="input-example-17" placeholder="Name">
          </div>
          <div class="form-group">
            <label class="form-label" for="input-example-21">New Password</label>
            <input class="form-input" type="text" id="input-example-21" placeholder="Email">
          </div>
          <div class="form-group">
            <label class="form-label" for="input-example-17">New Password Confirmation</label>
            <input class="form-input" type="text" id="input-example-17" placeholder="Name">
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
  }
}
</script>

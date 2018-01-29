<template>
  <setting-layout sidebar-type="user" title="Settings for Troy Kozey" subtitle="Password">
    <form class="setting-form">
      <div class="form-group">
        <label class="form-label" for="input-example-17">Current Password</label>
        <input class="form-input" type="text" id="input-example-17">
      </div>
      <div class="form-group">
        <label class="form-label" for="input-example-21">New Password</label>
        <input class="form-input" type="text" id="input-example-21">
      </div>
      <div class="form-group">
        <label class="form-label" for="input-example-17">New Password Confirmation</label>
        <input class="form-input" type="text" id="input-example-17">
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
  }
}
</script>

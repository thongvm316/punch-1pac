<template>
  <setting-layout sidebar-type="company" title="Company Settings" subtitle="Add User">
    <form class="setting-form">
      <div class="form-group">
        <label class="form-label" for="input-example-1">Name</label>
        <input class="form-input" type="text" id="input-example-1" placeholder="Name">
      </div>
      <div class="form-group">
        <label class="form-label" for="input-example-2">Email</label>
        <input class="form-input" type="text" id="input-example-2" placeholder="Email">
      </div>
      <div class="form-group">
        <button type="button" class="btn">Submit</button>
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

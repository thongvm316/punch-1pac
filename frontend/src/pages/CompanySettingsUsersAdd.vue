<template>
  <setting-layout>
    <h1>Company Settings</h1>
    <div class="columns">
      <div class="column col-3">
        <company-settings-sidebar></company-settings-sidebar>
      </div>
      <div class="column col-9">
        <h2 class="border-bottom">Add User</h2>
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
      </div>
    </div>
  </setting-layout>
</template>

<script>
import SettingLayout from '../layouts/Setting.vue'
import CompanySettingsSidebar from '../components/CompanySettingsSidebar.vue'

export default {
  components: {
    SettingLayout,
    CompanySettingsSidebar
  }
}
</script>

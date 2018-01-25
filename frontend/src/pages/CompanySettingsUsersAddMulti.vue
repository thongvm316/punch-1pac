<template>
  <setting-layout>
    <h1>Company Settings</h1>
    <div class="columns">
      <div class="column col-3">
        <company-settings-sidebar></company-settings-sidebar>
      </div>
      <div class="column col-9">
        <h2 class="border-bottom">Add Multiple Users</h2>
        <form class="setting-form">
          <div class="form-group">
            <label class="form-label" for="input-example-1">CSV/XLS/XLSX/ODS file</label>
            <input class="form-input" type="file" id="input-example-1">
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

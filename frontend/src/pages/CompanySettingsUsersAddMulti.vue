<template>
  <setting-layout sidebar-type="company" title="Company Settings" subtitle="Add Multiple Users">
    <form class="setting-form">
      <div class="form-group">
        <label class="form-label" for="input-example-1">CSV/XLS/XLSX/ODS file</label>
        <input class="form-input" type="file" id="input-example-1">
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

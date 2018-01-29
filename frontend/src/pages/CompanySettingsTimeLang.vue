<template>
  <setting-layout sidebar-type="company" title="Company Settings" subtitle="Timezone and Language">
    <form class="setting-form">
      <div class="form-group">
        <label class="form-label" for="input-example-1">Timezone</label>
        <select class="form-select" id="input-example-1">
          <option selected>Asia/Bangkok</option>
          <option>HaNoi/Jakata/Bejing</option>
          <option>South Africa</option>
          <option>Japan/Korea</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label" for="input-example-2">Language</label>
        <select class="form-select" id="input-example-2">
          <option selected>en</option>
          <option>fr</option>
          <option>jp</option>
          <option>vn</option>
        </select>
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

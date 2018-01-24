<template>
  <setting-layout>
    <h1>Settings for Troy Kozey</h1>
    <div class="columns">
      <div class="column col-3">
        <user-settings-sidebar></user-settings-sidebar>
      </div>
      <div class="column col-9">
        <h2 class="border-bottom">Security</h2>
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

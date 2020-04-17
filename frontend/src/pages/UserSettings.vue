<template>
  <setting-layout>
    <template slot="sidebar">
      <user-settings-sidebar @active="activeTabName = $event" />
    </template>

    <keep-alive>
      <component :is="`UserSettings${activeTabName}`" />
    </keep-alive>
  </setting-layout>
</template>

<script>
import SettingLayout from '@/layouts/Setting'
import UserSettingsSidebar from '@/components/UserSettingsSidebar'
import UserSettingsProfile from '@/pages/UserSettingsProfile'
import UserSettingsPassword from '@/pages/UserSettingsPassword'
import UserSettingsSecurity from '@/pages/UserSettingsSecurity'

export default {
  name: 'UserSettings',

  components: {
    SettingLayout,
    UserSettingsSidebar,
    UserSettingsProfile,
    UserSettingsPassword,
    UserSettingsSecurity
  },

  data() {
    return {
      activeTabName: 'Profile'
    }
  }
}
</script>

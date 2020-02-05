<template>
  <setting-layout>
    <template slot="sidebar">
      <user-settings-sidebar @activeTab="value => { activeTabName = value }" />
    </template>
    <user-settings-profile v-show="activeTabName === 'profile'" />
    <user-settings-password v-show="activeTabName === 'password'" />
    <user-settings-security v-show="activeTabName === 'security'" />
  </setting-layout>
</template>

<script>
const SettingLayout = () => import('../layouts/Setting')
const UserSettingsSidebar = () => import('../components/UserSettingsSidebar')
const UserSettingsProfile = () => import('./UserSettingsProfile')
const UserSettingsPassword = () => import('./UserSettingsPassword')
const UserSettingsSecurity = () => import('./UserSettingsSecurity')

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
      activeTabName: 'profile'
    }
  }
}
</script>

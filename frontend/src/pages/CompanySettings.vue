<template>
  <setting-layout>
    <template slot="sidebar">
      <company-settings-sidebar @activeTab="value => { activeTabName = value }" />
    </template>

    <company-settings-profile v-show="activeTabName === 'profile'" />
    <company-settings-users v-show="activeTabName === 'users'" />
    <company-settings-holidays v-show="activeTabName === 'holidays'" />
    <company-settings-business-days v-show="activeTabName === 'business-days'" />
    <company-settings-allowed-ips v-show="activeTabName === 'allowed-ips'" />
  </setting-layout>
</template>

<script>
const SettingLayout = () => import('../layouts/Setting')
const CompanySettingsSidebar = () => import('../components/CompanySettingsSidebar')
const CompanySettingsProfile = () => import('./CompanySettingsProfile')
const CompanySettingsUsers = () => import('./CompanySettingsUsers')
const CompanySettingsBusinessDays = () => import('./CompanySettingsBusinessDays')
const CompanySettingsHolidays = () => import('./CompanySettingsHolidays')
const CompanySettingsAllowedIps = () => import('./CompanySettingsAllowedIPs')

export default {
  name: 'UserSettings',

  components: {
    SettingLayout,
    CompanySettingsSidebar,
    CompanySettingsProfile,
    CompanySettingsUsers,
    CompanySettingsBusinessDays,
    CompanySettingsHolidays,
    CompanySettingsAllowedIps
  },

  data() {
    return {
      activeTabName: 'profile'
    }
  }
}
</script>

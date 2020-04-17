<template>
  <setting-layout>
    <template slot="sidebar">
      <company-settings-sidebar @active="activeTabName = $event" />
    </template>

    <keep-alive>
      <component :is="`CompanySettings${activeTabName}`" />
    </keep-alive>
  </setting-layout>
</template>

<script>
import SettingLayout from '@/layouts/Setting'
import CompanySettingsSidebar from '@/components/CompanySettingsSidebar'
import CompanySettingsProfile from '@/pages/CompanySettingsProfile'
import CompanySettingsUsers from '@/pages/CompanySettingsUsers'
import CompanySettingsBusinessDays from '@/pages/CompanySettingsBusinessDays'
import CompanySettingsHolidays from '@/pages/CompanySettingsHolidays'
import CompanySettingsAllowedIps from '@/pages/CompanySettingsAllowedIps'

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
      activeTabName: 'Profile'
    }
  }
}
</script>

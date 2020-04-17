<template>
  <ul class="setting-sidebar">
    <li
      :class="{ active: activeTabName === 'Profile' }"
      @click.prevent="setActive('Profile')"
    >
      <p-ico-company-profile />
      {{ $t('sidebar.company.profile') }}
    </li>
    <li
      :class="{ active: activeTabName === 'Users' }"
      @click.prevent="setActive('Users')"
    >
      <p-ico-users />
      {{ $t('sidebar.company.users') }}
    </li>
    <li
      :class="{ active: activeTabName === 'BusinessDays' }"
      @click.prevent="setActive('BusinessDays')"
    >
      <p-ico-business-day />
      {{ $t('sidebar.company.businessDays') }}
    </li>
    <li
      :class="{ active: activeTabName === 'Holidays' }"
      @click.prevent="setActive('Holidays')"
    >
      <p-ico-holiday />
      {{ $t('sidebar.company.holidays') }}
    </li>
    <li
      :class="{ active: activeTabName === 'AllowedIps' }"
      @click.prevent="setActive('AllowedIps')"
    >
      <p-ico-allowed-ip />
      {{ $t('sidebar.company.allowedIPs') }}
    </li>
  </ul>
</template>

<script>
import activeTab from '../mixins/active-tab'
import PIcoCompanyProfile from '@/punch-ui/punch-icons/PIcoCompanyProfile'
import PIcoUsers from '@/punch-ui/punch-icons/PIcoUsers'
import PIcoBusinessDay from '@/punch-ui/punch-icons/PIcoBusinessDay'
import PIcoHoliday from '@/punch-ui/punch-icons/PIcoHoliday'
import PIcoAllowedIp from '@/punch-ui/punch-icons/PIcoAllowedIp'

export default {
  name: 'CompanySettingsSidebar',

  components: {
    PIcoCompanyProfile,
    PIcoUsers,
    PIcoBusinessDay,
    PIcoHoliday,
    PIcoAllowedIp
  },

  mixins: [activeTab]
}
</script>

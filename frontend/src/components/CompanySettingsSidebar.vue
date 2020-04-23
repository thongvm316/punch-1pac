<template>
  <ul class="setting-sidebar">
    <li
      :class="{ active: activeTabName === 'Profile' }"
      @click="setActive('Profile')"
    >
      <p-ico-company-profile />
      {{ $t('sidebar.company.profile') }}
    </li>
    <li
      :class="{ active: activeTabName === 'Users' }"
      @click="setActive('Users')"
    >
      <p-ico-users />
      {{ $t('sidebar.company.users') }}
    </li>
    <li
      :class="{ active: activeTabName === 'BusinessDays' }"
      @click="setActive('BusinessDays')"
    >
      <p-ico-business-day />
      {{ $t('sidebar.company.businessDays') }}
    </li>
    <li
      :class="{ active: activeTabName === 'Holidays' }"
      @click="setActive('Holidays')"
    >
      <p-ico-holiday />
      {{ $t('sidebar.company.holidays') }}
    </li>
    <li
      :class="{ active: activeTabName === 'AllowedIps' }"
      @click="setActive('AllowedIps')"
    >
      <p-ico-allowed-ip />
      {{ $t('sidebar.company.allowedIPs') }}
    </li>
  </ul>
</template>

<script>
import activeTab from '@/mixins/active-tab'
const PIcoCompanyProfile = () => import('@/punch-ui/punch-icons/PIcoCompanyProfile')
const PIcoUsers = () => import('@/punch-ui/punch-icons/PIcoUsers')
const PIcoBusinessDay = () => import('@/punch-ui/punch-icons/PIcoBusinessDay')
const PIcoHoliday = () => import('@/punch-ui/punch-icons/PIcoHoliday')
const PIcoAllowedIp = () => import('@/punch-ui/punch-icons/PIcoAllowedIp')

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

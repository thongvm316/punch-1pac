<template>
  <ul class="setting-sidebar">
    <li>
      <a
        href="#profile"
        :class="{ active: activeTabName === 'profile' }"
        @click.prevent="setActive('profile')"
      >
        <p-ico-company-profile />
        {{ $t('sidebar.company.profile') }}
      </a>
    </li>
    <li>
      <a
        href="#users"
        :class="{ active: activeTabName === 'users' }"
        @click.prevent="setActive('users')"
      >
        <p-ico-users />
        {{ $t('sidebar.company.users') }}
      </a>
    </li>
    <li>
      <a
        href="#business-days"
        :class="{ active: activeTabName === 'business-days' }"
        @click.prevent="setActive('business-days')"
      >
        <p-ico-business-day />
        {{ $t('sidebar.company.businessDays') }}
      </a>
    </li>
    <li>
      <a
        href="#holidays"
        :class="{ active: activeTabName === 'holidays' }"
        @click.prevent="setActive('holidays')"
      >
        <p-ico-holiday />
        {{ $t('sidebar.company.holidays') }}
      </a>
    </li>
    <li>
      <a
        href="#allowed-ips"
        :class="{ active: activeTabName === 'allowed-ips' }"
        @click.prevent="setActive('allowed-ips')"
      >
        <p-ico-allowed-ip />
        {{ $t('sidebar.company.allowedIPs') }}
      </a>
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

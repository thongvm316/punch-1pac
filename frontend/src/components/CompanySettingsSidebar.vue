<template>
  <ul class="setting-sidebar">
    <li><router-link to="/company/settings/profile">{{ $t('sidebar.profile') }}</router-link></li>
    <li><router-link to="/company/settings/timelang">{{ $t('sidebar.timezoneAndLanguage') }}</router-link></li>
    <li><router-link to="/company/settings/users">{{ $t('sidebar.users') }}</router-link></li>
    <li><router-link to="/company/settings/business-days">{{ $t('sidebar.bussinessDays') }}</router-link></li>
    <li><router-link to="/company/settings/holidays">{{ $t('sidebar.holidays') }}</router-link></li>
    <li><router-link to="/company/settings/allowed-ips">{{ $t('sidebar.allowedIPs') }}</router-link></li>
  </ul>
</template>

<script>
export default {
  name: 'company-settings-sidebar'
}
</script>

<template>
  <ul class="setting-sidebar">
    <li><router-link to="/company/settings/profile">{{ $t('sidebar.company.profile') }}</router-link></li>
    <li><router-link to="/company/settings/timelang">{{ $t('sidebar.company.timezoneAndLanguage') }}</router-link></li>
    <li><router-link to="/company/settings/users">{{ $t('sidebar.company.users') }}</router-link></li>
    <li><router-link to="/company/settings/business-days">{{ $t('sidebar.company.bussinessDays') }}</router-link></li>
    <li><router-link to="/company/settings/holidays">{{ $t('sidebar.company.holidays') }}</router-link></li>
    <li><router-link to="/company/settings/allowed-ips">{{ $t('sidebar.company.allowedIPs') }}</router-link></li>
  </ul>
</template>

<script>
export default {
  name: 'company-settings-sidebar'
}
</script>

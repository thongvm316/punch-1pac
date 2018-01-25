<template>
  <ul class="setting-sidebar">
    <li><router-link to="/company/settings/profile">Profile</router-link></li>
    <li><router-link to="/company/settings/timelang">Timezone and Language</router-link></li>
    <li><router-link to="/company/settings/users">Users</router-link></li>
    <li><router-link to="/company/settings/departments">Departments</router-link></li>
    <li><router-link to="/company/settings/business-days">Business days</router-link></li>
    <li><router-link to="/company/settings/holidays">Holidays</router-link></li>
    <li><router-link to="/company/settings/allowed-ips">Allowed IPs</router-link></li>
  </ul>
</template>

<script>
export default {
  name: 'company-settings-sidebar'
}
</script>

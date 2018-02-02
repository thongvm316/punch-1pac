<template>
  <ul class="setting-sidebar">
    <li><router-link to="/settings/profile">{{ $t('sidebar.profile') }}</router-link></li>
    <li><router-link to="/settings/password">{{ $t('sidebar.password') }}</router-link></li>
    <li><router-link to="/settings/security">{{ $t('sidebar.security') }}</router-link></li>
  </ul>
</template>

<script>
export default {
  name: 'user-settings-sidebar'
}
</script>

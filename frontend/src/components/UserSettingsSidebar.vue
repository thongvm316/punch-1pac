<template>
  <ul class="setting-sidebar">
    <li><router-link to="/settings/profile">{{ $t('sidebar.user.profile') }}</router-link></li>
    <li><router-link to="/settings/password">{{ $t('sidebar.user.password') }}</router-link></li>
    <li><router-link to="/settings/security">{{ $t('sidebar.user.security') }}</router-link></li>
  </ul>
</template>

<script>
export default {
  name: 'user-settings-sidebar'
}
</script>

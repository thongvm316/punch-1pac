<template>
  <ul class="setting-sidebar">
    <li><router-link to="/settings/profile">Profile</router-link></li>
    <li><router-link to="/settings/password">Password</router-link></li>
    <li><router-link to="/settings/security">Security</router-link></li>
  </ul>
</template>

<script>
export default {
  name: 'user-settings-sidebar'
}
</script>

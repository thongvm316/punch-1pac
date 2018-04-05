<template>
  <setting-layout sidebar-type="user" :title="$t('user.title', { name: currentUser.name })" :subtitle="$t('user.profile.title')">
    <user-profile :targetUser="currentUser" :self="true"/>
  </setting-layout>
</template>

<script>
import SettingLayout from '../layouts/Setting'
import UserProfile from '../components/UserProfile'

export default {
  components: {
    SettingLayout,
    UserProfile
  }
}
</script>

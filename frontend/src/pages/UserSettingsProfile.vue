<template>
  <setting-layout sidebar-type="user" :title="$t('user.title', { name: currentUser.name })" :subtitle="$t('user.profile.title')">
    <user-profile :targetUser="currentUser"/>
  </setting-layout>
</template>

<script>
const SettingLayout = () => import('../layouts/Setting')
const UserProfile = () => import('../components/UserProfile')

export default {
  components: {
    SettingLayout,
    UserProfile
  }
}
</script>

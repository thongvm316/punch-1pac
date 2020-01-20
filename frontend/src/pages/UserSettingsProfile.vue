<template>
  <div>
    <h2>{{ $t('user.profile.title') }}</h2>
    <user-profile :targetUser="currentUser"/>
  </div>
</template>

<script>
const UserProfile = () => import('../components/UserProfile')

export default {
  components: {
    UserProfile
  }
}
</script>

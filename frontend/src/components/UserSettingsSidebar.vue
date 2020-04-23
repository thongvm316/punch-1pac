<template>
  <ul class="setting-sidebar">
    <li
      :class="{ active: activeTabName === 'Profile' }"
      @click="setActive('Profile')"
    >
      <p-ico-user />
      {{ $t('sidebar.user.profile') }}
    </li>
    <li
      :class="{ active: activeTabName === 'Password' }"
      @click="setActive('Password')"
    >
      <p-ico-key />
      {{ $t('sidebar.user.password') }}
    </li>
    <li
      :class="{ active: activeTabName === 'Security' }"
      @click="setActive('Security')"
    >
      <p-ico-shield />
      {{ $t('sidebar.user.security') }}
    </li>
  </ul>
</template>

<script>
import activeTab from '@/mixins/active-tab'
const PIcoUser = () => import('@/punch-ui/punch-icons/PIcoUser')
const PIcoKey = () => import('@/punch-ui/punch-icons/PIcoKey')
const PIcoShield = () => import('@/punch-ui/punch-icons/PIcoShield')

export default {
  name: 'UserSettingsSidebar',

  components: {
    PIcoUser,
    PIcoKey,
    PIcoShield
  },

  mixins: [activeTab]
}
</script>

<template>
  <ul class="setting-sidebar">
    <li
      :class="{ active: activeTabName === 'Profile' }"
      @click.prevent="setActive('Profile')"
    >
      <p-ico-user />
      {{ $t('sidebar.user.profile') }}
    </li>
    <li
      :class="{ active: activeTabName === 'Password' }"
      @click.prevent="setActive('Password')"
    >
      <p-ico-key />
      {{ $t('sidebar.user.password') }}
    </li>
    <li
      :class="{ active: activeTabName === 'Security' }"
      @click.prevent="setActive('Security')"
    >
      <p-ico-shield />
      {{ $t('sidebar.user.security') }}
    </li>
  </ul>
</template>

<script>
import PIcoUser from '@/punch-ui/punch-icons/PIcoUser'
import PIcoKey from '@/punch-ui/punch-icons/PIcoKey'
import PIcoShield from '@/punch-ui/punch-icons/PIcoShield'
import activeTab from '../mixins/active-tab'

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

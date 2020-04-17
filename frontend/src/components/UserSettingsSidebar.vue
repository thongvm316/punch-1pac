<template>
  <ul class="setting-sidebar">
    <li>
      <a
        href="#profile"
        :class="{ active: activeTabName === 'profile' }"
        @click.prevent="setActive('profile')"
      >
        <p-ico-user />
        {{ $t('sidebar.user.profile') }}
      </a>
    </li>
    <li>
      <a
        href="#password"
        :class="{ active: activeTabName === 'password' }"
        @click.prevent="setActive('password')"
      >
        <p-ico-key />
        {{ $t('sidebar.user.password') }}
      </a>
    </li>
    <li>
      <a
        href="#security"
        :class="{ active: activeTabName === 'security' }"
        @click.prevent="setActive('security')"
      >
        <p-ico-shield />
        {{ $t('sidebar.user.security') }}
      </a>
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

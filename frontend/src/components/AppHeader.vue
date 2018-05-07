<template>
  <header class="header">
    <div class="container">
      <div class="navbar">
        <section class="navbar-section">
          <router-link to="/dashboard" class="navbar-brand mr-4">
            <img :src="currentCompany.logo_url" :alt="currentCompany.name">
          </router-link>
          <router-link class="mr-5" to="/dashboard">{{ $t('header.dashboard') }}</router-link>
          <router-link class="mr-5" to="/attendances">{{ $t('header.attendances') }}</router-link>
          <router-link class="mr-5" to="/requests">{{ $t('header.requests') }}</router-link>
          <router-link class="mr-5" to="/groups" v-if="$auth('Page', currentUser).canViewGroups()">{{ $t('header.groups') }}</router-link>
        </section>
        <section class="navbar-section">
          <punch/>
          <annual-leave/>
          <notifications/>
          <div class="dropdown" :class="{ active: isDropdownActive }" @click="toggleDropdown" ref="dropdownMenu">
            <a class="dropdown-toggle">
              <div class="tile tile-centered mr-2">
                <div class="tile-icon">
                  <img :src="currentUser.avatar_url" class="avatar avatar-md" :alt="currentUser.name">
                </div>
                <div class="tile-content">{{ currentUser.name }}</div>
              </div>
            </a>
            <ul class="menu triangle-top">
              <li class="menu-item"><router-link to="/settings">{{ $t('header.settings') }}</router-link></li>
              <li class="menu-item"><router-link to="/company/settings" v-if="$auth('Page', currentUser).canViewCompanySettings()">{{ $t('header.companySettings') }}</router-link></li>
              <li class="menu-item"><a href="#" @click="logout($event)">{{ $t('header.logout') }}</a></li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  </header>
</template>

<script>
import axios from 'axios'
import dropdown from '../mixins/dropdown'
import Notifications from './Notifications'
import Punch from './Punch'
import AnnualLeave from './AnnualLeave'
import { mapState } from 'vuex'

export default {
  name: 'app-header',
  mixins: [dropdown],

  components: {
    Notifications,
    AnnualLeave,
    Punch
  },

  methods: {
    logout () {
      axios.post('/logout', {}, { baseURL: '' }).then(() => { window.location.href = '/' })
    },

    toggleDropdown () {
      this.isDropdownActive = !this.isDropdownActive
    }
  },

  computed: {
    ...mapState('initialStates', [
      'currentCompany'
    ])
  }
}
</script>

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
                <div class="tile-action">
                  <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 292.362 292.362" fill="currentColor" fillrule="evenodd"><path d="M286.935,69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952,0-9.233,1.807-12.85,5.424 C1.807,72.998,0,77.279,0,82.228c0,4.948,1.807,9.229,5.424,12.847l127.907,127.907c3.621,3.617,7.902,5.428,12.85,5.428  s9.233-1.811,12.847-5.428L286.935,95.074c3.613-3.617,5.427-7.898,5.427-12.847C292.362,77.279,290.548,72.998,286.935,69.377z"/></svg>
                </div>
              </div>
            </a>
            <ul class="menu">
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

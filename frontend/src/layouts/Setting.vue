<template>
  <div>
    <app-header></app-header>
    <main>
      <div class="container grid-xl">
        <h1 class="title">{{ title }}</h1>
        <div class="columns">
          <div class="column col-3">
            <company-settings-sidebar v-if="sidebarType === 'company'"/>
            <user-settings-sidebar v-if="sidebarType === 'user'"/>
          </div>

          <div class="column col-9">
            <h2 class="subtitle">{{ subtitle }}</h2>
            <slot></slot>
          </div>
        </div>
      </div>
    </main>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import CompanySettingsSidebar from '../components/CompanySettingsSidebar.vue'
import UserSettingsSidebar from '../components/UserSettingsSidebar.vue'

export default {
  name: 'setting-layout',
  props: ['sidebarType', 'title', 'subtitle'],
  components: {
    AppHeader,
    AppFooter,
    UserSettingsSidebar,
    CompanySettingsSidebar
  }
}
</script>

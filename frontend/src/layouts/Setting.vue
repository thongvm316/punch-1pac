<template>
  <div>
    <app-header></app-header>
    <main>
      <div class="container grid-xl mt-10">
        <div class="columns">
          <div class="column col-3">
            <company-settings-sidebar v-if="sidebarType === 'company'"/>
            <user-settings-sidebar v-if="sidebarType === 'user'"/>
          </div>

          <div class="column col-9">
            <div class="box-setting">
              <h1 class="m-0">{{ subtitle }}</h1>
              <p>This is a description line for this setting panels.</p>
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </main>
    <app-footer></app-footer>
    <flash/>
    <popup-change-password/>
  </div>
</template>

<script>
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import CompanySettingsSidebar from '../components/CompanySettingsSidebar.vue'
import UserSettingsSidebar from '../components/UserSettingsSidebar.vue'
import Flash from '../components/Flash.vue'
import PopupChangePassword from '../components/PopupChangePassword'

export default {
  name: 'setting-layout',
  props: ['sidebarType', 'title', 'subtitle'],
  components: {
    AppHeader,
    AppFooter,
    UserSettingsSidebar,
    CompanySettingsSidebar,
    Flash,
    PopupChangePassword
  }
}
</script>

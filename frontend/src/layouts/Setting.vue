<template>
  <div>
    <main>
      <div class="container grid-xl mt-10">
        <div class="columns">
          <div class="column col-3">
            <company-settings-sidebar v-if="sidebarType === 'company'"/>
            <user-settings-sidebar v-if="sidebarType === 'user'"/>
          </div>

          <div class="column col-9">
            <div class="box-setting">
              <h2>{{ subtitle }}</h2>
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
const CompanySettingsSidebar = () => import('../components/CompanySettingsSidebar.vue')
const UserSettingsSidebar = () => import('../components/UserSettingsSidebar.vue')

export default {
  name: 'setting-layout',

  props: {
    sidebarType: {
      type: String,
      required: true
    },

    subtitle: {
      type: String,
      required: true
    }
  },

  components: {
    UserSettingsSidebar,
    CompanySettingsSidebar
  }
}
</script>

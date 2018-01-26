<template>
  <setting-layout>
    <h1>Settings for Troy Kozey</h1>
    <div class="columns">
      <div class="column col-3">
        <user-settings-sidebar></user-settings-sidebar>
      </div>
      <div class="column col-9">
        <h2 class="border-bottom">Security</h2>
        <table class="table table-hover bg-light mt-5">
          <tbody>
            <tr>
              <td>
                <div class="tile tile-centered">
                  <div class="tile-icon">
                    <figure class="avatar avatar-lg"><img :src="userAvatarUrl" class="avatar avatar-md"></figure>
                  </div>
                  <div class="tile-content">
                    <p class="tile-title"><span class="text-bold">Chrome on Mac</span> (qiita.com)</p>
                    <p class="tile-subtitle text-gray">You current session</p>
                    <p class="tile-subtitle text-gray">Signed in: 2017-12-29</p>
                  </div>
                </div>
              </td>
              <td class="text-right"></td>
            </tr>
            <tr class="inactive">
              <td>
                <div class="tile tile-centered">
                  <div class="tile-icon">
                    <figure class="avatar avatar-lg"><img :src="userAvatarUrl" class="avatar avatar-md"></figure>
                  </div>
                  <div class="tile-content">
                    <p class="tile-title"><span class="text-bold">Chrome on Mac</span> (qiita.com)</p>
                    <p class="tile-subtitle text-gray">Last accessed on: 2017-12-24</p>
                    <p class="tile-subtitle text-gray">Signed in: 2017-05-09</p>
                  </div>
                </div>
              </td>
              <td class="text-right"><button class="btn btn-error">Revoke</button></td>
            </tr>
            <tr class="inactive">
              <td>
                <div class="tile tile-centered">
                  <div class="tile-icon">
                    <figure class="avatar avatar-lg"><img :src="userAvatarUrl" class="avatar avatar-md"></figure>
                  </div>
                  <div class="tile-content">
                    <p class="tile-title"><span class="text-bold">Chrome on Mac</span> (qiita.com)</p>
                    <p class="tile-subtitle text-gray">Last accessed on: 2017-07-05</p>
                    <p class="tile-subtitle text-gray">Signed in: 2017-04-15</p>
                  </div>
                </div>
              </td>
              <td class="text-right"><button class="btn btn-error">Revoke</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </setting-layout>
</template>

<script>
import SettingLayout from '../layouts/Setting.vue'
import UserSettingsSidebar from '../components/UserSettingsSidebar.vue'

export default {
  components: {
    SettingLayout,
    UserSettingsSidebar
  },
  computed: {
    userAvatarUrl () {
      return window.INITIAL_STATE.user.avatar_url
    }
  }
}
</script>

<style lang="scss" scoped>
  .inactive {
    background: #f0f1f4;
  }
</style>

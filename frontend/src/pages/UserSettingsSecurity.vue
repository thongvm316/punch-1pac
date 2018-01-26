<template>
  <setting-layout>
    <h1>Settings for Troy Kozey</h1>
    <div class="columns">
      <div class="column col-3">
        <user-settings-sidebar></user-settings-sidebar>
      </div>
      <div class="column col-9">
        <h2 class="border-bottom">Security</h2>
        <div class="tile bg-light">
          <div class="tile-icon">
            <figure class="avatar avatar-lg"><svg height="48" version="1.1" viewBox="0 0 16 16" width="48"><path fill-rule="evenodd" d="M15 2H1c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h5.34c-.25.61-.86 1.39-2.34 2h8c-1.48-.61-2.09-1.39-2.34-2H15c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm0 9H1V3h14v8z"></path></svg></figure>
          </div>
          <div class="tile-content">
            <p class="tile-title"><span class="text-bold">Chrome on Mac</span> (qiita.com)</p>
            <p class="tile-subtitle text-gray">You current session <button class="info-expand ml-4" @click="toggleInfo">...</button></p>
            <div class="signin-info" v-show="isInfoOpen">
              <p class="tile-subtitle text-gray">Chrome no OS X 10.12.6</p>
              <p class="tile-subtitle text-gray">Location: Ho Chi Minh City, Ho Chi Minh City, Vietnam</p>
              <p class="tile-subtitle text-gray">Signed in: 2017-12-29</p>
            </div>
          </div>
          <div class="tile-action text-right"><button class="btn btn-error">Revoke</button></div>
        </div>
        <div class="tile inactive">
          <div class="tile-icon">
            <figure class="avatar avatar-lg"><svg height="48" version="1.1" viewBox="0 0 16 16" width="48"><path fill-rule="evenodd" d="M15 2H1c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h5.34c-.25.61-.86 1.39-2.34 2h8c-1.48-.61-2.09-1.39-2.34-2H15c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm0 9H1V3h14v8z"></path></svg></figure>
          </div>
          <div class="tile-content">
            <p class="tile-title"><span class="text-bold">Chrome on Mac</span> (qiita.com)</p>
            <p class="tile-subtitle text-gray">Last accessed on: 2017-07-05</p>
            <p class="tile-subtitle text-gray">Signed in: 2017-04-15</p>
          </div>
          <div class="tile-action text-right"><button class="btn btn-error">Revoke</button></div>
        </div>
        <div class="tile inactive">
          <div class="tile-icon">
            <figure class="avatar avatar-lg"><svg height="48" version="1.1" viewBox="0 0 16 16" width="48"><path fill-rule="evenodd" d="M15 2H1c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h5.34c-.25.61-.86 1.39-2.34 2h8c-1.48-.61-2.09-1.39-2.34-2H15c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm0 9H1V3h14v8z"></path></svg></figure>
          </div>
          <div class="tile-content">
            <p class="tile-title"><span class="text-bold">Chrome on Mac</span> (qiita.com)</p>
            <p class="tile-subtitle text-gray">Last accessed on: 2017-07-05</p>
            <p class="tile-subtitle text-gray">Signed in: 2017-04-15</p>
          </div>
          <div class="tile-action text-right"><button class="btn btn-error">Revoke</button></div>
        </div>
      </div>
    </div>
  </setting-layout>
</template>

<script>
import SettingLayout from '../layouts/Setting.vue'
import UserSettingsSidebar from '../components/UserSettingsSidebar.vue'

export default {
  data () {
    return {
      isInfoOpen: false
    }
  },
  components: {
    SettingLayout,
    UserSettingsSidebar
  },
  methods: {
    toggleInfo () {
      this.isInfoOpen = !this.isInfoOpen
    }
  }
}
</script>

<style lang="scss" scoped>
  .inactive {
    background: #f0f1f4;
  }
  .tile-action .btn {
    font-size: .7rem;
  }
  .tile {
    padding: .8rem;

    .tile-content:not(:last-child) {
      padding-right: 1rem;
    }

    .tile-content:not(:first-child) {
      padding-left: 1rem;
    }
  }
  .info-expand {
    display: inline-block;
    height: 12px;
    padding: 0 5px 5px;
    font-size: 12px;
    font-weight: 600;
    line-height: 6px;
    color: #444d56;
    text-decoration: none;
    vertical-align: middle;
    background: #dfe2e5;
    border: 0;
    outline: none;
    border-radius: 1px;
    cursor: pointer;
  }
  .signin-info {
    border-top: 1px solid #caced7;
    padding-top: .8rem;
  }
</style>

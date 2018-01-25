<template>
  <setting-layout>
    <h1>Company Settings</h1>
    <div class="columns">
      <div class="column col-3">
        <company-settings-sidebar></company-settings-sidebar>
      </div>
      <div class="column col-9">
        <h2 class="border-bottom">Allowed IPs</h2>
        <div class="form-group form-group-select d-inline-block">
          <input type="" name="">
        </div>
        <div class="form-group d-inline-block">
          <input class="form-input" type="text" placeholder="Filter IP by name">
        </div>
        <div class="float-right">
            <a class="btn group-icon">
              Add IP
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
            </a>
          </div>
        <table class="table table-hover mt-4">
          <thead>
            <th>IP Address</th>
            <th class="text-right">Created at</th>
            <th></th>
          </thead>
          <tbody>
            <tr>
              <td>112.244.12.0</td>
              <td class="text-right">20-01-2018</td>
              <td class="text-center"><button class="btn btn-error">Delete</button></td>
            </tr>
            <tr>
              <td>112.244.12.1</td>
              <td class="text-right">20-01-2018</td>
              <td class="text-center"><button class="btn btn-error">Delete</button></td>
            </tr>
            <tr>
              <td>112.244.12.2</td>
              <td class="text-right">20-01-2018</td>
              <td class="text-center"><button class="btn btn-error">Delete</button></td>
            </tr>
            <tr>
              <td>112.244.12.3</td>
              <td class="text-right">20-01-2018</td>
              <td class="text-center"><button class="btn btn-error">Delete</button></td>
            </tr>
            <tr>
              <td>112.244.12.4</td>
              <td class="text-right">20-01-2018</td>
              <td class="text-center"><button class="btn btn-error">Delete</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </setting-layout>
</template>

<script>
import SettingLayout from '../layouts/Setting.vue'
import CompanySettingsSidebar from '../components/CompanySettingsSidebar.vue'

export default {
  components: {
    SettingLayout,
    CompanySettingsSidebar
  }
}
</script>

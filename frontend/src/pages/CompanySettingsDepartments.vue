<template>
  <setting-layout>
    <h1>Company Settings</h1>
    <div class="columns">
      <div class="column col-3">
        <company-settings-sidebar></company-settings-sidebar>
      </div>
      <div class="column col-9">
        <h2 class="border-bottom">Departments</h2>
        <div class="text-right">
          <button class="btn group-icon">
            Add Department
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
          </button>
        </div>
        <table class="table table-hover mt-4">
          <thead>
            <th>Name</th>
            <th>Members</th>
            <th></th>
          </thead>
          <tbody>
            <tr>
              <td>IT</td>
              <td>5</td>
              <td class="text-center"><button class="btn btn-error">Delete</button></td>
            </tr>
            <tr>
              <td>Marketing</td>
              <td>2</td>
              <td class="text-center"><button class="btn btn-error">Delete</button></td>
            </tr>
            <tr>
              <td>HR</td>
              <td>3</td>
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

<template>
  <setting-layout>
    <h1>Company Settings</h1>
    <div class="columns">
      <div class="column col-3">
        <company-settings-sidebar></company-settings-sidebar>
      </div>
      <div class="column col-9">
        <h2 class="border-bottom">Users</h2>
        <div class="form-group d-inline-block">
          <input class="form-input" type="text" placeholder="Filter user by name">
        </div>
        <div class="float-right">
          <a href="#" class="btn btn-primary group-icon">Add User
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"></path></svg>
          </a>
          <a href="#" class="btn group-icon">Add Multiple Users
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"></path></svg>
          </a>
        </div>
        <table class="table table-hover mt-4">
          <thead>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
            <th></th>
          </thead>
          <tbody>
            <tr>
              <td>Minh Phan</td>
              <td>wofi.minh@1pac.vn</td>
              <td>Member</td>
              <td>20-01-2018</td>
              <td>
                <button class="btn btn-error">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Minh Phan</td>
              <td>wofi.minh@1pac.vn</td>
              <td>Member</td>
              <td>20-01-2018</td>
              <td>
                <button class="btn btn-error">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Minh Phan</td>
              <td>wofi.minh@1pac.vn</td>
              <td>Member</td>
              <td>20-01-2018</td>
              <td>
                <button class="btn btn-error">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Minh Phan</td>
              <td>wofi.minh@1pac.vn</td>
              <td>Member</td>
              <td>20-01-2018</td>
              <td>
                <button class="btn btn-error">Delete</button>
              </td>
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

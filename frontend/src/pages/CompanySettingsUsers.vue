<template>
  <setting-layout sidebar-type="company" title="Company Settings" subtitle="Users">
    <div class="toolbar mt-5 clearfix">
      <input type="text" class="form-input" placeholder="Filter user by email">
      <router-link to="/company/settings/users/add" tag="button" class="btn float-right">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"></path></svg>
        Add User
      </router-link>
      <router-link to="/company/settings/users/add-multi" tag="button" class="btn float-right">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"></path></svg>
        Add Multiple Users
      </router-link>
    </div>

    <table class="table table-hover bg-light mt-5">
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
  </setting-layout>
</template>

<script>
import SettingLayout from '../layouts/Setting.vue'

export default {
  components: {
    SettingLayout
  }
}
</script>

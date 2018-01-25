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
          <a href="#add-deparment" class="btn group-icon">
            Add Department
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
          </a>
          <div class="modal" id="add-deparment">
            <a href="#close" class="modal-overlay" aria-label="Close"></a>
            <div class="modal-container">
              <div class="modal-header">
                <a href="#close" class="btn btn-clear float-right" aria-label="Close"></a><br>
                <h2 class="text-center">Add Department</h2>
              </div>
              <div class="modal-body">
                <div class="content">
                  <div class="form-group">
                    <label class="form-label">Name</label>
                    <input class="form-input" type="text">
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <div class="text-center">
                  <a href="#close" class="btn btn-primary">Submit</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <table class="table table-hover mt-4">
          <thead>
            <th>Name</th>
            <th>Members</th>
            <th></th>
          </thead>
          <tbody>
            <tr>
              <td><a href="#edit-deparment">IT</a></td>
              <td>5</td>
              <td class="text-center"><button class="btn btn-error">Delete</button></td>
            </tr>
            <tr>
              <td><a href="#edit-deparment">Marketing</a></td>
              <td>2</td>
              <td class="text-center"><button class="btn btn-error">Delete</button></td>
            </tr>
            <tr>
              <td><a href="#edit-deparment">HR</a></td>
              <td>3</td>
              <td class="text-center"><button class="btn btn-error">Delete</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="modal" id="edit-deparment">
      <a href="#close" class="modal-overlay" aria-label="Close"></a>
      <div class="modal-container">
        <div class="modal-header">
          <a href="#close" class="btn btn-clear float-right" aria-label="Close"></a><br>
          <h2 class="text-center">Edit Department</h2>
        </div>
        <div class="modal-body">
          <div class="content">
            <div class="form-group">
              <label class="form-label">Name</label>
              <input class="form-input" type="text">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="text-center">
            <a href="#close" class="btn btn-primary">Submit</a>
          </div>
        </div>
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

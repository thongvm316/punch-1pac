<template>
  <setting-layout>
    <h1>Company Settings</h1>
    <div class="columns">
      <div class="column col-3">
        <company-settings-sidebar></company-settings-sidebar>
      </div>
      <div class="column col-9">
        <h2 class="border-bottom">Departments</h2>
        <div class="toolbar text-right mt-5">
          <a href="#add-deparment" class="btn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
            Add Department
          </a>
        </div>
        <table class="table table-hover bg-light mt-5">
          <thead>
            <th>Name</th>
            <th>Members</th>
            <th></th>
          </thead>
          <tbody>
            <tr @click="toggleModal">
              <td>IT</td>
              <td>5</td>
              <td class="text-center"><button class="btn btn-error">Delete</button></td>
            </tr>
            <tr @click="toggleModal">
              <td>Marketing</td>
              <td>2</td>
              <td class="text-center"><button class="btn btn-error">Delete</button></td>
            </tr>
            <tr @click="toggleModal">
              <td>HR</td>
              <td>3</td>
              <td class="text-center"><button class="btn btn-error">Delete</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Add department -->
    <div class="modal" id="add-deparment">
      <a href="#close" class="modal-overlay"></a>
      <div class="modal-container">
        <div class="modal-header">
          <a href="#close" class="btn btn-clear float-right"></a><br>
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

    <!-- Edit department -->
    <div class="modal" :class="{ active: isModalOpen }" id="edit-deparment">
      <a class="modal-overlay" @click="toggleModal"></a>
      <div class="modal-container">
        <div class="modal-header">
          <a class="btn btn-clear float-right" @click="toggleModal"></a><br>
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
            <a class="btn btn-primary" @click="toggleModal">Submit</a>
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
  data () {
    return {
      isModalOpen: false
    }
  },
  components: {
    SettingLayout,
    CompanySettingsSidebar
  },
  methods: {
    toggleModal () {
      this.isModalOpen = !this.isModalOpen
    }
  }
}
</script>

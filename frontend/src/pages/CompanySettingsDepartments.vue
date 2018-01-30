<template>
  <setting-layout sidebar-type="company" title="Company Settings" subtitle="Departments">
    <div class="toolbar text-right mt-5" @click="toggleAddModal">
      <button type="button" class="btn">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
        Add Department
      </button>
    </div>
    <table class="table table-hover bg-light mt-5">
      <thead>
        <th>Name</th>
        <th>Members</th>
        <th></th>
      </thead>
      <tbody>
        <tr @click="toggleEditModal">
          <td>IT</td>
          <td>5</td>
          <td class="text-center"><button class="btn btn-error">Delete</button></td>
        </tr>
        <tr @click="toggleEditModal">
          <td>Marketing</td>
          <td>2</td>
          <td class="text-center"><button class="btn btn-error">Delete</button></td>
        </tr>
        <tr @click="toggleEditModal">
          <td>HR</td>
          <td>3</td>
          <td class="text-center"><button class="btn btn-error">Delete</button></td>
        </tr>
      </tbody>
    </table>

    <modal title="Add Department" :modal-open.sync="isAddModalOpen">
      <div class="form-group">
        <label class="form-label">Name</label>
        <input class="form-input" type="text">
      </div>
      <div class="form-group">
        <button type="button" class="btn">Submit</button>
      </div>
    </modal>

    <modal title="Edit Department" :modal-open.sync="isEditModalOpen">
      <div class="form-group">
        <label class="form-label">Name</label>
        <input class="form-input" type="text">
      </div>
      <div class="form-group">
        <button type="button" class="btn">Save</button>
      </div>
    </modal>
  </setting-layout>
</template>

<script>
import SettingLayout from '../layouts/Setting.vue'
import modal from '../mixins/modal'

export default {
  mixins: [modal],

  components: {
    SettingLayout
  }
}
</script>

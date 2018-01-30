<template>
  <setting-layout sidebar-type="company" title="Company Settings" subtitle="Holidays">
    <div class="input-group mt-5">
      <select class="form-select">
        <option>Choose a country</option>
        <option>Vietnam</option>
        <option>Korea</option>
        <option>Quatar</option>
        <option>Uzbekistan</option>
      </select>
      <button class="btn input-group-btn">Import</button>
    </div>
    <p class="form-input-hint text-dark">Import country's holidays for your company, then 1Punch will not count a holiday as leaving day</p>

    <div class="toolbar clearfix mt-5">
      <input type="text" class="form-input" placeholder="Filter holiday by name">
      <button type="button" class="btn float-right" @click="toggleAddModal">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
        Add Holiday
      </button>
    </div>

    <table class="table table-hover bg-light mt-5">
      <thead>
        <th>Name</th>
        <th>Country</th>
        <th>Start at</th>
        <th>End at</th>
        <th></th>
      </thead>
      <tbody>
        <tr @click="toggleEditModal">
          <td>New Year</td>
          <td>Vietname</td>
          <td>20-01-2018</td>
          <td>20-01-2018</td>
          <td class="text-center"><button class="btn btn-error">Delete</button></td>
        </tr>
      </tbody>
    </table>

    <modal title="Add Holiday" :modal-open.sync="isAddModalOpen">
      <div class="form-group">
        <label class="form-label">Name</label>
        <input class="form-input" type="text">
      </div>
      <div class="form-group">
        <label class="form-label">Start at</label>
        <input class="form-input" type="text">
      </div>
      <div class="form-group">
        <label class="form-label">End at</label>
        <input class="form-input" type="text">
      </div>
      <div class="form-group">
        <button type="button" class="btn">Submit</button>
      </div>
    </modal>

    <modal title="Edit Holiday" :modal-open.sync="isEditModalOpen">
      <div class="form-group">
        <label class="form-label">Name</label>
        <input class="form-input" type="text">
      </div>
      <div class="form-group">
        <label class="form-label">Start at</label>
        <input class="form-input" type="text">
      </div>
      <div class="form-group">
        <label class="form-label">End at</label>
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
import Modal from '../components/Modal.vue'

export default {
  data () {
    return {
      isAddModalOpen: false,
      isEditModalOpen: false
    }
  },

  components: {
    SettingLayout,
    Modal
  },

  methods: {
    toggleAddModal () {
      this.isAddModalOpen = !this.isAddModalOpen
    },

    toggleEditModal () {
      this.isEditModalOpen = !this.isEditModalOpen
    }
  }
}
</script>

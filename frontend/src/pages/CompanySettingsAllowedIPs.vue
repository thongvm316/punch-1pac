<template>
  <setting-layout sidebar-type="company" title="Company Settings" subtitle="Allowed IPs">
    <div class="toolbar clearfix mt-5">
      <button type="button" class="btn float-right" @click="toggleAddModal">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
        Add IP
      </button>
    </div>

    <table class="table table-hover bg-light mt-5">
      <thead>
        <th>IP Address</th>
        <th class="text-right">Created at</th>
        <th></th>
      </thead>
      <tbody>
        <tr @click="toggleEditModal">
          <td>112.244.12.0</td>
          <td class="text-right">20-01-2018</td>
          <td class="text-center"><button class="btn btn-error">Delete</button></td>
        </tr>
        <tr @click="toggleEditModal">
          <td>112.244.12.1</td>
          <td class="text-right">20-01-2018</td>
          <td class="text-center"><button class="btn btn-error">Delete</button></td>
        </tr>
        <tr @click="toggleEditModal">
          <td>112.244.12.2</td>
          <td class="text-right">20-01-2018</td>
          <td class="text-center"><button class="btn btn-error">Delete</button></td>
        </tr>
        <tr @click="toggleEditModal">
          <td>112.244.12.3</td>
          <td class="text-right">20-01-2018</td>
          <td class="text-center"><button class="btn btn-error">Delete</button></td>
        </tr>
        <tr @click="toggleEditModal">
          <td>112.244.12.4</td>
          <td class="text-right">20-01-2018</td>
          <td class="text-center"><button class="btn btn-error">Delete</button></td>
        </tr>
      </tbody>
    </table>

    <modal title="Add IP" :modal-open.sync="isAddModalOpen">
      <div class="form-group">
        <label class="form-label">IP Address</label>
        <input class="form-input" type="text">
      </div>
      <div class="form-group">
        <a class="btn">Submit</a>
      </div>
    </modal>

    <modal title="Edit IP" :modal-open.sync="isEditModalOpen">
      <div class="form-group">
        <label class="form-label">IP Address</label>
        <input class="form-input" type="text">
      </div>
      <div class="form-group">
        <a class="btn">Save</a>
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

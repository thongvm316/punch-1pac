<template>
  <setting-layout sidebar-type="company" title="Company Settings" subtitle="Allowed IPs">
    <div class="toolbar clearfix mt-5">
      <a href="#add-ip" class="btn float-right">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
        Add IP
      </a>
    </div>
    <table class="table table-hover bg-light mt-5">
      <thead>
        <th>IP Address</th>
        <th class="text-right">Created at</th>
        <th></th>
      </thead>
      <tbody>
        <tr @click="toggleModal">
          <td>112.244.12.0</td>
          <td class="text-right">20-01-2018</td>
          <td class="text-center"><button class="btn btn-error">Delete</button></td>
        </tr>
        <tr @click="toggleModal">
          <td>112.244.12.1</td>
          <td class="text-right">20-01-2018</td>
          <td class="text-center"><button class="btn btn-error">Delete</button></td>
        </tr>
        <tr @click="toggleModal">
          <td>112.244.12.2</td>
          <td class="text-right">20-01-2018</td>
          <td class="text-center"><button class="btn btn-error">Delete</button></td>
        </tr>
        <tr @click="toggleModal">
          <td>112.244.12.3</td>
          <td class="text-right">20-01-2018</td>
          <td class="text-center"><button class="btn btn-error">Delete</button></td>
        </tr>
        <tr @click="toggleModal">
          <td>112.244.12.4</td>
          <td class="text-right">20-01-2018</td>
          <td class="text-center"><button class="btn btn-error">Delete</button></td>
        </tr>
      </tbody>
    </table>
    <!-- Add IP modal -->
    <div class="modal" id="add-ip">
      <a href="#close" class="modal-overlay"></a>
      <div class="modal-container">
        <div class="modal-header">
          <a href="#close" class="btn btn-clear float-right"></a><br>
          <h2 class="text-center">Add IP</h2>
        </div>
        <div class="modal-body">
          <div class="content">
            <div class="form-group">
              <label class="form-label">IP Address</label>
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

    <!-- Edit IP modal -->
    <div class="modal" :class="{ active: isModalOpen }" id="edit-ip">
      <a class="modal-overlay" @click="toggleModal"></a>
      <div class="modal-container">
        <div class="modal-header">
          <a class="btn btn-clear float-right" @click="toggleModal"></a><br>
          <h2 class="text-center">Edit IP</h2>
        </div>
        <div class="modal-body">
          <div class="content">
            <div class="form-group">
              <label class="form-label">IP Address</label>
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

export default {
  data () {
    return {
      isModalOpen: false
    }
  },
  components: {
    SettingLayout
  },
  methods: {
    toggleModal () {
      this.isModalOpen = !this.isModalOpen
    }
  }
}
</script>

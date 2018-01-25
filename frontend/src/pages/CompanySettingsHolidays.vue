<template>
  <setting-layout>
    <h1>Company Settings</h1>
    <div class="columns">
      <div class="column col-3">
        <company-settings-sidebar></company-settings-sidebar>
      </div>
      <div class="column col-9">
        <h2 class="border-bottom">Holidays</h2>
        <div class="toolbar mt-5">
          <div class="form-group">
            <select class="form-select">
              <option>Select country to import</option>
              <option>Vietnam</option>
              <option>Korea</option>
              <option>Quatar</option>
              <option>Uzbekistan</option>
            </select>
            <button class="btn btn-primary ml-5">Import</button>
          </div>
        </div>
        <div class="toolbar mt-5">
          <div class="form-group clearfix">
            <select class="form-select">
              <option>Filter holiday by name</option>
              <option>Vietnam</option>
              <option>Korea</option>
              <option>Quatar</option>
              <option>Uzbekistan</option>
            </select>
            <a href="#add-holiday" class="btn float-right">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
              Add Holiday
            </a>
          </div>
          <div class="modal" id="add-holiday">
            <a href="#close" class="modal-overlay"></a>
            <div class="modal-container">
              <div class="modal-header">
                <a href="#close" class="btn btn-clear float-right"></a><br>
                <h2 class="text-center">Add Holiday</h2>
              </div>
              <div class="modal-body">
                <div class="content">
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

        <table class="table table-hover bg-light mt-5">
          <thead>
            <th>Name</th>
            <th>Country</th>
            <th>Start at</th>
            <th>End at</th>
            <th></th>
          </thead>
          <tbody>
            <tr @click="toggleModal">
              <td>New Year</td>
              <td>Vietname</td>
              <td>20-01-2018</td>
              <td>20-01-2018</td>
              <td class="text-center"><button class="btn btn-error">Delete</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="modal" :class="{ active: isModalOpen }" id="edit-holiday">
      <a class="modal-overlay" @click="toggleModal"></a>
      <div class="modal-container">
        <div class="modal-header">
          <a class="btn btn-clear float-right" @click="toggleModal"></a><br>
          <h2 class="text-center">Edit Holiday</h2>
        </div>
        <div class="modal-body">
          <div class="content">
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

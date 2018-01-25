<template>
  <setting-layout>
    <h1>Company Settings</h1>
    <div class="columns">
      <div class="column col-3">
        <company-settings-sidebar></company-settings-sidebar>
      </div>
      <div class="column col-9">
        <h2 class="border-bottom">Business Days</h2>
        <div class="text-right">
          <a href="#add-business-day" class="btn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
            Add Business Days
          </a>
          <div class="modal" id="add-business-day">
            <a href="#close" class="modal-overlay"></a>
            <div class="modal-container">
              <div class="modal-header">
                <a href="#close" class="btn btn-clear float-right"></a><br>
                <h2 class="text-center">Add Business Day</h2>
              </div>
              <div class="modal-body">
                <div class="content">
                  <div class="form-group">
                    <label class="form-label">Weekday</label>
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
        <table class="table table-hover mt-4">
          <thead>
            <th>Weekday</th>
            <th>Start at</th>
            <th>End at</th>
            <th></th>
          </thead>
          <tbody>
            <tr @click="toggleModal">
              <td>Monday</td>
              <td>08:00</td>
              <td>17:30</td>
              <td class="text-center"><button class="btn btn-error">Delete</button></td>
            </tr>
            <tr @click="toggleModal">
              <td>Tuesday</td>
              <td>08:00</td>
              <td>17:30</td>
              <td class="text-center"><button class="btn btn-error">Delete</button></td>
            </tr>
            <tr @click="toggleModal">
              <td>Wednesday</td>
              <td>08:00</td>
              <td>17:30</td>
              <td class="text-center"><button class="btn btn-error">Delete</button></td>
            </tr>
            <tr @click="toggleModal">
              <td>Thursday</td>
              <td>08:00</td>
              <td>17:30</td>
              <td class="text-center"><button class="btn btn-error">Delete</button></td>
            </tr>
            <tr @click="toggleModal">
              <td>Friday</td>
              <td>08:00</td>
              <td>17:30</td>
              <td class="text-center"><button class="btn btn-error">Delete</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="modal" :class="{ active: isModalOpen }" id="edit-business-day">
      <a class="modal-overlay" @click="toggleModal"></a>
      <div class="modal-container">
        <div class="modal-header">
          <a class="btn btn-clear float-right" @click="toggleModal"></a><br>
          <h2 class="text-center">Edit Business Day</h2>
        </div>
        <div class="modal-body">
          <div class="content">
            <div class="form-group">
              <label class="form-label">Weekday</label>
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

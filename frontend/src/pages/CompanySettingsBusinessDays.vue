<template>
  <setting-layout sidebar-type="company" title="Company Settings" subtitle="Business Days">
    <div class="toolbar text-right mt-5">
      <button type="button" class="btn" @click="toggleAddModal">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
        Add Business Days
      </button>
    </div>
    <table class="table table-hover bg-light mt-5">
      <thead>
        <th>Weekday</th>
        <th>Start at</th>
        <th>End at</th>
        <th></th>
      </thead>
      <tbody>
        <tr @click="toggleEditModal">
          <td>Monday</td>
          <td>08:00</td>
          <td>17:30</td>
          <td class="text-center"><button class="btn btn-error">Delete</button></td>
        </tr>
        <tr @click="toggleEditModal">
          <td>Tuesday</td>
          <td>08:00</td>
          <td>17:30</td>
          <td class="text-center"><button class="btn btn-error">Delete</button></td>
        </tr>
        <tr @click="toggleEditModal">
          <td>Wednesday</td>
          <td>08:00</td>
          <td>17:30</td>
          <td class="text-center"><button class="btn btn-error">Delete</button></td>
        </tr>
        <tr @click="toggleEditModal">
          <td>Thursday</td>
          <td>08:00</td>
          <td>17:30</td>
          <td class="text-center"><button class="btn btn-error">Delete</button></td>
        </tr>
        <tr @click="toggleEditModal">
          <td>Friday</td>
          <td>08:00</td>
          <td>17:30</td>
          <td class="text-center"><button class="btn btn-error">Delete</button></td>
        </tr>
      </tbody>
    </table>

    <modal title="Add Business Day" :modal-open.sync="isAddModalOpen">
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
      <div class="form-group">
        <button type="button" class="btn">Submit</button>
      </div>
    </modal>

    <modal title="Edit Business Day" :modal-open.sync="isEditModalOpen">
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

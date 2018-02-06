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
        <tr>
          <td>New Year</td>
          <td>Vietname</td>
          <td>20-01-2018</td>
          <td>20-01-2018</td>
          <td class="text-center">
            <button class="btn btn-action btn-link" @click="toggleEditModal">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 16" fill="currentColor">
                <path fill-rule="evenodd" d="M0 12v3h3l8-8-3-3-8 8zm3 2H1v-2h1v1h1v1zm10.3-9.3L12 6 9 3l1.3-1.3a.996.996 0 0 1 1.41 0l1.59 1.59c.39.39.39 1.02 0 1.41z"/>
              </svg>
            </button>
            <button class="btn btn-action btn-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
              </svg>
            </button>
          </td>
        </tr>
        <tr>
          <td>New Year</td>
          <td>Vietname</td>
          <td>20-01-2018</td>
          <td>20-01-2018</td>
          <td class="text-center">
            <button class="btn btn-action btn-link" @click="toggleEditModal">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 16" fill="currentColor">
                <path fill-rule="evenodd" d="M0 12v3h3l8-8-3-3-8 8zm3 2H1v-2h1v1h1v1zm10.3-9.3L12 6 9 3l1.3-1.3a.996.996 0 0 1 1.41 0l1.59 1.59c.39.39.39 1.02 0 1.41z"/>
              </svg>
            </button>
            <button class="btn btn-action btn-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
              </svg>
            </button>
          </td>
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
import modal from '../mixins/modal'

export default {
  mixins: [modal],

  components: {
    SettingLayout
  }
}
</script>

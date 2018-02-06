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
        <tr v-for="department in departments">
          <td>{{ department.name }}</td>
          <td>5</td>
          <td class="text-center">
            <button class="btn btn-action btn-link" @click="toggleEditModal(department)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 16" fill="currentColor">
                <path fill-rule="evenodd" d="M0 12v3h3l8-8-3-3-8 8zm3 2H1v-2h1v1h1v1zm10.3-9.3L12 6 9 3l1.3-1.3a.996.996 0 0 1 1.41 0l1.59 1.59c.39.39.39 1.02 0 1.41z"/>
              </svg>
            </button>
            <button class="btn btn-action btn-link" @click="deleteDepartment(department.id)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <modal title="Add Department" :modal-open.sync="isAddModalOpen">
      <div class="form-group">
        <label class="form-label">Name</label>
        <input class="form-input" type="text" v-model="createParams.name">
        <p class="form-input-hint" v-if="errors.name">{{ errors.name[0] }}</p>
      </div>
      <div class="form-group">
        <button type="button" class="btn" @click="addDepartment(createParams)">Submit</button>
      </div>
    </modal>

    <modal title="Edit Department" :modal-open.sync="isEditModalOpen">
      <div class="form-group">
        <label class="form-label">Name</label>
        <input class="form-input" type="text" v-model="editParams.name">
        <p class="form-input-hint" v-if="errors.name">{{ errors.name[0] }}</p>
      </div>
      <div class="form-group">
        <button type="button" class="btn" @click="updateDepartment({ departmentId: currentId, editParams: editParams })">Save</button>
      </div>
    </modal>
  </setting-layout>
</template>

<script>
import SettingLayout from '../layouts/Setting.vue'
import modal from '../mixins/modal'
import { mapState, mapActions } from 'vuex'

export default {
  mixins: [modal],
  data () {
    return {
      createParams: {
        name: ''
      },
      currentId: '',
      editParams: {
        name: ''
      }
    }
  },
  components: {
    SettingLayout
  },
  methods: {
    toggleEditModal (department) {
      this.clearDepartmentErrors()
      this.isEditModalOpen = !this.isEditModalOpen
      this.currentId = department.id
      this.editParams.name = department.name
    },

    ...mapActions('companyDepartments', [
      'clearDepartmentErrors',
      'fetchDepartments',
      'addDepartment',
      'deleteDepartment',
      'updateDepartment'
    ])
  },

  computed: {
    ...mapState('companyDepartments', [
      'errors',
      'departments'
    ])
  },

  created () {
    this.fetchDepartments()
  }
}
</script>

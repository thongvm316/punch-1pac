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
          <td @click="toggleEditModal(department.id)">{{ department.name }}</td>
          <td>5</td>
          <td class="text-center"><button class="btn btn-error" @click="deleteDepartment(department.id)">Delete</button></td>
        </tr>
      </tbody>
    </table>

    <modal title="Add Department" :modal-open.sync="isAddModalOpen">
      <div class="form-group">
        <label class="form-label">Name</label>
        <input class="form-input" type="text" v-model="newName">
      </div>
      <div class="form-group">
        <button type="button" class="btn" @click="addDepartment({ name: newName })">Submit</button>
      </div>
    </modal>

    <modal title="Edit Department" :modal-open.sync="isEditModalOpen">
      <div class="form-group">
        <label class="form-label">Name</label>
        <input class="form-input" type="text" v-model="editName">
      </div>
      <div class="form-group">
        <button type="button" class="btn" @click="editDepartment({ departmentId: currentId, name: editName })">Save</button>
      </div>
    </modal>
  </setting-layout>
</template>

<script>
import SettingLayout from '../layouts/Setting.vue'
import modal from '../mixins/modal'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  mixins: [modal],
  data () {
    return {
      newName: '',
      editName: '',
      currentId: ''
    }
  },
  components: {
    SettingLayout
  },
  methods: {
    ...mapActions('companyDepartments', [
      'fetchDepartments',
      'addDepartment',
      'deleteDepartment',
      'editDepartment'
    ]),

    toggleEditModal (id) {
      this.currentId = id
      this.isEditModalOpen = !this.isEditModalOpen
      this.editName = this.fetchDepartment(id).name
    }
  },

  computed: {
    ...mapState('companyDepartments', [
      'departments'
    ]),

    ...mapGetters('companyDepartments', [
      'fetchDepartment'
    ])
  },

  created () {
    this.fetchDepartments()
  }
}
</script>

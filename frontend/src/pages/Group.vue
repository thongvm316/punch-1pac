<template>
  <main-layout :title="group.name">
    <div class="input-group mt-5">
      <!-- <input type="text" class="form-input" :placeholder="$t('placeholder.searchUserByEmail')"></input> -->
      <v-select
        label="email"
        @search="filterUsersByEmail"
        @input="selectUser"
        :options="filteredUsers"
      ></v-select>
      <button type="button" class="btn input-group-btn" @click="addGroupUser({ groupId: currentId, userId: selectedUser.id })">{{ $t('button.add') }}</button>
    </div>
    <p class="form-input-hint text-dark">{{ $t('group.explain') }}</p>

    <div class="toolbar mt-5 text-right"> <button type="button" class="btn" @click="toggleEditModal">{{ $t('button.editGroup') }}</button>
    </div>
    <table class="table table-hover bg-light mt-5">
      <thead>
        <th>{{ $t('tableHeader.name') }}</th>
        <th>{{ $t('tableHeader.email') }}</th>
        <th>{{ $t('tableHeader.gender') }}</th>
        <th>{{ $t('tableHeader.position') }}</th>
        <th>{{ $t('tableHeader.actions') }}</th>
      </thead>
      <tbody>
        <tr v-for="user in group.users">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.gender }}</td>
          <td>{{ user.position }}</td>
          <td>
            <button class="btn btn-action btn-link" @click="removeGroupUser({ groupId: currentId, userId: user.id })">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <modal title="Edit Group" :modal-open.sync="isEditModalOpen">
      <div class="form-group" :class="{ 'has-error': errors.name }">
        <label class="form-label">{{ $t('label.name') }}</label>
        <input class="form-input" type="text" v-model="editParams.name">
        <p class="form-input-hint" v-if="errors.name">{{ errors.name[0] }}</p>
      </div>
      <div class="form-group">
        <button type="button" class="btn" @click="updateGroup({ groupId: currentId, editParams: editParams })">{{ $t('button.save') }}</button>
      </div>
    </modal>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'
import { mapState, mapActions } from 'vuex'
import modal from '../mixins/modal'
import vSelect from 'vue-select'

export default {
  mixins: [modal],

  data () {
    return {
      currentId: this.$route.params.id,
      editParams: {
        name: ''
      }
    }
  },

  components: {
    MainLayout,
    vSelect
  },

  computed: {
    ...mapState('group', [
      'errors',
      'group',
      'filteredUsers',
      'selectedUser'
    ])
  },

  methods: {
    toggleEditModal () {
      this.clearGroupErrors()
      this.isEditModalOpen = !this.isEditModalOpen
      this.editParams.name = this.group.name
    },

    ...mapActions('group', [
      'getGroup',
      'updateGroup',
      'addGroupUser',
      'removeGroupUser',
      'clearGroupErrors',
      'filterUsersByEmail',
      'selectUser'
    ])
  },

  created () {
    this.getGroup(this.$route.params.id)
  },

  watch: {
    '$route': function (val) {
      this.getGroup(this.$route.params.id)
    }
  }
}
</script>

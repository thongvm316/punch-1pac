<template>
  <main-layout :title="group.name">
    <div class="input-group mt-5">
      <v-select label="email" :placeholder="$t('group.placeholder.filterByEmail')" v-model="selectedUser" :options="usersNotInGroup">
        <template slot="option" slot-scope="option">
          <div class="tile tile-centered">
            <div class="tile-icon">
              <img :src="option.avatar_url" class="avatar avatar-md">
            </div>
            <div class="tile-content">{{ option.name }} ( {{ option.email }} )</div>
          </div>
        </template>
      </v-select>
      <button type="button" class="btn input-group-btn" @click="addGroupUser({ groupId: currentId, user: selectedUser })">{{ $t('group.btn.addUser') }}</button>
    </div>
    <p class="form-input-hint text-dark">{{ $t('group.explain') }}</p>

    <div class="toolbar mt-5 text-right"> <button type="button" class="btn" @click="toggleEditModal">{{ $t('group.btn.edit') }}</button>
    </div>
    <table class="table table-hover bg-light mt-5">
      <thead>
        <th>{{ $t('group.tableHeader.name') }}</th>
        <th>{{ $t('group.tableHeader.email') }}</th>
        <th>{{ $t('group.tableHeader.gender') }}</th>
        <th>{{ $t('group.tableHeader.position') }}</th>
        <th>{{ $t('group.tableHeader.actions') }}</th>
      </thead>
      <tbody>
        <tr v-for="user in group.users">
          <td>
            <div class="tile tile-centered">
              <div class="tile-icon">
                <img :src="user.avatar_url" class="avatar avatar-md" :alt="user.name">
              </div>
              <div class="tile-content">{{ user.name }}</div>
            </div>
          </td>
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

    <modal :title="$t('group.modal.editTitle')" :modal-open.sync="isEditModalOpen">
      <div class="form-group" :class="{ 'has-error': errors.name }">
        <label class="form-label">{{ $t('group.labels.name') }}</label>
        <input class="form-input" type="text" v-model="editParams.name">
        <p class="form-input-hint" v-if="errors.name">{{ errors.name[0] }}</p>
      </div>
      <div class="form-group">
        <button type="button" class="btn" @click="saveEditModal({ groupId: currentId, editParams: editParams }, updateGroup)">{{ $t('group.btn.save') }}</button>
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
      selectedUser: null,
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
      'usersNotInGroup'
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
      'getUsersNotInGroup'
    ])
  },

  created () {
    this.getGroup(this.$route.params.id)
    this.getUsersNotInGroup(this.$route.params.id)
  },

  watch: {
    '$route': function (val) {
      this.getGroup(this.$route.params.id)
    }
  }
}
</script>

<template>
  <main-layout :title="$t('groups.title')">
    <div class="toolbar mt-5 text-right">
      <button type="button" class="btn btn-success" @click="toggleAddModal()">
        {{ $t('groups.btn.add') }}
      </button>
    </div>

    <div class="columns mt-5">
      <div class="column col-3 mb-4" v-for="group in groups">
        <div class="box box-group">
          <div class="box-header">
            <router-link tag="h2" :to="`/groups/${group.id}`" class="box-title">{{ group.name }}</router-link>
            <span>{{ $tc('groups.member', group.users.length, { count: group.users.length }) }}</span>
          </div>
          <div class="box-content box-content-flex" v-if="group.users.length > 0">
            <div class="box-content-img">
              <img :src="user.avatar_url" :alt="user.name" class="avatar avatar-md" v-for="user in group.users.slice(0, 5)">
              <span>{{ group.users.length | filterUserNum }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <modal :title="$t('groups.modal.addTitle')" :modal-open.sync="isAddModalOpen">
      <div class="form-group" :class="{ 'has-error': errors.name }">
        <label class="form-label">{{ $t('groups.labels.name') }}</label>
        <input class="form-input" type="text" :placeholder="$t('groups.placeholder.name')" v-model="createParams.name">
        <p class="form-input-hint" v-if="errors.name">{{ $t('groups.labels.name') }} {{ errors.name[0] }}</p>
      </div>
      <div class="form-group">
        <button type="button" class="btn btn-success btn-form-submit" @click="submitAddModal(createParams, addGroup, $t('messages.group.createSuccess'))">{{ $t('groups.btn.submit') }}</button>
      </div>
    </modal>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'
import Pagination from '../components/Pagination.vue'
import modal from '../mixins/modal'
import { mapState, mapActions } from 'vuex'

export default {
  mixins: [modal],

  data () {
    return {
      createParams: {
        name: ''
      }
    }
  },

  filters: {
    filterUserNum (userNum) {
      return userNum > 5 ? `+ ${userNum - 5}` : ''
    }
  },

  components: {
    MainLayout,
    Pagination
  },

  computed: {
    ...mapState('groups', [
      'errors',
      'groups'
    ])
  },

  methods: {
    ...mapActions('groups', [
      'clearGroupsErrors',
      'getGroups',
      'addGroup'
    ]),

    toggleAddModal () {
      Object.keys(this.createParams).forEach(key => { this.createParams[key] = '' })
      this.clearGroupsErrors()
      this.isAddModalOpen = !this.isAddModalOpen
    },

    getGroupAdmins (group) {
      return group.users.filter(user => user.role === 'admin' || user.role === 'superadmin')
    }
  },

  created () {
    this.getGroups()
  }
}
</script>

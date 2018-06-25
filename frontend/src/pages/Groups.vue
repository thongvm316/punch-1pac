<template>
  <main-layout :title="$t('groups.title')">
    <div class="toolbar mt-5 clearfix">
      <input type="search" class="form-input" :placeholder="$t('groups.placeholder.filterByName')" v-model="name">
      <button type="button" class="btn btn-success float-right" @click="toggleAddModal()" v-if="$auth('Group', currentUser).canCreate()">
        {{ $t('groups.btn.add') }}
      </button>
    </div>

    <div class="columns mt-5">
      <div class="column col-3 mb-4" v-for="group in filterGroups(name)">
        <div class="box box-group">
          <div class="box-header">
            <div class="tile">
              <div class="tile-icon">
                <img class="group-avatar" :src="group.image_url" :alt="group.name">
              </div>
              <div class="tile-content">
                <router-link tag="h2" :to="`/groups/${group.id}`" class="box-title">{{ group.name | limitedLengthTitle }}</router-link>
                <p class="group-description" v-if="group.description">{{ group.description | limitedLengthDescription }}</p>
                <span>{{ $tc('groups.member', group.users.length, { count: group.users.length }) }}</span>
              </div>
            </div>
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
      <group-form v-if="isAddModalOpen" @afterModify="isAddModalOpen = false"></group-form>
    </modal>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main'
import GroupForm from '../components/GroupForm'
import modal from '../mixins/modal'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  mixins: [modal],

  data() {
    return {
      name: ''
    }
  },

  filters: {
    filterUserNum(userNum) {
      return userNum > 5 ? `+ ${userNum - 5}` : ''
    },

    limitedLengthTitle(title) {
      return title.length > 60 ? `${title.trim().substring(0, 60)}...` : title
    },

    limitedLengthDescription(description) {
      return description > 80 ? `${description.trim().substring(0, 80)}...` : description
    }
  },

  components: {
    MainLayout,
    GroupForm
  },

  computed: {
    ...mapState('groups', ['groups']),

    ...mapGetters('groups', ['filterGroups'])
  },

  methods: {
    ...mapActions('groups', ['clearGroupsErrors', 'getGroups']),

    toggleAddModal() {
      this.clearGroupsErrors()
      this.isAddModalOpen = !this.isAddModalOpen
    },

    getGroupAdmins(group) {
      return group.users.filter(user => user.role === 'admin' || user.role === 'superadmin')
    }
  },

  created() {
    this.getGroups()
  }
}
</script>

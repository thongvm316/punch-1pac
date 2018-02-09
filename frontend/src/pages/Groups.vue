<template>
  <main-layout :title="$t('title.groups')">
    <div class="toolbar mt-5 text-right">
      <button type="button" class="btn" @click="toggleAddModal">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"></path></svg>
        {{ $t('button.addGroup') }}
      </button>
    </div>

    <div class="columns mt-5">
      <div class="column col-3" v-for="group in groups">
        <div class="box">
          <div class="box-header">
            <router-link tag="h2" :to="`/groups/${group.id}`" class="box-title">{{ group.name }}</router-link>
            <span>{{ $tc('group.member', group.users.length, { count: group.users.length }) }}</span>
          </div>
          <div class="box-content box-content-flex" v-if="getGroupAdmins(group).length > 0">
            <div class="box-content-img">
              <img src="/static/avatar.png" :alt="admin.name" class="avatar avatar-md" v-for="admin in getGroupAdmins(group).slice(0, 2)">
              <span>{{ getGroupAdmins(group).length | filterGroupNumAdmins }}</span>
            </div>
            <a @click.prevent="leave">{{ $t('group.leave') }}</a>
          </div>
        </div>
      </div>
    </div>

    <modal title="Add Group" :modal-open.sync="isAddModalOpen">
      <div class="form-group">
        <label class="form-label" for="input-example-1">{{ $t('label.name') }}</label>
        <input class="form-input" type="text" id="input-example-1" :placeholder="$t('placeholder.name')" v-model="createParams.name">
        <p class="form-input-hint" v-if="errors.name">{{ errors.name[0] }}</p>
      </div>
      <div class="form-group">
        <button type="button" class="btn" @click="addGroup(createParams)">{{ $t('button.submit') }}</button>
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
    filterGroupNumAdmins (numAdmins) {
      return numAdmins > 3 ? `+ ${numAdmins - 3}` : ''
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
    leave () {
      console.log('leave')
    },

    ...mapActions('groups', [
      'getGroups',
      'addGroup'
    ]),

    getGroupAdmins (group) {
      return group.users.filter(user => user.role === 'admin' || user.role === 'superadmin')
    }
  },

  created () {
    this.getGroups()
  }
}
</script>

<style scoped>
  .column {
    margin-bottom: .8rem;
  }
</style>

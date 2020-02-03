<template>
  <main-layout :title="$t('groups.title')">
    <div class="toolbar mt-5 clearfix">
      <input
        v-model="name"
        type="search"
        class="form-input"
        :placeholder="$t('placeholder.filterByName')"
      >
      <button
        v-if="$auth('Group', currentUser).canCreate()"
        type="button"
        class="btn btn-success float-right"
        @click="toggleAddModal()"
      >
        {{ $t('button.group.add') }}
      </button>
    </div>

    <div class="columns mt-5">
      <div
        v-for="group in filterGroups(name)"
        :key="group.id"
        class="column col-3 mb-4"
      >
        <div class="box box-group">
          <div class="box-header">
            <div class="tile">
              <div class="tile-icon">
                <img
                  class="group-avatar"
                  :src="group.image_url"
                  :alt="group.name"
                >
              </div>
              <div class="tile-content">
                <router-link
                  tag="h2"
                  :to="`/groups/${group.id}`"
                  class="box-title"
                >
                  {{ group.name | limitedLengthTitle }}
                </router-link>
                <p
                  v-if="group.description"
                  class="group-description"
                >
                  {{ group.description | limitedLengthDescription }}
                </p>
                <span>{{ $tc('groups.member', group.users_count, { count: group.users_count }) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <modal
      :title="$t('modal.group.addTitle')"
      :modal-open.sync="isAddModalOpen"
    >
      <group-form
        v-if="isAddModalOpen"
        @afterModify="isAddModalOpen = false"
      />
    </modal>
  </main-layout>
</template>

<script>
import modal from '../mixins/modal'
import { CLEAR_GROUPS_ERRORS } from '../store/mutation-types'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import { isEmpty } from 'underscore'
const MainLayout = () => import('../layouts/Main')
const GroupForm = () => import('../components/GroupForm')

export default {

  filters: {
    filterUserNum(userNum) {
      return userNum > 5 ? `+ ${userNum - 5}` : ''
    },

    limitedLengthTitle(title) {
      return title.length > 60 ? `${title.trim().substring(0, 60)}...` : title
    },

    limitedLengthDescription(description) {
      return description.length > 80 ? `${description.trim().substring(0, 80)}...` : description
    }
  },

  components: {
    MainLayout,
    GroupForm
  },
  mixins: [modal],

  data() {
    return {
      name: ''
    }
  },

  computed: {
    ...mapState('groups', ['groups', 'errors']),

    ...mapGetters('groups', ['filterGroups'])
  },

  created() {
    this.getGroups()
  },

  methods: {
    ...mapActions('groups', ['getGroups']),

    ...mapMutations('groups', [CLEAR_GROUPS_ERRORS]),

    toggleAddModal() {
      if (!isEmpty(this.errors)) this[CLEAR_GROUPS_ERRORS]()
      this.isAddModalOpen = !this.isAddModalOpen
    }
  }
}
</script>

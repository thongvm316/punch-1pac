<template>
  <main-layout :title="group.name">
    <group-tab
      :group-id="$route.params.id"
      :has-user="isShowComponent"
    />

    <div
      v-if="$auth('Group', currentUser, group.id).canAddUser()"
      class="input-group mt-5"
    >
      <filter-user-box
        :query-params="{ not_in_group_id: $route.params.id, per_page: 1000, exclude_user_ids: usersInGroup.map(user => user.id) }"
        :placeholder="$t('placeholder.searchByNameEmail')"
        :user.sync="selectedUser"
      />
      <button
        type="button"
        class="btn input-group-btn"
        @click="localAddGroupUser"
      >
        {{ $t('button.common.add') }}
      </button>
    </div>
    <p class="form-input-hint text-dark">
      {{ $t('group.explain') }}
    </p>

    <div
      v-if="$auth('Group', currentUser, group.id).canEdit()"
      class="toolbar mt-5 clearfix"
    >
      <input
        v-show="isShowComponent"
        v-model="searchText"
        type="search"
        class="form-input filter-input"
        :placeholder="$t('placeholder.filterByUser')"
      >
      <div class="float-right">
        <button
          v-if="$auth('Group', currentUser, group).canDelete()"
          type="button"
          class="btn btn-error"
          @click="openDeleteGroupConfirmDialog"
        >
          {{ $t('button.group.delete') }}
        </button>
        <button
          type="button"
          class="btn btn-success"
          @click="toggleEditModal"
        >
          {{ $t('button.group.edit') }}
        </button>
      </div>
    </div>

    <table
      v-show="isShowComponent"
      class="table bg-light mt-5"
    >
      <thead>
        <th>{{ $t('tableHeader.name') }}</th>
        <th>{{ $t('tableHeader.email') }}</th>
        <th>{{ $t('tableHeader.gender') }}</th>
        <th>{{ $t('tableHeader.position') }}</th>
        <th>{{ $t('tableHeader.role') }}</th>
        <th>{{ $t('tableHeader.actions') }}</th>
      </thead>
      <tbody>
        <tr
          v-for="user in filterUsers(searchText)"
          :key="user.id"
          :class="{ 'deactivated': !user.activated }"
        >
          <td>
            <div class="tile tile-centered">
              <div class="tile-icon">
                <img
                  :src="user.avatar_url"
                  class="avatar avatar-md"
                  :alt="user.name"
                >
              </div>
              <div class="tile-content">
                {{ user.name }}
              </div>
            </div>
          </td>
          <td>{{ user.email }}</td>
          <td>{{ user.gender }}</td>
          <td>{{ user.position }}</td>
          <td>{{ $t(`meta.roles.${user.role}`) }}</td>
          <td>
            <button
              v-if="$auth('User', currentUser, user).canEdit()"
              class="btn btn-action btn-link tooltip"
              :data-tooltip="$t('tooltip.user.edit')"
              @click="toggleAddModal(user)"
            >
              <p-ico-pencil />
            </button>
            <button
              v-if="$auth('User', currentUser, user).canLockUnlockAccount() && user.activated"
              class="btn btn-action btn-link tooltip"
              :data-tooltip="$t('tooltip.user.deactivate')"
              @click="openConfirmDialog(user)"
            >
              <p-ico-deactive />
            </button>
            <button
              v-if="$auth('User', currentUser, user).canLockUnlockAccount() && !user.activated"
              class="btn btn-action btn-link tooltip"
              :data-tooltip="$t('tooltip.user.activate')"
              @click="activateGroupUser(user.id)"
            >
              <p-ico-active />
            </button>
            <button
              v-if="$auth('Group', currentUser, group.id).canRemoveUser()"
              class="btn btn-action btn-link tooltip"
              :data-tooltip="$t('tooltip.user.remove')"
              @click="openRemoveUserConfirmDialog(user)"
            >
              <p-ico-remove />
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <confirm-dialog
      :title="$t('group.confirmDialog.deactivateUserTitle')"
      :delete-object="deactivateGroupUser"
      :object-id="selectedObject.id"
      :modal-open.sync="isOpenConfirmDialog"
    >
      <p v-html="$t('group.confirmDialog.deactivateUserMsg', { name: selectedObject.name })" />
    </confirm-dialog>

    <confirm-dialog
      :title="$t('group.confirmDialog.deleteGroupTitle')"
      :modal-open.sync="isOpenDeleteGroupConfirmDialog"
    >
      <p v-html="$t('group.confirmDialog.deleteGroupMsg', { name: selectedObject.name })" />
      <template slot="confirmBtn">
        <button
          type="button"
          class="btn btn-error"
          @click="localDeleteGroup"
        >
          {{ $t('confirmDialog.yes') }}
        </button>
      </template>
    </confirm-dialog>

    <confirm-dialog
      v-if="isOpenRemoveUserConfirmDialog"
      :title="$t('group.confirmDialog.removeUserTitle')"
      :modal-open.sync="isOpenRemoveUserConfirmDialog"
      :delete-object="localRemoveUser"
      :object-id="targetUser.id"
    >
      <p v-html="$t('group.confirmDialog.removeUserMsg', { name: targetUser.name })" />
      <template slot="confirm-btn">
        <button
          type="button"
          class="btn btn-error"
        >
          {{ $t('confirmDialog.yes') }}
        </button>
      </template>
    </confirm-dialog>

    <modal
      :title="$t('modal.user.editTitle')"
      :modal-open.sync="isAddModalOpen"
    >
      <user-profile
        v-if="editUser"
        :target-user="editUser"
        object-type="group"
        @afterUserProfileUpdated="isAddModalOpen = false"
      />
    </modal>

    <modal
      :title="$t('modal.group.editTitle')"
      :modal-open.sync="isEditModalOpen"
    >
      <group-form
        v-if="isEditModalOpen"
        :target-group="group"
        @afterModify="isEditModalOpen = false"
      />
    </modal>
  </main-layout>
</template>

<script>
import modal from '../mixins/modal'
import confirmDialog from '../mixins/confirm-dialog'
import { SET_FLASH_MESSAGE, CLEAR_GROUP_ERRORS } from '../store/mutation-types'
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import { isEmpty } from 'underscore'
import PIcoPencil from '@/punch-ui/punch-icons/PIcoPencil'
import PIcoDeactive from '@/punch-ui/punch-icons/PIcoDeactive'
import PIcoActive from '@/punch-ui/punch-icons/PIcoActive'
import PIcoRemove from '@/punch-ui/punch-icons/PIcoRemove'
const MainLayout = () => import('../layouts/Main')
const UserProfile = () => import('../components/UserProfile')
const GroupTab = () => import('../components/GroupTab')
const GroupForm = () => import('../components/GroupForm')
const FilterUserBox = () => import('../components/FilterUserBox')

export default {
  components: {
    MainLayout,
    UserProfile,
    GroupTab,
    GroupForm,
    FilterUserBox,
    PIcoPencil,
    PIcoDeactive,
    PIcoActive,
    PIcoRemove
  },
  mixins: [confirmDialog, modal],

  data() {
    return {
      searchText: '',
      selectedUser: null,
      filteredUser: null,
      editUser: null,
      isOpenDeleteGroupConfirmDialog: false,
      isOpenRemoveUserConfirmDialog: false,
      targetUser: null
    }
  },

  computed: {
    ...mapState('group', ['group', 'usersInGroup', 'errors']),

    ...mapGetters('group', ['filterUsers']),

    isShowComponent() {
      return !!this.usersInGroup.length
    }
  },

  watch: {
    $route: function(val) {
      this.getUsersInGroup(this.$route.params.id)
      this.getGroup(this.$route.params.id)
    }
  },

  created() {
    this.getUsersInGroup(this.$route.params.id)
    this.getGroup(this.$route.params.id)
  },

  methods: {
    openDeleteGroupConfirmDialog() {
      this.selectedObject = this.group
      this.isOpenDeleteGroupConfirmDialog = !this.isOpenDeleteGroupConfirmDialog
    },

    openRemoveUserConfirmDialog(user) {
      this.isOpenRemoveUserConfirmDialog = !this.isOpenRemoveUserConfirmDialog
      this.targetUser = user
    },

    localDeleteGroup() {
      this.deleteGroup(this.selectedObject.id).then(() => this.$router.push({ name: 'groups' }))
    },

    localRemoveUser() {
      return this.removeGroupUser({ groupId: this.$route.params.id, userId: this.targetUser.id }).then(() => {
        this.isOpenRemoveUserConfirmDialog = !this.isOpenRemoveUserConfirmDialog
      })
    },

    toggleAddModal(user) {
      this.editUser = user
      this.isAddModalOpen = !this.isAddModalOpen
    },

    toggleEditModal() {
      if (!isEmpty(this.errors)) this[CLEAR_GROUP_ERRORS]()
      this.isEditModalOpen = !this.isEditModalOpen
    },

    ...mapActions('group', ['getGroup', 'addGroupUser', 'activateGroupUser', 'deactivateGroupUser', 'removeGroupUser', 'deleteGroup', 'getUsersInGroup']),

    ...mapMutations('group', [CLEAR_GROUP_ERRORS]),

    ...mapMutations('flash', [SET_FLASH_MESSAGE]),

    localAddGroupUser() {
      this.addGroupUser({ groupId: this.$route.params.id, user: this.selectedUser }).then(() => {
        this.selectedUser = null
        this[SET_FLASH_MESSAGE]({ message: this.$t('messages.group.addMemberSuccess') })
      })
    }
  }
}
</script>

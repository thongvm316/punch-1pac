<template>
  <div>
    <h2>{{ $t('company.users.title') }}</h2>
    <div class="toolbar mt-5 clearfix">
      <input
        v-model="searchText"
        type="search"
        class="form-input"
        :placeholder="$t('placeholder.filterByUser')"
      >
      <button
        type="button"
        class="btn btn-success float-right"
        @click="toggleAddModal"
      >
        {{ $t('button.user.add') }}
      </button>
      <button
        type="button"
        class="btn btn-success float-right mr-2"
        @click="toggleAddMultiUserModal"
      >
        {{ $t('button.user.addMulti') }}
      </button>
    </div>

    <table class="table bg-light mt-5">
      <thead>
        <th>{{ $t('tableHeader.name') }}</th>
        <th>{{ $t('tableHeader.email') }}</th>
        <th>{{ $t('tableHeader.position') }}</th>
        <th>{{ $t('tableHeader.role') }}</th>
        <th>{{ $t('tableHeader.actions') }}</th>
      </thead>
      <tbody>
        <tr
          v-for="user in filterByEmail(searchText)"
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
          <td>{{ user.position }}</td>
          <td>{{ $t(`meta.roles.${user.role}`) }}</td>
          <td>
            <button
              v-if="$auth('User', currentUser, user).canEdit()"
              class="btn btn-action btn-link tooltip"
              :data-tooltip="$t('tooltip.user.edit')"
              @click="toggleEditModal(user)"
            >
              <p-ico-pencil />
            </button>
            <button
              v-if="$auth('User', currentUser, user).canLockUnlockAccount() && user.activated"
              class="btn btn-action btn-link tooltip"
              :data-tooltip="$t('tooltip.user.deactivate')"
              @click="deactivateUser(user.id)"
            >
              <p-ico-deactive />
            </button>
            <button
              v-if="!user.activated"
              class="btn btn-action btn-link tooltip"
              :data-tooltip="$t('tooltip.user.activate')"
              @click="activateUser(user.id)"
            >
              <p-ico-active />
            </button>
            <button
              v-if="$auth('User', currentUser, user).canDelete() && !user.activated"
              class="btn btn-action btn-link tooltip"
              :data-tooltip="$t('tooltip.user.remove')"
              @click="openConfirmDialog(user)"
            >
              <p-ico-trash />
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <confirm-dialog
      :title="$t('company.users.confirmDialog.deleteUserTitle')"
      :delete-object="deleteUser"
      :object-id="selectedObject.id"
      :modal-open.sync="isOpenConfirmDialog"
    >
      <p v-html="$t('company.users.confirmDialog.deleteUserMsg', { name: selectedObject.name })" />
    </confirm-dialog>

    <modal
      :title="$t('modal.user.editTitle')"
      :modal-open.sync="isEditModalOpen"
    >
      <user-profile
        v-if="selectedUser"
        :target-user="selectedUser"
        object-type="company"
        @afterUserProfileUpdated="isEditModalOpen = false"
      />
    </modal>

    <modal
      :title="$t('modal.user.addTitle')"
      :modal-open.sync="isAddModalOpen"
    >
      <user-add-form @afterAdded="isAddModalOpen = false" />
    </modal>

    <modal
      :title="$t('modal.user.addMultiTitle')"
      :modal-open.sync="isAddMultiUserModalOpen"
    >
      <users-add-form @afterAdded="isAddMultiUserModalOpen = false" />
    </modal>
  </div>
</template>

<script>
import confirmDialog from '../mixins/confirm-dialog'
import modal from '../mixins/modal'
import { mapGetters, mapActions } from 'vuex'
import PIcoPencil from '@/punch-ui/punch-icons/PIcoPencil'
import PIcoDeactive from '@/punch-ui/punch-icons/PIcoDeactive'
import PIcoActive from '@/punch-ui/punch-icons/PIcoActive'
import PIcoTrash from '@/punch-ui/punch-icons/PIcoTrash'
const UserProfile = () => import('../components/UserProfile')
const UserAddForm = () => import('../components/UserAddForm')
const UsersAddForm = () => import('../components/UsersAddForm')

export default {

  components: {
    UserProfile,
    UserAddForm,
    UsersAddForm,
    PIcoPencil,
    PIcoDeactive,
    PIcoActive,
    PIcoTrash
  },

  mixins: [confirmDialog, modal],
  data() {
    return {
      searchText: '',
      selectedUser: {},
      isAddMultiUserModalOpen: false
    }
  },

  computed: {
    ...mapGetters('companyUsers', ['filterByEmail'])
  },

  created() {
    this.fetchUsers({ include_deactivated: true })
  },

  methods: {
    ...mapActions('companyUsers', ['deleteUser', 'fetchUsers', 'deactivateUser', 'activateUser']),

    toggleEditModal(user) {
      this.selectedUser = user
      this.isEditModalOpen = !this.isEditModalOpen
    },

    toggleAddMultiUserModal() {
      this.isAddMultiUserModalOpen = !this.isAddMultiUserModalOpen
    }
  }
}
</script>

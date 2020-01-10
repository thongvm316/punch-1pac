<template>
  <main-layout :title="group.name">
    <group-tab :group-id="$route.params.id"/>

    <div class="input-group mt-5" v-if="$auth('Group', currentUser, group.id).canAddUser()">
      <filter-user-box :queryParams="{ not_in_group_id: $route.params.id, per_page: 1000, exclude_user_ids: usersInGroup.map(user => user.id) }" :placeholder="$t('group.placeholder.searchByNameEmail')" :user.sync="selectedUser"/>
      <button type="button" class="btn input-group-btn" @click="localAddGroupUser">{{ $t('group.btn.addUser') }}</button>
    </div>
    <p class="form-input-hint text-dark">{{ $t('group.explain') }}</p>

    <div class="toolbar mt-5 clearfix" v-if="$auth('Group', currentUser, group.id).canEdit()">
      <input type="search" class="form-input filter-input" :placeholder="$t('attendances.placeholder.filterByUser')" v-model="searchText">
      <div class="float-right">
        <button type="button" class="btn btn-error" @click="openDeleteGroupConfirmDialog" v-if="$auth('Group', currentUser, group).canDelete()">
        {{ $t('group.btn.delete') }}
        </button>
        <button type="button" class="btn btn-success" @click="toggleEditModal">{{ $t('group.btn.edit') }}</button>
      </div>
    </div>

    <table class="table bg-light mt-5">
      <thead>
        <th>{{ $t('group.tableHeader.name') }}</th>
        <th>{{ $t('group.tableHeader.email') }}</th>
        <th>{{ $t('group.tableHeader.gender') }}</th>
        <th>{{ $t('group.tableHeader.position') }}</th>
        <th>{{ $t('group.tableHeader.role') }}</th>
        <th>{{ $t('group.tableHeader.actions') }}</th>
      </thead>
      <tbody>
        <tr v-for="user in filterUsers(searchText)" :key="user.id" :class="{ 'deactivated': !user.activated }">
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
          <td>{{ $t(`meta.roles.${user.role}`) }}</td>
          <td>
            <button class="btn btn-action btn-link tooltip" :data-tooltip="$t('group.tooltip.editUser')" @click="toggleAddModal(user)" v-if="$auth('User', currentUser, user).canEdit()">
              <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor"><path d="M23.2530524,2.92025954 L21.0782401,0.745259708 C20.084537,-0.24844334 18.4678184,-0.248396465 17.4741154,0.745259708 C16.5385373,1.68093151 2.24841342,15.9721335 1.29342912,16.9271647 C1.19171037,17.0288834 1.12355413,17.1640709 1.09927288,17.2963053 L0.0118667154,23.1688048 C-0.0302739063,23.3964767 0.0422885881,23.6303361 0.20602295,23.7940704 C0.369944813,23.9579923 0.603851044,24.0304141 0.831241652,23.9882735 L6.70322557,22.9007267 C6.83892868,22.8754142 6.97233492,22.8066017 7.07236617,22.7065236 L23.2530524,6.52461863 C24.2490523,5.52861871 24.249193,3.91640009 23.2530524,2.92025954 Z M1.58077284,22.4191799 L2.23856967,18.8668052 L5.13291319,21.7613362 L1.58077284,22.4191799 Z M6.57520995,21.2149144 L2.78494462,17.4244147 L16.6229123,3.58536886 L20.4131776,7.37591544 L6.57520995,21.2149144 Z M22.2586931,5.53025934 L21.40749,6.38155614 L17.6172247,2.59100956 L18.4684278,1.73971276 C18.9137871,1.29430654 19.6384277,1.29425966 20.0838808,1.73971276 L22.2586931,3.91471259 C22.7051774,4.36119693 22.7051774,5.08372812 22.2586931,5.53025934 Z"/></svg>
            </button>
            <button class="btn btn-action btn-link tooltip" :data-tooltip="$t('group.tooltip.deactivateUser')" @click="openConfirmDialog(user)" v-if="$auth('User', currentUser, user).canDeactivate() && user.activated">
              <svg width="24px" height="24px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M439.77,188H228.23V105.77C228.23,47.45,179.78,0,120.23,0s-108,47.45-108,105.77V144h40V105.77c0-36.27,30.5-65.77,68-65.77,37.49,0,68,29.5,68,65.77V188H151.77a60.07321,60.07321,0,0,0-60,60V452a60.07321,60.07321,0,0,0,60,60h288a60.07325,60.07325,0,0,0,60-60V248A60.07325,60.07325,0,0,0,439.77,188Zm20,264a20.02013,20.02013,0,0,1-20,20h-288a20.02009,20.02009,0,0,1-20-20V248a20.02009,20.02009,0,0,1,20-20h288a20.02013,20.02013,0,0,1,20,20Z"/></svg>
            </button>
            <button class="btn btn-action btn-link tooltip" :data-tooltip="$t('group.tooltip.activateUser')" @click="activateGroupUser(user.id)" v-if="$auth('User', currentUser, user).canActivate() && !user.activated">
              <svg width="24px" height="24px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor"><path d="M400,188h-36.037v-82.23c0-58.322-48.449-105.77-108-105.77c-59.551,0-108,47.448-108,105.77V188H112 c-33.084,0-60,26.916-60,60v204c0,33.084,26.916,60,60,60h288c33.084,0,60-26.916,60-60V248C460,214.916,433.084,188,400,188z M187.963,105.77c0-36.266,30.505-65.77,68-65.77s68,29.504,68,65.77V188h-136V105.77z M420,452c0,11.028-8.972,20-20,20H112 c-11.028,0-20-8.972-20-20V248c0-11.028,8.972-20,20-20h288c11.028,0,20,8.972,20,20V452z"/></svg>
            </button>
            <button class="btn btn-action btn-link tooltip" :data-tooltip="$t('group.tooltip.removeUser')" @click="openRemoveUserConfirmDialog(user)" v-if="$auth('Group', currentUser, group.id).canRemoveUser()">
              <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor"><path d="M12,24 C18.611399,24 24,18.611399 24,12 C24,5.38860104 18.611399,-4.47641924e-13 12,-4.47641924e-13 C5.38860104,-4.47641924e-13 7.10542736e-15,5.38860104 7.10542736e-15,12 C7.10542736e-15,18.611399 5.38860104,24 12,24 Z M12,1.67875648 C17.6787565,1.67875648 22.3212435,6.30051813 22.3212435,12 C22.3212435,17.6994819 17.6994819,22.3212435 12,22.3212435 C6.30051813,22.3212435 1.67875648,17.6787565 1.67875648,12 C1.67875648,6.32124352 6.32124352,1.67875648 12,1.67875648 Z M6.46632124,12.7253886 L17.5129534,12.7253886 C17.9896373,12.7253886 18.3626943,12.3523316 18.3626943,11.8756477 C18.3626943,11.3989637 17.9896373,11.0259067 17.5129534,11.0259067 L6.46632124,11.0259067 C5.98963731,11.0259067 5.61658031,11.3989637 5.61658031,11.8756477 C5.61658031,12.3523316 6.01036269,12.7253886 6.46632124,12.7253886 Z" /></svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <confirm-dialog :title="$t('group.confirmDialog.deactivateUserTitle')" :deleteObject="deactivateGroupUser" :objectId="selectedObject.id" :modal-open.sync="isOpenConfirmDialog">
      <p v-html="$t('group.confirmDialog.deactivateUserMsg', { name: selectedObject.name })"></p>
    </confirm-dialog>

    <confirm-dialog :title="$t('group.confirmDialog.deleteGroupTitle')" :modal-open.sync="isOpenDeleteGroupConfirmDialog">
      <p v-html="$t('group.confirmDialog.deleteGroupMsg', { name: selectedObject.name })"></p>
      <template slot="confirmBtn">
        <button type="button" class="btn btn-error" @click="localDeleteGroup">{{ $t('confirmDialog.yes') }}</button>
      </template>
    </confirm-dialog>

    <confirm-dialog
      :title="$t('group.confirmDialog.removeUserTitle')"
      :modal-open.sync="isOpenRemoveUserConfirmDialog"
      v-if="isOpenRemoveUserConfirmDialog"
      :deleteObject="localRemoveUser"
      :objectId="targetUser.id"
      >
      <p v-html="$t('group.confirmDialog.removeUserMsg', { name: targetUser.name })"></p>
      <template slot="confirm-btn">
        <button type="button" class="btn btn-error">{{ $t('confirmDialog.yes') }}</button>
      </template>
    </confirm-dialog>

    <modal :title="$t('group.modal.editUserTitle')" :modal-open.sync="isAddModalOpen">
      <user-profile :target-user="editUser" object-type="group" @afterUserProfileUpdated="isAddModalOpen = false" v-if="editUser"/>
    </modal>

    <modal :title="$t('group.modal.editTitle')" :modal-open.sync="isEditModalOpen">
      <group-form v-if="isEditModalOpen" :target-group="group" @afterModify="isEditModalOpen = false"></group-form>
    </modal>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main'
import modal from '../mixins/modal'
import confirmDialog from '../mixins/confirm-dialog'
import UserProfile from '../components/UserProfile'
import GroupTab from '../components/GroupTab'
import GroupForm from '../components/GroupForm'
import FilterUserBox from '../components/FilterUserBox'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
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

  components: {
    MainLayout,
    UserProfile,
    GroupTab,
    GroupForm,
    FilterUserBox
  },

  computed: {
    ...mapState('group', ['group', 'usersInGroup']),

    ...mapGetters('group', ['filterUsers'])
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
      this.clearGroupErrors()
      this.isEditModalOpen = !this.isEditModalOpen
    },

    ...mapActions('group', ['getGroup', 'addGroupUser', 'activateGroupUser', 'deactivateGroupUser', 'removeGroupUser', 'clearGroupErrors', 'deleteGroup', 'getUsersInGroup']),

    ...mapActions('flash', ['setFlashMsg']),

    localAddGroupUser() {
      this.addGroupUser({ groupId: this.$route.params.id, user: this.selectedUser }).then(() => {
        this.selectedUser = null
        this.setFlashMsg({ message: this.$t('messages.group.addMemberSuccess') })
      })
    }
  },

  created() {
    this.getUsersInGroup(this.$route.params.id)
    this.getGroup(this.$route.params.id)
  },

  watch: {
    $route: function(val) {
      this.getUsersInGroup(this.$route.params.id)
      this.getGroup(this.$route.params.id)
    }
  }
}
</script>

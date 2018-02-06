<template>
  <main-layout :title="$t('title.groups')">
    <div class="input-group mt-5">
      <input type="text" class="form-input" :placeholder="$t('placeholder.searchUserByEmail')"></input>
      <button type="button" class="btn input-group-btn">{{ $t('button.add') }}</button>
    </div>
    <p class="form-input-hint text-dark">Add a member to this group, then manager of this group can see the user's activities</p>

    <div class="toolbar mt-5 text-right"> <button type="button" class="btn" @click="toggleEditModal">{{ $t('button.editGroup') }}</button>
    </div>
    <table class="table table-hover bg-light mt-5">
      <thead>
        <th>{{ $t('tableHeader.name') }}</th>
        <th>{{ $t('tableHeader.email') }}</th>
        <th>{{ $t('tableHeader.department') }}</th>
        <th>{{ $t('tableHeader.createdAt') }}</th>
        <th></th>
      </thead>
      <tbody>
        <tr>
          <td>Minh Phan</td>
          <td>wofi.minh@1pac.vn</td>
          <td>Developer</td>
          <td>20-01-2018</td>
          <td class="text-center">
            <button class="btn btn-action btn-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
              </svg>
            </button>
          </td>
        </tr>
        <tr>
          <td>Minh Phan</td>
          <td>wofi.minh@1pac.vn</td>
          <td>Developer</td>
          <td>20-01-2018</td>
          <td class="text-center">
            <button class="btn btn-action btn-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
              </svg>
            </button>
          </td>
        </tr>
        <tr>
          <td>Minh Phan</td>
          <td>wofi.minh@1pac.vn</td>
          <td>Developer</td>
          <td>20-01-2018</td>
          <td class="text-center">
            <button class="btn btn-action btn-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
              </svg>
            </button>
          </td>
        </tr>
        <tr>
          <td>Minh Phan</td>
          <td>wofi.minh@1pac.vn</td>
          <td>Developer</td>
          <td>20-01-2018</td>
          <td class="text-center">
            <button class="btn btn-action btn-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
              </svg>
            </button>
          </td>
        </tr>
        <tr>
          <td>Minh Phan</td>
          <td>wofi.minh@1pac.vn</td>
          <td>Developer</td>
          <td>20-01-2018</td>
          <td class="text-center">
            <button class="btn btn-action btn-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <modal title="Edit Group" :modal-open.sync="isEditModalOpen">
      <div class="form-group">
        <label class="form-label" for="input-example-1">{{ $t('label.name') }}</label>
        <input class="form-input" type="text" id="input-example-1" :placeholder="$t('placeholder.name')">
      </div>
      <div class="form-group">
        <button type="button" class="btn">{{ $t('button.save') }}</button>
      </div>
    </modal>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'
import modal from '../mixins/modal'

export default {
  mixins: [modal],
  components: {
    MainLayout
  }
}
</script>

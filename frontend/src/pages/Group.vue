<template>
  <main-layout title="Group">
    <div class="input-group mt-5">
      <input type="text" class="form-input" placeholder="Search user by email"></input>
      <button type="button" class="btn input-group-btn">Add</button>
    </div>
    <p class="form-input-hint text-dark">Add a member to this group, then manager of this group can see the user's activities</p>

    <div class="toolbar mt-5 text-right"> <button type="button" class="btn" @click="toggleEditModal">Edit Group</button>
    </div>
    <table class="table table-hover bg-light mt-5">
      <thead>
        <th>Name</th>
        <th>Email</th>
        <th>Deparment</th>
        <th>Created At</th>
        <th></th>
      </thead>
      <tbody>
        <tr>
          <td>Minh Phan</td>
          <td>wofi.minh@1pac.vn</td>
          <td>Developer</td>
          <td>20-01-2018</td>
          <td>
            <button class="btn btn-error">Remove</button>
          </td>
        </tr>
        <tr>
          <td>Minh Phan</td>
          <td>wofi.minh@1pac.vn</td>
          <td>Developer</td>
          <td>20-01-2018</td>
          <td>
            <button class="btn btn-error">Remove</button>
          </td>
        </tr>
        <tr>
          <td>Minh Phan</td>
          <td>wofi.minh@1pac.vn</td>
          <td>Developer</td>
          <td>20-01-2018</td>
          <td>
            <button class="btn btn-error">Remove</button>
          </td>
        </tr>
        <tr>
          <td>Minh Phan</td>
          <td>wofi.minh@1pac.vn</td>
          <td>Developer</td>
          <td>20-01-2018</td>
          <td>
            <button class="btn btn-error">Remove</button>
          </td>
        </tr>
        <tr>
          <td>Minh Phan</td>
          <td>wofi.minh@1pac.vn</td>
          <td>Developer</td>
          <td>20-01-2018</td>
          <td>
            <button class="btn btn-error">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>

    <modal title="Edit Group" :modal-open.sync="isEditModalOpen">
      <div class="form-group">
        <label class="form-label" for="input-example-1">Name</label>
        <input class="form-input" type="text" id="input-example-1" placeholder="Name">
      </div>
      <div class="form-group">
        <button type="button" class="btn">Save</button>
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

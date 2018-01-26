<template>
  <main-layout>
    <h1>Group</h1>
    <div class="toolbar mt-5">
      <input type="text" class="form-input" placeholder="Search user by email"></input>
      <a href="#" class="btn">Add</a>
    </div>
    <div class="toolbar mt-5 text-right">
      <a href="#edit-group" class="btn">Edit Group</a>
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
    <div class="modal" id="edit-group">
      <a href="#close" class="modal-overlay"></a>
      <div class="modal-container">
        <div class="modal-header clearfix">
          <a href="#close" class="btn btn-clear float-right"></a><br>
          <h2 class="text-center">Edit Group</h2>
        </div>
        <div class="modal-body">
          <div class="content">
            <div class="form-group">
              <label class="form-label" for="input-example-1">Name</label>
              <input class="form-input" type="text" id="input-example-1" placeholder="Name">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="text-center">
            <a href="#close" class="btn btn-primary">Save</a>
          </div>
        </div>
      </div>
    </div>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'

export default {
  components: {
    MainLayout
  }
}
</script>

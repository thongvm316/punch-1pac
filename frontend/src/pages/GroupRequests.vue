<template>
  <main-layout title="Requests">
    <ul class="tab mt-4">
      <router-link tag="li" class="tab-item" to="/requests/my"><a href="#">My Requests</a></router-link>
      <router-link tag="li" class="tab-item" to="/requests/groups"><a href="#">Group Requests</a></router-link>
    </ul>

    <div class="toolbar mt-5">
      <select class="form-select">
        <option>Choose a group</option>
        <option>HR</option>
        <option>Accountant</option>
        <option>Engineer</option>
        <option>Administrator</option>
      </select>
      <select class="form-select">
        <option>Filter by status</option>
        <option>Approved</option>
        <option>Pending</option>
        <option>Denied</option>
      </select>
    </div>

    <table class="table table-hover bg-light mt-4">
      <thead>
        <th>Name</th>
        <th>Email</th>
        <th>Date</th>
        <th>Started At</th>
        <th>Ended At</th>
        <th>Reason</th>
        <th>Status</th>
      </thead>
      <tbody>
        <tr>
          <td>Minh</td>
          <td>wofi.minh@1pac.vn</td>
          <td>Jan 20</td>
          <td>08:30</td>
          <td>18:00</td>
          <td>I have personal issue, so I will be late for 10mins</td>
          <td>
            <span class="label label-rounded label-success">Approved</span>
          </td>
        </tr>
        <tr>
          <td>Minh</td>
          <td>wofi.minh@1pac.vn</td>
          <td>Jan 20</td>
          <td>08:30</td>
          <td>18:00</td>
          <td>I have personal issue, so I will be late for 10mins</td>
          <td>
            <span class="label label-rounded label-warning">Pending</span>
          </td>
        </tr>
        <tr>
          <td>Minh</td>
          <td>wofi.minh@1pac.vn</td>
          <td>Jan 20</td>
          <td>08:30</td>
          <td>18:00</td>
          <td>I have personal issue, so I will be late for 10mins</td>
          <td>
            <span class="label label-rounded label-error">Rejected</span>
          </td>
        </tr>
      </tbody>
    </table>

    <ul class="pagination mt-4">
      <li class="page-item">
        <a><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg></a>
      </li>
      <li class="page-item active">
        <a href="#">1</a>
      </li>
      <li class="page-item">
        <a href="#">2</a>
      </li>
      <li class="page-item">
        <a href="#">3</a>
      </li>
      <li class="page-item">
        <span>...</span>
      </li>
      <li class="page-item">
        <a href="#">12</a>
      </li>
      <li class="page-item">
        <a><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/></svg></a>
      </li>
    </ul>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'

export default {
  name: 'group-requests',
  components: {
    MainLayout
  }
}
</script>

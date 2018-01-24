<template>
  <main-layout>
    <h1>Attendances</h1>
    <ul class="tab mt-4">
      <router-link tag="li" class="tab-item" to="/attendances/my"><a href="#">My Attendances</a></router-link>
      <router-link tag="li" class="tab-item" to="/attendances/groups"><a href="#">Group Attendances</a></router-link>
    </ul>

    <table class="table table-hover mt-4">
      <thead>
        <th>Date</th>
        <th>Started At</th>
        <th>Ended At</th>
        <th>Status</th>
      </thead>
      <tbody>
        <tr>
          <td>Jan 20</td>
          <td>08:30</td>
          <td>18:00</td>
          <td>
            <span class="label label-rounded label-secondary">Attend on time</span>
            <span class="label label-rounded label-success">Leave on time</span>
          </td>
        </tr>
        <tr>
          <td>Jan 20</td>
          <td>08:30</td>
          <td>18:00</td>
          <td>
            <span class="label label-rounded label-secondary">Attend on time</span>
            <span class="label label-rounded label-success">Leave on time</span>
          </td>
        </tr>
        <tr>
          <td>Jan 20</td>
          <td>08:30</td>
          <td>18:00</td>
          <td>
            <span class="label label-rounded label-secondary">Attend on time</span>
            <span class="label label-rounded label-success">Leave on time</span>
          </td>
        </tr>
        <tr>
          <td>Jan 20</td>
          <td>08:30</td>
          <td>18:00</td>
          <td>
            <span class="label label-rounded label-secondary">Attend on time</span>
            <span class="label label-rounded label-success">Leave on time</span>
          </td>
        </tr>
        <tr>
          <td>Jan 20</td>
          <td>08:30</td>
          <td>18:00</td>
          <td>
            <span class="label label-rounded label-secondary">Attend on time</span>
            <span class="label label-rounded label-success">Leave on time</span>
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
  components: {
    MainLayout
  }
}
</script>

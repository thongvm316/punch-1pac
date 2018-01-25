<template>
  <main-layout>
    <h1>Attendances</h1>
    <ul class="tab mt-4">
      <router-link tag="li" class="tab-item" to="/attendances/my"><a href="#">My Attendances</a></router-link>
      <router-link tag="li" class="tab-item" to="/attendances/groups"><a href="#">Group Attendances</a></router-link>
    </ul>

    <div class="toolbar mt-5">
      <datepicker
        :placeholder="'From Date'"
        :minimumView="'day'"
        :maximumView="'day'"
        :input-class="'datepicker-input form-input'"
        :calendar-class="'datepicker-calendar'"
        :wrapper-class="'datepicker'"/>
      <datepicker
        :placeholder="'To Date'"
        :minimumView="'day'"
        :maximumView="'day'"
        :input-class="'datepicker-input form-input'"
        :calendar-class="'datepicker-calendar'"
        :wrapper-class="'datepicker'"/>
      <select class="form-select">
        <option>Filter by status</option>
        <option>Attend on time</option>
        <option>Leave on time</option>
        <option>Holiday</option>
        <option>Annual leave</option>
      </select>
      <select class="form-select">
        <option>Filter by group</option>
        <option>Marketing</option>
        <option>Developers</option>
        <option>HR</option>
        <option>Accountant</option>
      </select>
    </div>

    <table class="table table-hover bg-light mt-5">
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
import Datepicker from 'vuejs-datepicker'
import MainLayout from '../layouts/Main.vue'

export default {
  components: {
    Datepicker,
    MainLayout
  }
}
</script>

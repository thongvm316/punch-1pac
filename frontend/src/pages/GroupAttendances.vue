<template>
  <main-layout title="Attendances">
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
        <th>Name</th>
        <th>Email</th>
        <th>Date</th>
        <th>Started At</th>
        <th>Ended At</th>
        <th>Status</th>
      </thead>
      <tbody>
        <tr>
          <td>Minh</td>
          <td>wofi.minh@1pac.vn</td>
          <td>Jan 20</td>
          <td>08:30</td>
          <td>18:00</td>
          <td>
            <span class="label label-rounded label-secondary">Attend on time</span>
            <span class="label label-rounded label-success">Leave on time</span>
          </td>
        </tr>
        <tr>
          <td>Minh</td>
          <td>wofi.minh@1pac.vn</td>
          <td>Jan 20</td>
          <td>08:30</td>
          <td>18:00</td>
          <td>
            <span class="label label-rounded label-secondary">Attend on time</span>
            <span class="label label-rounded label-success">Leave on time</span>
          </td>
        </tr>
        <tr>
          <td>Minh</td>
          <td>wofi.minh@1pac.vn</td>
          <td>Jan 20</td>
          <td>08:30</td>
          <td>18:00</td>
          <td>
            <span class="label label-rounded label-secondary">Attend on time</span>
            <span class="label label-rounded label-success">Leave on time</span>
          </td>
        </tr>
        <tr>
          <td>Minh</td>
          <td>wofi.minh@1pac.vn</td>
          <td>Jan 20</td>
          <td>08:30</td>
          <td>18:00</td>
          <td>
            <span class="label label-rounded label-secondary">Attend on time</span>
            <span class="label label-rounded label-success">Leave on time</span>
          </td>
        </tr>
        <tr>
          <td>Minh</td>
          <td>wofi.minh@1pac.vn</td>
          <td>Jan 20</td>
          <td>08:30</td>
          <td>18:00</td>
          <td>
            <span class="label label-rounded label-secondary">Attend on time</span>
            <span class="label label-rounded label-success">Leave on time</span>
          </td>
        </tr>
        <tr>
          <td>Minh</td>
          <td>wofi.minh@1pac.vn</td>
          <td>Jan 20</td>
          <td>08:30</td>
          <td>18:00</td>
          <td>
            <span class="label label-rounded label-secondary">Attend on time</span>
            <span class="label label-rounded label-success">Leave on time</span>
          </td>
        </tr>
        <tr>
          <td>Minh</td>
          <td>wofi.minh@1pac.vn</td>
          <td>Jan 20</td>
          <td>08:30</td>
          <td>18:00</td>
          <td>
            <span class="label label-rounded label-secondary">Attend on time</span>
            <span class="label label-rounded label-success">Leave on time</span>
          </td>
        </tr>
        <tr>
          <td>Minh</td>
          <td>wofi.minh@1pac.vn</td>
          <td>Jan 20</td>
          <td>08:30</td>
          <td>18:00</td>
          <td>
            <span class="label label-rounded label-secondary">Attend on time</span>
            <span class="label label-rounded label-success">Leave on time</span>
          </td>
        </tr>
        <tr>
          <td>Minh</td>
          <td>wofi.minh@1pac.vn</td>
          <td>Jan 20</td>
          <td>08:30</td>
          <td>18:00</td>
          <td>
            <span class="label label-rounded label-secondary">Attend on time</span>
            <span class="label label-rounded label-success">Leave on time</span>
          </td>
        </tr>
        <tr>
          <td>Minh</td>
          <td>wofi.minh@1pac.vn</td>
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

    <pagination/>
  </main-layout>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import MainLayout from '../layouts/Main.vue'
import Pagination from '../components/Pagination.vue'

export default {
  components: {
    Datepicker,
    MainLayout,
    Pagination
  }
}
</script>

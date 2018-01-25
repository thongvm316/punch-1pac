<template>
  <main-layout>
    <h1>Requests</h1>
    <ul class="tab mt-4">
      <router-link tag="li" class="tab-item" to="/requests/my"><a href="#">My Requests</a></router-link>
      <router-link tag="li" class="tab-item" to="/requests/groups"><a href="#">Group Requests</a></router-link>
    </ul>

    <div class="toolbar clearfix mt-5">
      <a href="#add-request" class="btn float-right">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"></path></svg>
        Add Request
      </a>
    </div>

    <table class="table table-hover bg-light mt-4">
      <thead>
        <th>Date</th>
        <th>Started At</th>
        <th>Ended At</th>
        <th>Reason</th>
        <th>Status</th>
      </thead>
      <tbody>
        <tr @click="toggleModal">
          <td>Jan 20</td>
          <td>08:30</td>
          <td>18:00</td>
          <td>I have personal issue, so I will be late for 10mins</td>
          <td>
            <span class="label label-rounded label-success">Approved</span>
          </td>
        </tr>
        <tr @click="toggleModal">
          <td>Jan 20</td>
          <td>08:30</td>
          <td>18:00</td>
          <td>I have personal issue, so I will be late for 10mins</td>
          <td>
            <span class="label label-rounded label-warning">Pending</span>
          </td>
        </tr>
        <tr @click="toggleModal">
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
    <!-- New Request Modal -->
    <div class="modal" id="add-request">
      <a href="#close" class="modal-overlay" aria-label="Close"></a>
      <div class="modal-container">
        <div class="modal-header">
          <a href="#close" class="btn btn-clear float-right"></a><br>
          <h2 class="text-center">Add Request</h2>
        </div>
        <div class="modal-body">
          <div class="content">
            <div class="form-group">
              <label class="form-label">Date</label>
              <datepicker
              :minimumView="'day'"
              :maximumView="'day'"
              :input-class="'datepicker-input form-input'"
              :calendar-class="'datepicker-calendar'"
              :wrapper-class="'datepicker datepicker-full-width'"/>
            </div>
            <div class="form-group">
              <label class="form-label">Started at</label>
              <input class="form-input" type="text">
            </div>
            <div class="form-group">
              <label class="form-label">Ended at</label>
              <input class="form-input" type="text">
            </div>
            <div class="form-group">
              <label class="form-label">Reason</label>
              <textarea class="form-input"></textarea>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="text-center">
            <a href="#close" class="btn btn-primary">Submit</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Request Modal -->
    <div class="modal" :class="{ active: isModalOpen }" id="edit-request">
      <a class="modal-overlay" @click="toggleModal"></a>
      <div class="modal-container">
        <div class="modal-header">
          <a class="btn btn-clear float-right" @click="toggleModal"></a><br>
          <h2 class="text-center">Edit Request</h2>
        </div>
        <div class="modal-body">
          <div class="content">
            <div class="form-group">
              <label class="form-label">Date</label>
              <datepicker
              :minimumView="'day'"
              :maximumView="'day'"
              :input-class="'datepicker-input form-input'"
              :calendar-class="'datepicker-calendar'"
              :wrapper-class="'datepicker datepicker-full-width'"/>
            </div>
            <div class="form-group">
              <label class="form-label">Started at</label>
              <input class="form-input" type="text">
            </div>
            <div class="form-group">
              <label class="form-label">Ended at</label>
              <input class="form-input" type="text">
            </div>
            <div class="form-group">
              <label class="form-label">Reason</label>
              <textarea class="form-input"></textarea>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="text-center">
            <a class="btn btn-primary" @click="toggleModal">Submit</a>
          </div>
        </div>
      </div>
    </div>
  </main-layout>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import MainLayout from '../layouts/Main.vue'

export default {
  data () {
    return {
      isModalOpen: false
    }
  },
  name: 'my-requests',
  components: {
    MainLayout,
    Datepicker
  },
  methods: {
    toggleModal () {
      this.isModalOpen = !this.isModalOpen
    }
  }
}
</script>

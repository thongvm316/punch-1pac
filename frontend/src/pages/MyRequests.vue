<template>
  <main-layout title="Requests">
    <ul class="tab mt-4">
      <router-link tag="li" class="tab-item" to="/requests/my"><a href="#">My Requests</a></router-link>
      <router-link tag="li" class="tab-item" to="/requests/groups"><a href="#">Group Requests</a></router-link>
    </ul>

    <div class="toolbar clearfix mt-5">
      <button type="button" class="btn float-right" @click="toggleAddModal">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"></path></svg>
        Add Request
      </button>
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
        <tr @click="toggleEditModal">
          <td>Jan 20</td>
          <td>08:30</td>
          <td>18:00</td>
          <td>I have personal issue, so I will be late for 10mins</td>
          <td>
            <span class="label label-rounded label-success">Approved</span>
          </td>
        </tr>
        <tr @click="toggleEditModal">
          <td>Jan 20</td>
          <td>08:30</td>
          <td>18:00</td>
          <td>I have personal issue, so I will be late for 10mins</td>
          <td>
            <span class="label label-rounded label-warning">Pending</span>
          </td>
        </tr>
        <tr @click="toggleEditModal">
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

    <pagination/>

    <modal title="Add Request" :modal-open.sync="isAddModalOpen">
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
      <div class="form-group">
        <button type="button" class="btn">Submit</button>
      </div>
    </modal>

    <modal title="Edit Request" :modal-open.sync="isEditModalOpen">
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
      <div class="form-group">
        <button type="button" class="btn">Save</button>
      </div>
    </modal>
  </main-layout>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import MainLayout from '../layouts/Main.vue'
import modal from '../mixins/modal'
import Pagination from '../components/Pagination.vue'

export default {
  name: 'my-requests',
  mixins: [modal],
  components: {
    MainLayout,
    Datepicker,
    Pagination
  },
  methods: {
    toggleEditModal () {
      this.isEditModalOpen = !this.isEditModalOpen
    },
    toggleAddModal () {
      this.isAddModalOpen = !this.isAddModalOpen
    }
  }
}
</script>

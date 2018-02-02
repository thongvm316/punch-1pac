<template>
  <main-layout :title="$t('title.requests')">
    <ul class="tab mt-4">
      <router-link tag="li" class="tab-item" to="/requests/my"><a href="#">{{ $t('request.myRequest') }}</a></router-link>
      <router-link tag="li" class="tab-item" to="/requests/groups"><a href="#">{{ $t('request.groupRequest') }}</a></router-link>
    </ul>

    <div class="toolbar clearfix mt-5">
      <button type="button" class="btn float-right" @click="toggleAddModal">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"></path></svg>
        {{ $t('message.button.addGroup') }}
      </button>
    </div>

    <table class="table table-hover bg-light mt-4">
      <thead>
        <th>{{ $t('tableHeader.date') }}</th>
        <th>{{ $t('tableHeader.startedAt') }}</th>
        <th>{{ $t('tableHeader.endedAt') }}</th>
        <th>{{ $t('tableHeader.reason') }}</th>
        <th>{{ $t('tableHeader.status') }}</th>
      </thead>
      <tbody>
        <tr @click="toggleEditModal">
          <td>Jan 20</td>
          <td>08:30</td>
          <td>18:00</td>
          <td>I have personal issue, so I will be late for 10mins</td>
          <td>
            <span class="label label-rounded label-success">{{ $t('status.approved') }}</span>
          </td>
        </tr>
        <tr @click="toggleEditModal">
          <td>Jan 20</td>
          <td>08:30</td>
          <td>18:00</td>
          <td>I have personal issue, so I will be late for 10mins</td>
          <td>
            <span class="label label-rounded label-warning">{{ $t('status.pending') }}</span>
          </td>
        </tr>
        <tr @click="toggleEditModal">
          <td>Jan 20</td>
          <td>08:30</td>
          <td>18:00</td>
          <td>I have personal issue, so I will be late for 10mins</td>
          <td>
            <span class="label label-rounded label-error">{{ $t('status.rejected') }}</span>
          </td>
        </tr>
      </tbody>
    </table>

    <pagination/>

    <modal title="Add Request" :modal-open.sync="isAddModalOpen">
      <div class="form-group">
        <label class="form-label">{{ $t('label.date') }}</label>
        <datepicker
        :minimumView="'day'"
        :maximumView="'day'"
        :input-class="'datepicker-input form-input'"
        :calendar-class="'datepicker-calendar'"
        :wrapper-class="'datepicker datepicker-full-width'"/>
      </div>
      <div class="form-group">
        <label class="form-label">{{ $t('label.startedAt') }}</label>
        <input class="form-input" type="text">
      </div>
      <div class="form-group">
        <label class="form-label">{{ $t('label.endedAt') }}</label>
        <input class="form-input" type="text">
      </div>
      <div class="form-group">
        <label class="form-label">{{ $t('label.reason') }}</label>
        <textarea class="form-input"></textarea>
      </div>
      <div class="form-group">
        <button type="button" class="btn">{{ $t('button.submit') }}</button>
      </div>
    </modal>

    <modal title="Edit Request" :modal-open.sync="isEditModalOpen">
      <div class="form-group">
        <label class="form-label">{{ $t('label.date') }}</label>
        <datepicker
        :minimumView="'day'"
        :maximumView="'day'"
        :input-class="'datepicker-input form-input'"
        :calendar-class="'datepicker-calendar'"
        :wrapper-class="'datepicker datepicker-full-width'"/>
      </div>
      <div class="form-group">
        <label class="form-label">{{ $t('label.startedAt') }}</label>
        <input class="form-input" type="text">
      </div>
      <div class="form-group">
        <label class="form-label">{{ $t('label.endedAt') }}</label>
        <input class="form-input" type="text">
      </div>
      <div class="form-group">
        <label class="form-label">{{ $t('label.reason') }}</label>
        <textarea class="form-input"></textarea>
      </div>
      <div class="form-group">
        <button type="button" class="btn">{{ $t('button.save') }}</button>
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

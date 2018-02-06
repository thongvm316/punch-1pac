<template>
  <main-layout :title="$t('title.requests')">
    <ul class="tab mt-4">
      <router-link tag="li" class="tab-item" to="/requests/my"><a href="#">{{ $t('request.myRequests') }}</a></router-link>
      <router-link tag="li" class="tab-item" to="/requests/groups"><a href="#">{{ $t('request.groupRequests') }}</a></router-link>
    </ul>

    <div class="toolbar mt-5">
      <select class="form-select">
        <option>{{ $t('placeholder.filterByGroup') }}</option>
        <option>{{ $t('group.accountant') }}</option>
        <option>{{ $t('group.developers') }}</option>
        <option>{{ $t('group.marketing') }}</option>
        <option>{{ $t('group.hr') }}</option>
      </select>
      <select class="form-select">
        <option>{{ $t('placeholder.filterByStatus') }}</option>
        <option>{{ $t('status.approved') }}</option>
        <option>{{ $t('status.pending') }}</option>
        <option>{{ $t('status.rejected') }}</option>
      </select>
    </div>

    <table class="table table-hover bg-light mt-4">
      <thead>
        <th>{{ $t('tableHeader.name') }}</th>
        <th>{{ $t('tableHeader.email') }}</th>
        <th>{{ $t('tableHeader.date') }}</th>
        <th>{{ $t('tableHeader.attendedAt') }}</th>
        <th>{{ $t('tableHeader.leftAt') }}</th>
        <th>{{ $t('tableHeader.reason') }}</th>
        <th>{{ $t('tableHeader.status') }}</th>
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
            <span class="label label-rounded label-success">{{ $t('status.approved') }}</span>
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
            <span class="label label-rounded label-warning">{{ $t('status.pending') }}</span>
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
            <span class="label label-rounded label-error">{{ $t('status.rejected') }}</span>
          </td>
        </tr>
      </tbody>
    </table>

    <pagination/>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'
import Pagination from '../components/Pagination.vue'

export default {
  name: 'group-requests',
  components: {
    MainLayout,
    Pagination
  }
}
</script>

<template>
  <setting-layout>
    <h1>Company Settings</h1>
    <div class="columns">
      <div class="column col-3">
        <company-settings-sidebar></company-settings-sidebar>
      </div>
      <div class="column col-9">
        <h2 class="border-bottom">Business Days</h2>
        <div class="text-right">
          <button class="btn group-icon">
            Add Business Days
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
          </button>
        </div>
        <table class="table table-hover mt-4">
          <thead>
            <th>Weekday</th>
            <th>Start at</th>
            <th>End at</th>
            <th></th>
          </thead>
          <tbody>
            <tr>
              <td>Monday</td>
              <td>08:00</td>
              <td>17:30</td>
              <td class="text-center"><button class="btn btn-error">Delete</button></td>
            </tr>
            <tr>
              <td>Tuesday</td>
              <td>08:00</td>
              <td>17:30</td>
              <td class="text-center"><button class="btn btn-error">Delete</button></td>
            </tr>
            <tr>
              <td>Wednesday</td>
              <td>08:00</td>
              <td>17:30</td>
              <td class="text-center"><button class="btn btn-error">Delete</button></td>
            </tr>
            <tr>
              <td>Thursday</td>
              <td>08:00</td>
              <td>17:30</td>
              <td class="text-center"><button class="btn btn-error">Delete</button></td>
            </tr>
            <tr>
              <td>Friday</td>
              <td>08:00</td>
              <td>17:30</td>
              <td class="text-center"><button class="btn btn-error">Delete</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </setting-layout>
</template>

<script>
import SettingLayout from '../layouts/Setting.vue'
import CompanySettingsSidebar from '../components/CompanySettingsSidebar.vue'

export default {
  components: {
    SettingLayout,
    CompanySettingsSidebar
  }
}
</script>

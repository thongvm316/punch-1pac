<template>
  <main-layout>
    <h1>Dashboard</h1>

    <h4 class="mt-5">Status in month</h4>
    <div class="mt-4">
      <span class="label label-rounded label-secondary">Arrive on time: <strong>3 days</strong></span>
      <span class="label label-rounded label-secondary">Leave on time: <strong>11 days</strong></span>
      <span class="label label-rounded label-secondary">Arrive late: <strong>1 day</strong></span>
      <span class="label label-rounded label-secondary">Leave early: <strong>0</strong></span>
      <span class="label label-rounded label-secondary">Annual leave: <strong>1 day</strong></span>
      <span class="label label-rounded label-secondary">Holiday: <strong>1 day</strong></span>
      <span class="label label-rounded label-secondary">Unpaid leave: <strong>1 day</strong></span>
    </div>

    <h4 class="mt-5">Calendar</h4>
    <div class="calendar calendar-lg mt-4 bg-light">
      <div class="calendar-nav navbar">
        <button class="btn btn-action btn-link btn-lg">
          <
        </button>
        <div class="navbar-primary">March 2017</div>
        <button class="btn btn-action btn-link btn-lg">
          >
        </button>
      </div>
      <div class="calendar-container">
        <div class="calendar-header">
          <div class="calendar-date">Sun</div>
          <div class="calendar-date">Mon</div>
          <div class="calendar-date">Tue</div>
          <div class="calendar-date">Wed</div>
          <div class="calendar-date">Thu</div>
          <div class="calendar-date">Fri</div>
          <div class="calendar-date">Sat</div>
        </div>
        <div class="calendar-body">
          <div class="calendar-date prev-month disabled"><button class="date-item">26</button></div>
          <div class="calendar-date prev-month disabled">
            <button class="date-item">27</button>
            <div class="calendar-events">
              <a class="calendar-event bg-error text-light" href="#calendars">Zhonghe Festival</a>
            </div>
          </div>
          <div class="calendar-date prev-month disabled"><button class="date-item">28</button></div>
          <div class="calendar-date current-month"><button class="date-item">1</button></div>
          <div class="calendar-date current-month"><button class="date-item">2</button></div>
          <div class="calendar-date current-month"><button class="date-item">3</button></div>
          <div class="calendar-date current-month tooltip" data-tooltip="Today"><button class="date-item date-today">4</button></div>
          <div class="calendar-date current-month"><button class="date-item" disabled="">5</button></div>
          <div class="calendar-date current-month"><button class="date-item">6</button></div>
          <div class="calendar-date current-month"><button class="date-item">7</button></div>
          <div class="calendar-date current-month tooltip" data-tooltip="You have appointments">
            <button class="date-item badge">8</button>
            <div class="calendar-events">
              <a class="calendar-event bg-primary text-light" href="#calendars">Product launch event</a>
              <a class="calendar-event bg-error text-light" href="#calendars">International Women's Day</a>
            </div>
          </div>
          <div class="calendar-date current-month"><button class="date-item">9</button></div>
          <div class="calendar-date current-month"><button class="date-item">10</button></div>
          <div class="calendar-date current-month"><button class="date-item">11</button></div>
          <div class="calendar-date current-month">
            <button class="date-item">12</button>
            <div class="calendar-events">
              <a class="calendar-event bg-error text-light" href="#calendars">Arbor Day</a>
            </div>
          </div>
          <div class="calendar-date current-month"><button class="date-item">13</button></div>
          <div class="calendar-date current-month"><button class="date-item">14</button></div>
          <div class="calendar-date current-month"><button class="date-item">15</button></div>
          <div class="calendar-date current-month calendar-range range-start"><button class="date-item active">16</button></div>
          <div class="calendar-date current-month calendar-range"><button class="date-item">17</button></div>
          <div class="calendar-date current-month calendar-range"><button class="date-item">18</button></div>
          <div class="calendar-date current-month calendar-range"><button class="date-item">19</button></div>
          <div class="calendar-date current-month calendar-range range-end">
            <button class="date-item active">20</button>
            <div class="calendar-events"> <a class="calendar-event bg-success text-light" href="#calendars">Spring Equinox</a> </div>
          </div>
          <div class="calendar-date current-month"><button class="date-item">21</button></div>
          <div class="calendar-date current-month"><button class="date-item">22</button></div>
          <div class="calendar-date current-month"><button class="date-item">23</button></div>
          <div class="calendar-date current-month"><button class="date-item">24</button></div>
          <div class="calendar-date current-month"><button class="date-item">25</button></div>
          <div class="calendar-date current-month"><button class="date-item">26</button></div>
          <div class="calendar-date current-month"><button class="date-item">27</button></div>
          <div class="calendar-date current-month"><button class="date-item">28</button></div>
          <div class="calendar-date current-month"><button class="date-item">29</button></div>
          <div class="calendar-date current-month"><button class="date-item">30</button></div>
          <div class="calendar-date current-month"><button class="date-item">31</button></div>
          <div class="calendar-date next-month disabled">
            <button class="date-item">1</button>
            <div class="calendar-events">
              <a class="calendar-event bg-error text-light" href="#calendars">April Fools' Day</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-2">
      <div class="chip bg-light">
        <span class="circle bg-primary mr-2"></span>
        Arrive on time
      </div>
      <div class="chip bg-light">
        <span class="circle bg-success mr-2"></span>
        Leave on time
      </div>
      <div class="chip bg-light">
        <span class="circle bg-error mr-2"></span>
        Unpaid leave
      </div>
      <div class="chip bg-light">
        <span class="circle bg-warning mr-2"></span>
        Annual leave
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

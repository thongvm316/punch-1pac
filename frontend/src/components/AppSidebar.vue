<template>
  <div class="sidebar">
    <ul class="nav">
      <router-link to="/dashboard" tag="li" class="nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M0,0 L11,0 L11,9 L0,9 L0,0 Z M13,16 L24,16 L24,24 L13,24 L13,16 Z M0,11 L11,11 L11,24 L0,24 L0,11 Z M13,0 L24,0 L24,14 L13,14 L13,0 Z"></path></svg>
        <span>Dashboard</span>
      </router-link>
      <router-link to="/attendances" tag="li" class="nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
        <span>Attendances</span>
      </router-link>
      <router-link to="/requests" tag="li" class="nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1c-6.628 0-12 4.573-12 10.213 0 2.39.932 4.591 2.427 6.164l-2.427 5.623 7.563-2.26c9.495 2.598 16.437-3.251 16.437-9.527 0-5.64-5.372-10.213-12-10.213z"/></svg>
        <span>Requests</span>
      </router-link>
      <router-link to="/groups" tag="li" class="nav-item">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M10.8377143,15.818 C13.2942857,15.2553 14.7282857,14.76315 13.62,12.6883 C10.2497143,6.37535 12.7268571,3 16.2865714,3 C19.9165714,3 22.3328571,6.5054 18.9522857,12.6883 C17.8105714,14.77505 19.3268571,15.2672 21.7311429,15.818 C23.8594286,16.3059 24,17.33695 24,19.12365 L24,20 L8.57142857,20 C8.57142857,17.66675 8.38285714,16.3807 10.8377143,15.818 Z M0,20 L6.69342857,20 C6.66342857,13.04955 9.63857143,15.48395 9.63857143,10.54205 C9.63857143,8.4077 8.23371429,7.25 6.426,7.25 C3.756,7.25 1.89857143,9.78215 4.42628571,14.51665 C5.25685714,16.07215 3.54257143,16.4419 1.69971429,16.8635 C0.103714286,17.229 3.80647894e-16,18.0025 3.80647894e-16,19.34295 L0,20 Z"></path></svg>
        <span>Groups</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'app-sidebar'
}
</script>

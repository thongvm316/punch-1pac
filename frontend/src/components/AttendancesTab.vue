<template>
  <ul class="tab mt-4">
    <router-link tag="li" class="tab-item" to="/attendances/my"><a href="#">{{ $t('attendances.tab.my') }}</a></router-link>
    <router-link tag="li" class="tab-item" to="/attendances/groups"><a href="#">{{ $t('attendances.tab.group') }}</a></router-link>
  </ul>
</template>

<script>
export default {
  name: 'attendances-tab'
}
</script>

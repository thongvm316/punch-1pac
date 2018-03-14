<template>
  <ul class="tab mt-4">
    <router-link tag="li" class="tab-item" to="/requests/my"><a href="#">{{ $t('requests.tab.my') }}</a></router-link>
    <router-link tag="li" class="tab-item" to="/requests/groups"><a href="#">{{ $t('requests.tab.group') }}</a></router-link>
  </ul>
</template>

<script>
export default {
  name: 'requests-tab'
}
</script>

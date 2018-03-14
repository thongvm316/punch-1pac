<template>
  <ul class="tab mt-4">
    <router-link tag="li" class="tab-item" to="/requests/my"><a href="#">{{ $t('requests.tab.my') }}</a></router-link>
    <router-link tag="li" class="tab-item" to="/requests/groups" v-if="isManagers()"><a href="#">{{ $t('requests.tab.group') }}</a></router-link>
  </ul>
</template>

<script>
import authorization from '../mixins/authorization'

export default {
  name: 'requests-tab',
  mixins: [authorization]
}
</script>

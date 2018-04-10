<template>
  <ul class="tab mt-4">
    <router-link tag="li"
      class="tab-item"
      :to="`/groups/${groupId}/users`">
      <a href="#">{{ $t('group.users') }}</a>
    </router-link>
    <router-link tag="li"
      class="tab-item"
      :to="`/groups/${groupId}/attendances`"
      v-if="$auth('Page', currentUser).canViewGroups()">
      <a href="#">{{ $t('group.attendances') }}</a>
    </router-link>
    <router-link tag="li"
      class="tab-item"
      :to="`/groups/${groupId}/requests`"
      v-if="$auth('Page', currentUser).canViewGroups()">
      <a href="#">{{ $t('group.requests') }}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: 'group-tab',
  props: ['groupId']
}
</script>

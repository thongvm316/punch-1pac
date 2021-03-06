<template>
  <form class="setting-form">
    <div
      class="form-group"
      :class="{ 'has-error': $v.params.name.$error || errors.name }"
    >
      <label class="form-label">{{ $t('label.name') }}</label>
      <input
        v-model="$v.params.name.$model"
        class="form-input"
        type="text"
        :placeholder="$t('placeholder.name')"
      >
      <p
        v-if="$v.params.name.$error && !errors.name"
        class="form-input-hint"
      >
        {{ $t('validation.required', { name: $t('label.name') }) }}
      </p>
      <p
        v-if="errors.name"
        class="form-input-hint"
      >
        {{ $t('label.name') }} {{ errors.name[0] }}
      </p>
    </div>
    <div
      class="form-group"
      :class="{ 'has-error': $v.params.email.$anyError || errors.email }"
    >
      <label class="form-label">{{ $t('label.email') }}</label>
      <input
        v-model="$v.params.email.$model"
        class="form-input"
        type="text"
        :placeholder="$t('placeholder.email')"
      >
      <p
        v-if="$v.params.email.$anyError && !errors.email"
        class="form-input-hint"
      >
        <span v-if="!$v.params.email.required">{{ $t('validation.required', { name: $t('label.email') }) }}</span>
        <span v-if="!$v.params.email.email">{{ $t('validation.invalid', { name: $t('label.email') }) }}</span>
      </p>
      <p
        v-if="errors.email"
        class="form-input-hint"
      >
        {{ $t('label.email') }} {{ errors.email[0] }}
      </p>
    </div>
    <div class="form-group">
      <label class="form-label">{{ $t('label.role') }}</label>
      <select
        v-model="params.role"
        class="form-select"
      >
        <option
          v-for="(role, key) in meta.roles"
          :key="key"
          :value="role"
        >
          {{ $t(`meta.roles.${role}`) }}
        </option>
      </select>
    </div>
    <div
      class="form-group"
      :class="{ 'has-error': $v.params.group_id.$error || errors.group }"
    >
      <label class="form-label">{{ $t('label.group') }}</label>
      <group-select v-model="$v.params.group_id.$model">
        <option
          slot="placeholder"
          value=""
        >
          {{ $t('placeholder.chooseGroup') }}
        </option>
      </group-select>
      <p
        v-if="$v.params.group_id.$error && !errors.group"
        class="form-input-hint"
      >
        {{ $t('validation.required', { name: $t('label.group') }) }}
      </p>
      <p
        v-if="errors.group"
        class="form-input-hint"
      >
        {{ $t('label.group') }} {{ errors.group[0] }}
      </p>
    </div>
    <div class="form-group">
      <button
        type="button"
        class="btn btn-success btn-submit"
        :disabled="isDisabled"
        @click="create()"
      >
        {{ $t('button.common.submit') }}
      </button>
    </div>
  </form>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { CLEAR_USER_ERRORS } from '@/store/mutation-types'
import handleSuccess from '@/mixins/handle-success'
import userAddValidate from '@/validations/user-add-validate'
const GroupSelect = () => import('./GroupSelect.vue')

export default {
  name: 'UserAddForm',

  components: {
    GroupSelect
  },

  mixins: [handleSuccess, userAddValidate],

  data() {
    return {
      params: {
        name: '',
        email: '',
        role: 'member',
        group_id: ''
      }
    }
  },

  computed: {
    ...mapState('initialStates', ['meta']),

    ...mapState('companyUsers', ['errors'])
  },

  created() {
    this[CLEAR_USER_ERRORS]()
  },

  methods: {
    ...mapActions('companyUsers', ['createUser']),

    ...mapMutations('companyUsers', ['CLEAR_USER_ERRORS']),

    create() {
      this.createUser(this.params)
        .then(response => {
          this.handleSuccess({ message: this.$t('messages.user.addSuccess'), emitType: 'afterAdded' })
        })
    }
  }
}
</script>

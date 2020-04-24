<template>
  <div>
    <div
      class="form-group"
      :class="{ 'has-error': $v.params.name.$error || errors.name }"
    >
      <label class="form-label">{{ $t('label.name') }}</label>
      <input
        v-model="$v.params.name.$model"
        class="form-input"
        type="text"
        :placeholder="$t('label.name')"
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
      :class="{ 'has-error': errors.image }"
    >
      <label class="form-label">{{ $t('label.image') }}</label>
      <img
        v-if="targetGroup"
        class="img-profile"
        :src="targetGroup.image_url"
        alt=""
      >
      <input
        class="form-input"
        type="file"
        @change="setImageFile"
      >
      <p
        v-if="errors.image"
        class="form-input-hint"
      >
        {{ $t('label.image') }} {{ errors.image[0] }}
      </p>
    </div>
    <div
      class="form-group"
      :class="{ 'has-error': errors.description }"
    >
      <label class="form-label">{{ $t('label.description') }}</label>
      <textarea
        v-model="params.description"
        class="form-input"
        :placeholder="$t('label.description')"
      />
      <p
        v-if="errors.description"
        class="form-input-hint"
      >
        {{ $t('label.description') }} {{ errors.description[0] }}
      </p>
    </div>
    <div class="form-group">
      <button
        v-if="!targetGroup"
        ref="localAddGroupButton"
        type="button"
        class="btn btn-success btn-submit"
        :disabled="isDisabled"
        @click="localAddGroup"
      >
        {{ $t('button.common.submit') }}
      </button>
      <button
        v-if="targetGroup"
        ref="localEditGroupButton"
        type="button"
        class="btn btn-success btn-submit"
        :disabled="isDisabled"
        @click="localEditGroup"
      >
        {{ $t('button.common.save') }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import handleSuccess from '@/mixins/handle-success'
import groupFormValidate from '@/validations/group-form-validate'

export default {
  name: 'GroupForm',

  mixins: [handleSuccess, groupFormValidate],

  props: {
    targetGroup: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      params: {
        name: '',
        description: '',
        image: ''
      },
      errors: {}
    }
  },

  created() {
    if (this.targetGroup) this.params = { ...this.targetGroup }
  },

  methods: {
    ...mapActions('groups', ['addGroup']),

    ...mapActions('group', ['updateGroup']),

    localAddGroup() {
      this.addGroup(this.params)
        .then(() => {
          this.handleSuccess({
            emitType: 'afterModify',
            message: this.$t('messages.group.createSuccess')
          })
        })
        .catch(error => {
          if (error.response && error.response.status === 422) this.errors = error.response.data.errors
        })
    },

    localEditGroup() {
      this.updateGroup({ groupId: this.targetGroup.id, editParams: this.params })
        .then(() => {
          this.handleSuccess({
            emitType: 'afterModify',
            message: this.$t('messages.group.updateSuccess')
          })
        })
        .catch(error => {
          if (error.response && error.response.status === 422) this.errors = error.response.data.errors
        })
    },

    setImageFile(e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.params.image = files[0]
    }
  }
}
</script>

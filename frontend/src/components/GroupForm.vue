<template>
  <div>
    <div class="form-group" :class="{ 'has-error': errors.name }">
      <label class="form-label">{{ $t('group.labels.name') }}</label>
      <input class="form-input" type="text" :placeholder="$t('group.labels.name')" v-model="params.name">
      <p class="form-input-hint" v-if="errors.name">{{ $t('group.labels.name') }} {{ errors.name[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': errors.image }">
      <label class="form-label">{{ $t('group.labels.image') }}</label>
      <img class="img-profile" :src="targetGroup.image_url" alt="" v-if="targetGroup">
      <input class="form-input" type="file" @change="setImageFile">
      <p class="form-input-hint" v-if="errors.image">{{ $t('group.labels.image') }} {{ errors.image[0] }}</p>
    </div>
    <div class="form-group" :class="{ 'has-error': errors.description }">
      <label class="form-label">{{ $t('group.labels.description') }}</label>
      <textarea class="form-input" :placeholder="$t('group.labels.description')" v-model="params.description"></textarea>
      <p class="form-input-hint" v-if="errors.description">{{ $t('group.labels.description') }} {{ errors.description[0] }}</p>
    </div>
    <div class="form-group">
      <button type="button" class="btn btn-success btn-submit" @click="localAddGroup" v-if="!targetGroup" :disabled="isDisable">{{ $t('groups.btn.submit') }}</button>
      <button type="button" class="btn btn-success btn-submit" @click="localEditGroup" v-if="targetGroup" :disable="isDisable">{{ $t('group.btn.save') }}</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'group-form',

  props: ['targetGroup'],

  data() {
    return {
      isDisable: false,
      params: {
        name: '',
        description: '',
        image: ''
      },
      errors: {}
    }
  },

  methods: {
    ...mapActions('flash', ['setFlashMsg']),

    ...mapActions('groups', ['addGroup']),

    ...mapActions('group', ['updateGroup']),

    localAddGroup() {
      this.isDisable = true
      this.addGroup(this.params)
        .then(response => {
          this.setFlashMsg({ message: this.$t('messages.group.createSuccess') })
          this.$emit('afterModify')
          this.isDisable = false
        })
        .catch(error => {
          this.isDisable = false
          if (error.response && error.response.status === 422) this.errors = error.response.data.errors
        })
    },

    localEditGroup() {
      this.isDisable = true
      this.updateGroup({ groupId: this.targetGroup.id, editParams: this.params })
        .then(response => {
          this.setFlashMsg({ message: this.$t('messages.group.updateSuccess') })
          this.$emit('afterModify')
          this.isDisable = false
        })
        .catch(error => {
          this.isDisable = false
          if (error.response && error.response.status === 422) this.errors = error.response.data.errors
        })
    },

    setImageFile(e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.params.image = files[0]
    }
  },

  created() {
    if (this.targetGroup) {
      Object.keys(this.params).forEach(key => {
        this.params[key] = this.targetGroup[key]
      })
    }
  }
}
</script>

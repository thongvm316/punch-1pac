<template>
  <main-layout :title="$t('title.groups')">
    <div class="toolbar mt-5 text-right">
      <button type="button" class="btn" @click="toggleAddModal">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"></path></svg>
        {{ $t('button.addGroup') }}
      </button>
    </div>

    <div class="columns mt-5">
      <div class="column col-3">
        <div class="box">
          <div class="box-header">
            <router-link tag="h2" to="/groups/1" class="box-title">Quality Assurance</router-link>
            <span>{{ $tc('group.member', 23, { count: 23 }) }}</span>
          </div>
          <div class="box-content box-content-flex">
            <div class="box-content-img">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <span>+ 2</span>
            </div>
            <a @click.prevent="leave">{{ $t('group.leave') }}</a>
          </div>
        </div>
      </div>
      <div class="column col-3">
        <div class="box">
          <div class="box-header">
            <router-link tag="h2" to="/groups/1" class="box-title">Quality Assurance</router-link>
            <span>{{ $tc('group.member', 23, { count: 23 }) }}</span>
          </div>
          <div class="box-content box-content-flex">
            <div class="box-content-img">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <span>+ 2</span>
            </div>
            <a @click.prevent="leave">{{ $t('group.leave') }}</a>
          </div>
        </div>
      </div>
      <div class="column col-3">
        <div class="box">
          <div class="box-header">
            <router-link tag="h2" to="/groups/1" class="box-title">Quality Assurance</router-link>
            <span>{{ $tc('group.member', 23, { count: 23 }) }}</span>
          </div>
          <div class="box-content box-content-flex">
            <div class="box-content-img">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <span>+ 2</span>
            </div>
            <a @click.prevent="leave">{{ $t('group.leave') }}</a>
          </div>
        </div>
      </div>
      <div class="column col-3">
        <div class="box">
          <div class="box-header">
            <router-link tag="h2" to="/groups/1" class="box-title">Quality Assurance</router-link>
            <span>{{ $tc('group.member', 23, { count: 23 }) }}</span>
          </div>
          <div class="box-content box-content-flex">
            <div class="box-content-img">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <span>+ 2</span>
            </div>
            <a @click.prevent="leave">{{ $t('group.leave') }}</a>
          </div>
        </div>
      </div>
      <div class="column col-3">
        <div class="box">
          <div class="box-header">
            <router-link tag="h2" to="/groups/1" class="box-title">Quality Assurance</router-link>
            <span>{{ $tc('group.member', 23, { count: 23 }) }}</span>
          </div>
          <div class="box-content box-content-flex">
            <div class="box-content-img">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <span>+ 2</span>
            </div>
            <a @click.prevent="leave">{{ $t('group.leave') }}</a>
          </div>
        </div>
      </div>
      <div class="column col-3">
        <div class="box">
          <div class="box-header">
            <router-link tag="h2" to="/groups/1" class="box-title">Quality Assurance</router-link>
            <span>{{ $tc('group.member', 23, { count: 23 }) }}</span>
          </div>
          <div class="box-content box-content-flex">
            <div class="box-content-img">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <span>+ 2</span>
            </div>
            <a @click.prevent="leave">Leave</a>
          </div>
        </div>
      </div>
      <div class="column col-3">
        <div class="box">
          <div class="box-header">
            <router-link tag="h2" to="/groups/1" class="box-title">Quality Assurance</router-link>
            <span>{{ $tc('group.member', 23, { count: 23 }) }}</span>
          </div>
          <div class="box-content box-content-flex">
            <div class="box-content-img">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <span>+ 2</span>
            </div>
            <a @click.prevent="leave">Leave</a>
          </div>
        </div>
      </div>
      <div class="column col-3">
        <div class="box">
          <div class="box-header">
            <router-link tag="h2" to="/groups/1" class="box-title">Quality Assurance</router-link>
            <span>{{ $tc('group.member', 23, { count: 23 }) }}</span>
          </div>
          <div class="box-content box-content-flex">
            <div class="box-content-img">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <span>+ 2</span>
            </div>
            <a @click.prevent="leave">Leave</a>
          </div>
        </div>
      </div>
      <div class="column col-3">
        <div class="box">
          <div class="box-header">
            <router-link tag="h2" to="/groups/1" class="box-title">Quality Assurance</router-link>
            <span>{{ $tc('group.member', 23, { count: 23 }) }}</span>
          </div>
          <div class="box-content box-content-flex">
            <div class="box-content-img">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <span>+ 2</span>
            </div>
            <a @click.prevent="leave">Leave</a>
          </div>
        </div>
      </div>
    </div>

    <modal title="Add Group" :modal-open.sync="isAddModalOpen">
      <div class="form-group">
        <label class="form-label" for="input-example-1">{{ $t('label.name') }}</label>
        <input class="form-input" type="text" id="input-example-1" :placeholder="$t('placeholder.name')">
      </div>
      <div class="form-group">
        <button type="button" class="btn">{{ $t('button.save') }}</button>
      </div>
    </modal>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'
import modal from '../mixins/modal'

export default {
  mixins: [modal],
  components: {
    MainLayout
  },
  methods: {
    leave () {
      console.log('leave')
    }
  }
}
</script>

<style scoped>
  .column {
    margin-bottom: .8rem;
  }
</style>

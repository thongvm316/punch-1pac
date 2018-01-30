<template>
  <main-layout title="Groups">
    <div class="toolbar mt-5 text-right">
      <button type="button" class="btn" @click="toggleAddModal">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"></path></svg>
        Add Group
      </button>
    </div>
    <div class="columns mt-5">
      <div class="column col-3">
        <div class="box">
          <div class="box-header">
            <router-link tag="h2" to="/groups/1">Quality Assurance</router-link>
            <span>23 members</span>
          </div>
          <div class="box-content">
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
            <router-link tag="h2" to="/groups/1">Quality Assurance</router-link>
            <span>23 members</span>
          </div>
          <div class="box-content">
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
            <router-link tag="h2" to="/groups/1">Quality Assurance</router-link>
            <span>23 members</span>
          </div>
          <div class="box-content">
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
            <router-link tag="h2" to="/groups/1">Quality Assurance</router-link>
            <span>23 members</span>
          </div>
          <div class="box-content">
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
            <router-link tag="h2" to="/groups/1">Quality Assurance</router-link>
            <span>23 members</span>
          </div>
          <div class="box-content">
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
            <router-link tag="h2" to="/groups/1">Quality Assurance</router-link>
            <span>23 members</span>
          </div>
          <div class="box-content">
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
            <router-link tag="h2" to="/groups/1">Quality Assurance</router-link>
            <span>23 members</span>
          </div>
          <div class="box-content">
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
            <router-link tag="h2" to="/groups/1">Quality Assurance</router-link>
            <span>23 members</span>
          </div>
          <div class="box-content">
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
            <router-link tag="h2" to="/groups/1">Quality Assurance</router-link>
            <span>23 members</span>
          </div>
          <div class="box-content">
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

    <ul class="pagination mt-4">
      <li class="page-item">
        <a><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg></a>
      </li>
      <li class="page-item active">
        <a href="#">1</a>
      </li>
      <li class="page-item">
        <a href="#">2</a>
      </li>
      <li class="page-item">
        <a href="#">3</a>
      </li>
      <li class="page-item">
        <span>...</span>
      </li>
      <li class="page-item">
        <a href="#">12</a>
      </li>
      <li class="page-item">
        <a><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/></svg></a>
      </li>
    </ul>

    <modal title="Add Group" :modal-open.sync="isAddModalOpen">
      <div class="form-group">
        <label class="form-label" for="input-example-1">Name</label>
        <input class="form-input" type="text" id="input-example-1" placeholder="Name">
      </div>
      <div class="form-group">
        <button type="button" class="btn">Save</button>
      </div>
    </modal>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'
import Modal from '../components/Modal.vue'

export default {
  components: {
    MainLayout,
    Modal
  },

  data () {
    return {
      isAddModalOpen: false
    }
  },

  methods: {
    toggleAddModal () {
      this.isAddModalOpen = !this.isAddModalOpen
    },

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

<template>
  <main-layout>
    <h1>Groups</h1>
    <div class="toolbar mt-5 text-right">
      <a href="#add-group" class="btn">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"></path></svg>
      Add Group</a>
    </div>
    <div class="columns">
      <div class="column col-3" @click="redirectGroup">
        <div class="box">
          <div class="box-header">
            <h2>Quality Assurance</h2>
            <span>23 members</span>
          </div>
          <div class="box-content">
            <div class="box-content-img">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <span>+ 2</span>
            </div>
            <a href="#">Leave</a>
          </div>
        </div>
      </div>
      <div class="column col-3" @click="redirectGroup">
        <div class="box">
          <div class="box-header">
            <h2>Human Resource</h2>
            <span>23 members</span>
          </div>
          <div class="box-content">
            <div class="box-content-img">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <span>+ 2</span>
            </div>
            <a href="#">Leave</a>
          </div>
        </div>
      </div>
      <div class="column col-3" @click="redirectGroup">
        <div class="box">
          <div class="box-header">
            <h2>Marketing</h2>
            <span>23 members</span>
          </div>
          <div class="box-content">
            <div class="box-content-img">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <span>+ 2</span>
            </div>
            <a href="#">Leave</a>
          </div>
        </div>
      </div>
      <div class="column col-3" @click="redirectGroup">
        <div class="box">
          <div class="box-header">
            <h2>Quality Assurance</h2>
            <span>23 members</span>
          </div>
          <div class="box-content">
            <div class="box-content-img">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <span>+ 2</span>
            </div>
            <a href="#">Leave</a>
          </div>
        </div>
      </div>
      <div class="column col-3" @click="redirectGroup">
        <div class="box">
          <div class="box-header">
            <h2>Human Resource</h2>
            <span>23 members</span>
          </div>
          <div class="box-content">
            <div class="box-content-img">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <span>+ 2</span>
            </div>
            <a href="#">Leave</a>
          </div>
        </div>
      </div>
      <div class="column col-3" @click="redirectGroup">
        <div class="box">
          <div class="box-header">
            <h2>Marketing</h2>
            <span>23 members</span>
          </div>
          <div class="box-content">
            <div class="box-content-img">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <span>+ 2</span>
            </div>
            <a href="#">Leave</a>
          </div>
        </div>
      </div>
      <div class="column col-3" @click="redirectGroup">
        <div class="box">
          <div class="box-header">
            <h2>Quality Assurance</h2>
            <span>23 members</span>
          </div>
          <div class="box-content">
            <div class="box-content-img">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <span>+ 2</span>
            </div>
            <a href="#">Leave</a>
          </div>
        </div>
      </div>
      <div class="column col-3" @click="redirectGroup">
        <div class="box">
          <div class="box-header">
            <h2>Human Resource</h2>
            <span>23 members</span>
          </div>
          <div class="box-content">
            <div class="box-content-img">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <span>+ 2</span>
            </div>
            <a href="#">Leave</a>
          </div>
        </div>
      </div>
      <div class="column col-3" @click="redirectGroup">
        <div class="box">
          <div class="box-header">
            <h2>Marketing</h2>
            <span>23 members</span>
          </div>
          <div class="box-content">
            <div class="box-content-img">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <span>+ 2</span>
            </div>
            <a href="#">Leave</a>
          </div>
        </div>
      </div>
      <div class="column col-3" @click="redirectGroup">
        <div class="box">
          <div class="box-header">
            <h2>Quality Assurance</h2>
            <span>23 members</span>
          </div>
          <div class="box-content">
            <div class="box-content-img">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <span>+ 2</span>
            </div>
            <a href="#">Leave</a>
          </div>
        </div>
      </div>
      <div class="column col-3" @click="redirectGroup">
        <div class="box">
          <div class="box-header">
            <h2>Human Resource</h2>
            <span>23 members</span>
          </div>
          <div class="box-content">
            <div class="box-content-img">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <img src="/static/avatar.png" alt="Troy Kozey" class="avatar avatar-md">
              <span>+ 2</span>
            </div>
            <a href="#">Leave</a>
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
    </div>
    <div class="modal" id="add-group">
      <a href="#close" class="modal-overlay"></a>
      <div class="modal-container">
        <div class="modal-header clearfix">
          <a href="#close" class="btn btn-clear float-right"></a><br>
          <h2 class="text-center">Add Group</h2>
        </div>
        <div class="modal-body">
          <div class="content">
            <div class="form-group">
              <label class="form-label" for="input-example-1">Name</label>
              <input class="form-input" type="text" id="input-example-1" placeholder="Name">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="text-center">
            <a href="#close" class="btn btn-primary">Save</a>
          </div>
        </div>
      </div>
    </div>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'

export default {
  components: {
    MainLayout
  },

  methods: {
    redirectGroup () {
      this.$router.push('groups/1')
    }
  }
}
</script>

<style scoped>
  .column {
    margin-top: .8rem;
  }
</style>

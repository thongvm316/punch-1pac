<template>
  <div class="modules">
    <h1>Typography</h1>
    <h1>This is heading - H1</h1>
    <h2>This is heading - H2</h2>
    <h3>This is heading - H3</h3>
    <h4>This is heading - H4</h4>
    <h5>This is heading - H5</h5>

    <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>

    <a href="#">This is link</a>

    <h1>Button</h1>
    <a class="btn">Button</a>
    <a class="btn disabled">Disabled Button</a>
    <br>
    <br>
    <button class="btn group-icon">
      Primary Button
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
    </button>
    <button class="btn group-icon disabled">
      Primary Button
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
    </button>
    <br>
    <br>
    <a class="btn btn-primary">Primary Button</a>
    <a class="btn btn-primary disabled">Primary Button</a>
    <br>
    <br>
    <button class="btn btn-primary group-icon">
      Primary Button
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
    </button>
    <button class="btn btn-primary group-icon disabled">
      Primary Button
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
    </button>
    <br>
    <br>
    <button class="btn btn-icon">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
    </button>
    <button class="btn btn-icon disabled">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
    </button>
    <br>
    <br>
    <button class="btn btn-primary btn-icon">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
    </button>
    <button class="btn btn-primary btn-icon disabled">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
    </button>
    <br>
    <br>

    <span class="chip">Tag 1</span>
    <span class="chip">Tag 2</span>
    <br><br>

    <ul class="pagination">
      <li class="page-item">
        <button class="btn btn-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>
        </button>
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
        <button class="btn btn-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/></svg>
        </button>
      </li>
    </ul>

    <ul class="pagination">
      <li class="page-item">
        <button class="btn btn-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>
        </button>
      </li>
      <li class="page-item active">
        Page 2 / 4
      </li>
      <li class="page-item">
        <button class="btn btn-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/></svg>
        </button>
      </li>
    </ul>


    <div class="toast toast-error">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
    </div>
    <br>
    <div class="toast toast-primary">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
    </div>
    <br>
    <div class="toast toast-warning">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
    </div>
    <br>
    <div class="toast toast-success">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
    </div>
    <br>

    <ul class="tab tab-block">
      <li class="tab-item active">
        <a href="#">Music</a>
      </li>
      <li class="tab-item">
        <a href="#">Playlists</a>
      </li>
      <li class="tab-item">
        <a href="#">Radio</a>
      </li>
      <li class="tab-item">
        <a href="#">Connect</a>
      </li>
    </ul>

      <div style="margin-top: 64px">
        <h1>Checkbox & Radio</h1>

        <div class="form-group">
          <label class="form-label">Checkbox</label>
          <label class="form-checkbox">
            <input type="checkbox">
            <i class="form-icon"></i> Checkbox 1
          </label>
          <label class="form-checkbox">
            <input type="checkbox">
            <i class="form-icon"></i> Checkbox 2
          </label>
          <label class="form-checkbox">
            <input type="checkbox" disabled>
            <i class="form-icon"></i> Checkbox (disabled)
          </label>
        </div>

        <div class="form-group">
          <label class="form-label">Radio</label>
          <label class="form-radio">
            <input type="radio" name="gender" checked>
            <i class="form-icon"></i> Radio 1
          </label>
          <label class="form-radio">
            <input type="radio" name="gender">
            <i class="form-icon"></i> Radio 2
          </label>
          <label class="form-radio">
            <input type="radio" name="gender" disabled>
            <i class="form-icon"></i> Radio (disabled)
          </label>
        </div>
      </div>

      <div style="margin-top: 64px">
        <h1>Input</h1>
        <h3>Text Input</h3>

        <form>
          <div class="form-group">
            <label class="form-label">Normal</label>
            <input class="form-input" type="text" placeholder="Normal">
          </div>
          <div class="form-group">
            <input class="form-input is-success" type="text" placeholder="Error">
          </div>
          <div class="form-group">
            <input class="form-input is-error" type="text" placeholder="Success">
          </div>
          <div class="form-group">
            <input class="form-input" type="text" placeholder="Disabled" disabled>
          </div>
        </form>

        <form style="margin-top: 32px">
          <div class="form-group form-group-search">
            <input class="form-input" type="text" placeholder="Normal">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468 4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396 3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665 5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z"/></svg>
          </div>
          <div class="form-group form-group-search">
            <input class="form-input is-success" type="text" placeholder="Error">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468 4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396 3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665 5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z"/></svg>
          </div>
          <div class="form-group form-group-search">
            <input class="form-input is-error" type="text" placeholder="Success">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468 4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396 3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665 5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z"/></svg>
          </div>
          <div class="form-group form-group-search">
            <input class="form-input" type="text" placeholder="Disabled" disabled>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468 4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396 3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665 5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z"/></svg>
          </div>
        </form>
      </div>

      <div style="margin-top: 64px">
        <h1>Text Input - with label</h1>

        <form>
          <div class="form-group">
            <label class="form-label">Input label</label>
            <input class="form-input" type="text" placeholder="Normal">
          </div>
          <div class="form-group">
            <label class="form-label">Input label</label>
            <input class="form-input is-success" type="text" placeholder="Error">
          </div>
          <div class="form-group">
            <label class="form-label">Input label</label>
            <input class="form-input is-error" type="text" placeholder="Success">
          </div>
          <div class="form-group">
            <label class="form-label">Input label</label>
            <input class="form-input" type="text" placeholder="Disabled" disabled>
          </div>
        </form>

        <form>
          <div class="form-group">
            <label class="form-label">Input label</label>
            <input class="form-input" type="text" placeholder="Normal">
            <p class="form-input-hint">This is a required field</p>
          </div>
          <div class="form-group">
            <label class="form-label">Input label</label>
            <input class="form-input is-error" type="text" placeholder="Error">
            <p class="form-input-hint">Error Message</p>
          </div>
          <div class="form-group">
            <label class="form-label">Input label</label>
            <input class="form-input is-success" type="text" placeholder="Success">
            <p class="form-input-hint">Positive Message</p>
          </div>
        </form>

        <form>
          <div class="form-group">
            <div class="form-label-group">
              <label class="form-label">Input label</label>
              <label class="form-noti">min. 40 characters</label>
            </div>
            <textarea class="form-input" placeholder="Texarea content here" rows="3"></textarea>
            <p class="form-input-hint">This is a required field</p>
          </div>
          <div class="form-group">
            <div class="form-label-group">
              <label class="form-label">Input label</label>
              <label class="form-noti">min. 40 characters</label>
            </div>
            <textarea class="form-input is-error" placeholder="Texarea content here" rows="3"></textarea>
            <p class="form-input-hint">This is error field</p>
          </div>
          <div class="form-group">
            <div class="form-label-group">
              <label class="form-label">Input label</label>
              <label class="form-noti">min. 40 characters</label>
            </div>
            <textarea class="form-input" placeholder="Texarea content here" rows="3" disabled></textarea>
            <p class="form-input-hint">This is disabled field</p>
          </div>
        </form>

      </div>

      <div style="margin-top: 64px">
        <div class="accordion">
          <input type="checkbox" id="accordion-1" hidden>
          <label class="accordion-header c-hand" for="accordion-1">
            Elements
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/></svg>
          </label>
          <div class="accordion-body">
            <ul class="menu menu-nav">
              <li class="menu-item"><a href="#">Element 1</a></li>
              <li class="menu-item"><a href="#">Element 2</a></li>
              <li class="menu-item"><a href="#">Element 3</a></li>
              <li class="menu-item"><a href="#">Element 4</a></li>
            </ul>
          </div>
        </div>
        <div class="form-group form-date-picker">
          <input type="text" placeholder="DD/MM/YYYY">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M20 20h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zm-12 6h-4v4h4v-4zm6 0h-4v4h4v-4zm-6-6h-4v4h4v-4zm16-8v22h-24v-22h3v1c0 1.103.897 2 2 2s2-.897 2-2v-1h10v1c0 1.103.897 2 2 2s2-.897 2-2v-1h3zm-2 6h-20v14h20v-14zm-2-7c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-14 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2z"/></svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modules {
  padding: 40px;
}
</style>

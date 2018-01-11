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

    <h1 style="margin-top: 60px;">Button</h1>
    <div>
      <a class="btn">Button</a>
      <a class="btn disabled">Disabled Button</a>
    </div>

    <div style="margin-top: 30px;">
      <button class="btn group-icon">
        Primary Button
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
      </button>
      <button class="btn group-icon disabled">
        Primary Button
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
      </button>
    </div>

    <div style="margin-top: 30px;"v>
      <a class="btn btn-primary">Primary Button</a>
      <a class="btn btn-primary disabled">Primary Button</a>
    </div>

    <div style="margin-top: 30px;">
      <button class="btn btn-primary group-icon">
        Primary Button
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
      </button>
      <button class="btn btn-primary group-icon disabled">
        Primary Button
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
      </button>
    </div>

    <div style="margin-top: 30px;">
      <button class="btn btn-action">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
      </button>
      <button class="btn btn-action disabled">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
      </button>
      <button class="btn btn-primary btn-action">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
      </button>
      <button class="btn btn-primary btn-action disabled">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
      </button>
    </div>

    <h1 style="margin-top: 60px;">Pagination</h1>
    <ul class="pagination">
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

    <ul class="pagination">
      <li class="page-item">
        <a><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg></a>
      </li>
      <li class="page-item active">
        Page 2 / 4
      </li>
      <li class="page-item">
        <a><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/></svg></a>
      </li>
    </ul>

    <h1 style="margin-top: 60px">Toast</h1>
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

    <h1 style="margin-top: 60px;">Circle</h1>
    <span class="bg-primary circle"></span>
    <span class="bg-success circle"></span>
    <span class="bg-warning circle"></span>
    <span class="bg-error circle"></span>

    <h1 style="margin-top: 60px;">Label</h1>
    <span class="label">default</span>
    <span class="label label-primary">primary</span>
    <span class="label label-success">success</span>
    <span class="label label-warning">warning</span>
    <span class="label label-error">error</span>


    <h1 style="margin-top: 60px;">Tab</h1>
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
      <li class="tab-item">
        <a href="#">Greed</a>
      </li>
      <li class="tab-item">
        <a href="#">Zeng</a>
      </li>
    </ul>

    <h1 style="margin-top: 60px">Checkbox & Radio</h1>

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

    <h1 style="margin-top: 60px">Form</h1>

    <h3>Input</h3>
    <div class="form-group">
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
    <div class="form-group form-group-select has-icon-right">
      <select class="form-select">
        <option>Element 1</option>
        <option>Element 2</option>
        <option>Element 3</option>
        <option>Element 4</option>
      </select>
      <span class="form-icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/></svg>
      </span>
    </div>

    <h3 style="margin-top: 30px">Input with icon</h3>
    <div class="form-group has-icon-right">
      <input class="form-input" type="text" placeholder="Normal">
      <span class="form-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path
          d="M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468
          4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396
          3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665
          5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z"/></svg></span>
    </div>
    <div class="form-group has-icon-right">
      <input class="form-input is-success" type="text" placeholder="Error">
      <span class="form-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path
          d="M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468
          4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396
          3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665
          5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z"/></svg></span>
    </div>
    <div class="form-group has-icon-right">
      <input class="form-input is-error" type="text" placeholder="Success">
      <span class="form-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path
          d="M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468
          4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396
          3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665
          5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z"/></svg></span>
    </div>
    <div class="form-group has-icon-right">
      <input class="form-input" type="text" placeholder="Disabled" disabled>
      <span class="form-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path
          d="M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468
          4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396
          3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665
          5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z"/></svg></span>
    </div>

    <h3 style="margin-top: 30px">Input with validation error message</h3>
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

    <h1 style="margin-top: 60px">Table</h1>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>
            <label class="form-checkbox">
              <input type="checkbox">
              <i class="form-icon"></i>
            </label>
          </th>
          <th>
                Username
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/></svg>
          </th>
          <th>
                Department
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/></svg>
          </th>
          <th>
                Role
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/></svg>
          </th>
          <th>
                Status
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/></svg>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <label class="form-checkbox">
              <input type="checkbox">
              <i class="form-icon"></i>
            </label>
          </td>
          <td>
            <div class="tile tile-centered">
              <div class="tile-icon">
                <img src="../assets/avatar-1.png" class="avatar avatar-sm" alt="Steve Rogers">
              </div>
              <div class="tile-content">Steve Rogers</div>
            </div>
          </td>
          <td>Marketing</td>
          <td>South Grayson</td>
          <td>
            <div class="label label-success">Accept</div>
          </td>
        </tr>
        <tr>
          <td>
            <label class="form-checkbox">
              <input type="checkbox">
              <i class="form-icon"></i>
            </label>
          </td>
          <td>
            <div class="tile tile-centered">
              <div class="tile-icon">
                <img src="../assets/avatar-1.png" class="avatar avatar-sm" alt="Steve Rogers">
              </div>
              <div class="tile-content">Steve Rogers</div>
            </div>
          </td>
          <td>Marketing</td>
          <td>South Grayson</td>
          <td>
            <div class="label label-warning">Warning</div>
          </td>
        </tr>
        <tr>
          <td>
            <label class="form-checkbox">
              <input type="checkbox">
              <i class="form-icon"></i>
            </label>
          </td>
          <td>
            <div class="tile tile-centered">
              <div class="tile-icon">
                <img src="../assets/avatar-1.png" class="avatar avatar-sm" alt="Steve Rogers">
              </div>
              <div class="tile-content">Steve Rogers</div>
            </div>
          </td>
          <td>Marketing</td>
          <td>South Grayson</td>
          <td>
            <div class="label label-primary">Accept</div>
          </td>
        </tr>
        <tr>
          <td>
            <label class="form-checkbox">
              <input type="checkbox">
              <i class="form-icon"></i>
            </label>
          </td>
          <td>
            <div class="tile tile-centered">
              <div class="tile-icon">
                <img src="../assets/avatar-1.png" class="avatar avatar-sm" alt="Steve Rogers">
              </div>
              <div class="tile-content">Steve Rogers</div>
            </div>
          </td>
          <td>Marketing</td>
          <td>South Grayson</td>
          <td>
            <div class="label label-error">Denied</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.modules {
  padding: 40px;
}
</style>

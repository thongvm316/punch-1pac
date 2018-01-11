<template>
  <div class="modules">

    <header class="navbar">
      <section class="navbar-section">
        <ul class="nav-list">
           <li class="nav-logo"><a href="/"><span class="logo"></span></a></li>
           <li class="nav-logo"><a href="/"><span class="logo"></span></a></li>
         </ul>
      </section>
      <section class="navbar-section">
        <ul class="nav-list">
          <li>
            <a href="/">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M15.137 3.945c-.644-.374-1.042-1.07-1.041-1.82v-.003c.001-1.172-.938-2.122-2.096-2.122s-2.097.95-2.097 2.122v.003c.001.751-.396 1.446-1.041 1.82-4.667 2.712-1.985 11.715-6.862 13.306v1.749h20v-1.749c-4.877-1.591-2.195-10.594-6.863-13.306zm-3.137-2.945c.552 0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1zm3 20c0 1.598-1.392 3-2.971 3s-3.029-1.402-3.029-3h6z"/></svg>
            </a>
          </li>
          <li class="user-info">
            <a href="/">
              <div class="media">
                <span class="avatar"></span>
                <h5>Greed Zeng</h5>
              </div>
            </a>
          </li>
          <li>
            <a href="/">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M21 10h-8c-1.657 0-3 1.343-3 3v8c0 1.657 1.343 3 3 3h8c1.657 0 3-1.343 3-3v-8c0-1.657-1.343-3-3-3zm-1.865 11l-.66-1.846h-3l-.663 1.846h-1.66l3.041-8h1.602l3.053 8h-1.713zm-2.153-6.137l1.051 3.018h-2.103l1.052-3.018zm-11.837-6.977c.038.581.104 1.116.194 1.593-1.224.224-1.274-.984-.194-1.593zm8.855-4.886v5h-1c-.743 0-1.442.173-2.076.465-.196-.806-.783-1.53-1.679-1.964.077-.298.123-.522.167-.744l-1.35-.262c-.023.113-.063.328-.136.614-.456-.066-.94-.075-1.431-.025.011-.329.032-.653.06-.963h1.507v-1.279h-1.326c.065-.326.121-.521.176-.705l-1.317-.396c-.097.323-.178.64-.259 1.101h-1.504v1.278h1.341c-.036.414-.057.842-.064 1.275-1.48.544-2.109 1.581-2.109 2.521 0 1.11.876 2.086 2.261 1.96 1.72-.156 2.869-1.456 3.542-3.053.885.536.838 1.161.773 1.552-.966.913-1.576 2.196-1.576 3.625v1h-5c-1.657 0-3-1.343-3-3v-8c0-1.657 1.343-3 3-3h8c1.657 0 3 1.343 3 3zm-7.5 4.467c.327-.042.658-.05.969-.026-.214.476-.496.948-.855 1.319-.055-.396-.093-.83-.114-1.293z"/></svg>
            </a>
          </li>
          <li>
            <a href="/">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M14 12h-4v-12h4v12zm4.213-10.246l-1.213 1.599c2.984 1.732 5 4.955 5 8.647 0 5.514-4.486 10-10 10s-10-4.486-10-10c0-3.692 2.016-6.915 5-8.647l-1.213-1.599c-3.465 2.103-5.787 5.897-5.787 10.246 0 6.627 5.373 12 12 12s12-5.373 12-12c0-4.349-2.322-8.143-5.787-10.246z"/></svg>
            </a>
          </li>
        </ul>
      </section>
    </header>

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

    <span class="bg-primary text-light docs-shape circle"></span>
    <span class="bg-success text-light docs-shape circle"></span>
    <span class="bg-warning text-light docs-shape circle"></span>
    <span class="bg-error text-light docs-shape circle"></span>

    <br>
    <br>
    <span class="label">default</span>
    <span class="label label-primary">primary</span>
    <span class="label label-success">success</span>
    <span class="label label-warning">warning</span>
    <span class="label label-error">error</span>

    <br>
    <br>


    <ul class="tab tab-block">
      <li class="tab-item">
        <a href="#">Music</a>
      </li>
      <li class="tab-item">
        <a href="#">Playlists</a>
      </li>
      <li class="tab-item">
        <a href="#">Radio</a>
      </li>
      <li class="tab-item active">
        <a href="#">Connect</a>
      </li>
      <li class="tab-item">
        <a href="#">Greed</a>
      </li>
      <li class="tab-item">
        <a href="#">Zeng</a>
      </li>
    </ul>

    <div class="container" style="margin-top: 64px">
      <h3>Primary Colors</h3>
      <div class="columns">
        <div class="column col-3">
          <div class="color-block bg-primary-color">
            <p>Primary Color</p>
          </div>
        </div>
        <div class="column col-3">
          <div class="color-block bg-primary-color-dark">
            <p>Primary Color Dark</p>
          </div>
        </div>
        <div class="column col-3">
          <div class="color-block bg-primary-color-darkest">
            <p>Primary Color Darkest</p>
          </div>
        </div>
        <div class="column col-3">
          <div class="color-block bg-primary-color-light">
            <p>Primary Color Light</p>
          </div>
        </div>
      </div>

      <h3>Secondary Colors</h3>
      <div class="columns">
        <div class="column col-3">
          <div class="color-block bg-secondary-color">
            <p class="dark">Secondary Color</p>
          </div>
        </div>
        <div class="column col-3">
          <div class="color-block bg-secondary-color-dark">
            <p class="dark">Secondary Color Dark</p>
          </div>
        </div>
        <div class="column col-3">
          <div class="color-block with-border bg-secondary-color-light">
            <p class="dark">Secondary Color Light</p>
          </div>
        </div>
      </div>

      <h3>Gray Colors</h3>
      <div class="columns">
        <div class="column col-3">
          <div class="color-block bg-dark-color">
            <p>Dark Color</p>
          </div>
        </div>
        <div class="column col-3">
          <div class="color-block bg-gray-color">
            <p>Gray Color</p>
          </div>
        </div>
        <div class="column col-3">
          <div class="color-block bg-gray-color-dark">
            <p>Gray Color Dark</p>
          </div>
        </div>
        <div class="column col-3">
          <div class="color-block bg-gray-color-light">
            <p>Gray Color Light</p>
          </div>
        </div>
        <div class="column col-3">
          <div class="color-block bg-gray-color-lightest with-border">
            <p class="dark">Gray Color Lightest</p>
          </div>
        </div>
      </div>
    </div>

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
        <input class="form-input" type="text" placeholder="DD/MM/YYYY">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M20 20h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zm-12 6h-4v4h4v-4zm6 0h-4v4h4v-4zm-6-6h-4v4h4v-4zm16-8v22h-24v-22h3v1c0 1.103.897 2 2 2s2-.897 2-2v-1h10v1c0 1.103.897 2 2 2s2-.897 2-2v-1h3zm-2 6h-20v14h20v-14zm-2-7c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-14 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2z"/></svg>
      </div>
    </div>

    <table class="table table-hover">
      <thead>
        <tr>
          <th>Username</th>
          <th>Department</th>
          <th>Requested Time</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div class="media">
              <span class="avatar"></span>
              <h5>Son Goku</h5>
            </div>
          </td>
          <td>Marketing</td>
          <td>20:03:14</td>
          <td>
            <div class="label label-success">Accept</div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="media">
              <span class="avatar"></span>
              <h5>Thor</h5>
            </div>
          </td>
          <td>Human Resource</td>
          <td>20:03:14</td>
          <td>
            <div class="label label-error">Denied</div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="media">
              <span class="avatar"></span>
              <h5>Captain American</h5>
            </div>
          </td>
          <td>Driver</td>
          <td>20:03:14</td>
          <td>
            <div class="label label-primary">Normal</div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="media">
              <span class="avatar"></span>
              <h5>Bruce Lee</h5>
            </div>
          </td>
          <td>Kungfu</td>
          <td>20:03:14</td>
          <td>
            <div class="label label-warning">Warning</div>
          </td>
        </tr>
      </tbody>
    </table>

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
            <div class="accordion">
              <input type="checkbox" id="accordion-2" hidden>
              <label class="accordion-header c-hand" for="accordion-2">
                Username
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/></svg>
              </label>
            </div>
          </th>
          <th>
            <div class="accordion">
              <input type="checkbox" id="accordion-3" hidden>
              <label class="accordion-header c-hand" for="accordion-2">
                Department
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/></svg>
              </label>
            </div>
          </th>
          <th>
            <div class="accordion">
              <input type="checkbox" id="accordion-4" hidden>
              <label class="accordion-header c-hand" for="accordion-2">
                Role
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/></svg>
              </label>
            </div>
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
          <td>Violet Nuez</td>
          <td>Marketing</td>
          <td>South Grayson</td>
        </tr>
        <tr>
          <td>
            <label class="form-checkbox">
              <input type="checkbox">
              <i class="form-icon"></i>
            </label>
          </td>
          <td>Violet Nuez</td>
          <td>Marketing</td>
          <td>South Grayson</td>
        </tr>
        <tr>
          <td>
            <label class="form-checkbox">
              <input type="checkbox">
              <i class="form-icon"></i>
            </label>
          </td>
          <td>Violet Nuez</td>
          <td>Marketing</td>
          <td>South Grayson</td>
        </tr>
        <tr>
          <td>
            <label class="form-checkbox">
              <input type="checkbox">
              <i class="form-icon"></i>
            </label>
          </td>
          <td>Violet Nuez</td>
          <td>Marketing</td>
          <td>South Grayson</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.modules {
  padding: 40px;
}

.color-block {
  height: 160px;
  width: 160px;
  padding: 16px;

  p {
    text-align: left;
    vertical-align: bottom;
    color: #ffffff;

    &.dark { color: #454d5d; }
  }

  &.with-border {
    border: 0.05rem solid #454d5d;
  }
}

.bg-primary-color {
  background-color: #2d91ff;
}

.bg-primary-color-dark {
  background-color: darken(#2d91ff, 3%);
}

.bg-primary-color-darkest {
  background-color: #0052ac;
}

.bg-primary-color-light {
  background-color: lighten(#2d91ff, 3%);
}

.bg-secondary-color {
  background-color: lighten(#2d91ff, 37.5%);
}

.bg-secondary-color-dark {
  background-color: darken(#ecf5ff, 3%);
}

.bg-secondary-color-light {
  background-color: lighten(#ecf5ff, 3%);
}

.bg-dark-color {
 background-color: #454d5d;
}

.bg-gray-color {
  background-color: lighten(#454d5d, 40%);
}

.bg-gray-color-dark {
  background-color: darken(#acb3c2, 25%);
}

.bg-gray-color-light {
  background-color: lighten(#acb3c2, 20%);
}

.bg-gray-color-lightest {
  background-color: #eee;
}
</style>

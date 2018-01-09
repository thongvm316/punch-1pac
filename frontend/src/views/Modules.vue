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
  </div>
</template>

<style scoped>
.modules {
  padding: 40px;
}
</style>

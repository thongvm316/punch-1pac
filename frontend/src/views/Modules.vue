<template>
  <div class="modules">
    <h1>Typography</h1>
    <h1>This is heading - H1</h1>
    <h2>This is heading - H2</h2>
    <h3>This is heading - H3</h3>
    <h4>This is heading - H4</h4>
    <h5>This is heading - H5</h5>

    <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>

    <h1>Button</h1>
    <a class="btn">Button</a>
    <a class="btn btn-primary">Primary Button</a>
    <a class="btn disabled">Disabled Button</a>

    <div class="toast toast-primary">
      <button class="btn btn-clear float-right"></button>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </div>

    <div class="toast toast-error">
      <button class="btn btn-clear float-right"></button>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </div>

    <span class="chip">Tag 1</span>
    <span class="chip">Tag 2</span>

    <ul class="pagination">
      <li class="page-item disabled">
        <a href="#">Previous</a>
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
        <a href="#">Next</a>
      </li>
    </ul>

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

window.addEventListener('DOMContentLoaded', function () {

  if(nav) {
    indexHeaderScroll();

    nav.querySelector('.menu-burger').addEventListener('click', toggleNavMenu);
    nav.querySelector('.close').addEventListener('click', toggleSigninForm);
    nav.querySelector('.btn-signin').addEventListener('click', toggleSigninForm);
    nav.querySelector('.btn-submit').addEventListener('click', checkNamespace);

    window.addEventListener('resize', function () {
      indexHeaderScroll();
    });
  }
});

function toggleSigninForm () {
  document.querySelector('.signin-form').classList.toggle('open');
}

function toggleNavMenu () {
  var nav = document.querySelector('.nav');
  var navMenu = nav.querySelector('.navbar-menu');
  var indexNav = document.getElementById('index-nav');

  document.querySelector('body').classList.toggle('menu-opened');
  nav.querySelector('.navbar-menu').classList.toggle('open');
  nav.querySelector('.menu-burger').classList.toggle('open');

  if (window.pageYOffset === 0 && indexNav) {
    indexNav.classList.toggle('nav-inverse');
  }

  closeNavMenuOnBodyClick();
}

function closeNavMenuOnBodyClick () {
  var nav = document.querySelector('.nav');
  var navMenu = nav.querySelector('.navbar-menu');
  var indexNav = document.getElementById('index-nav');

  nav.addEventListener('click', function (e) {
    e.stopPropagation();
  });

  document.addEventListener('click', function (e) {
    document.querySelector('body').classList.remove('menu-opened');
    nav.querySelector('.navbar-menu').classList.remove('open');
    nav.querySelector('.menu-burger').classList.remove('open');

    if (window.pageYOffset === 0 && !navMenu.classList.contains('open') && indexNav) {
      indexNav.classList.remove('nav-inverse');
    }
  });
}

function indexHeaderScroll () {
  var nav = document.querySelector('.nav');
  var navMenu = nav.querySelector('.navbar-menu');
  var indexNav = document.getElementById('index-nav');

  if(indexNav && !navMenu.classList.contains('open')) {
    window.addEventListener('scroll', function () {
      if(this.pageYOffset > 0) {
        indexNav.classList.add('nav-inverse');
      } else {
        indexNav.classList.remove('nav-inverse');
      }
    });
  }
}

function checkNamespace () {
  var nav = document.querySelector('.nav');
  var navMenu = nav.querySelector('.navbar-menu');

  var xhr = new XMLHttpRequest();
  var namespace = nav.querySelector('.namespace-input').value;
  xhr.open("GET", "http://" + namespace + ".builcauhinh.com");
  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function(e) {
    if (this.status === 200) {
      window.location.href = "http://" + namespace + ".builcauhinh.com";
    } else if (this.status === 404) {
      var HTMLtoDoItem = '<span class="text-error mt-8">Company namespace is not found</span>';

      document.querySelector('.input-group').insertAdjacentHTML('afterend', HTMLtoDoItem);
      nav.querySelector('.namespace-input').reset();
    }
  };
  xhr.send();
}

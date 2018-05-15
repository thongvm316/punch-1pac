window.addEventListener('DOMContentLoaded', function () {
  indexHeaderScroll();

  document.querySelector('.menu-burger').addEventListener('click', toggleNavMenu);
  document.querySelector('.close').addEventListener('click', toggleSigninForm);
  document.querySelector('.btn-signin').addEventListener('click', toggleSigninForm);

  window.addEventListener('resize', function () {
    indexHeaderScroll();
  });
});

function toggleSigninForm () {
  document.querySelector('.signin-form').classList.toggle('open');
}

function toggleNavMenu () {
  var nav = document.querySelector('.nav');
  var indexNav = document.getElementById('index-nav');

  document.querySelector('body').classList.toggle('menu-opened');
  nav.querySelector('.navbar-menu').classList.toggle('open');
  nav.querySelector('.menu-burger').classList.toggle('open');

  if (indexNav) {
    indexNav.classList.toggle('nav-inverse');
  }

  closeNavMenuOnBodyClick();
}

function closeNavMenuOnBodyClick () {
  var nav = document.querySelector('.nav');
  var indexNav = document.getElementById('index-nav');

  nav.addEventListener('click', function (e) {
    e.stopPropagation();
  });

  document.addEventListener('click', function (e) {
    document.querySelector('body').classList.remove('menu-opened');
    nav.querySelector('.navbar-menu').classList.remove('open');
    nav.querySelector('.menu-burger').classList.remove('open');

    if (indexNav) {
      indexNav.classList.remove('nav-inverse');
    }
  });
}

function indexHeaderScroll () {
  var indexNav = document.getElementById('index-nav');
  var nav = document.querySelector('.nav');
  var navHeight = nav.offsetHeight;

  window.addEventListener('scroll', function () {
    if(this.scrollY >= navHeight && indexNav) {
      nav.classList.add('nav-inverse');
    } else {
      nav.classList.remove('nav-inverse');
    }
  });
}

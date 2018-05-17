var nav = document.querySelector('.nav');
var navMenu = nav.querySelector('.navbar-menu');
var indexNav = document.getElementById('index-nav');

window.addEventListener('DOMContentLoaded', function () {
  indexHeaderScroll();

  nav.querySelector('.menu-burger').addEventListener('click', toggleNavMenu);
  nav.querySelector('.close').addEventListener('click', toggleSigninForm);
  nav.querySelector('.btn-signin').addEventListener('click', toggleSigninForm);

  window.addEventListener('resize', function () {
    indexHeaderScroll();
  });
});

function toggleSigninForm () {
  document.querySelector('.signin-form').classList.toggle('open');
}

function toggleNavMenu () {
  document.querySelector('body').classList.toggle('menu-opened');
  nav.querySelector('.navbar-menu').classList.toggle('open');
  nav.querySelector('.menu-burger').classList.toggle('open');

  if (window.pageYOffset === 0 && indexNav) {
    indexNav.classList.toggle('nav-inverse');
  }

  closeNavMenuOnBodyClick();
}

function closeNavMenuOnBodyClick () {
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

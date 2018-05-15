window.onload = function() {
  indexHeaderScroll();

  window.onresize = function(event) {
    indexHeaderScroll();
  };
};

function toggleSigninForm () {
  document.querySelector('.signin-form').classList.toggle('open');
}

function toggleIndexMenu () {
  var nav = document.querySelector('.nav');
  var indexNav = document.getElementById('index-nav');

  document.querySelector('body').classList.toggle('menu-opened');
  nav.querySelector('.navbar-menu').classList.toggle('open');
  nav.querySelector('.menu-burger').classList.toggle('open');

  if (indexNav) {
    indexNav.classList.toggle('nav-inverse');
  }

  closeIndexMenuOnBodyClick();
}

function closeIndexMenuOnBodyClick () {
  var nav = document.querySelector('.nav');
  var indexNav = document.getElementById('index-nav');

  nav.onclick = function (e) {
    e.stopPropagation();
  }

  document.onclick = function (e) {
    document.querySelector('body').classList.remove('menu-opened');
    nav.querySelector('.navbar-menu').classList.remove('open');
    nav.querySelector('.menu-burger').classList.remove('open');

    if (indexNav) {
      indexNav.classList.remove('nav-inverse');
    }
  }
}

function indexHeaderScroll () {
  var nav = document.querySelector('.nav');
  var navHeight = nav.offsetHeight;

  window.onscroll = function () {
    if(this.scrollY >= navHeight && !nav.classList.contains('nav-inverse')) {
      nav.classList.add('nav-inverse');
    } else {
      nav.classList.remove('nav-inverse');
    }
  }
}

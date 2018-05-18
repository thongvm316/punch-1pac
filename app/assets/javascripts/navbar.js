var nav = document.querySelector('.nav');
var navMenu = document.querySelector('.navbar-menu');
var indexNav = document.getElementById('index-nav');

window.addEventListener('DOMContentLoaded', function () {
  if(nav) {
    indexHeaderScroll();

    nav.querySelector('.menu-burger').addEventListener('click', toggleNavMenu);
    nav.querySelector('.close-form').addEventListener('click', toggleSigninForm);
    nav.querySelector('.btn-signin').addEventListener('click', toggleSigninForm);
    nav.querySelector('.btn-submit').addEventListener('click', debounce(checkNamespace, 500));

    window.addEventListener('resize', function () {
      indexHeaderScroll();
    });
  }
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
  if(indexNav) {
    window.addEventListener('scroll', function () {
      if (navMenu.classList.contains('open')) return;
      if(this.pageYOffset > 0) {
        indexNav.classList.add('nav-inverse');
      } else {
        indexNav.classList.remove('nav-inverse');
      }
    });
  }
}

function checkNamespace () {
  var xhr = new XMLHttpRequest();
  var namespace = nav.querySelector('.namespace-input').value;
  var textError = nav.querySelector('.text-error');

  xhr.open("GET", "http://" + namespace + ".buildcauhinh.com");
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.onload = function(e) {
    if (xhr.status === 200) {
      nav.querySelector('.namespace-input').value = '';
      window.location.href = "http://" + namespace + ".buildcauhinh.com";
    } else if (xhr.status === 404) {
      textError.classList.add('show');
      nav.querySelector('.namespace-input').value = '';
    }
  };
  xhr.send();
}

function debounce(func, delay) {
  var inDebounce;
  return function() {
    var context = this, args = arguments;
    clearTimeout(inDebounce)
    inDebounce = setTimeout(function() { func.apply(context, args) }, delay)
  }
}

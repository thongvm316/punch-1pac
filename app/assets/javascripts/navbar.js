$(document).ready(function() {
  toggleSigninForm();
  toggleMenu();
  headerScroll();

  $(window).on('resize', function () {
    headerScroll();
  })
})

function toggleSigninForm () {
  $('.signin-btn').on('click', function () {
    $('.signin-form').toggleClass('open');
  })

  $('.close').on('click', function () {
    $('.signin-form').removeClass('open');
  })
}

function toggleMenu () {
  if(!$('.nav').hasClass('inverse-nav')) {
    $('.menu-burger').on('click', function () {
      $('body').toggleClass('menu-opened');
      $('.nav').toggleClass('inverse-nav');
      $('.navbar-menu, .menu-burger').toggleClass('open');

      $('body').on('click', function (e) {
        if ($('.nav').find(e.target).length || e.target.class === 'nav') return;
        $('body').removeClass('menu-opened');
        $('.nav').removeClass('inverse-nav');
        $('.navbar-menu, .menu-burger').removeClass('open');
      })
    })
  } else {
    $('.menu-burger').on('click', function () {
      $('body').toggleClass('menu-opened');
      $('.navbar-menu, .menu-burger').toggleClass('open');
    })

    $('body').on('click', function (e) {
      if ($('.nav').find(e.target).length || e.target.class === 'nav') return;
      $('body').removeClass('menu-opened');
      $('.navbar-menu, .menu-burger').removeClass('open');
    })
  }
}

function headerScroll () {
  var navbar = $('.nav');
  var navbarHeight = navbar.outerHeight;

  if(!navbar.hasClass('inverse-nav')) {
    $(window).scroll(function () {
      if($(this).scrollTop() >= navbarHeight) {
        navbar.addClass('inverse-nav');
      } else {
        navbar.removeClass('inverse-nav');
      }
    });
  }
}

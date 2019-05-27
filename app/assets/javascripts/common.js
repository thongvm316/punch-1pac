window.addEventListener('load', function () {
  onOpenModal(initYoutubeVideo);
  onCloseModal();
  isEnableSubmitFormBtn();

  function initYoutubeVideo() {
    var punchVideo = new YT.Player(
      'punch-video', {
      videoId: '5TUmZTMZxM8',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });

    function onPlayerReady(event) {
      if(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i)) {
        event.target.mute();
      }

      event.target.playVideo();
    }

    function onPlayerStateChange(event) {
      if (event.data == YT.PlayerState.PLAYING) {
        event.target.unMute();
      }
    }
  }

  function onOpenModal(callback) {
    var btnOpenModal = document.querySelector('#btn-open-modal');
    if (!btnOpenModal) return;

    btnOpenModal.addEventListener('click', function(event) {
      event.stopPropagation();
      var punchModal = document.querySelector('#punch-modal');
      if (!punchModal) return;
      punchModal.classList.add('is-active');

      callback();
    })
  }

  function onCloseModal() {
    var btnCloseModal = document.querySelector('.modal-close')
    if (!btnCloseModal) return

    btnCloseModal.addEventListener('click', function() {
      document.querySelector('#punch-modal').classList.remove('is-active')

      onRemoveInitYoutubeVideo();
    })
  }

  function onRemoveInitYoutubeVideo() {
    document.querySelector('#punch-video').remove();
    var youtubeWrapper = document.createElement('div');
    youtubeWrapper.id = 'punch-video';

    document.querySelector('.modal-body').appendChild(youtubeWrapper);
  }

  function isEnableSubmitFormBtn() {
    var btnSubmitForm = document.querySelector('.btn-submit-form');
    if (!btnSubmitForm) return;
    btnSubmitForm.addEventListener('click', function(e) {
      if (!validateCapcha()) e.preventDefault();
    })
  }

  function validateCapcha() {
    var response = grecaptcha.getResponse();

    if (response.length === 0) return false;
    return true;
  }
})

//= require active_admin/base

// preview image before upload
$(document).ready(function() {
  function readURL(input, id) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $(id).attr('src', e.target.result);
      }
      reader.readAsDataURL(input.files[0]);
    }
  }

  $("#company_logo").change(function () {
    readURL(this, '#company-logo-image');
  });

  $("#user_avatar").change(function () {
    readURL(this, '#user-avatar-image');
  });
})

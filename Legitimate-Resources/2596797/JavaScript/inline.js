
  window.addEventListener('DOMContentLoaded', function () {
    $('#promo-slides').simpleSlider({nav:false,speed:500});
  });

  function recaptchaCallback() {
    $('#securityBlk .ui-button').click();
  }
  
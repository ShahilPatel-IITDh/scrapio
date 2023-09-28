(function ($) {
  $(document).ready(function () {
    $(document).foundation();

    $('button.menu-open').on('click', function () {
      var list = $(this).attr('data-toggle').split(/\s+/);
      if ($('#' + list[1]).length) {
        $('#' + list[1]).toggle("open");
      }
      $(this).toggleClass("change-icon");
    });

    // Slideshow
    let pauseButton = $('#slideshow-pause');
    let paused = false;
    const mainSlideshow = $('#slideshow .wrapper');

    pauseButton.on('click', () => {
      if (!paused) {
        mainSlideshow.slick('slickPause');
        paused = true;
        pauseButton[0].classList.toggle('paused');
      } else {
        mainSlideshow.slick('slickPlay');
        paused = false;
        pauseButton[0].classList.toggle('paused');
      }
    });


    // Main menu accessibility fix
    let active = '';

    $('.top-bar-section a').focus(function () {
      if (active && !active.find($(this)).length) {
        active.removeClass('active');
        active = '';
      }

      $(this).keydown(function (k) {
        // Enter, space, down arrow
        if ([13, 32, 40].indexOf(k.keyCode) != -1) {
          active = $(this).next().find('ul').addClass('active');

          if (active.length) {
            k.preventDefault();
          }
        }
      })
    });

    $(document).on('opened.fndtn.reveal', '[data-reveal]', function () {
      $(this).focus();
    });

  });

})(jQuery)

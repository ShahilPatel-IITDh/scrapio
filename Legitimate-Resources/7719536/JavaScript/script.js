(function ($) {
  'use strict';

  $(document).ready(function () {
    var $iframe = $('.exggmap-wrapper iframe');
    $iframe.onload = function () {
      console.log('google iframe has loaded')
    }
    $('#exggmap-btn').click(
      function () {
        var $iframe = $('.exggmap-wrapper iframe');
        $('.exggmap-wrapper .exggmap-mask').css({
          'opacity': 0,
        });
        setTimeout(function () {
          $('.exggmap-wrapper .exggmap-mask').css('display', 'none');
        }, 4000)
        $iframe.attr("src", $iframe.attr('data-src'));

      }
    )
  })

})(jQuery);
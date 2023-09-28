jQuery(document).ready(function($) {
    "use strict";
    /* Show buttons on hover/click */
    var element = $('.tz-social-links');
    var settings = {
          interval: 100,
          timeout: 200,
          over: mousein_triger,
          out: mouseout_triger
    };
    function mousein_triger(){
      $(this).find('.wrapper').css('visibility', 'visible');
      $(this).addClass('hovered');
    }
    function mouseout_triger() {
      $(this).removeClass('hovered');
      $(this).find('.wrapper').delay(300).queue(function() {
        $(this).css('visibility', 'hidden').dequeue();
      });
    }
    if ( window.matchMedia("(min-width: 801px)").matches ) {
      if ( !element.parent().hasClass('product-shares-wrapper') ) {
        element.hoverIntent(settings);
      }
    } else {
      element.find('.heading').on('click', function(){
        if (element.hasClass('hovered')) {
          element.removeClass('hovered');
          element.find('.wrapper').delay(300).queue(function() {
            $(this).css('visibility', 'hidden').dequeue();
          });
        } else {
          element.addClass('hovered').find('.wrapper').css('visibility','visible');
        }
      })
    }
    /* Count shares */
    $('body').on('click', 'a.post-share-button', function(e) {
        var service = $(this).data("service");
        var post_id = $(this).data("postid");
        var wrapper = $(this);
        $.ajax({
            type: "post",
            url: ajax_var.url,
            data: "action=tz_post_share_count&nonce=" + ajax_var.nonce + "&post_id=" + post_id + "&service=" + service,
            success: function(count) {
                wrapper.find('.sharecount').empty().html("(" + count + ")");
            }
        });
        e.preve
    });
});

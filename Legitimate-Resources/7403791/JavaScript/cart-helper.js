jQuery(document).ready(function($){
  $(window).load(function(){
    'use strict';
    /* Show cart on hover/click */
    var cart_element = $('.widget_tz_shopping_cart');
    var settings = {
          interval: 100,
          timeout: 200,
          over: mousein_triger,
          out: mouseout_triger
    };
    function mousein_triger(){
      $(this).find('.widget_shopping_cart_content').css('visibility', 'visible');
      $(this).addClass('hovered');
    }
    function mouseout_triger() {
      $(this).removeClass('hovered');
      $(this).find('.widget_shopping_cart_content').delay(300).queue(function() {
        $(this).css('visibility', 'hidden').dequeue();
      });
    }
    if ( window.matchMedia("(min-width: 801px)").matches ) {
      cart_element.hoverIntent(settings);
    } else {
      cart_element.find('.heading').on('click', function(){
        if ( window.matchMedia("(max-width: 767px)").matches ) {
          var screen_width = $(window).width();
          var cart_container_width = 300;
          var cart_offset = cart_element.offset();
          var padding_width = (screen_width - cart_container_width)/2;
          var new_right_pos = screen_width - cart_offset.left - cart_element.width() - padding_width;
          cart_element.find('.widget_shopping_cart_content').css('right','-'+new_right_pos+'px');
        }
        if (cart_element.hasClass('hovered')) {
          cart_element.removeClass('hovered');
          cart_element.find('.widget_shopping_cart_content').delay(300).queue(function() {
            $(this).css('visibility', 'hidden').dequeue();
          });
        } else {
          cart_element.addClass('hovered').find('.widget_shopping_cart_content').css('visibility','visible');
        }
      });
    }

    /* Custom Scrollbar */
    function cart_products_scrollbar() {
      $(".widget_tz_shopping_cart ul.cart_list").mCustomScrollbar({
        theme:"minimal-dark",
      });
    }
    cart_products_scrollbar();

    /* Apply functions after ajax actions */
    $(document).ajaxComplete(function(event, xhr, settings) {
      var event_url = settings.url;
      var event_data  = settings.data;
      if (~event_url.indexOf("wc-ajax=get_refreshed_fragments") ||
          ~event_url.indexOf("wc-ajax=add_to_cart") ) {
        cart_products_scrollbar();
      }
    });

  });
});

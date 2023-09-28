/**
 * 1.1 version of theme custom js
 * Support for Navpane plugin
 */

 jQuery(function() {

	var $ = jQuery;

	// Define Theme specific functions
  var Theme = {
    // Swiping mobile galleries wwith Hammer.js
    swipeGallery: function() {
      setTimeout(function() {
        var touchGallery = document.getElementsByClassName("fancybox-wrap")[0];
        var mc = new Hammer(touchGallery);
        mc.on("panleft panright", function(ev) {
          if (ev.type == "panleft") {
            $("a.fancybox-next").trigger("click");
          } else if (ev.type == "panright") {
            $("a.fancybox-prev").trigger("click");
          }
          Theme.swipeGallery();
        });
      }, 500);
    },
    swipeInit: function() {
      if ('ontouchstart' in window) {
        $("body").on("click", "a.w-fancybox", function() {
          Theme.swipeGallery();
        });
      }
    },
    // Hide minicart better on mobile
    hideCart: function(container){
      if ('ontouchstart' in window) {
        $(container).on('click touchend mouseenter', function () {
            $('#wsite-mini-cart').fadeOut("fast");
        });
      }
    },
    interval: function(condition, action, duration, limit) {
      var counter = 0;
      var looper = setInterval(function(){
        if (counter >= limit || Theme.checkElement(condition)) {
          clearInterval(looper);
        } else {
          action();
          counter++;
        }
      }, duration);
    },
    checkElement: function(selector) {
      return $(selector).length;
    },
    moveLogin: function() {
      var login = $('#member-login').clone(true);
      $("#nav .wsite-menu-default li:last-child").after(login);
    },
    moveSocial: function() {
      if ($('body').hasClass('w-navpane-is-forced')) {
        var social = $('.social').detach();
        $("#nav .nav-wrap").after(social);
      }
    }
  }

	$(document).ready(function() {

	  $("body").addClass("postload");
    Theme.swipeInit();
    Theme.hideCart('.page-content');

    // Swap preview images for hi-res images in product page

    $("a.wsite-product-image").each(function(){
      var hires = $(this).attr("href");
      $(this).find('img').attr("src", hires);
    });

    Theme.interval("#nav #member-login", Theme.moveLogin, 800, 5);
    Theme.interval("#nav .social", Theme.moveSocial, 800, 5);

    // landing scroll

    $("#landing-scroll").click(function(e){
      e.preventDefault();
        $('html,body, .wrapper').animate({
          scrollTop: $("#main").offset().top
      }, 1000);
    });

    // Store category list click
    $('.wsite-com-sidebar').click(function(){
      if (!$(this).hasClass('sidebar-expanded')) {
        $(this).addClass('sidebar-expanded');
        if ($('#close').length === 0) {
          $("#wsite-com-hierarchy").prepend('<a id="close" href="#">CLOSE</a>');
          $('#close').click(function(e){
            e.preventDefault();
            setTimeout(function() {$('.wsite-com-sidebar').removeClass('sidebar-expanded');}, 50);
          });
        }
      }
    });

  })
});

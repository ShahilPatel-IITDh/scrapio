jQuery(function($) {

    // Mobile sidebars
    $.fn.expandableSidebar = function(expandedClass) {
         var $me = this;

         $me.on('click', function() {
             if(!$me.hasClass(expandedClass)) {
                  $me.addClass(expandedClass);
                } else {
                  $me.removeClass(expandedClass);
                }
         });
    };

    // Interval loop
     $.fn.intervalLoop = function(condition, action, duration, limit) {
          var counter = 0;
          var looper = setInterval(function(){
                if (counter >= limit || $.fn.checkIfElementExists(condition)) {
                     clearInterval(looper);
                } else {
                     action();
                     counter++;
                }
          }, duration);
     };

     // Check if element exists
     $.fn.checkIfElementExists = function(selector) {
          return $(selector).length;
     };

    // Postload class for handling navigation + cart cloning
    $('body').addClass('postload');
    
    // IE Edge flicker fix
    if (/Edge/.test(navigator.userAgent)) {
      $('html').css('overflow', 'hidden');
      $('body').css('overflow', 'auto');
    }

    // Where all the magic happens
    var stripesController = {

        init: function(opts) {
              var base = this;

             setTimeout(function() {
                 base._addClasses();
                base._moveElements();
                base._moveLogin();
            }, 1000);
        },

        _moveElements: function() {
             var base = this;

            // Move cart to header, otherwise hide the cart
             if ($('#wsite-nav-cart-a').length > 0) {
                 $('.menu-controls-bar .container').append('<div id="miniCart" class="mini-cart-wrap"><span id="miniCartIcon" class="mini-cart-icon"></span></div>');
                 $('#wsite-mini-cart').detach().appendTo('#miniCart');
              } else {
                 $('#miniCart').hide();
              }

              // Timeout to check cart
            setTimeout(function() {
                base._attachEvents();
                base._checkCartItems();
            }, 800);
        },


         // Move login
         _moveLogin: function() {
              $.fn.intervalLoop('.js-nav-visible #member-login', this._detachLogin, 800, 5);
         },

         _detachLogin: function() {
              var loginDetach = $('.js-nav-hidden #member-login').detach();
              $('.js-nav-visible .wsite-menu-default > li:last-child').after(loginDetach);
         },

        _checkCartItems: function() {
             var base = this;

            if ($('#wsite-mini-cart').find('li.wsite-product-item').length > 0) {
                $('.mini-cart-wrap').addClass('full');
            } else {
                $('.mini-cart-wrap').removeClass('full');
            }
        },

        _addClasses: function() {
             var base = this;

             // Add class to nav items with subnav
             $('.wsite-menu-default').find('li.wsite-menu-item-wrap').each(function(){
                    var $me = $(this);

                 if($me.children('.wsite-menu-wrap').length > 0) {
                    $me.addClass('has-submenu');
                        $('<span class="icon-caret"></span>').insertAfter($me.children('a.wsite-menu-item'));
                 }
              });

              // Add class to subnav items with subnav
              $('.wsite-menu').find('li.wsite-menu-subitem-wrap').each(function(){
                 var $me = $(this);

                 if($me.children('.wsite-menu-wrap').length > 0) {
                        $me.addClass('has-submenu');
                        $('<span class="icon-caret"></span>').insertAfter($me.children('a.wsite-menu-subitem'));
                 }
              });

             // Keep subnav open if submenu item is active
             if ($('body').hasClass('w-navpane-is-forced') || $(window).width() < 768) {
               $('li.wsite-menu-subitem-wrap.wsite-nav-current').parents('.wsite-menu-wrap').addClass('open');
             }
              // Add fullwidth class to gallery thumbs if less than 6
              $('.imageGallery').each(function(){
                 if ($(this).children('div').length <= 6) {
                        $(this).children('div').addClass('fullwidth-mobile');
                 }
              });
        },

        _cartFull: function() {
             var base = this;

             $('.mini-cart-wrap').addClass('full');
             $("html, body").animate({ scrollTop: 0 }, 600);
        },

        _cartEmpty: function() {
          var base = this;

          $('.mini-cart-wrap').removeClass('full');
        },

        _attachEvents: function() {
             var base = this;

             $('li.has-submenu span.icon-caret, li.has-submenu a:not([href])').on('click', function() {
                  var $me = $(this);
                  if($me.siblings('.wsite-menu-wrap').hasClass('open')) {
                        $me.siblings('.wsite-menu-wrap').removeClass('open');
                  } else {
                        $me.siblings('.wsite-menu-wrap').addClass('open');
                  }
             });
             
             // Close subnav in editor
             $("#icontent #desktopNav a[href]").on('click', function() {
                  $('.open').removeClass('open');
              });

             // Mini cart toggle
             $('#miniCartIcon').on('click', function(){
                    $('#wsite-mini-cart').toggle();
              });

              // Scroll to top when add items to cart
              $('#wsite-com-product-add-to-cart, .wsite-product-button').on('click', function(){
                 base._cartFull();
              });

              // Toggle mobile cart (to be reworked)
              $('.wsite-remove-button').on('click', function(){
                 base._cartEmpty();
              });

              // Store category dropdown
              $('.wsite-com-sidebar').expandableSidebar('sidebar-expanded');

              // Search filters dropdown
              $('#wsite-search-sidebar').expandableSidebar('sidebar-expanded');

              // Init swipe on mobile
              if ('ontouchstart' in window) {
                 $('body').on('click', 'a.w-fancybox', function() {
                        base._initSwipeGallery();
                 });
              }
        },

        _initSwipeGallery: function() {
              var base = this;

              setTimeout(function() {
                 var touchGallery = document.getElementsByClassName('fancybox-wrap')[0];
                 var mc = new Hammer(touchGallery);
                 mc.on("panleft panright", function(ev) {
                        if (ev.type == "panleft") {
                          $("a.fancybox-next").trigger("click");
                        } else if (ev.type == "panright") {
                          $("a.fancybox-prev").trigger("click");
                        }
                        base._initSwipeGallery();
                 });
              }, 500);
        }
    };


    $(document).ready(function(){
         stripesController.init();
    });
});

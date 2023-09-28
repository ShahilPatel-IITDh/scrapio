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
  }

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

    if (!condition) action();
  }

  // Check if element exists
  $.fn.checkIfElementExists = function(selector) {
    return $(selector).length;
  }

  $.fn.hideDropdowns = function(dropdownClass) {
    this
      .removeClass(dropdownClass)
      .find('.wsite-menu-wrap')
      .revealer('hide')
      .find('.' + dropdownClass)
      .removeClass(dropdownClass);

    return this;
  }

  var edisonController = {
    init: function(opts) {
      var base = this;

      base._addClasses();
      base._headerSetup();

      $(window).on('resize', function() {
        base._headerSetup();
      });

      base._moveUtils();
      base._navSetup();
      base._searchBox();
      base._miniCartSetup();
      base._productSetup();
      base._attachEvents();
    },

    _breakpoints: {
      small: 768,
    },

    _utils: {
      onEscKey: function(callback) {
        $(document).on('keyup', function(event) {
          if (event.keyCode === 27) callback();
        });
      },
      onScrollDirection: function(Direction) {
        var previousScrollTop = 0,
            deltaThreshold = 5;

        $(window).scroll(function() {
          var currentScrollTop = $(this).scrollTop();

          //return if scroll hasn't met delta threshold
          if (Math.abs(previousScrollTop - currentScrollTop) <= deltaThreshold) {
            return;
          }

          //direction conditions
          if (currentScrollTop > previousScrollTop){
            Direction.down(currentScrollTop);
          } else {
            Direction.up(currentScrollTop);
          }

          previousScrollTop = currentScrollTop;
        });
      },
    },

    _addClasses: function() {
      var base = this;

      $(document.body).addClass('reveal-content');

      // Keep subnav open if submenu item is active
      $('li.wsite-menu-subitem-wrap.wsite-nav-current').parents('.wsite-menu-wrap').addClass('open');

      // Add placeholder text to inputs
      $('.wsite-form-sublabel').each(function(){
        var sublabel = $(this).text();
        $(this).prev('.wsite-form-input').attr('placeholder', sublabel);
      });

      // Add fullwidth class to gallery thumbs if less than 6
      $('.imageGallery').each(function(){
        if ($(this).children('div').length <= 6) {
          $(this).children('div').addClass('fullwidth-mobile');
        }
      });
    },

    _headerSetup: function() {
      var base = this;
      var $body = $(document.body);
      var $header = $('.edison-header');
      var headerHeight;

      // Wait for redraw to happen after appending
      base._detectHeaderWrap();
      headerHeight = $header.outerHeight();

      if ($body.hasClass('header-sticky-up')) {
        base._utils.onScrollDirection({
          down: function(currentScrollTop) {
            $header
              .removeClass('is-visible')
              .toggleClass('is-sticky', (currentScrollTop > headerHeight * 2));

            base._closeAllDropdowns();
          },
          up: function() {
            $header.addClass('is-visible');
          },
        });
      }

      if ($body.hasClass('header-sticky')) {
        $(window).on('scroll', function() {
          $body.toggleClass('header-compressed', $(this).scrollTop() > headerHeight * 2);
        });
      }
    },

    _detectHeaderWrap: function() {
      var headerHeight = $('.edison-header').outerHeight();

      $('body').toggleClass('header-multiline', (headerHeight > 100));

      // No logo
      if ($('.wsite-logo').children('.wsite-title-placeholder').length) {
        $('body').addClass('logo-hidden');
      }

      // No Utils

      $.fn.intervalLoop('', function() {
        if ((!$('.wsite-search').length || $('.wsite-search').attr('style') === 'display: none;') && !$('#wsite-nav-cart-a').text().length) {
          $('body').addClass('utils-hidden');
        }
        else {
          $('body').removeClass('utils-hidden');
        }

        if ($('#wsite-nav-cart-a').length) {
          var cartText = $('#wsite-nav-cart-a').html().replace(/["'()]/g,"");
          $('#wsite-nav-cart-a').html(cartText).addClass("toggle-custom");
        }

        if ($('.header-sticky:not(.header-compressed)').length || $('body').hasClass('header-sticky-up')) {
          headerHeight = $('.edison-header').outerHeight();
          $('body').css({ paddingTop: headerHeight });
        }
      }, 500, 8);
    },

    _moveUtils: function() {
      var base = this;
      var winWidth = window.innerWidth;
      var $login = $('#member-login');
      var $search = $('.wsite-search-wrap');
      var search = $("#wsite-header-search-form input").clone(false);

      if (winWidth >= base._breakpoints.small) {
        $login.appendTo('.desktop-nav .wsite-menu-default');
        $search.prependTo('.site-utils');
      } else {
        $login.appendTo('.mobile-nav .wsite-menu-default');
        $search.prependTo('.mobile-nav');
        $('.wsite-search').show();
      }

      base._observeDom($('.dummy-menu')[0], function(observer, target, config, mutation) {
        // Remove the duplicate login link after it is added
        if (mutation.addedNodes[0] === undefined || mutation.addedNodes[0].id !== 'member-login') return;
        $('.dummy-menu #member-login').remove();
      }, { subtree: true });
    },

    _navSetup: function() {
      var base = this;
      var $submenuContainer = $('.nav .has-submenu');
      var dropdownClass = 'dropdown-open';
      var $desktopNav = $('.desktop-nav .wsite-menu-default');

      var bindNavEvents = function() {
        $('.nav .has-submenu').each(function() {
          $(this)
            .off('click')
            .children('a')
            .off('click')
            .on('click.edison', function(event) {
              // Toggle submenu
              $(this)
                .parent()
                .toggleClass(dropdownClass)
                .children('.wsite-menu-wrap')
                .revealer('toggle');

              // Hide children of other main nav items on desktop
              if (!$('.hamburger').is(':visible')) {
                $(this)
                  .closest('li')
                  .siblings('.has-submenu')
                  .hideDropdowns(dropdownClass);
              }

              return false;
            });
        });

        $('.cloned-link > a').off('click.edison');
      }

      if (typeof DISABLE_NAV_MORE == 'undefined' || !DISABLE_NAV_MORE) {
        $desktopNav.pxuMenu({
          moreLinkHtml: 'More ',
        });
        $.fn.intervalLoop('', function() {
          if ($desktopNav.data('pxuMenu')) {
            $desktopNav.data('pxuMenu').update();
            bindNavEvents();
          }
        }, 500, 5);
      }

      bindNavEvents();
      // Unbind / bind after defaults have run
      base._observeDom($('.wsite-menu-default')[0], function() {
        bindNavEvents();
      }, { subtree: true });

      // Clone parent links into subnav
      $submenuContainer.each(function() {
        var $link = $(this).children('a');

        if ($link.attr('href') === undefined || $link.hasClass('dead-link')) return;

        $link
          .parent()
          .clone()
          .removeClass('has-submenu wsite-menu-item-wrap')
          .addClass('wsite-menu-subitem-wrap cloned-link')
          .children('a')
          .removeClass('wsite-menu-item')
          .addClass('wsite-menu-subitem')
          .parent()
          .prependTo($link.next('.wsite-menu-wrap').children('.wsite-menu'));

        $('.cloned-link').find('.wsite-menu-wrap').remove();
      });

      // Close dropdowns if clicking outside nav
      $(document).on('click', function(event) {
        if ($(event.target).closest('.nav-wrap').length) {
          event.stopPropagation();
        } else {
          base._closeAllDropdowns();
        }
      });

      // Close dropdowns on esc
      base._utils.onEscKey(function() {
        if (!$('.dropdown-open').length) return;
        base._closeAllDropdowns();
      });
    },

    _closeAllDropdowns: function() {
      $('.edison-header')
        .find('.dropdown-open')
        .hideDropdowns('dropdown-open');
    },

    _searchBox: function() {
      var base = this;
      var searchBox = '.wsite-search'; // Not available in editor on doc ready
      var $searchToggle = $('.search-toggle');
      var searchPosition = $searchToggle.outerHeight() + $searchToggle.offset().top;
      var searchText = $(".wsite-search-input").attr("placeholder");
      var winWidth = window.innerWidth;
      $("#icontent .wsite-search").attr('data-search-text', searchText);
      $searchToggle.text(searchText);

      if (winWidth >= base._breakpoints.small) {
        // Make sure the editor also gets the class
        $.fn.intervalLoop('', function() {
          if ($('.wsite-search').attr('style') === 'display: none;') return;
          $('body').toggleClass('has-site-search', !!$('.wsite-search').length);
        }, 800, 5);

        $(searchBox)
          .css({top: searchPosition})
          .on('revealer-show', function() {
            $(searchBox).find('.wsite-search-input').focus();
          })
          .find('.wsite-search-input')
          .attr('placeholder', $(".wsite-search-input").attr("placeholder"))
          .on('blur', function() {
            setTimeout(function() {
              $(searchBox).revealer('hide');
            }, 300);
          });

        base._utils.onEscKey(function() {
          if ($(searchBox).revealer('isVisible')) {
            $(searchBox).revealer('hide');
          }
        });

        $searchToggle.on('click', function(event) {
          event.preventDefault();
          $(searchBox).revealer('toggle');
        });
      }
    },

    _miniCartSetup: function() {
      var base = this;
      var $minicart = $('#wsite-mini-cart');
      var cartOpenClass = 'mini-cart-open';
      var toggleMiniCart = function(state) {
        var revealerState = state ? 'show' : 'hide';
        $('body').toggleClass(cartOpenClass, state);
        $('.mini-cart-overlay').revealer(revealerState);
      };
      var hijackMinicart = function() {
        var toggleText = $('#wsite-nav-cart-a').html().replace(/["'()]/g,"");

        $('#wsite-nav-cart-a')
          .html(toggleText)
          .off('click mouseenter mouseover mouseleave mouseout');

        $('#wsite-mini-cart')
          .off('mouseenter mouseover mouseleave mouseout')
          .removeClass('arrow-top')
          .removeAttr('style')
          .prepend($('.mini-cart-header'));

        $('.mini-cart-toggle').toggleClass('has-mini-cart', !!$('.mini-cart-toggle').children().length);

        // Update responsive menu since site-utils dimesions will change
        if (typeof DISABLE_NAV_MORE == 'undefined' || !DISABLE_NAV_MORE) {
          $('.desktop-nav .wsite-menu-default').data('pxuMenu').update();
        }
      };
      var hijackMinicartToggle = function() {
        var $toggle = $('#wsite-nav-cart-a');
        var toggleText = $toggle.html().replace(/["'()]/g,"");
        var itemCount = parseInt($('#wsite-nav-cart-num').text(), 10);
        var hasItems = isNaN(itemCount) || itemCount === 0 ? false : true;

        $toggle
          .html(toggleText)
          .addClass('toggle-custom')
          .off('click mouseenter mouseover mouseleave mouseout');

        setTimeout(function() {
          $toggle.toggleClass('has-items', hasItems);
        }, 100);
      };

      $(document).on('click', '.wsite-nav-cart', function() {
        toggleMiniCart(true);
      });

      $(document).on('click', '.button-mini-cart-close, .mini-cart-overlay', function() {
        toggleMiniCart(false);
      });

      base._utils.onEscKey(function() {
        if ($('body').hasClass(cartOpenClass)) {
          toggleMiniCart(false);
        }
      });

      // Watch for minicart
      base._observeDom(document, function(docObserver, target, config) {
        // Bail if minicart not available yet
        if (!$('#wsite-mini-cart').length || !$('#wsite-nav-cart-a').length) return;

        // Watch minicart
        base._observeDom($('#wsite-mini-cart')[0], function(observer, target, config) {
          // Disconnect before making changes
          observer.disconnect();

          // Unbind default handlers etc.
          hijackMinicart();

          // Start watching again (for add / remove of items etc.)
          observer.observe(target, config);
        });

        // Watch toggle for childList changes (ie. when the text changes)
        base._observeDom($('#wsite-nav-cart-a')[0], function(observer, target, config, mutation) {
          observer.disconnect();
          hijackMinicartToggle();
          observer.observe(target, config);
        }, { attributes: false, characterData: false });

        // $minicart available, so stop watching the doc
        docObserver.disconnect();
      }, { subtree: true });
    },

    _productSetup: function() {
      $('.product-grid-layout--above, .product-grid-layout--below').find('.product-grid__item').each(function() {
        var $product = $(this);
        $product.find('.product-grid__button').appendTo($product.find('.product-grid__images'));
      });
    },

    _attachEvents: function() {
      var base = this;

      // Nav toggle
      $('.hamburger').on('click', function() {
        $('body').toggleClass('nav-open');
        $('.mobile-nav').revealer('toggle');
      });

      // Store category dropdown
      $('.wsite-com-sidebar').expandableSidebar('sidebar-expanded');

      // Search filters dropdown
      $('#wsite-search-sidebar').expandableSidebar('sidebar-expanded');

      // Init fancybox swipe on mobile
      if ('ontouchstart' in window) {
        $('body').on('click', 'a.w-fancybox', function() {
          base._initSwipeGallery();
        });
      }
    },

    _initSwipeGallery: function() {
      var base = this;

      setTimeout(function(){
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
    },

    _observeDom: function(target, callback, config) {
      var config = $.extend({
        attributes: true,
        childList: true,
        characterData: true
      }, config);

      // create an observer instance & callback
      var observer = new MutationObserver(function(mutations) {
        // Using every() instead of forEach() allows us to short-circuit the observer in the callback
        mutations.every(function(mutation) {
          callback(observer, target, config, mutation);
        });
      });

      // pass in the target node, as well as the observer options
      observer.observe(target, config);
    }
  }

  $(document).ready(function(){
    edisonController.init();
  });

});

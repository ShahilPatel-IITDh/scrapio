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
  }

  // Check if element exists
  $.fn.checkIfElementExists = function(selector) {
    return $(selector).length;
  }

  var parisController = {

    init: function(opts) {
      var base = this;
      var width = $(window).width();

      base._domObservers();
      base._miniCartSetup();
      base._addClasses();
      base._loginSetup(false);
      base._headerSetup();
      base._blogLink();

      $(window).on('resize', debounce(function() {
        base._headerSetup();
        base._navClasses();

        if ($(this).width() != width){
          width = $(this).width();
          base._closeAllDropdowns();
        }
      }, 250));

      setTimeout(function(){
        if ($('body').hasClass('collapsed-menu-on') || $(window).width() <= 1024) {
          base._navSetup('collapsed');
        } else {
          base._navSetup('desktop');
        }
        base._bindNavEvents();

        base._checkCartItems();
        base._attachEvents();
        base._loginSetup(true);
        base._closeAllDropdowns();
        base._wrapSelects();
      }, 1200);

      $('.wsite-button-highlight::before').revealer('show', true);
    },

    _addClasses: function() {
      var base = this;
      var $banner = $('.banner-wrap .banner');
      var $header = $('.paris-header');
      var bannerHTML = $banner.html();
      var bannerNoHTML = $.trim(bannerHTML).length === 0;

      // Add fade in class to nav + logo
      $('body').addClass('fade-in-nav');

      $('.header-page').addClass('fade-in');

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

      $banner.toggleClass('no-content', bannerNoHTML);
      $(window).on('scroll', debounce(function() {
        if ($(window).scrollTop()) {
          $header.addClass('fixed');
        } else {
          $header.removeClass('fixed');
        }
      }, 100));
    },

    _attachEvents: function() {
      var base = this;
      var $body = $('body');

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

      //these buttons had some odd behavior on ios
      //where you had to double tap to do a an action
      $('#wsite-com-minicart-checkout-button, .wsite-checkout-actions__btn, form .wsite-button').on('touchend', function(){
        $(this).click();
      })
    },

    _checkCartItems: function() {
      var base = this;

      if($('#wsite-mini-cart').find('li.wsite-product-item').length > 0) {
        $('body').addClass('cart-full');
      } else {
        $('body').removeClass('cart-full');
      }
    },

    _moveLogin: function(login) {
      var base = this;
      var $collapsedNav = $('.collapsed-nav > .site-menu');
      var $siteUtils = $('.site-utils');

      if ($(window).width() >= 1024) {
        if ($siteUtils.has(login).length === 0) {
          $siteUtils.prepend($(login));
        } else {
          base._removeExtraLogins(login);
        }
      } else {
        if ($collapsedNav.has(login).length === 0) {
          $collapsedNav.prepend($(login));
        } else {
          base._removeExtraLogins(login);
        }
      }
    },

    _removeExtraLogins: function(login) {
      $('.desktop-nav').find(login).remove();
      $('.dummy-nav').find(login).remove();
    },

    _loginSetup: function(editorDisplay) {
      var base = this;
      var login = editorDisplay ? '#pgmember-login' : '#member-login';

      function hijackLogin() {
        base._moveLogin(login);
        base._removeExtraLogins(login);

        $.fn.intervalLoop('', function() {
          base._removeExtraLogins(login);
        }, 300, 5);

        $(window).on('resize', function() {
          base._moveLogin(login);
        });
      }

      // Bail if the login link doesn't exist
      if (!$(login).length) return;

      // No mutations in editor, so run immediately
      if (editorDisplay) {
        hijackLogin();
      } else {
        base._observeDom($(login)[0], function(observer, target, config) {
          observer.disconnect();
          hijackLogin();
          observer.observe(target, config);
        }, { subtree: true });
      }
    },

    _navClasses: function() {
       $('.wsite-menu-default').find('.wsite-menu-item-wrap, .wsite-menu-subitem-wrap').each(function() {
        var $me = $(this);
        $me.removeClass('has-submenu');
        $me.children('.wsite-menu-item-wrap').removeClass('wsite-submenu desktop-nav-dropdown');

        if ($me.children('.wsite-menu-wrap').length > 0) {
          $me.addClass('has-submenu');

          if ($me.hasClass('wsite-menu-item-wrap')) {
            $me.children('.wsite-menu-wrap').addClass('desktop-nav-dropdown');
          }

          $me.children('.wsite-menu-wrap').addClass('wsite-submenu');
        }
      });
    },

    _bindNavEvents: function(navType) {
      var base = this;
      var $body = $('body');
      var $html = $('html');
      var $hasSubmenu = $('.desktop-nav .wsite-menu-item-wrap.has-submenu');
      var $iconSubmenu = $('.icon-submenu');
      var $toggler = $('.hamburger');
      var $hamburgerIcon = $('.hamburger-icon');
      var $menuText = $('.menu-text');
      var $menuContainer = $('.collapsed-nav');

      $toggler.on('click', function() {
        if ($(this).hasClass('open')) {
          base._closeAllDropdowns();
        } else {
          $body.addClass('nav-open');
          $html.addClass('nav-open');
          $hamburgerIcon.toggleClass('open');
          $menuText.toggle();
          $menuContainer.revealer();
        }

        $(this).toggleClass('open');
      });

      //  This gets run everytime you switch pages in the editor
      //  so it has to be unbinded every time to work properly in the editor
      $(document).off('click', '.icon-submenu, .more-link').on('click', '.icon-submenu, .more-link', function(event) {
        var $me = $(this);
        var $submenu = $me.siblings('.wsite-submenu');

        $me.toggle();
        $me.siblings('.icon-submenu').toggle();
        $submenu.revealer('toggle');
        base._closeAdjacentDropdowns($submenu);
      });

      $(document).on('click', '.wsite-menu-item:not(.icon-submenu, .more-link)', function() {
        base._closeAllDropdowns();
      });
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

    _navSetup: function(navType) {
      var base = this;
      var $menuContainer = $('.collapsed-nav');
      var $menuOpenText = $('.menu-open-text');
      var $desktopNav = $('.desktop-nav .site-menu');
      var $navSubmenu = '';
      var $window = $(window);

      if (typeof DISABLE_NAV_MORE == 'undefined' || !DISABLE_NAV_MORE) {
        $desktopNav.pxuMenu();
      }

      $desktopNav.addClass('visible');
      $menuOpenText.revealer('show', 'true');

      // Add class to nav items with subnav
      $('.wsite-menu-default').find('.wsite-menu-item-wrap, .wsite-menu-subitem-wrap').each(function() {
        var $me = $(this);
        $me.removeClass('has-submenu');
        $me.children('.wsite-menu-item-wrap').removeClass('wsite-submenu desktop-nav-dropdown');

        if ($me.children('.wsite-menu-wrap').length > 0) {
          $me.addClass('has-submenu');

          if ($me.hasClass('wsite-menu-item-wrap')) {
            $me.children('.wsite-menu-wrap').addClass('desktop-nav-dropdown');
          }

          $me.children('.wsite-menu-wrap').addClass('wsite-submenu');

          $('<a href="#" class="icon-submenu icon-open wsite-menu-default"> +</a>' +
            '<a href="#" class="icon-submenu icon-close wsite-menu-default"> -</a>')
            .insertAfter($me.children('a.wsite-menu-item, a.wsite-menu-subitem'));
        }
      });


      $navSubmenu = $('.wsite-submenu > .wsite-menu');

      if ($(window).width() >= 1024) {
        $navSubmenu.css('max-height', $menuContainer.height());
        $menuContainer.css('height', 'auto');
      } else {
        $navSubmenu.css('max-height', 'none');
      }
    },

    _headerSetup: function() {
      var base = this;
      if ($(window).width() >= 1024) {
        $('.wsite-search').appendTo('.site-utils');
        $('.search-icon').insertAfter('.wsite-search');
        $('.paris-header .search-icon').on('click', function() {
          $('body').addClass('show-overlay');
          $('.wsite-search').revealer('show');
          $('.paris-header .search-icon').revealer('hide', true);
          $('.paris-header .mini-cart-toggle').hide();
          $('.paris-header .search-close').revealer('show', true);
          setTimeout(function() { $('.paris-header .wsite-search-input').focus() }, 500);
        });

        $('.paris-header .search-close').on('click', function() {
          $('body').removeClass('show-overlay');
          $('.wsite-search').revealer('hide');
          $('.paris-header .search-close').revealer('hide', true);
          $('.paris-header .mini-cart-toggle').show();
          $('.paris-header .search-icon').revealer('show', true);
        })
      } else {
        $('.search-icon').prependTo('.collapsed-nav');
        $('.wsite-search').prependTo('.collapsed-nav');
      }
    },

    _miniCartSetup: function() {
      var base = this;
      var $body = $('body');
      var $minicart = $('#wsite-mini-cart');
      var cartOpenClass = 'show-overlay';

      var toggleMiniCart = function(state) {
        var revealerState = state ? 'show' : 'hide';
        $body.toggleClass(cartOpenClass, state);
        $('#wsite-mini-cart, .mini-cart-overlay').revealer(revealerState);
      };

      var resizeProductList = function() {
        var $productList = $('.wsite-product-list');
        var productListLength = 215 * $productList.children().length;
        var productListWrapperWidth = $('#wsite-mini-cart').innerWidth() - $('.wsite-cart-bottom').innerWidth() - 1;

        if ($(window).width() > 1024) {
          $productList.css('width', productListLength);

          $('.wsite-product-list-wrapper')
            .css('max-width', productListWrapperWidth)
            .scroll(debounce(function() {
              var leftPos = $('.wsite-product-list-wrapper').scrollLeft();
              var rightPos = $productList.width() - (leftPos + $('wsite-product-list-wrapper').outerWidth());
              var $prev = $('.wsite-cart-contents .product-pagination .pagination-prev');
              var $next = $('.wsite-cart-contents .product-pagination .pagination-next');

              $prev.toggleClass('blur', leftPos === 0);
              $next.toggleClass('blur', (rightPos === productListWrapperWidth));
          }, 100));
        } else {
          $productList.css('width', '100%');
          $('.wsite-product-list-wrapper').css('max-width', '');
        }
      }

      var wrapItems = function() {
        var $minicartWrapper = $('.mini-cart-wrapper');
        var $productList = $('.wsite-product-list');
        var productListLength = 215 * $productList.children().length;
        var productListWrapperWidth = $('#wsite-mini-cart').innerWidth() - $('.wsite-cart-bottom').innerWidth() - 1;

        $minicartWrapper.toggleClass('no-pagination', productListLength < productListWrapperWidth);

        if ($productList.parent('.wsite-product-list-wrapper').length === 0) {
          $productList.wrap('<div class="wsite-product-list-wrapper"></div>');

          $('.wsite-cart-contents .product-pagination .pagination-next')
            .on('click', function(event){
              var leftPos = $('.wsite-product-list-wrapper').scrollLeft();
              $('.wsite-product-list-wrapper').animate({scrollLeft: leftPos + productListWrapperWidth + 30}, 800);
          });

          $('.wsite-cart-contents .product-pagination .pagination-prev')
            .on('click', function(){
              var leftPos = $('.wsite-product-list-wrapper').scrollLeft();
              $('.wsite-product-list-wrapper').animate({scrollLeft: leftPos - productListWrapperWidth - 30}, 800);
          });
        }

        resizeProductList();
      }

      var placePagination = function() {
        var $minicart = $('#wsite-mini-cart');
        var $productListWrapper = $minicart.find('.wsite-product-list-wrapper');
        var $pagination = $minicart.find('.product-pagination');

        //calculate based on the product wrapper and add 15 to compensate for padding
        var paginationOffset = (($productListWrapper.width()/2) - ($pagination.width()/2)) + 15;

        $(window).width() > 1280 ? $pagination.css('left', '') : $pagination.css('left', paginationOffset);
      }

      var hijackMinicart = function() {
        var $minicart = $('#wsite-mini-cart');
        $('#wsite-nav-cart-a').off('click mouseenter mouseover mouseleave mouseout');

        $minicart
          .off('mouseenter mouseover mouseleave mouseout')
          .removeClass('arrow-top')
          .removeAttr('style');

        if ($minicart.parent('.mini-cart-wrapper').length === 0) {
          $minicart.wrap('<div class="mini-cart-wrapper"></div>');
        }
      };

      $(document).on('click', '.wsite-nav-cart', function() {
        toggleMiniCart(true);
      });

      $(document).on('click', '.button-mini-cart-close, .mini-cart-overlay', function() {
        toggleMiniCart(false);
      });

      $(window).on('resize', debounce(function(){
        resizeProductList();
      }, 100));

      base._utils.onEscKey(function() {
        if ($('body').hasClass(cartOpenClass)) {
          toggleMiniCart(false);
        }
      });

      //watch for minicart toggle
      base._observeDom(document, function(docObserver, target, config) {
        // Bail if minicart toggle not available yet
        if (!$('#wsite-nav-cart-a').length) return;

        // Watch minicart toggle
        base._observeDom($('#wsite-nav-cart-a')[0], function(observer, target, config) {
          // Disconnect before making changes
          observer.disconnect();

          var $toggle = $('#wsite-nav-cart-a');
          //remove parenthesis
          if ($(target).text().indexOf('(') > -1 || $(target).text().indexOf(')') > -1) {
            var miniCartText = $('#wsite-nav-cart-a').html();
            miniCartText = miniCartText.replace(/["'()]/g,"");
            $toggle.html(miniCartText);
            $toggle.css("visibility", 'visible');
          }

          // Start watching again (for add / remove of items etc.)
          observer.observe(target, config);
        });

        // $minicart toggle available, so stop watching the doc
        docObserver.disconnect();
      }, { subtree: true });

      // Watch for minicart
      base._observeDom(document, function(docObserver, target, config) {
        // Bail if minicart not available yet
        if (!$('#wsite-mini-cart').length) return;

        // Watch minicart
        base._observeDom($('#wsite-mini-cart')[0], function(observer, target, config) {
          // Disconnect before making changes
          observer.disconnect();

          // Unbind default handlers etc.
          hijackMinicart();
          wrapItems();
          placePagination();

          // Start watching again (for add / remove of items etc.)
          observer.observe(target, config);
        });

        // $minicart available, so stop watching the doc
        docObserver.disconnect();
      }, { subtree: true });
    },

    _closeAllDropdowns: function() {
      var $html = $('html');
      var $body = $('body');
      var $header = $('.paris-header', $body);

      $body.removeClass('nav-open show-overlay');
      $html.removeClass('nav-open');

      $('.hamburger-icon', $header).removeClass('open');

      $('.menu-close-text', $header).hide();
      $('.collapsed-nav', $header).revealer('hide');
      $('.desktop-nav-dropdown', $header).revealer('hide');
      $('.wsite-submenu', $header).revealer('hide');
      $('.wsite-search', $header).revealer('hide');
      $('.search-close', $header).revealer('hide', true);
      $('.icon-submenu.icon-close', $header).css('display', 'none');
      $('#wsite-mini-cart, .mini-cart-overlay').revealer('hide');

      $('.menu-open-text', $header).show();
      $('.mini-cart-toggle', $header).show();
      $('.search-icon', $header).revealer('show', true);
      $('.icon-submenu.icon-open', $header).css('display', 'inline');
    },

    _closeAdjacentDropdowns: function($currentDropdown) {
      var $submenu = $('.wsite-submenu');

      $submenu.each(function(){
        var $this = $(this);

        if ($this[0] !== $currentDropdown[0]
          && $this.find($currentDropdown).length === 0
          && $this.closest($currentDropdown).length === 0) {
            $this.revealer('hide');
            $this.siblings('.icon-open').css('display', 'inline');
            $this.siblings('.icon-close').css('display', 'none');
        }
      })
    },

    _wrapSelects: function() {
      $('select:not(.w-input-offscreen)').wrap('<div class="simple-select-wrapper" />');
    },

    _utils: {
      onEscKey: function(callback) {
        $(document).on('keyup', function(event) {
          if (event.keyCode === 27) callback();
        });
      }
    },

    _domObservers: function() {
      var base = this;
      base._observeDom($('.dummy-nav')[0], function(observer, target, config, mutation) {
      // Remove the duplicate login link after it is added
        if (mutation.addedNodes[0] === undefined || mutation.addedNodes[0].id !== 'member-login') return;
        $('.dummy-nav #member-login').remove();
      }, { subtree: true });
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
    },

    _blogLink: function() {
      $(".back-to-blog-link").each(function(){
        var url = $(this).attr("href").substring(0, $(this).attr("href").lastIndexOf("/") + 1);
        $(this).attr("href", url);
      });
    }
  };

  $(document).ready(function(){
    parisController.init();
  });
});

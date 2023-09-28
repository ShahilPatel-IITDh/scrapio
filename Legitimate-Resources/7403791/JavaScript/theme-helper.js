jQuery(document).ready(function($) {
  "use strict";

  /* Add "touch-enabled" class for mobile devices */
  if ( ("ontouchstart" in document.documentElement) ) {
    document.documentElement.className += " touch-enabled";
  }

  /* Wrap the selects for extra styling */
  $('.site-sidebar .widget select, .variations_form select').each(function(){
    $(this).wrap( "<div class='select-wrapper'></div>" );
  });

  /* Transform wc tabs to dropdown on mobile */
  if ( (window.matchMedia("(max-width: 768px)").matches) ) {
    $('.wc-tabs a').on( 'click', function() {
      $(this).closest("ul").toggleClass("open");
    });
  }

  /* Resizeable select for variations on single product page */
  $.fn.resizeselect = function(settings) {
    return this.each(function() {

      $(this).change(function(){
        var $this = $(this);

        /* create test element */
        var text = $this.find("option:selected").text();
        var $test = $("<span>").html(text).css({
            "font-size": $this.css("font-size"),
            "visibility": "hidden"
        });

        /* add to parent, get width, and get out */
        $test.appendTo($this.parent());
        var width = $test.width();
        $test.remove();

        /* set select width */
        $this.width(width);

        /* run on start */
      }).change();

    });
  };
  /* run by default */
  if ( !$('body').hasClass('grid-variations') && $('body').hasClass('single-product') ) {
    $('.variations select').resizeselect();
  }

  /* To top button */
  // Scroll (in pixels) after which the "To Top" link is shown
  var offset = 600,
  //Scroll (in pixels) after which the "back to top" link opacity is reduced
  offset_opacity = 1800,
  //Duration of the top scrolling animation (in ms)
  scroll_top_duration = 500,
  //Get the "To Top" link
  back_to_top = $('.to-top');
  //Visible or not "To Top" link
  $(window).scroll(function(){
      ( $(this).scrollTop() > offset ) ? back_to_top.addClass('top-is-visible') : back_to_top.removeClass('top-is-visible top-fade-out');
      if( $(this).scrollTop() > offset_opacity ) {
          back_to_top.addClass('top-fade-out');
      }
  });
  //Smoothy scroll to top
  back_to_top.on('click', function(event){
      event.preventDefault();
      $('body,html').animate({
          scrollTop: 0 ,
          }, scroll_top_duration
      );
  });

  /* Ajax Counter for Compare & Wishlist widgets */
  function get_compare_count() {
    var compare_wrapper = $('.tm-woocompare-widget-wrapper')
    var compare_count = compare_wrapper.find('.tm-woocompare-widget-products').children().length;
    if (compare_count >0) {
      if ( compare_wrapper.find('.compare-count-wrapper').length ) {
        compare_wrapper.find('.compare-count-wrapper').text(compare_count);
      } else {
        compare_wrapper.append('<span class="compare-count-wrapper">'+ compare_count +'</span>');
      }
    } else {
      compare_wrapper.find('.compare-count-wrapper').remove();
      compare_wrapper.append('<span class="compare-count-wrapper">0</span>');
    }
  }
  get_compare_count();

  function get_wishlist_count() {
    var wishlist_wrapper = $('.tm-woocomerce-wishlist-widget-wrapper')
    var wishlist_count = wishlist_wrapper.find('.tm-woowishlist-widget-products').children().length;
    if (wishlist_count >0) {
      if ( wishlist_wrapper.find('.wishlist-count-wrapper').length ) {
        wishlist_wrapper.find('.wishlist-count-wrapper').text(wishlist_count);
      } else {
        wishlist_wrapper.append('<span class="wishlist-count-wrapper">'+ wishlist_count +'</span>');
      }
    } else {
      wishlist_wrapper.find('.wishlist-count-wrapper').remove();
      wishlist_wrapper.append('<span class="wishlist-count-wrapper">0</span>');
    }
  }
  get_wishlist_count();

  $(document).ajaxComplete(function(event, xhr, settings) {
    var event_url = settings.url;
    var event_data = settings.data;
    if ( ~event_url.indexOf("action=tm_compare_get_fragments") ){
      get_compare_count();
    }

    if ( event_data && ('function' === typeof event_data.indexOf) ) {
      if ( ~event_data.indexOf("action=tm_woocompare_update") ||
           ~event_data.indexOf("action=tm_woocompare_remove") ||
           ~event_data.indexOf("action=tm_woocompare_empty") ){
        get_compare_count();
      }
      if ( ~event_data.indexOf("action=tm_woowishlist_update") ||
           ~event_data.indexOf("action=tm_woowishlist_remove") ){
        get_wishlist_count();
      }
    }
  });

  /* Show compare & wishlist widget content on hover/click */
  var header_widget = $('.site-header .widget');
  var settings = {
        interval: 100,
        timeout: 200,
        over: mousein_triger,
        out: mouseout_triger
  };
  function mousein_triger(){
    if ( $(this).hasClass('widget_tm_woocompare_recent_compare_list') ) {
      $(this).find('.tm-woocompare-widget-products').css('visibility', 'visible');
      $(this).addClass('opened');
    } else if ( $(this).hasClass('widget_tm_woocommerce_wishlist') ) {
      $(this).find('.tm-woowishlist-widget-products').css('visibility', 'visible');
      $(this).addClass('opened');
    }
  }
  function mouseout_triger() {
    if ( $(this).hasClass('widget_tm_woocompare_recent_compare_list') ) {
      $(this).removeClass('opened');
      $(this).find('.tm-woocompare-widget-products').delay(300).queue(function() {
        $(this).css('visibility', 'hidden').dequeue();
      });
    } else if ( $(this).hasClass('widget_tm_woocommerce_wishlist') ) {
      $(this).removeClass('opened');
      $(this).find('.tm-woowishlist-widget-products').delay(300).queue(function() {
        $(this).css('visibility', 'hidden').dequeue();
      });
    }
  }
  if ( window.matchMedia("(min-width: 801px)").matches ) {
    header_widget.hoverIntent(settings);
  } else {
    header_widget.on('click', function(){
      if ( window.matchMedia("(max-width: 767px)").matches ) {
        var screen_width = $(window).width();
        var widget_container_width = 300;
        var widget_offset = $(this).offset();
        var widget_padding_width = (screen_width - widget_container_width)/2;
        var new_widget_right_pos = screen_width - widget_offset.left - $(this).width() - widget_padding_width;
        var new_widget_btn_pos = new_widget_right_pos - 20;
        if ( $(this).hasClass('widget_tm_woocompare_recent_compare_list') ) {
          $(this).find('.tm-woocompare-widget-products').css('right','-'+new_widget_right_pos+'px');
          $(this).find('.compare_link_btn').css('right','-'+new_widget_btn_pos+'px');
        } else if ( $(this).hasClass('widget_tm_woocommerce_wishlist') ) {
          $(this).find('.tm-woowishlist-widget-products').css('right','-'+new_widget_right_pos+'px');
          $(this).find('.tm-woowishlist-page-button').css('right','-'+new_widget_btn_pos+'px');
        }
      }
      if ( $(this).hasClass('widget_tm_woocompare_recent_compare_list') && $(this).hasClass('opened') ) {
        $(this).removeClass('opened');
        $(this).find('.tm-woocompare-widget-products').delay(300).queue(function() {
          $(this).css('visibility', 'hidden').dequeue();
        });
      } else if ( $(this).hasClass('widget_tm_woocompare_recent_compare_list') ) {
        $(this).find('.tm-woocompare-widget-products').css('visibility', 'visible');
        $(this).addClass('opened');
      } else if ( $(this).hasClass('widget_tm_woocommerce_wishlist') && $(this).hasClass('opened') ) {
        $(this).removeClass('opened');
        $(this).find('.tm-woowishlist-widget-products').delay(300).queue(function() {
          $(this).css('visibility', 'hidden').dequeue();
        });
      } else if ( $(this).hasClass('widget_tm_woocommerce_wishlist') ) {
        $(this).find('.tm-woowishlist-widget-products').css('visibility', 'visible');
        $(this).addClass('opened');
      }
    })
  }


  /* Products tooltips init */
  function product_tooltips() {
    $('.product-tooltip').hide().empty();
    $('.buttons-wrapper .button').each(function() {
      $(this).hoverIntent(mousein_triger, mouseout_triger);

      function mousein_triger() {
        if ($(this).hasClass('in_compare') && $(this).hasClass('tm-woocompare-button')) {

          $(this).parent().find('.product-tooltip').html(msg_compare_added).show();
        }
        else if ($(this).hasClass('tm-woocompare-button')) {
          $(this).parent().find('.product-tooltip').html(msg_compare).show();
        }
        else if ($(this).hasClass('in_wishlist') && $(this).hasClass('tm-woowishlist-button')) {
          $(this).parent().find('.product-tooltip').html(msg_wish_added).show();
        }
        else if ($(this).hasClass('tm-woowishlist-button')) {
          $(this).parent().find('.product-tooltip').html(msg_wish).show();
        }
        else if ($(this).hasClass('product_type_variable') || $(this).parent().parent().parent().parent().hasClass('outofstock')) {
          $(this).parent().find('.product-tooltip').html(msg_select_options).show();
        }
        else if ($(this).hasClass('add_to_cart_button')) {
          $(this).parent().find('.product-tooltip').html(msg_add_cart).show();
        };
      }

      function mouseout_triger() {
        $(this).parent().find('.product-tooltip').hide().empty();
      }
    });
  }
  product_tooltips();

  /* List/Grid Switcher */
  function view_switcher() {
      var container = $('ul.products');
      if ($('.list-grid-switcher span.list').hasClass('active')) {
        container.addClass('list-view');
      };

      $('.list-grid-switcher').on('click', 'span', function(e) {
          e.preventDefault();
          if ((e.currentTarget.className == 'grid active') || (e.currentTarget.className == 'list active')) {
              return false;
          }

          if ($(this).hasClass('grid') && $(this).not('.active')) {
              container.animate({
                  opacity: 0
              }, function() {
                  $('.list-grid-switcher .list').removeClass('active');
                  $('.list-grid-switcher .grid').addClass('active');
                  container.removeClass('list-view');
                  container.stop().animate({
                      opacity: 1
                  });
              });
          }

          if ($(this).hasClass('list') && $(this).not('.active')) {
              container.animate({
                  opacity: 0
              }, function() {
                  $('.list-grid-switcher .grid').removeClass('active');
                  $('.list-grid-switcher .list').addClass('active');
                  container.addClass('list-view');
                  container.stop().animate({
                      opacity: 1
                  });
              });
          }
      });
  }
  view_switcher();

  /* Extra product gallery images links */
  $("ul.extra-gallery-thumbs li a").on( 'click', function(e) {
      e.preventDefault();
      var mainImageUrl = $(this).attr("href");
      var imgSrcset = $(this).find('img').attr("srcset");
      var mainImage = $(this).parent().parent().parent().find(".woocommerce-LoopProduct-link img");
      mainImage.attr({ src: mainImageUrl, srcset: imgSrcset });
  });

  /* Remove brackets from filters count */
  $('.woocommerce-widget-layered-nav-list .count').each( function() {
    $(this).html( /(\d+)/g.exec( $(this).html() )[0] );
  } );

  /* New Quantity inputs */
  function new_product_qty_input(){
    $('.site-content div.quantity').each(function() {
      var spinner = $(this),
          input = spinner.find('input[type="number"]');

      if ( spinner.find('.quantity-button').length === 0 ) {
        spinner.append('<span class="quantity-button quantity-up"></span><span class="quantity-button quantity-down"></span>');
        var btnUp = spinner.find('.quantity-up'),
            btnDown = spinner.find('.quantity-down'),
            min = input.attr('min'),
            max = input.attr('max');

        if (!max) {
          max = 999;
        }

        btnUp.on('click', function(){

          var oldValue = parseFloat(input.val());
          if (oldValue >= max) {
            var newVal = oldValue;
          } else {
            var newVal = oldValue + 1;
          }
          input.val(newVal).trigger("change");
        });

        btnDown.on('click', function(){
          var oldValue = parseFloat(input.val());
          if (oldValue <= min) {
            var newVal = oldValue;
          } else {
            var newVal = oldValue - 1;
          }
          input.val(newVal).trigger("change");
        });
      }

    });
  }
  new_product_qty_input();

  $(document).ajaxComplete(function(event, xhr, settings) {
    var event_url = settings.url;
    if (~event_url.indexOf("wc-ajax=get_refreshed_fragments") && !$('body').hasClass('single-product')) {
      new_product_qty_input();
    }
  });

  /* Count heights for archive products */
  function recount_product_height() {
    if ( $('body').hasClass('chromium-product-style-2') ) {
      $('ul.products li.product').each( function() {
        var pr_height = $(this).css('height');
        $(this).css({
          height: pr_height,
        }).find('.inner-wrapper').css({
          position : 'absolute',
          top : 0,
          left : 0,
        });
      } );
    }
  }
  recount_product_height();

  $(window).load(function() {
  /* Add Filterizr to Gallery Page Template */
    // Default options
    var options = {
      animationDuration: 0.3,
      filter: '1',
      layout: 'sameWidth',
      delay: 30,
      filterOutCss: {
          "opacity": 0,
          "transform": "scale(0.75)"
      },
      filterInCss: {
          "opacity": 1,
          "transform": "scale(1)"
      }
    };
    var filterizd = $('#chromium-gallery');
    $('.filters-wrapper .filtr').on('click' ,function() {
      $('.filters-wrapper .filtr').removeClass('filtr-active');
      $(this).addClass('filtr-active');
    });
    if ( filterizd.hasClass('filtr-container') ) {
      $('.filtr-container').filterizr(options);
    }
  });

  /* Magnific Pop-Up Init */
  // Gallery Page init
  $('#chromium-gallery').magnificPopup({
    removalDelay: 300,
    delegate: '.quick-view',
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: true,
    midClick: true,
    mainClass: 'mfp-zoom-in mfp-img-mobile',
    image: {
      verticalFit: true,
      titleSrc: function(item) {
                  var img_desc = item.el.parent().parent().find('h3').html();
                  return img_desc + ' &middot; <a class="image-source-link" href="'+item.el.attr('href')+'" target="_blank">source</a>';
                }
    },
    gallery: {
      enabled: true,
    },
    callbacks: {
      beforeOpen: function() {
                    // just a hack that adds mfp-anim class to markup
                    this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
      },
    },
  });

  // Default WP galleries
  var wp_gallery = $('.single-post .entry-content .gallery.with-popup');
  wp_gallery.each(function() {
    var this_gallery = $(this);
    this_gallery.magnificPopup({
        removalDelay: 300,
        delegate: 'a.quick-view',
        type: 'image',
        closeOnContentClick: true,
        closeBtnInside: true,
        midClick: true,
        mainClass: 'mfp-zoom-in mfp-img-mobile',
        image: {
          verticalFit: true,
          titleSrc: function(item) {
                      var img_desc = item.el.parent().find('.gallery-caption').html();
                      if (img_desc) {
                        return img_desc + ' &middot; <a class="image-source-link" href="'+item.el.attr('href')+'" target="_blank">source</a>';
                      } else {
                        return '<a class="image-source-link" href="'+item.el.attr('href')+'" target="_blank">source</a>';
                      }
                    }
        },
        gallery: {
          enabled: true,
        },
        callbacks: {
          beforeOpen: function() {
                        // just a hack that adds mfp-anim class to markup
                        this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
        },
    },
  });

})

    // Chromium tires Search
    var tireHeaderSearchBox = function () {

        var searchBox = $('.chromium-look-tires .hgroup-sidebar .widget_tz_search');
        var searchForm = searchBox.find('.tz-searchform');

        searchForm.prepend('<div class="search-close"></div>');

        var searchClose = searchBox.find('.search-close');

        searchBox.prepend('<div id="search-but" class="tire-search-button"></div>');

        var searchBut = searchBox.find('#search-but');

        searchClose.bind('click', function () {
            searchBox.toggleClass('opened');
        });

        searchBut.bind('click', function () {
            searchBox.toggleClass('opened');
        });


    };
    tireHeaderSearchBox();


});

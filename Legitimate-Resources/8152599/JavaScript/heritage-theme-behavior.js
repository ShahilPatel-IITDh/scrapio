/**
 * @file
 * Allows the Heritage theme to respond to Drupal.attachBehaviors().
 */

(function ($, Drupal) {
  'use strict';

  /**
   * A behavior to use for re-initializing theme components when new content
   * is loaded via AJAX.
   *
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.heritageThemeBehavior = {
    attach: function (context) {
      if (context !== document) {
        // When AJAX content loads, apply the theme's non Drupal.behavior based
        // code to this context.
        if($(context).find('.transported-item').length > 0) {

          var newItem = $(context).find('.transported-item');
          $(document).trigger('newSectionAdded', [newItem]);
        }

      }
    }
  };

  // Settings that will be reused on resize.
  var _slickSettingsCollectionCarousel = {
    centerMode: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 1023,
        settings: "unslick"
      }
    ]
  };

  /**
   * Reinitializes slick components based on browser size.
   */
  function _ReslickCarousels() {
    if (window.innerWidth >= 1024) {
      $('.carousel-collection').not('.slick-initialized').slick(_slickSettingsCollectionCarousel);
    }
  }

  /**
   * Initializes carousel for carousel collection items (usually for microsite category pages).
   */
  Drupal.behaviors.collection_item_carousel_init = {
    attach: function (context, settings) {
      var $carousels = $('.carousel-collection').once('carousel-collection-init');
      if ($carousels.length > 0) {
        _ReslickCarousels($carousels);
        if (!$('body').is('carousels-listener-added')) {
          $(window).resize(Drupal.debounce(_ReslickCarousels, 100));
        }
      }
    }
  };
}(jQuery, Drupal));

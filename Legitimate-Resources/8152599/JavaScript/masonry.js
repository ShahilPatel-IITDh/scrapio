'use strict';

/* eslint-disable */
(function ($) {
  var $wrapper = $('.perspective-item-wrapper');
  var ELEMENT = '.perspective-item';
  var GRID = '.grid-sizer';
  var GUTTER = '.gutter-sizer';

  if ($wrapper.length > 0) {
    if (breakpoint() === 'desktop') {
      $wrapper.addClass('_active');

      $(document).ready(function () {
        createMasonry();
      });
    }
    binds();
  }

  function createMasonry() {
    $wrapper.masonry({
      // options...
      itemSelector: ELEMENT,
      columnWidth: GRID,
      percentPosition: true,
      gutter: 20,
      fitWidth: true,
      containerStyle: null
    });
  }

  function binds() {
    $(window).on('resize', debounce(function () {
      if ($wrapper.hasClass('_active')) {
        $wrapper.masonry('destroy');
      }

      if (breakpoint() === 'desktop') {
        if (!$wrapper.hasClass('_active')) {
          $wrapper.addClass('_active');
        }

        createMasonry();
      } else {
        $wrapper.removeClass('_active');
      }
    }, 250));
  }

  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this;
      var args = arguments;
      var later = function later() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  function breakpoint() {
    return window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
  }
})(jQuery);
/* eslint-enable */
//# sourceMappingURL=masonry.js.map

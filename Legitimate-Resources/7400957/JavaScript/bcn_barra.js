/**
 * @file
 * BCN Barra module scripts.
 */

(function () {

  jQuery(document).ready(function($) {

    var translations = [];
    var alter = [];
    if (typeof drupalSettings !== 'undefined' && typeof drupalSettings.bcn_barra !== 'undefined' && typeof drupalSettings.bcn_barra.translations !== 'undefined') {
      translations = drupalSettings.bcn_barra.translations;
      alter = drupalSettings.bcn_barra.alter;
    }
    // Check if other module like bcn news or bcn guide has changed the url.
    // and in this case don't modify actual links.
    var hooked = $('nav.lang ul').attr('hooked');
    if (!hooked) {
      // Set attribute alter.
      $('nav.lang ul').attr('hooked', alter);
      // Set links to brand links.
      $.each(translations, function(index, value) {
        $('nav.lang ul li a').each(function() {
          if ($(this).attr('lang') === index) {
            if (value == 'not-translated') {
              $(this).parent().remove();
            } else {
              $(this).attr('href', value);
            }
          }
        });
      });
    }

  });

})();

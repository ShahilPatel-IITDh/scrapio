/*
 * Replaced jcaption with a modified version of this script:
 * http://darineko.com/2570/automatic-image-captions-with-jquery
 * changed div's and spans to figure and figcaption
 */

(function($) {
  $(window).load(function() {
    $('.node img[title], .region-sidebar-second .block-block img[title], .homepage-caption img[title], .zone-preface img[title], .zone-postscript img[title], .block.caption img[title]').each(function() {
      // Exception so it doesn't get applied to flexslider.
      if (!$(this).parents('div').hasClass('flexslider')) {
        var image = $(this);
        var caption = image.attr('title');
        var imagealign = image.css('float');
        var imageclass = image.attr('class');

        switch (imageclass) {
          case "floatleft":
          imageclass = "left";
          break;

          case "floatright":
          imageclass = "right";
          break;

          case "center":
          imageclass = "center"
          break;

          default:
          imageclass = "none";
        }

        image.after('<figcaption class="caption">' + caption + '</figcaption>');
        image.next('figcaption.caption').andSelf().wrapAll('<figure>');
        image.parent('figure').addClass('caption-wrapper ' + imageclass).css({'width': image.outerWidth(false), 'height': 'auto', 'float': imagealign});
      }
    });
  });
})(jQuery);
;

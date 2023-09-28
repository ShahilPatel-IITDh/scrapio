jQuery(document).ready(function () {
    set_testimonial_height();
});
jQuery(window).on('load', function () {
    set_testimonial_height();
});
jQuery(window).on('resize', function () {
    set_testimonial_height();
});

function set_testimonial_height() {
    if (jQuery(".premio-testimonials-grid .pre-testimonials-content").length) {

        jQuery(".premio-testimonials-grid .blockquote").height("auto");
        jQuery(".premio-testimonials-grid .premio-testimonials-content").each(function () {
            jQuery(this).find(".blockquote").height("auto");
            maxHeight = 0;
            jQuery(this).find(".blockquote").each(function () {
                thisHeight = parseInt(jQuery(this).height());
                if (thisHeight > maxHeight) {
                    maxHeight = thisHeight;
                }
            });
            jQuery(this).find(".blockquote").height(maxHeight);
        });

        jQuery(".premio-testimonials-grid .pre-testimonials-content").height("auto");
        jQuery(".premio-testimonials-grid .premio-testimonials-content").each(function () {
            jQuery(this).find(".pre-testimonials-content").height("auto");
            maxHeight = 0;
            jQuery(this).find(".pre-testimonials-content").each(function () {
                thisHeight = parseInt(jQuery(this).height());
                if (thisHeight > maxHeight) {
                    maxHeight = thisHeight;
                }
            });
            jQuery(this).find(".pre-testimonials-content").height(maxHeight);
        });
    }
}
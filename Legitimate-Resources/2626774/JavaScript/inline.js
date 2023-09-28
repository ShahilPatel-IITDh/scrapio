
            function AI_responsive_widget() {
                jQuery('object.StefanoAI-youtube-responsive').each(function () {
                    jQuery(this).parent('.fluid-width-video-wrapper').removeClass('fluid-width-video-wrapper').removeAttr('style').css('width', '100%').css('display', 'block');
                    jQuery(this).children('.fluid-width-video-wrapper').removeClass('fluid-width-video-wrapper').removeAttr('style').css('width', '100%').css('display', 'block');
                    var width = jQuery(this).parent().innerWidth();
                    var maxwidth = jQuery(this).css('max-width').replace(/px/, '');
                    var pl = parseInt(jQuery(this).parent().css('padding-left').replace(/px/, ''));
                    var pr = parseInt(jQuery(this).parent().css('padding-right').replace(/px/, ''));
                    width = width - pl - pr;
                    if (maxwidth < width) {
                        width = maxwidth;
                    }
                    var ratio = jQuery(this).attr('data-ratio');
                    if (typeof ratio == 'undefined') {
                        ratio = 16 / 9;
                    }
                    jQuery(this).css('width', width + "px");
                    jQuery(this).css('height', width / ratio + "px");
                    jQuery(this).find('iframe').css('width', width + "px");
                    jQuery(this).find('iframe').css('height', width / ratio + "px");
                });
            }
            if (typeof jQuery !== 'undefined') {
                jQuery(document).ready(function () {
                    setTimeout(function () {
                        jQuery("div[data-iframe='StefanoAI-youtube-widget-responsive']").each(function () {
                            var iframe = jQuery("<iframe></iframe>");
                            jQuery.each(this.attributes, function () {
                                if (this.name == 'data-iframe' || this.name == 'data-')
                                    return;
                                iframe.attr(this.name.replace(/^data-/, ''), this.value);
                            });
                            jQuery(iframe).insertAfter(jQuery(this));
                            jQuery(this).remove();
                        });
                                        AI_responsive_widget();
                    }, 50);
                });
                jQuery(window).resize(function () {
                    AI_responsive_widget();
                });
            }
                
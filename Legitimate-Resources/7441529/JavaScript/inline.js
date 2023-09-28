
            jQuery(document).ready(function() {
                // Fancy box
                $(".ob-section-images a, .ob-link-img").attr("rel", "fancybox");
                $("a[rel=fancybox]").fancybox({
                    'overlayShow'   : true,
                    'titlePosition' : 'over',
                    'transitionIn'  : 'fadin',
                    'transitionOut' : 'fadin',
                    'type'          : 'image'
                });

                (function() {
                                            // HTML5 placeholder fallback
                        function isPlaceholderSupported() {
                            'use strict';
                            var o = document.createElement('input');
                            return 'placeholder' in o;
                        }
                        function initPlaceHolder(el){
                            if(jQuery.trim(el.val()) === '' || jQuery.trim(el.val()) === el.attr('placeholder')){
                                el.val(el.attr('placeholder'));
                                el.css({'color': '#999'});
                            }
                        }
                        function togglePlaceholder(el, submitMode) {
                            'use strict';
                            var v = jQuery.trim(el.val()), p = el.attr('placeholder');
                            if (v === '' && !submitMode) {
                                el.val(p);
                                el.css({'color': '#999'});
                            } else if (v === p) {
                                el.val('');
                            }
                        }
                        function emulatePlaceholder(form) {
                            'use strict';
                            if (!isPlaceholderSupported()) {
                                jQuery('input[placeholder]', form).each(function () {
                                    initPlaceHolder(jQuery(this));
                                }).focus(function () {
                                    togglePlaceholder(jQuery(this), false);
                                }).blur(function () {
                                    initPlaceHolder(jQuery(this));
                                });
                                form.submit(function () {
                                    jQuery(this).find('input[placeholder]').each(function () {
                                        togglePlaceholder(jQuery(this), true);
                                    });
                                });
                            }
                        }
                                    })();
            });
        